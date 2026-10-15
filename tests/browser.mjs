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
async function centeredDots(page,label) {
  const offsets=await page.locator('[data-carousel]').evaluateAll(carousels=>carousels.map(carousel=>{
    const image=carousel.querySelector('.carousel-stage').getBoundingClientRect();
    const dots=carousel.querySelector('.carousel-dots').getBoundingClientRect();
    return Math.abs(image.x+image.width/2-dots.x-dots.width/2);
  }));
  assert.ok(offsets.every(offset=>offset<1),`${label}: ${JSON.stringify(offsets)}`);
  passed(`${label}: both photo dot groups are centered`);
}
async function touchSwipe(page,stage,dx,dy=0) {
  await stage.scrollIntoViewIfNeeded();
  const box=await stage.boundingBox();
  const x=box.x+box.width/2-dx/2, y=box.y+box.height/2-dy/2;
  const session=await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:0}]});
  for(let step=1;step<=8;step++) {
    await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*step/8,y:y+dy*step/8,id:0}]});
    await page.waitForTimeout(20);
  }
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await session.detach();
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
  assert.equal(await page.locator('[data-gallery-view], [data-vehicle]').count(),0);
  assert.equal(await page.locator('.hero-actions .text-link').getAttribute('href'),'#servicios');
  assert.equal(await page.locator('#vehicle').isVisible(),false);
  passed('Service-led page has no vehicle shopping controls; vehicle preference is optional and collapsed');
  const films=page.locator('#momentos video');
  assert.equal(await films.count(),3);
  assert.equal(await page.locator('.video-start').count(),0);
  assert.equal(await page.locator('#film-dialog').count(),0);
  for(let index=0;index<3;index++) {
    const film=films.nth(index);
    assert.equal(await film.isVisible(),true);
    assert.equal(await film.getAttribute('preload'),'none');
    assert.equal(await film.evaluate(video=>video.controls && video.playsInline && !video.autoplay),true);
    const source=await film.locator('source').getAttribute('src');
    const mediaResponse=await context.request.head(new URL(source,base).href);
    assert.equal(mediaResponse.status(),200);
    assert.match(mediaResponse.headers()['content-type'],/^video\/mp4/);
    await film.scrollIntoViewIfNeeded();
    const videoBox=await film.boundingBox();
    // Exercise Chromium's own play control, with no page overlay.
    await page.mouse.click(videoBox.x+20,videoBox.y+videoBox.height-30);
    await film.evaluate(video=>new Promise((resolve,reject)=>{
      if(!video.paused && video.readyState>=2) { resolve(); return; }
      video.addEventListener('playing',()=>resolve(),{once:true});
      video.addEventListener('error',()=>reject(new Error('Video failed to decode')),{once:true});
    }));
    assert.equal(await film.evaluate(video=>!video.paused && video.videoWidth>0),true);
    if(index>0) assert.equal(await films.nth(index-1).evaluate(video=>video.paused),true);
  }
  await films.last().evaluate(video=>video.pause());
  passed('All three videos play through native controls without custom overlays, decode and pause other clips');
  assert.equal(await page.locator('[data-carousel]').count(),2);
  assert.equal(await page.locator('[data-carousel="luxury"] .carousel-slide').count(),2);
  assert.equal(await page.locator('[data-carousel="group"] .carousel-slide').count(),4);
  assert.match(await page.locator('[data-carousel="luxury"] .carousel-slide img').first().getAttribute('src'),/panorama-clean/);
  assert.equal(await page.locator('.group-availability, .photo-expand, .carousel-counter, .carousel-actions, .service-shortcuts small').count(),0);
  assert.doesNotMatch(await page.locator('body').innerText(),/diciembre|December|Incorporación prevista|Expected arrival/i);
  for(const name of ['luxury','group']) {
    const carousel=page.locator(`[data-carousel="${name}"]`);
    assert.equal(await carousel.locator('[data-carousel-toggle], [data-carousel-prev], [data-carousel-next]').count(),0);
    await carousel.locator('[data-carousel-go="1"]').click();
    assert.equal(await carousel.locator('.carousel-slide.is-active').getAttribute('data-gallery-index'),'1');
    await carousel.locator('[data-carousel-go="0"]').click();
    assert.equal(await carousel.locator('.carousel-slide.is-active').getAttribute('data-gallery-index'),'0');
  }
  passed('Photo carousels retain two luxury and four group images with dots only; date notices and image arrows removed');
  await centeredDots(page,'Desktop 1440px');
  for(const [collection,expected] of [['luxury',2],['group',4]]) {
    const trigger=page.locator(`[data-open-gallery="${collection}"]`).first();
    await trigger.click();
    assert.equal(await page.locator('#media-dialog').isVisible(),true);
    const iconAlignment=await page.locator('.media-arrow').evaluateAll(buttons=>buttons.map(button=>{
      const a=button.getBoundingClientRect(), b=button.querySelector('svg').getBoundingClientRect();
      return {dx:Math.abs(a.x+a.width/2-b.x-b.width/2),dy:Math.abs(a.y+a.height/2-b.y-b.height/2)};
    }));
    assert.ok(iconAlignment.every(icon=>icon.dx<1 && icon.dy<1),JSON.stringify(iconAlignment));
    assert.equal(await page.locator('.media-thumb:visible').count(),expected);
    const sources=[];
    for(let i=0;i<expected;i++) {
      await page.locator(`.media-thumb[data-photo-index="${i}"]`).click();
      await page.locator('#media-full-image').evaluate(image=>image.decode());
      sources.push(await page.locator('#media-full-image').getAttribute('src'));
      assert.equal(await page.locator('#media-count').innerText(),`${i+1} / ${expected}`);
    }
    assert.equal(new Set(sources).size,expected);
    if(collection==='luxury') assert.ok(sources.some(src=>src.includes('front-framed')));
    if(collection==='group') {
      assert.equal(sources.filter(src=>src.includes('interior')).length,2);
      assert.equal(sources.filter(src=>!src.includes('interior')).length,2);
    }
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#media-count').innerText(),`1 / ${expected}`);
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#media-count').innerText(),`${expected} / ${expected}`);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#media-dialog').isVisible(),false);
    assert.equal(await trigger.evaluate(button=>document.activeElement===button),true);
    await trigger.click();
    await page.locator('#media-close').click();
    assert.equal(await page.locator('#media-dialog').isVisible(),false);
  }
  passed('Photo galleries retain the framed Suburban, Toyota two outside/two inside, centered SVG arrows and keyboard focus');
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
  assert.equal(await page.locator('#vehicle').isVisible(),false);
  passed('Service link preselects the service without forcing optional vehicle preferences');
  await page.locator('#quote-form button[type=submit]').click();
  assert.equal(await page.locator('[aria-invalid="true"]').count(),4);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'origin');
  assert.equal(await page.locator('#request-review').isVisible(),false);
  passed('Empty fields rejected with accessible errors and focus');
  await page.locator('[data-language="en"]').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.match(await page.locator('#origin-error').innerText(),/Enter a location/);
  await translationsComplete(page,'English');
  assert.doesNotMatch(await page.locator('body').innerText(),/December|expected arrival/i);
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
  await page.locator('#viajes-en-grupo [data-service="tourism"]').click();
  assert.equal(await page.locator('#service').inputValue(),'tourism');
  assert.equal(await page.locator('#origin').inputValue(),'Synthetic Airport & Test');
  assert.equal(await page.locator('#destination').inputValue(),'Santiago');
  passed('Group travel action prepares a service and preserves the existing route');
  const contactLinks=await page.locator('[data-whatsapp-contact]').evaluateAll(links=>links.map(el=>({href:el.href,target:el.target,rel:el.rel})));
  assert.ok(contactLinks.every(link=>new URL(link.href).pathname==='/18092532740'&&link.target==='_blank'&&link.rel.includes('noopener')));
  passed('All contact WhatsApp links target the exact number with safe new-tab attributes');
  await page.goto(base);
  await page.setViewportSize({width:390,height:844});
  await noOverflow(page,'Mobile ES 390px');
  await centeredDots(page,'Mobile 390px');
  const mobileType=await page.locator('.hero-description, .service-card p, .luxury-copy>p:not(.eyebrow):not(.luxury-model-note), .group-copy>p:not(.eyebrow):not(.group-availability), .steps p, .faq-list p').evaluateAll(elements=>elements.map(element=>({
    text:element.textContent.slice(0,50), size:parseFloat(getComputedStyle(element).fontSize),
  })));
  assert.ok(mobileType.length>0);
  assert.ok(mobileType.every(text=>text.size>=16),`Mobile reading text: ${JSON.stringify(mobileType)}`);
  passed('Mobile reading paragraphs use at least 16px text');
  await page.screenshot({path:resolve(evidencePath,'mobile-es.png'),fullPage:true});
  assert.equal(await page.locator('#momentos video').count(),3);
  await page.locator('#momentos').scrollIntoViewIfNeeded();
  const railWidths=await page.locator('.films-rail').evaluate(rail=>({client:rail.clientWidth,scroll:rail.scrollWidth}));
  assert.ok(railWidths.scroll>railWidths.client);
  await noOverflow(page,'Mobile inline videos with local swipe rail');
  await page.locator('[data-open-gallery="group"]').first().click();
  await page.locator('.media-thumb[data-photo-index="3"]').click();
  await page.locator('#media-full-image').evaluate(image=>image.decode());
  assert.match(await page.locator('#media-full-image').getAttribute('src'),/interior-rows/);
  const galleryBounds=await page.locator('#media-dialog').boundingBox();
  assert.ok(galleryBounds.width<=390 && galleryBounds.height<=844);
  await page.keyboard.press('Escape');
  passed('Mobile photo gallery fits the viewport and exposes both group interior photos');
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
  await centeredDots(page,'Small mobile 320px');
  await page.setViewportSize({width:768,height:1024});
  await noOverflow(page,'Tablet EN 768px');
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:resolve(evidencePath,'desktop-en.png'),fullPage:true});
  await page.locator('[data-i18n="faq2Question"]').click();
  assert.match(await page.locator('[data-i18n="faq2Answer"]').innerText(),/No\. The website only prepares a quote request/);
  passed('FAQ expands and makes non-confirmation explicit');
  const touchContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  await touchContext.route('**/*',async route=>{
    if(new URL(route.request().url()).origin!==base) {report.externalRequests.push(route.request().url());await route.abort();}
    else await route.continue();
  });
  const touchPage=await touchContext.newPage();
  touchPage.on('pageerror',error=>report.consoleErrors.push(String(error)));
  touchPage.on('console',message=>{if(message.type()==='error')report.consoleErrors.push(message.text());});
  await touchPage.goto(base);
  for(const name of ['luxury','group']) {
    const carousel=touchPage.locator(`[data-carousel="${name}"]`);
    const stage=carousel.locator('.carousel-stage');
    await touchSwipe(touchPage,stage,-120);
    assert.equal(await carousel.getAttribute('data-active-index'),'1');
    await touchSwipe(touchPage,stage,120);
    assert.equal(await carousel.getAttribute('data-active-index'),'0');
    await touchSwipe(touchPage,stage,120);
    assert.equal(await carousel.getAttribute('data-active-index'),name==='group'?'3':'1');
    await touchSwipe(touchPage,stage,-120);
    assert.equal(await carousel.getAttribute('data-active-index'),'0');
    assert.equal(await touchPage.locator('#media-dialog').isVisible(),false);
    await touchSwipe(touchPage,stage,8);
    assert.equal(await carousel.getAttribute('data-active-index'),'0');
    if(await touchPage.locator('#media-dialog').isVisible()) await touchPage.locator('#media-close').tap();
    await stage.locator('.is-active').tap();
    assert.equal(await touchPage.locator('#media-dialog').isVisible(),true);
    await touchPage.locator('#media-close').tap();
    passed(`Touch ${name}: swipes navigate both ways and wrap; small movements keep the photo; taps still enlarge`);
  }
  const groupStage=touchPage.locator('[data-carousel="group"] .carousel-stage');
  await groupStage.scrollIntoViewIfNeeded();
  const scrollBefore=await touchPage.evaluate(()=>scrollY);
  await touchSwipe(touchPage,groupStage,2,-130);
  await touchPage.waitForFunction(before=>scrollY>before+30,scrollBefore,{timeout:3000});
  assert.equal(await touchPage.locator('[data-carousel="group"]').getAttribute('data-active-index'),'0');
  assert.equal(await touchPage.locator('#media-dialog').isVisible(),false);
  passed('Vertical touch gestures scroll the page without changing or opening photos');
  await touchSwipe(touchPage,groupStage,-120);
  await touchPage.waitForFunction(()=>document.querySelector('[data-carousel="group"]').dataset.activeIndex==='2',null,{timeout:10000});
  passed('Automatic rotation resumes after finger navigation');
  await touchContext.close();
  const autoPage=await context.newPage();
  await autoPage.emulateMedia({reducedMotion:'reduce'});
  await autoPage.goto(base);
  const autoCarousel=autoPage.locator('[data-carousel="luxury"]');
  await autoCarousel.scrollIntoViewIfNeeded();
  await autoPage.mouse.move(0,0);
  await autoPage.waitForFunction(()=>document.querySelector('[data-carousel="luxury"]').dataset.activeIndex==='1',null,{timeout:10000});
  assert.equal(await autoCarousel.locator('.carousel-slide.is-active').getAttribute('data-gallery-index'),'1');
  await autoCarousel.locator('[data-carousel-go="0"]').click();
  assert.equal(await autoCarousel.getAttribute('data-active-index'),'0');
  // Leave focus and the pointer on a dot: manual navigation must not stop rotation.
  await autoPage.waitForFunction(()=>document.querySelector('[data-carousel="luxury"]').dataset.activeIndex==='1',null,{timeout:10000});
  await autoPage.close();
  passed('Photo carousel advances automatically and keeps rotating after choosing a dot');
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
