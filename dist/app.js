import { contactUrl, localDateString, validateQuote, quoteMessage, whatsappUrl } from './quote.js?v=20261015-fleet';

const copy = {
  "es": {
    "pageTitle": "Pro Carga — Transporte y logística en República Dominicana",
    "description": "Aeropuertos, transporte turístico, Pro Luxury, flete y mudanzas en República Dominicana. Solicita tu cotización con Pro Carga.",
    "scrollExplore": "DESCUBRE PRO CARGA",
    "skip": "Saltar al contenido",
    "homeLabel": "Pro Carga, inicio",
    "navLabel": "Navegación principal",
    "navServices": "Servicios",
    "navExperience": "Cómo cotizar",
    "navContact": "Contacto",
    "navQuote": "Cotizar",
    "menuOpen": "Abrir menú",
    "menuClose": "Cerrar menú",
    "heroEyebrow": "TRANSPORTE & LOGÍSTICA · REPÚBLICA DOMINICANA",
    "heroLine1": "Traslados y logística.",
    "heroLine2": "A tu manera.",
    "heroDescription": "Aeropuertos, turismo, transporte ejecutivo, eventos y soluciones para tu carga en República Dominicana.",
    "heroCta": "Cotizar mi servicio",
    "heroSecondary": "Conocer la flota",
    "heroBase": "SANTO DOMINGO",
    "heroMeta": "PERSONAS · DESTINOS · CARGA",
    "quoteEyebrow": "HABLEMOS DE TU PRÓXIMA RUTA",
    "quoteTitle": "Cotiza tu servicio",
    "quoteLead": "Completa tu ruta, revisa tu solicitud y continúa por WhatsApp.",
    "requiredNote": "* Campos obligatorios",
    "originLabel": "Origen *",
    "originPlaceholder": "Aeropuerto, hotel o dirección",
    "destinationLabel": "Destino *",
    "destinationPlaceholder": "¿A dónde quieres ir?",
    "dateLabel": "Fecha del servicio *",
    "dateHint": "Fecha local en República Dominicana",
    "passengersLabel": "Pasajeros *",
    "passengersPlaceholder": "Ej. 2",
    "detailsSummary": "Añadir horario, equipaje o detalles de la carga",
    "serviceLabel": "Tipo de servicio",
    "serviceEmpty": "Selecciona si lo deseas",
    "serviceAirport": "Traslado de aeropuerto",
    "serviceCorporate": "Corporativo / VIP",
    "serviceChauffeur": "Chofer privado",
    "serviceEvents": "Eventos y bodas",
    "notesLabel": "Detalles del servicio",
    "notesPlaceholder": "Horario, vuelo, equipaje, tipo de carga o paradas",
    "quoteDisclaimer": "Precio, disponibilidad y condiciones sujetos a confirmación por Pro Carga. Esta solicitud no confirma una reserva.",
    "prepareCta": "Revisar solicitud",
    "reviewTitle": "Tu solicitud está preparada",
    "reviewLead": "Revísala antes de continuar. Tú decides cuándo enviarla en WhatsApp.",
    "whatsappCta": "Continuar en WhatsApp",
    "editRequest": "Editar mi ruta",
    "servicesEyebrow": "SOLUCIONES PARA CADA RUTA",
    "servicesLine1": "Un servicio para",
    "servicesLine2": "cada necesidad.",
    "servicesIntro": "Personas, viajes o mercancías. Elige lo que necesitas y te ayudamos a preparar tu solicitud.",
    "airportTitle": "Traslados de aeropuerto",
    "airportDescription": "Del aeropuerto a tu hotel, residencia o próximo destino. Comparte tu vuelo y horario al solicitar la cotización.",
    "airportLink": "Cotizar traslado de aeropuerto",
    "corporateTitle": "Corporativo & VIP",
    "corporateDescription": "Transporte para reuniones, visitas de trabajo y agendas ejecutivas. Cuéntanos los trayectos de tu jornada.",
    "corporateLink": "Cotizar transporte corporativo y VIP",
    "chauffeurTitle": "Chofer privado",
    "chauffeurDescription": "Para un itinerario que sigue tus planes. Consulta recorridos, paradas y tiempos con Pro Carga.",
    "chauffeurLink": "Cotizar chofer privado",
    "eventsTitle": "Eventos & bodas",
    "eventsDescription": "El traslado también forma parte de la ocasión. Consulta la coordinación de rutas para ti y tus invitados.",
    "eventsLink": "Cotizar transporte para eventos y bodas",
    "routeWord": "TU PUNTO DE PARTIDA",
    "destinationsEyebrow": "UNA ISLA. MUCHAS FORMAS DE VIVIRLA.",
    "destinationsLine1": "¿A dónde",
    "destinationsLine2": "te lleva tu plan?",
    "destinationsDescription": "Elige un destino para añadirlo a tu solicitud, o escribe el lugar que tienes en mente.",
    "yourDestination": "Otro destino",
    "destinationsNote": "Cada ruta está sujeta a cotización y disponibilidad.",
    "destinationCta": "Consultar mi ruta",
    "experienceEyebrow": "ASÍ COORDINAMOS TU SERVICIO",
    "experienceLine1": "Cotizar es fácil.",
    "experienceLine2": "Solo tres pasos.",
    "experienceIntro": "Tres pasos para conversar con Pro Carga y organizar tu traslado o envío.",
    "step1Title": "Elige tu servicio",
    "step1Description": "Elige el servicio, origen, destino y fecha. Añade pasajeros o detalles de la carga según corresponda.",
    "step2Title": "Consulta por WhatsApp",
    "step2Description": "Revisa tu mensaje y abre WhatsApp para enviarlo a Pro Carga cuando estés listo.",
    "step3Title": "Confirma los detalles",
    "step3Description": "Acuerda directamente precio, disponibilidad, vehículo y condiciones antes de confirmar el servicio.",
    "faqEyebrow": "RESOLVEMOS TUS DUDAS",
    "faqTitle": "Preguntas frecuentes.",
    "faq1Question": "¿Cómo recibo una cotización?",
    "faq1Answer": "Completa tu ruta, revisa el mensaje preparado y continúa a WhatsApp. Pro Carga deberá confirmar el precio y los detalles directamente contigo.",
    "faq2Question": "¿La solicitud confirma una reserva?",
    "faq2Answer": "No. La web solo prepara una solicitud de cotización. Disponibilidad, vehículo, condiciones y confirmación del servicio se acuerdan directamente con Pro Carga.",
    "faq3Question": "¿También transportan carga y paquetes?",
    "faq3Answer": "Pro Carga ofrece flete, carga y mudanzas. Elige el servicio en el formulario e indica qué necesitas mover, su tamaño y los puntos de recogida y entrega. La ruta y las condiciones se confirman por WhatsApp.",
    "faq4Question": "¿Qué pasa con los datos del formulario?",
    "faq4Answer": "Primero revisas tu mensaje. La solicitud llega a Pro Carga cuando la envías en WhatsApp.",
    "contactEyebrow": "PRO CARGA · SANTO DOMINGO",
    "contactLine1": "Tu próxima ruta",
    "contactLine2": "comienza aquí.",
    "contactCta": "Conversemos por WhatsApp",
    "footerLocation": "República Dominicana",
    "backToTop": "Volver arriba ↑",
    "brandDescriptor": "TRANSPORTE & LOGÍSTICA",
    "brandPromise": "Tu necesidad. Nuestro compromiso.",
    "serviceTourism": "Transporte turístico",
    "serviceCargo": "Flete, carga y mudanzas",
    "serviceCta": "Solicitar cotización",
    "tourismTitle": "Transporte turístico",
    "tourismDescription": "Recorridos y traslados para descubrir República Dominicana, en pareja, en familia o en grupo. Cuéntanos tu destino.",
    "tourismLink": "Cotizar transporte turístico",
    "cargoTitle": "Flete, carga y mudanzas",
    "cargoDescription": "Traslado de mercancías, bultos y mudanzas. Consulta tu ruta e indica el volumen y las características de la carga.",
    "cargoLink": "Cotizar flete, carga o mudanza",
    "luxuryEyebrow": "PRO LUXURY · UNA EXPERIENCIA DIFERENTE",
    "luxuryLine1": "El detalle",
    "luxuryLine2": "hace el viaje.",
    "luxuryIntro": "Chevrolet Suburban y Cadillac para tus traslados ejecutivos, chofer privado y ocasiones especiales. El viaje empieza desde que subes.",
    "luxuryFeature1": "Corporativo & VIP",
    "luxuryFeature2": "Chofer privado",
    "luxuryFeature3": "Eventos y bodas",
    "luxuryCta": "Descubrir la flota",
    "luxuryImageLabel": "El viaje también cuenta.",
    "hotelAlt": "Vehículo frente a un hotel",
    "routeAlt": "Trayecto urbano junto al mar",
    "floatingLabel": "Preparar una cotización con Pro Carga",
    "floatingText": "Cotiza tu servicio",
    "errors": {
      "location": "Escribe un lugar (hasta 120 caracteres).",
      "same": "El destino debe ser diferente del origen.",
      "date": "Elige hoy o una fecha futura válida.",
      "passengers": "Indica un número entero de pasajeros, mínimo 1.",
      "service": "Elige un servicio de la lista.",
      "notes": "Usa hasta 1200 caracteres.",
      "vehicle": "Elige un vehículo de la lista."
    },
    "navLuxury": "Pro Luxury",
    "shortcutsLabel": "Elige un servicio para cotizar",
    "shortcutAirport": "Aeropuerto",
    "shortcutTourism": "Turismo",
    "shortcutCorporate": "Corporativo / VIP",
    "shortcutEvents": "Eventos y bodas",
    "shortcutCargo": "Carga y mudanzas",
    "quoteFlowRoute": "Tu ruta",
    "quoteFlowReview": "Revisa tu solicitud",
    "quoteFlowSend": "Conversa por WhatsApp",
    "interiorAlt": "Interior de la Suburban visto desde atrás hacia adelante, con el techo panorámico descubierto",
    "destinationGroupLabel": "Destinos que puedes consultar",
    "faq5Question": "¿Qué datos incluyo para un traslado de aeropuerto?",
    "faq5Answer": "Comparte el aeropuerto, tu destino, fecha y número de pasajeros. En los detalles puedes añadir el número de vuelo, horario y equipaje para que Pro Carga prepare la cotización.",
    "faq6Question": "¿Puedo consultar otro destino?",
    "faq6Answer": "Sí. Escribe cualquier destino en el formulario aunque no aparezca entre las sugerencias. Pro Carga confirmará la ruta, disponibilidad y condiciones directamente contigo.",
    "navFleet": "La flota",
    "panoramaOpen": "Ampliar interior panorámico de la Suburban",
    "panoramaCaption": "El cielo también viaja contigo.",
    "fleetEyebrow": "CONOCE TU PRÓXIMO TRASLADO",
    "fleetLine1": "Elige cómo",
    "fleetLine2": "quieres viajar.",
    "fleetIntro": "Un viaje en familia, una llegada especial o todo el grupo junto. Explora los vehículos y encuentra tu opción.",
    "galleryViews": "Vistas del vehículo",
    "viewExterior": "Exterior",
    "viewInterior": "Interior",
    "suburbanOpen": "Ampliar foto de la Chevrolet Suburban",
    "suburbanAlt": "Chevrolet Suburban negra, vista exterior frontal",
    "suburbanDescription": "Un espacio para disfrutar el trayecto, con interior de cuero y techo panorámico. Para aeropuertos, agendas ejecutivas y ocasiones especiales.",
    "suburbanCta": "Cotizar esta Suburban",
    "toyotaFrontOpen": "Ampliar vista frontal del minibús Toyota",
    "toyotaSideOpen": "Ampliar vista lateral del minibús Toyota",
    "toyotaFrontAlt": "Minibús Toyota blanco, vista frontal",
    "toyotaSideAlt": "Minibús Toyota blanco, vista lateral con la puerta abierta",
    "toyotaInteriorAngleAlt": "Interior del minibús Toyota, vista lateral de los asientos y el pasillo",
    "toyotaInteriorRowsAlt": "Interior del minibús Toyota, filas de asientos vistas desde adelante",
    "toyotaCapacity": "19 pasajeros",
    "groupTravel": "VIAJES EN GRUPO",
    "toyotaTitle": "Minibús Toyota",
    "toyotaDescription": "El plan se disfruta más cuando van todos juntos. Una opción de 19 pasajeros para turismo, traslados de aeropuerto y eventos.",
    "toyotaCta": "Cotizar para mi grupo",
    "cadillacTitle": "Una llegada con carácter.",
    "cadillacDescription": "Descubre también las opciones Cadillac para tus traslados ejecutivos y ocasiones especiales.",
    "cadillacCta": "Consultar Cadillac",
    "fleetNote": "Cuéntanos tu ruta, pasajeros y equipaje. Confirmamos contigo el vehículo y la disponibilidad al cotizar.",
    "filmEyebrow": "UNA MIRADA MÁS DE CERCA",
    "filmTitle": "La experiencia, en movimiento.",
    "filmIntro": "Dale play y conoce los detalles de la Suburban.",
    "cabinVideo": "Video del interior y techo panorámico de la Suburban, sin audio",
    "arrivalVideo": "Video de la Suburban en la entrada de un hotel, sin audio",
    "walkaroundVideo": "Video del exterior de la Suburban junto al mar, sin audio",
    "videoFallback": "Tu navegador no admite este video.",
    "cabinFilm": "El interior y su techo panorámico",
    "arrivalFilm": "Lista para tu próxima llegada",
    "walkaroundFilm": "Una vista desde afuera",
    "photoDialog": "Foto del vehículo",
    "photoDetail": "Conoce cada detalle",
    "closePhoto": "Cerrar",
    "vehicleLabel": "Vehículo de preferencia",
    "vehicleEmpty": "Ayúdenme a elegir",
    "toyotaOption": "Minibús Toyota · 19 pasajeros",
    "photoOpen": "Ampliar foto del vehículo"
  },
  "en": {
    "pageTitle": "Pro Carga — Transportation and logistics in the Dominican Republic",
    "description": "Airport transfers, tourism transportation, Pro Luxury, freight and moving in the Dominican Republic. Request a quote from Pro Carga.",
    "scrollExplore": "DISCOVER PRO CARGA",
    "skip": "Skip to content",
    "homeLabel": "Pro Carga, home",
    "navLabel": "Main navigation",
    "navServices": "Services",
    "navExperience": "How to get a quote",
    "navContact": "Contact",
    "navQuote": "Get a quote",
    "menuOpen": "Open menu",
    "menuClose": "Close menu",
    "heroEyebrow": "TRANSPORT & LOGISTICS · DOMINICAN REPUBLIC",
    "heroLine1": "Transfers and logistics.",
    "heroLine2": "Your way.",
    "heroDescription": "Airport transfers, tourism, executive transport, events and cargo services in the Dominican Republic.",
    "heroCta": "Get a quote",
    "heroSecondary": "Explore the fleet",
    "heroBase": "SANTO DOMINGO",
    "heroMeta": "PEOPLE · DESTINATIONS · CARGO",
    "quoteEyebrow": "LET’S PLAN YOUR NEXT ROUTE",
    "quoteTitle": "Request a quote",
    "quoteLead": "Enter your route, review your request and continue on WhatsApp.",
    "requiredNote": "* Required fields",
    "originLabel": "Pick-up location *",
    "originPlaceholder": "Airport, hotel or address",
    "destinationLabel": "Destination *",
    "destinationPlaceholder": "Where are you heading?",
    "dateLabel": "Service date *",
    "dateHint": "Local date in the Dominican Republic",
    "passengersLabel": "Passengers *",
    "passengersPlaceholder": "E.g. 2",
    "detailsSummary": "Add timing, luggage or cargo details",
    "serviceLabel": "Service type",
    "serviceEmpty": "Select if you wish",
    "serviceAirport": "Airport transfer",
    "serviceCorporate": "Corporate / VIP",
    "serviceChauffeur": "Private chauffeur",
    "serviceEvents": "Events and weddings",
    "notesLabel": "Service details",
    "notesPlaceholder": "Time, flight, luggage, cargo type or stops",
    "quoteDisclaimer": "Price, availability and terms are subject to confirmation by Pro Carga. This request does not confirm a booking.",
    "prepareCta": "Review request",
    "reviewTitle": "Your request is ready",
    "reviewLead": "Review it before continuing. You decide when to send it in WhatsApp.",
    "whatsappCta": "Continue to WhatsApp",
    "editRequest": "Edit my route",
    "servicesEyebrow": "SOLUTIONS FOR EVERY ROUTE",
    "servicesLine1": "A service for",
    "servicesLine2": "every need.",
    "servicesIntro": "People, journeys or goods. Choose what you need and we help you prepare your request.",
    "airportTitle": "Airport transfers",
    "airportDescription": "From the airport to your hotel, residence or next destination. Include your flight and arrival time with your quote request.",
    "airportLink": "Request an airport transfer quote",
    "corporateTitle": "Corporate & VIP",
    "corporateDescription": "Transportation for meetings, business visits and executive schedules. Tell us about the trips planned for your day.",
    "corporateLink": "Request a corporate or VIP quote",
    "chauffeurTitle": "Private chauffeur",
    "chauffeurDescription": "For an itinerary that follows your plans. Discuss routes, stops and timing with Pro Carga.",
    "chauffeurLink": "Request a private chauffeur quote",
    "eventsTitle": "Events & weddings",
    "eventsDescription": "The journey is part of the occasion. Discuss transportation routes for you and your guests.",
    "eventsLink": "Request an events or weddings quote",
    "routeWord": "YOUR STARTING POINT",
    "destinationsEyebrow": "ONE ISLAND. SO MANY WAYS TO EXPERIENCE IT.",
    "destinationsLine1": "Where will",
    "destinationsLine2": "your plans take you?",
    "destinationsDescription": "Choose a destination to add it to your request, or enter the place you have in mind.",
    "yourDestination": "Another destination",
    "destinationsNote": "Each route is subject to a quote and availability.",
    "destinationCta": "Discuss my route",
    "experienceEyebrow": "HOW TO PLAN YOUR SERVICE",
    "experienceLine1": "Getting a quote is easy.",
    "experienceLine2": "Just three steps.",
    "experienceIntro": "Three steps to talk with Pro Carga and organize your transfer or delivery.",
    "step1Title": "Choose your service",
    "step1Description": "Choose your service, pick-up, destination and date. Add passengers or cargo details as appropriate.",
    "step2Title": "Discuss it on WhatsApp",
    "step2Description": "Review your message and open WhatsApp to send it to Pro Carga when you are ready.",
    "step3Title": "Confirm the details",
    "step3Description": "Agree on the price, availability, vehicle and terms directly before confirming your service.",
    "faqEyebrow": "YOUR QUESTIONS, ANSWERED",
    "faqTitle": "Frequently asked questions.",
    "faq1Question": "How do I get a quote?",
    "faq1Answer": "Enter your route, review the prepared message and continue to WhatsApp. Pro Carga will need to confirm the price and details directly with you.",
    "faq2Question": "Does the request confirm a booking?",
    "faq2Answer": "No. The website only prepares a quote request. Availability, vehicle, terms and service confirmation are agreed directly with Pro Carga.",
    "faq3Question": "Do you also transport cargo and parcels?",
    "faq3Answer": "Pro Carga offers freight, cargo and moving. Select your service and describe what you need to move, its size and the pick-up and delivery points. The route and terms are confirmed on WhatsApp.",
    "faq4Question": "What happens to my form data?",
    "faq4Answer": "You review your message first. Pro Carga receives your request when you send it in WhatsApp.",
    "contactEyebrow": "PRO CARGA · SANTO DOMINGO",
    "contactLine1": "Your next route",
    "contactLine2": "starts here.",
    "contactCta": "Let’s talk on WhatsApp",
    "footerLocation": "Dominican Republic",
    "backToTop": "Back to top ↑",
    "brandDescriptor": "TRANSPORT & LOGISTICS",
    "brandPromise": "Your needs. Our commitment.",
    "serviceTourism": "Tourism transportation",
    "serviceCargo": "Freight, cargo and moving",
    "serviceCta": "Request a quote",
    "tourismTitle": "Tourism transportation",
    "tourismDescription": "Trips and transfers to explore the Dominican Republic as a couple, family or group. Tell us about your destination.",
    "tourismLink": "Request a tourism transportation quote",
    "cargoTitle": "Freight, cargo & moving",
    "cargoDescription": "Transport for goods, packages and moving. Share your route, cargo volume and handling needs.",
    "cargoLink": "Request a freight or moving quote",
    "luxuryEyebrow": "PRO LUXURY · A DIFFERENT EXPERIENCE",
    "luxuryLine1": "The details",
    "luxuryLine2": "make the journey.",
    "luxuryIntro": "Chevrolet Suburban and Cadillac for executive transfers, a private chauffeur and special occasions. The experience begins as soon as you step inside.",
    "luxuryFeature1": "Corporate & VIP",
    "luxuryFeature2": "Private chauffeur",
    "luxuryFeature3": "Events & weddings",
    "luxuryCta": "Discover the fleet",
    "luxuryImageLabel": "The journey matters, too.",
    "hotelAlt": "Vehicle outside a hotel",
    "routeAlt": "A coastal city route",
    "floatingLabel": "Prepare a quote request with Pro Carga",
    "floatingText": "Request a quote",
    "errors": {
      "location": "Enter a location (up to 120 characters).",
      "same": "The destination must differ from the pick-up.",
      "date": "Choose today or a valid future date.",
      "passengers": "Enter a whole number of passengers, at least 1.",
      "service": "Choose a service from the list.",
      "notes": "Use up to 1200 characters.",
      "vehicle": "Choose a vehicle from the list."
    },
    "navLuxury": "Pro Luxury",
    "shortcutsLabel": "Choose a service to request a quote",
    "shortcutAirport": "Airport",
    "shortcutTourism": "Tourism",
    "shortcutCorporate": "Corporate / VIP",
    "shortcutEvents": "Events and weddings",
    "shortcutCargo": "Cargo and moving",
    "quoteFlowRoute": "Your route",
    "quoteFlowReview": "Review your request",
    "quoteFlowSend": "Talk on WhatsApp",
    "interiorAlt": "Suburban interior viewed from back to front, with the panoramic roof uncovered",
    "destinationGroupLabel": "Destinations you can ask about",
    "faq5Question": "What details should I include for an airport transfer?",
    "faq5Answer": "Share the airport, destination, date and number of passengers. You can add your flight number, timing and luggage in the details so Pro Carga can prepare a quote.",
    "faq6Question": "Can I ask about another destination?",
    "faq6Answer": "Yes. Enter any destination in the form, even if it is not listed in the suggestions. Pro Carga will confirm the route, availability and terms directly with you.",
    "navFleet": "Our fleet",
    "panoramaOpen": "Enlarge the Suburban panoramic interior",
    "panoramaCaption": "Take a little sky along for the ride.",
    "fleetEyebrow": "MEET YOUR NEXT RIDE",
    "fleetLine1": "Choose how",
    "fleetLine2": "you want to travel.",
    "fleetIntro": "A family trip, a special arrival or the whole group together. Explore the vehicles and find your fit.",
    "galleryViews": "Vehicle views",
    "viewExterior": "Exterior",
    "viewInterior": "Interior",
    "suburbanOpen": "Enlarge the Chevrolet Suburban photo",
    "suburbanAlt": "Black Chevrolet Suburban, front exterior view",
    "suburbanDescription": "Room to enjoy the journey, with a leather interior and panoramic roof. For airports, executive schedules and special occasions.",
    "suburbanCta": "Request this Suburban",
    "toyotaFrontOpen": "Enlarge the Toyota minibus front view",
    "toyotaSideOpen": "Enlarge the Toyota minibus side view",
    "toyotaFrontAlt": "White Toyota minibus, front view",
    "toyotaSideAlt": "White Toyota minibus, side view with the door open",
    "toyotaInteriorAngleAlt": "Toyota minibus interior, side view of the seats and aisle",
    "toyotaInteriorRowsAlt": "Toyota minibus interior, seat rows viewed from the front",
    "toyotaCapacity": "19 passengers",
    "groupTravel": "GROUP TRAVEL",
    "toyotaTitle": "Toyota minibus",
    "toyotaDescription": "Enjoy the plan with everyone together. A 19-passenger option for tourism, airport transfers and events.",
    "toyotaCta": "Request a group quote",
    "cadillacTitle": "Make an entrance.",
    "cadillacDescription": "Explore the Cadillac options for your executive transfers and special occasions.",
    "cadillacCta": "Ask about Cadillac",
    "fleetNote": "Tell us your route, passenger count and luggage. We confirm your vehicle and availability when preparing your quote.",
    "filmEyebrow": "TAKE A CLOSER LOOK",
    "filmTitle": "The experience, in motion.",
    "filmIntro": "Press play to explore the Suburban in more detail.",
    "cabinVideo": "Silent video of the Suburban interior and panoramic roof",
    "arrivalVideo": "Silent video of the Suburban at a hotel entrance",
    "walkaroundVideo": "Silent video of the Suburban exterior by the sea",
    "videoFallback": "Your browser does not support this video.",
    "cabinFilm": "Inside, under the panoramic roof",
    "arrivalFilm": "Ready for your next arrival",
    "walkaroundFilm": "A closer look outside",
    "photoDialog": "Vehicle photo",
    "photoDetail": "Explore every detail",
    "closePhoto": "Close",
    "vehicleLabel": "Preferred vehicle",
    "vehicleEmpty": "Help me choose",
    "toyotaOption": "Toyota minibus · 19 passengers",
    "photoOpen": "Enlarge vehicle photo"
  }
};

const galleryMedia = {
  suburban: {
    exterior: [['suburban-front', 'suburbanAlt', 960, 480]],
    interior: [['suburban-panorama', 'interiorAlt', 1069, 640]],
  },
  toyota: {
    exterior: [['toyota-hiace-front', 'toyotaFrontAlt'], ['toyota-hiace-side', 'toyotaSideAlt']],
    interior: [['toyota-hiace-interior-angle', 'toyotaInteriorAngleAlt'], ['toyota-hiace-interior-rows', 'toyotaInteriorRowsAlt']],
  },
};

function renderGallery(gallery, view = gallery.dataset.view || 'exterior') {
  gallery.dataset.view = view;
  const photos = galleryMedia[gallery.dataset.fleetGallery][view];
  gallery.querySelectorAll('.fleet-photo').forEach((button, index) => {
    const [file, alt, width = 1170, smallWidth = 640] = photos[index];
    const img = button.querySelector('img');
    img.src = `./assets/fleet/${file}.webp`;
    img.srcset = `./assets/fleet/${file}-640.webp ${smallWidth}w, ./assets/fleet/${file}.webp ${width}w`;
    img.sizes = gallery.dataset.fleetGallery === 'toyota' ? '(max-width: 600px) calc((100vw - 43px)/2), (max-width: 850px) 25vw, 320px' : '(max-width: 600px) calc(100vw - 40px), (max-width: 850px) 50vw, 640px';
    img.dataset.i18nAlt = alt;
    img.alt = copy[language][alt];
    button.classList.toggle('suburban-photo', file === 'suburban-front');
    button.classList.toggle('gallery-cabin', file === 'suburban-panorama');
    button.removeAttribute('data-i18n-aria');
    button.setAttribute('aria-label', `${copy[language].photoOpen}: ${img.alt}`);
  });
  gallery.querySelectorAll('[data-gallery-view]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.galleryView === view));
    const label = copy[language][button.dataset.galleryView === 'interior' ? 'viewInterior' : 'viewExterior'];
    button.textContent = gallery.dataset.fleetGallery === 'toyota' ? `${label} · 2` : label;
  });
}

function refreshGalleryLanguage() {
  document.querySelectorAll('[data-fleet-gallery]').forEach(gallery => renderGallery(gallery));
  const dialog = document.querySelector('#media-dialog');
  if (dialog.open && dialog.dataset.altKey) {
    const caption = copy[language][dialog.dataset.altKey];
    document.querySelector('#media-full-image').alt = caption;
    document.querySelector('#media-caption').textContent = caption;
  }
}

const form = document.querySelector('#quote-form');
function updateServiceFields() {
  const delivery = document.querySelector('#service').value === 'cargo';
  const passengers = document.querySelector('#passengers');
  passengers.closest('.field').hidden = delivery;
  passengers.required = !delivery;
  const vehicle = document.querySelector('#vehicle');
  vehicle.closest('.field').hidden = delivery;
  vehicle.disabled = delivery;
  if (delivery) delete errors.vehicle;
  document.querySelector('.form-grid').classList.toggle('is-delivery', delivery);
  if (delivery) delete errors.passengers;
}
document.querySelector('#service').addEventListener('change', () => { updateServiceFields(); showErrors(); });
const review = document.querySelector('#request-review');
const navigation = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'es';
let errors = {};
let preparedQuote = null;

function showErrors() {
  for (const id of ['origin', 'destination', 'date', 'passengers', 'service', 'vehicle', 'notes']) {
    document.querySelector(`#${id}-error`).textContent = errors[id] ? copy[language].errors[errors[id]] : '';
    const input = document.getElementById(id);
    if (errors[id]) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
}

function updateReview() {
  if (!preparedQuote) return;
  const message = quoteMessage(preparedQuote, language);
  document.querySelector('#request-message').textContent = message;
  document.querySelector('#request-whatsapp').href = whatsappUrl(message);
}

function setLanguage(next) {
  language = next === 'en' ? 'en' : 'es';
  const texts = copy[language];
  document.documentElement.lang = language;
  document.title = texts.pageTitle;
  document.querySelector('meta[name=description]').content = texts.description;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = texts[element.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { element.placeholder = texts[element.dataset.i18nPlaceholder]; });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label', texts[element.dataset.i18nAria]); });
  document.querySelectorAll('[data-i18n-alt]').forEach(element => { element.alt = texts[element.dataset.i18nAlt]; });
  document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === language)); });
  document.querySelectorAll('[data-whatsapp-contact]').forEach(link => { link.href = contactUrl(language); });
  menu.setAttribute('aria-label', texts[menu.getAttribute('aria-expanded') === 'true' ? 'menuClose' : 'menuOpen']);
  updateServiceFields();
  refreshGalleryLanguage();
  showErrors();
  updateReview();
  const url = new URL(location.href);
  if (language === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
  history.replaceState(null, '', url);
}

function closeMenu() {
  navigation.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', copy[language].menuOpen);
}

document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', copy[language][open ? 'menuClose' : 'menuOpen']);
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
navigation.querySelectorAll('a').forEach(link => { link.addEventListener('click', closeMenu); });
window.matchMedia('(min-width: 1101px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelectorAll('[data-destination]').forEach(link => {
  link.addEventListener('click', () => {
    form.hidden = false;
    review.hidden = true;
    preparedQuote = null;
    const destination = document.querySelector('#destination');
    if (link.dataset.destination) destination.value = link.dataset.destination;
    delete errors.destination;
    showErrors();
    destination.focus({ preventScroll: true });
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    form.hidden = false;
    review.hidden = true;
    preparedQuote = null;
    document.querySelector('#service').value = link.dataset.service;
    updateServiceFields();
    showErrors();
    if (link.dataset.vehicle) document.querySelector('#vehicle').value = link.dataset.vehicle;
    delete errors.vehicle;
    document.querySelector('.trip-details').open = true;
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const today = localDateString();
  document.querySelector('#date').min = today;
  const result = validateQuote(Object.fromEntries(new FormData(form)), today);
  errors = result.errors;
  showErrors();
  if (!result.valid) {
    document.getElementById(Object.keys(errors)[0]).focus();
    return;
  }
  preparedQuote = result.quote;
  updateReview();
  form.hidden = true;
  review.hidden = false;
  review.focus();
});
form.addEventListener('input', event => {
  delete errors[event.target.id];
  if (event.target.id === 'origin') delete errors.destination;
  showErrors();
});
document.querySelector('#edit-request').addEventListener('click', () => {
  review.hidden = true;
  form.hidden = false;
  preparedQuote = null;
  document.querySelector('#origin').focus();
});
document.querySelector('#date').min = localDateString();
document.querySelector('#year').textContent = String(new Date().getFullYear());
setLanguage(language);

const header = document.querySelector(".site-header");
function updateHeader(){ header.classList.toggle("is-scrolled",window.scrollY>70); }
window.addEventListener("scroll",updateHeader,{passive:true});
updateHeader();

document.querySelectorAll('[data-fleet-gallery]').forEach(gallery => {
  gallery.querySelectorAll('[data-gallery-view]').forEach(button => {
    button.addEventListener('click', () => renderGallery(gallery, button.dataset.galleryView));
  });
});

const mediaDialog = document.querySelector('#media-dialog');
let activePhoto;
document.querySelectorAll('.fleet-photo').forEach(button => {
  button.addEventListener('click', () => {
    activePhoto = button;
    const photo = button.querySelector('img');
    const full = document.querySelector('#media-full-image');
    full.src = photo.src;
    full.alt = photo.alt;
    mediaDialog.dataset.altKey = photo.dataset.i18nAlt;
    document.querySelector('#media-caption').textContent = photo.alt;
    mediaDialog.showModal();
    document.body.classList.add('photo-open');
  });
});
document.querySelector('#media-close').addEventListener('click', () => mediaDialog.close());
mediaDialog.addEventListener('click', event => { if (event.target === mediaDialog) mediaDialog.close(); });
mediaDialog.addEventListener('close', () => {
  document.body.classList.remove('photo-open');
  activePhoto?.focus({ preventScroll: true });
});

const films = document.querySelectorAll('.film-card video');
films.forEach(film => {
  film.addEventListener('play', () => films.forEach(other => { if (other !== film) other.pause(); }));
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) films.forEach(film => film.pause());
});
