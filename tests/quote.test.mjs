import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateQuote, quoteMessage, whatsappUrl, contactUrl, localDateString, validCalendarDate } from '../dist/quote.js';

const valid = {origin:'Aeropuerto de prueba', destination:'Hotel de prueba', date:'2027-01-15', passengers:'2',service:'airport',notes:'Prueba sintética; no enviar.'};
test('required fields and whitespace are rejected', () => {
  assert.deepEqual(Object.keys(validateQuote({origin:'   '},'2026-10-13').errors),['origin','destination','date','passengers']);
});
test('today is allowed; previous dates and impossible dates are rejected', () => {
  assert.equal(validateQuote({...valid,date:'2026-10-13'},'2026-10-13').valid,true);
  for (const date of ['2026-10-12','2027-02-29','2027-04-31','bad date','2027-13-01']) {
    assert.equal(validateQuote({...valid,date},'2026-10-13').errors.date,'date');
  }
  assert.equal(validCalendarDate('2028-02-29'),true);
});
test('passengers must be a positive safe whole number; no vehicle capacity is invented', () => {
  for (const passengers of ['', '0','-1','1.5','1e3','NaN','Infinity','9007199254740992']) {
    assert.equal(validateQuote({...valid,passengers},'2026-10-13').errors.passengers,'passengers');
  }
  assert.equal(validateQuote({...valid,passengers:'75'},'2026-10-13').valid,true);
});
test('normalization, duplicate routes and length limits', () => {
  assert.equal(validateQuote({...valid,origin:' A  B ',destination:'a b'},'2026-10-13').errors.destination,'same');
  assert.equal(validateQuote({...valid,origin:'x'.repeat(121)},'2026-10-13').errors.origin,'location');
  assert.equal(validateQuote({...valid,notes:'x'.repeat(1201)},'2026-10-13').errors.notes,'notes');
  assert.equal(validateQuote({...valid,service:'unpublished-service'},'2026-10-13').errors.service,'service');
  assert.equal(validateQuote({...valid,service:''},'2026-10-13').valid,true);
});
test('Spanish and English drafts contain exact requested details and no booking confirmation', () => {
  const es=quoteMessage(valid,'es'), en=quoteMessage(valid,'en');
  assert.match(es,/Origen: Aeropuerto de prueba/);
  assert.match(es,/15\/01\/2027/);
  assert.match(es,/Servicio: Traslado de aeropuerto/);
  assert.match(es,/no una reserva confirmada/);
  assert.match(en,/Pick-up: Aeropuerto de prueba/);
  assert.match(en,/Service: Airport transfer/);
  assert.match(en,/not a confirmed booking/);
});
test('WhatsApp URL round-trips accents, punctuation and newlines without sending', () => {
  const message = quoteMessage({...valid,origin:'Santo Domingo & "prueba"',notes:'Línea 1\nLínea 2: áéíóú + ? #'},'es');
  const url=new URL(whatsappUrl(message));
  assert.equal(url.origin,'https://wa.me');
  assert.equal(url.pathname,'/18092532740');
  assert.equal(url.searchParams.get('text'),message);
  assert.equal(new URL(contactUrl('en')).pathname,'/18092532740');
});
test('minimum travel date uses Dominican Republic calendar even for overseas visitors', () => {
  assert.equal(localDateString(new Date('2026-10-14T02:00:00Z')),'2026-10-13');
  assert.equal(localDateString(new Date('2026-10-14T05:00:00Z')),'2026-10-14');
});

test('freight drafts do not require or include passengers; removed courier service is rejected', () => {
  const input = {...valid, service:'cargo', passengers:'', notes:'2 cajas, 40 × 30 × 20 cm'};
  assert.equal(validateQuote(input, '2026-10-13').valid, true);
  for (const language of ['es', 'en']) {
    const message = quoteMessage(input, language);
    assert.doesNotMatch(message, /Pasajeros|Passengers/);
    assert.match(message, /2 cajas/);
    assert.equal(new URL(whatsappUrl(message)).searchParams.get('text'), message);
  }
  assert.equal(validateQuote({...valid, service:'courier'}, '2026-10-13').errors.service, 'service');
  assert.equal(validateQuote({...valid, service:'tourism', passengers:''}, '2026-10-13').errors.passengers, 'passengers');
});

test('vehicle preference is optional, validates known fleet and appears in both quote languages', () => {
  assert.equal(validateQuote(valid, '2026-10-13').valid, true);
  assert.doesNotMatch(quoteMessage(valid), /Vehículo de preferencia/);
  assert.equal(validateQuote({...valid, vehicle:'unpublished-model'}, '2026-10-13').errors.vehicle, 'vehicle');
  for (const [vehicle, esName, enName] of [
    ['suburban', 'Chevrolet Suburban', 'Chevrolet Suburban'],
    ['cadillac', 'Cadillac', 'Cadillac'],
    ['toyota', 'Minibús Toyota · 19 pasajeros', 'Toyota minibus · 19 passengers'],
  ]) {
    const input = {...valid, vehicle};
    assert.equal(validateQuote(input, '2026-10-13').valid, true);
    assert.ok(quoteMessage(input, 'es').includes(`Vehículo de preferencia: ${esName}`));
    assert.ok(quoteMessage(input, 'en').includes(`Preferred vehicle: ${enName}`));
    const message = quoteMessage(input, 'es');
    assert.equal(new URL(whatsappUrl(message)).searchParams.get('text'), message);
  }
});
