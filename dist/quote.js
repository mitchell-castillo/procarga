// Pure functions shared by the browser and tests. Dates use the trip's local calendar.
export const WHATSAPP_NUMBER = '18092532740';
export const SERVICES = {
  airport: { es: 'Traslado de aeropuerto', en: 'Airport transfer' },
  corporate: { es: 'Transporte corporativo / VIP', en: 'Corporate / VIP transportation' },
  chauffeur: { es: 'Chauffeur privado', en: 'Private chauffeur' },
  events: { es: 'Eventos y bodas', en: 'Events and weddings' },
  tourism: { es: 'Transporte turístico', en: 'Tourism transportation' },
  cargo: { es: 'Flete, carga y mudanzas', en: 'Freight, cargo and moving' },
  courier: { es: 'Mensajería y envíos', en: 'Courier and deliveries' },
};

export function localDateString(date = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Santo_Domingo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date).map(part => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function validCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && date.getFullYear() === y && date.getMonth() + 1 === m && date.getDate() === d;
}

export function normalizeQuote(input) {
  return {
    origin: String(input.origin ?? '').trim().replace(/\s+/g, ' '),
    destination: String(input.destination ?? '').trim().replace(/\s+/g, ' '),
    date: String(input.date ?? ''),
    passengers: String(input.passengers ?? '').trim(),
    service: String(input.service ?? ''),
    notes: String(input.notes ?? '').trim(),
  };
}

export function validateQuote(input, today = localDateString()) {
  const quote = normalizeQuote(input);
  const errors = {};
  if (!quote.origin || quote.origin.length > 120) errors.origin = 'location';
  if (!quote.destination || quote.destination.length > 120) errors.destination = 'location';
  if (quote.origin && quote.destination && quote.origin.toLocaleLowerCase() === quote.destination.toLocaleLowerCase()) errors.destination = 'same';
  if (!validCalendarDate(quote.date) || quote.date < today) errors.date = 'date';
  if (!['cargo', 'courier'].includes(quote.service) && (!/^\d+$/.test(quote.passengers) || !Number.isSafeInteger(Number(quote.passengers)) || Number(quote.passengers) < 1)) errors.passengers = 'passengers';
  if (quote.service && !Object.hasOwn(SERVICES, quote.service)) errors.service = 'service';
  if (quote.notes.length > 1200) errors.notes = 'notes';
  return { quote, errors, valid: Object.keys(errors).length === 0 };
}

export function quoteMessage(input, language = 'es') {
  const q = normalizeQuote(input);
  const lang = language === 'en' ? 'en' : 'es';
  const [year, month, day] = q.date.split('-');
  const date = `${day}/${month}/${year}`;
  const lines = lang === 'en' ? [
    'Hello Pro Carga, I would like a service quote in the Dominican Republic.',
    '', `Pick-up: ${q.origin}`, `Destination: ${q.destination}`,
    `Service date (DD/MM/YYYY, Dominican Republic): ${date}`,
  ] : [
    'Hola Pro Carga, me gustaría cotizar un servicio en República Dominicana.',
    '', `Origen: ${q.origin}`, `Destino: ${q.destination}`,
    `Fecha del servicio (DD/MM/AAAA, República Dominicana): ${date}`,
  ];
  if (!['cargo', 'courier'].includes(q.service)) lines.push(`${lang === 'en' ? 'Passengers' : 'Pasajeros'}: ${Number(q.passengers)}`);
  if (q.service) lines.push(`${lang === 'en' ? 'Service' : 'Servicio'}: ${SERVICES[q.service]?.[lang] ?? q.service}`);
  if (q.notes) lines.push(`${lang === 'en' ? 'Details' : 'Detalles'}: ${q.notes}`);
  lines.push('', lang === 'en'
    ? 'Please confirm the price, availability and service details. This is a quote request, not a confirmed booking.'
    : 'Por favor, confirmen precio, disponibilidad y detalles del servicio. Esta es una solicitud de cotización, no una reserva confirmada.');
  return lines.join('\n');
}

export function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function contactUrl(language = 'es') {
  return whatsappUrl(language === 'en'
    ? 'Hello Pro Carga, I would like information about transportation in the Dominican Republic.'
    : 'Hola Pro Carga, me gustaría recibir información sobre transporte en República Dominicana.');
}
