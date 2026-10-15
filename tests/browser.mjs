import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer } from '../scripts/serve.mjs';

const require = createRequire(import.meta.url);
const playwright = process.env.PLAYWRIGHT_MODULE_PATH ? require(process.env.PLAYWRIGHT_MODULE_PATH) : require('playwright');
const evidencePath = fileURLToPath(new URL('../evidence/',import.meta.url));
await mkdir(evidencePath,{recursive:true});
const server = await startServer(0);
const base = `http://127.0.0.1:${server.address().port}`;
const report={startedAt:new Date().toISOString(),browser:[],checks:[],externalRequests:[],consoleErrors:[],note:'Synthetic inputs only. No external page opened or message sent.'};
let browser;
function passed(check) { report.checks.push({check,status:'passed'}); }
async function noOverflow(page,label) {
  const result=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert.ok(result.scroll<=result.width,`${label}: ${JSON.stringify(result)}`);
  passed(`${label}: no horizontal overflow`);
}
async function translationsComplete(page,label) {
  const missing=await page.locator('[data-i18n]').evaluateAll(elements=>elements.filter(el=>!el.textContent || el.textContent==='undefined').map(el=>el.dataset.i18n));
  assert.deepEqual(missing,[]);
  passed(`${label}: all translation keys populated`);
}
try {
  browser=await playwright.chromium.launch({headless:true,...(process.env.TEST_BROWSER_EXECUTABLE?{executablePath:process.env.TEST_BROWSER_EXECUTABLE}:{})});
  report.browser.push({name:'Chromium',version:browser.version(),playwright:require(resolve(process.env.PLAYWRIGHT_MODULE_PATH || 'node_modules/playwright','package.json')).version});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',timezoneId:'America/New_York'});
  await context.route('**/*',async route=>{
    if(new URL(route.request().url()).origin !== base) {report.externalRequests.push(route.request().url());await route.abort();}
    else await route.continue();
  });
  const page=await context.newPage();
  page.on('pageerror',error=>report.consoleErrors.push(String(error)));
  page.on('console',message=>{if(message.type()==='error')report.consoleErrors.push(message.text());});
  const response=await page.goto(base);
  assert.equal(response.status(),200);
  await page.waitForFunction(()=>document.querySelector('#date').min.length===10);
  await noOverflow(page,'Desktop ES 1440px');
  await translationsComplete(page,'Spanish');
  assert.equal(await page.locator('[data-service="courier"], #service option[value="courier"]').count(),0);
  assert.doesNotMatch(await page.locator('body').innerText(),/mensajería|courier/i);
  for (const destination of ['Samaná','Boca Chica','Santiago']) {
    assert.equal(await page.locator(`[data-destination="${destination}"]`).count(),1);
    assert.equal(await page.locator(`#route-suggestions option[value="${destination}"]`).count(),1);
  }
  passed('Removed courier service is absent; Samaná, Boca Chica and Santiago are available destinations');
  const imageFailures=await page.locator('main img[src]').evaluateAll(async images=>{
    images.forEach(image=>{image.loading='eager';});
    await Promise.allSettled(images.map(image=>image.decode()));
    return images.filter(image=>image.naturalWidth===0).map(image=>image.getAttribute('src'));
  });
  assert.deepEqual(imageFailures,[]);
  passed('All initial content photos decode successfully');
  await page.screenshot({path:resolve(evidencePath,'desktop-es.png'),fullPage:true});
  passed('Desktop Spanish rendered and screenshot captured');
  const videos=await page.locator('video').evaluateAll(elements=>elements.map(video=>({
    controls:video.controls, playsInline:video.playsInline, autoplay:video.autoplay,
    preload:video.preload, poster:video.poster, source:video.currentSrc || video.src || video.querySelector('source')?.src,
  })));
  assert.ok(videos.length>0,'At least one real vehicle video is present');
  for(const video of videos) {
    assert.equal(video.controls,true);
    assert.equal(video.playsInline,true);
    assert.equal(video.autoplay,false);
    assert.equal(video.preload,'none');
    assert.ok(video.poster);
    assert.equal(new URL(video.source).origin,base);
    const mediaResponse=await context.request.head(video.source);
    assert.equal(mediaResponse.status(),200);
    assert.match(mediaResponse.headers()['content-type'],/^video\/mp4/);
  }
  await page.locator('video').first().evaluate(video=>{video.preload='metadata';video.load();});
  await page.waitForFunction(()=>{
    const video=document.querySelector('video');
    return video.readyState>=1 && video.videoWidth>0 && video.duration>0;
  },null,{timeout:15000});
  passed('Local MP4 videos have native inline controls, lazy loading and valid media metadata');
  const galleries=page.locator('[data-fleet-gallery]');
  assert.ok(await galleries.count()>=2);
  for(const vehicle of ['suburban','toyota']) {
    const gallery=page.locator(`[data-fleet-gallery="${vehicle}"]`);
    const exterior=gallery.locator('[data-gallery-view="exterior"]');
    const interior=gallery.locator('[data-gallery-view="interior"]');
    const exteriorSource=await gallery.locator('.fleet-gallery img').first().getAttribute('src');
    await interior.click();
    assert.equal(await interior.getAttribute('aria-pressed'),'true');
    assert.equal(await exterior.getAttribute('aria-pressed'),'false');
    assert.notEqual(await gallery.locator('.fleet-gallery img').first().getAttribute('src'),exteriorSource);
    await gallery.locator('.fleet-gallery img').evaluateAll(images=>Promise.all(images.map(image=>{image.loading='eager';return image.decode();})));
    if(vehicle==='toyota') assert.equal(await gallery.locator('.fleet-gallery img').count(),2);
    else assert.ok(await gallery.locator('.fleet-gallery img').count()>=1);
    const photo=gallery.locator('button.fleet-photo').first();
    const selectedSource=await photo.locator('img').getAttribute('src');
    await photo.click();
    assert.equal(await page.locator('#media-dialog').getAttribute('open'),'');
    assert.equal(new URL(await page.locator('#media-full-image').getAttribute('src'),base).href,new URL(selectedSource,base).href);
    await page.waitForFunction(()=>document.querySelector('#media-full-image').naturalWidth>0);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#media-dialog').getAttribute('open'),null);
    assert.equal(await photo.evaluate(button=>document.activeElement===button),true);
    await photo.click();
    await page.locator('#media-close').click();
    assert.equal(await page.locator('#media-dialog').getAttribute('open'),null);
    await exterior.click();
    assert.equal(await exterior.getAttribute('aria-pressed'),'true');
    assert.equal(await gallery.locator('.fleet-gallery img').first().getAttribute('src'),exteriorSource);
    if(vehicle==='toyota') assert.equal(await gallery.locator('.fleet-gallery img').count(),2);
    else assert.ok(await gallery.locator('.fleet-gallery img').count()>=1);
  }
  passed('Fleet galleries switch actual interior/exterior photos; lightbox closes and returns keyboard focus');
  const anchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(link=>({href:link.getAttribute('href'),exists:!!document.getElementById(link.getAttribute('href').slice(1))})));
  assert.ok(anchors.every(anchor=>anchor.exists));
  await page.locator('#navigation a[href="#servicios"]').click();
  assert.equal(new URL(page.url()).hash,'#servicios');
  await page.locator('#navigation a[href="#experiencia"]').click();
  assert.equal(new URL(page.url()).hash,'#experiencia');
  await page.locator('#navigation a[href="#contacto"]').click();
  assert.equal(new URL(page.url()).hash,'#contacto');
  passed('All anchor targets exist; navigation visits services, experience and contact');
  await page.locator('[data-service="airport"]').first().click();
  assert.equal(await page.locator('#service').inputValue(),'airport');
  assert.equal(await page.locator('.trip-details').getAttribute('open'),'');
  passed('Service link preselects service and reveals optional details');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('[aria-invalid="true"]').count(),4);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'origin');
  assert.equal(await page.locator('#request-review').isVisible(),false);
  passed('Empty fields rejected with accessible errors and focus');
  await page.locator('[data-language="en"]').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.match(await page.locator('#origin-error').innerText(),/Enter a location/);
  await translationsComplete(page,'English');
  await noOverflow(page,'Desktop EN 1440px');
  await page.goto(`${base}/?lang=en`);
  await page.waitForFunction(()=>document.documentElement.lang==='en');
  passed('English toggle translates errors and metadata; direct ?lang=en survives reload');
  await page.locator('#origin').fill('Synthetic Airport & Test');
  await page.locator('#destination').fill('Synthetic Hotel / Test');
  await page.locator('#date').fill('2027-12-15');
  await page.locator('#passengers').fill('0');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('#passengers').getAttribute('aria-invalid'),'true');
  await page.locator('#passengers').fill('1.5');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('#passengers').getAttribute('aria-invalid'),'true');
  await page.locator('#passengers').fill('2');
  await page.locator('#date').fill('2020-01-01');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('#date').getAttribute('aria-invalid'),'true');
  await page.locator('#date').fill('2027-12-15');
  await page.locator('#destination').fill('Synthetic Airport & Test');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('#destination').getAttribute('aria-invalid'),'true');
  passed('Browser rejects zero/fractional passengers, past dates and identical routes');
  await page.locator('#destination').fill('Synthetic Hotel / Test');
  await page.locator('.trip-details summary').click();
  await page.locator('#service').selectOption('events');
  await page.locator('#vehicle').selectOption('cadillac');
  await page.locator('#notes').fill('<img src=x onerror=alert(1)> — synthetic only');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('#request-review').isVisible(),true);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'request-review');
  assert.equal(await page.locator('#request-message img').count(),0);
  const enDraft=await page.locator('#request-message').innerText();
  assert.match(enDraft,/Passengers: 2/);
  assert.match(enDraft,/Events and weddings/);
  assert.match(enDraft,/Preferred vehicle: Cadillac/);
  assert.match(enDraft,/not a confirmed booking/);
  let link=new URL(await page.locator('#request-whatsapp').getAttribute('href'));
  assert.equal(link.pathname,'/18092532740');
  assert.equal(link.searchParams.get('text'),enDraft);
  assert.equal(link.origin,'https://wa.me');
  passed('English request reviewed locally; exact WhatsApp number, payload and safe literal rendering verified');
  await page.locator('[data-language="es"]').click();
  const esDraft=await page.locator('#request-message').innerText();
  assert.match(esDraft,/Pasajeros: 2/);
  assert.match(esDraft,/Vehículo de preferencia: Cadillac/);
  assert.match(esDraft,/no una reserva confirmada/);
  link=new URL(await page.locator('#request-whatsapp').getAttribute('href'));
  assert.equal(link.searchParams.get('text'),esDraft);
  await page.locator('#edit-request').click();
  assert.equal(await page.locator('#origin').inputValue(),'Synthetic Airport & Test');
  assert.equal(await page.locator('#service').inputValue(),'events');
  assert.equal(await page.locator('#vehicle').inputValue(),'cadillac');
  passed('Language change updates prepared draft; edit preserves trip inputs');
  for (const destination of ['Samaná','Boca Chica','Santiago']) {
    await page.locator(`[data-destination="${destination}"]`).click();
    assert.equal(await page.locator('#destination').inputValue(),destination);
    assert.equal(await page.locator('#origin').inputValue(),'Synthetic Airport & Test');
    assert.equal(await page.locator('#vehicle').inputValue(),'cadillac');
  }
  await page.locator('[data-service="cargo"]').first().click();
  assert.equal(await page.locator('#vehicle').inputValue(),'cadillac');
  assert.equal(await page.locator('#passengers').isVisible(),false);
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('#request-review').isVisible(),true);
  assert.doesNotMatch(await page.locator('#request-message').innerText(),/Pasajeros:/);
  await page.locator('#edit-request').click();
  await page.locator('[data-service="airport"]').first().click();
  assert.equal(await page.locator('#passengers').isVisible(),true);
  passed('New destinations fill route without losing origin or vehicle; cargo hides passenger requirement');
  for(const vehicle of ['suburban','cadillac','toyota']) {
    await page.locator(`[data-vehicle="${vehicle}"]`).first().click();
    assert.equal(await page.locator('#vehicle').inputValue(),vehicle);
    assert.equal(await page.locator('#origin').inputValue(),'Synthetic Airport & Test');
    assert.equal(await page.locator('#destination').inputValue(),'Santiago');
  }
  passed('Each fleet quote link selects its vehicle and preserves the existing route');
  const contactLinks=await page.locator('[data-whatsapp-contact]').evaluateAll(links=>links.map(el=>({href:el.href,target:el.target,rel:el.rel})));
  assert.ok(contactLinks.every(link=>new URL(link.href).pathname==='/18092532740'&&link.target==='_blank'&&link.rel.includes('noopener')));
  passed('All contact WhatsApp links target the exact number with safe new-tab attributes');
  await page.goto(base);
  await page.setViewportSize({width:390,height:844});
  await noOverflow(page,'Mobile ES 390px');
  const mobileType=await page.locator('.hero-description, .service-card p, .luxury-copy>p:not(.eyebrow), .steps p, .faq-list p').evaluateAll(elements=>elements.map(element=>({
    text:element.textContent.slice(0,50), size:parseFloat(getComputedStyle(element).fontSize),
  })));
  assert.ok(mobileType.length>0);
  assert.ok(mobileType.every(text=>text.size>=16),`Mobile reading text: ${JSON.stringify(mobileType)}`);
  passed('Mobile reading paragraphs use at least 16px text');
  await page.screenshot({path:resolve(evidencePath,'mobile-es.png'),fullPage:true});
  assert.equal(await page.locator('#navigation').isVisible(),false);
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('#navigation').isVisible(),true);
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await page.locator('#navigation a[href="#servicios"]').click();
  assert.equal(await page.locator('#navigation').isVisible(),false);
  await page.locator('.menu-toggle').click();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  passed('Mobile navigation opens, closes on navigation, and closes with Escape');
  await page.setViewportSize({width:900,height:1000});
  assert.equal(await page.locator('#navigation').isVisible(),false);
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await page.setViewportSize({width:1200,height:1000});
  await page.waitForFunction(()=>document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false',null,{timeout:3000});
  await page.setViewportSize({width:900,height:1000});
  assert.equal(await page.locator('#navigation').isVisible(),false);
  await page.setViewportSize({width:390,height:844});
  passed('Tablet menu state resets when resizing into desktop navigation');
  await page.locator('[data-language="en"]').click();
  await noOverflow(page,'Mobile EN 390px');
  await page.goto(`${base}/?lang=en#cotizar`);
  await page.locator('#origin').fill('Synthetic mobile start');
  await page.locator('#destination').fill('Synthetic mobile finish');
  await page.locator('#date').fill('2027-12-15');
  await page.locator('#passengers').fill('4');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('#request-review').isVisible(),true);
  await noOverflow(page,'Mobile EN prepared request');
  await page.screenshot({path:resolve(evidencePath,'mobile-en-request.png'),fullPage:true});
  passed('Mobile English form prepares a reviewed draft');
  await page.goto(`${base}/?lang=en`);
  await page.setViewportSize({width:320,height:812});
  await noOverflow(page,'Small mobile EN 320px');
  await page.setViewportSize({width:768,height:1024});
  await noOverflow(page,'Tablet EN 768px');
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:resolve(evidencePath,'desktop-en.png'),fullPage:true});
  await page.locator('[data-i18n="faq2Question"]').click();
  assert.match(await page.locator('[data-i18n="faq2Answer"]').innerText(),/No\. The website only prepares a quote request/);
  passed('FAQ expands and makes non-confirmation explicit');
  assert.deepEqual(report.externalRequests,[]);
  assert.deepEqual(report.consoleErrors,[]);
  passed('No external network requests or browser errors during tests');
  report.status='passed';
} catch(error) {
  report.status='failed'; report.error=String(error); throw error;
} finally {
  report.completedAt=new Date().toISOString();
  await writeFile(resolve(evidencePath,'browser-report.json'),JSON.stringify(report,null,2));
  await browser?.close();
  await new Promise(resolveClose=>server.close(resolveClose));
  console.log(JSON.stringify({status:report.status,checks:report.checks.length,report:resolve(evidencePath,'browser-report.json'),error:report.error},null,2));
}
