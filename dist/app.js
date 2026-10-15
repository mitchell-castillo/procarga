import { mountCarousels } from './carousel.js?v=20261015-swipe';
import { contactUrl, localDateString, validateQuote, quoteMessage, whatsappUrl } from './quote.js?v=20261015-swipe';

const copy = {
  "es": {
    "pageTitle": "Pro Carga — Transporte y logística en República Dominicana",
    "description": "Aeropuertos, transporte turístico, Pro Luxury, flete y mudanzas en República Dominicana. Solicita tu cotización con Pro Carga.",
    "scrollExplore": "DESCUBRE PRO CARGA",
    "skip": "Saltar al contenido",
    "homeLabel": "Pro Carga, inicio",
    "navLabel": "Navegación principal",
    "navServices": "Servicios",
    "navExperience": "Cómo funciona",
    "navContact": "Contacto",
    "navQuote": "Cotizar",
    "menuOpen": "Abrir menú",
    "menuClose": "Cerrar menú",
    "heroEyebrow": "TRANSPORTE & LOGÍSTICA · REPÚBLICA DOMINICANA",
    "heroLine1": "Tú haces los planes.",
    "heroLine2": "Nosotros te llevamos.",
    "heroDescription": "Del aeropuerto al hotel, de reunión en reunión o de paseo por la isla. Traslados privados para viajar a tu ritmo en República Dominicana.",
    "heroCta": "Planear mi traslado",
    "heroSecondary": "Explorar servicios",
    "heroBase": "SANTO DOMINGO",
    "heroMeta": "TRASLADOS PRIVADOS · VIAJES EN GRUPO",
    "quoteEyebrow": "TU PRÓXIMO VIAJE EMPIEZA AQUÍ",
    "quoteTitle": "Cuéntanos tu ruta.",
    "quoteLead": "Indica dónde empieza tu viaje. Los detalles los coordinamos contigo por WhatsApp.",
    "requiredNote": "* Campos obligatorios",
    "originLabel": "Origen *",
    "originPlaceholder": "Aeropuerto, hotel o dirección",
    "destinationLabel": "Destino *",
    "destinationPlaceholder": "¿A dónde quieres ir?",
    "dateLabel": "Fecha del servicio *",
    "dateHint": "Fecha local en República Dominicana",
    "passengersLabel": "Pasajeros *",
    "passengersPlaceholder": "Ej. 2",
    "detailsSummary": "Añadir vuelo, horario, equipaje o preferencias",
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
    "servicesEyebrow": "¿QUÉ TIENES EN MENTE?",
    "servicesLine1": "Cada plan merece",
    "servicesLine2": "un buen comienzo.",
    "servicesIntro": "Una llegada, una escapada o un día de trabajo. Encuentra el servicio para ese momento.",
    "airportTitle": "Del vuelo a tu destino.",
    "airportDescription": "Aterriza y continúa tu viaje. Coordinamos el traslado entre el aeropuerto y tu hotel, residencia o próximo destino.",
    "airportLink": "Cotizar traslado de aeropuerto",
    "corporateTitle": "Tu agenda sigue en marcha.",
    "corporateDescription": "Reuniones, visitas de trabajo y compromisos. Comparte tus horarios y trayectos para organizar el transporte de tu jornada.",
    "corporateLink": "Cotizar transporte corporativo y VIP",
    "chauffeurTitle": "Chofer privado",
    "chauffeurDescription": "Para un itinerario que sigue tus planes. Consulta recorridos, paradas y tiempos con Pro Carga.",
    "chauffeurLink": "Cotizar chofer privado",
    "eventsTitle": "Llegar también es celebrar.",
    "eventsDescription": "Bodas, eventos y ocasiones para compartir. Organicemos los traslados de tus invitados como parte del gran día.",
    "eventsLink": "Cotizar transporte para eventos y bodas",
    "routeWord": "TU PUNTO DE PARTIDA",
    "destinationsEyebrow": "UNA ISLA. MUCHAS FORMAS DE VIVIRLA.",
    "destinationsLine1": "¿A dónde",
    "destinationsLine2": "te lleva tu plan?",
    "destinationsDescription": "¿Playa, ciudad o una escapada? Elige tu destino y empecemos a organizar cómo llegar.",
    "yourDestination": "Otro destino",
    "destinationsNote": "Cada ruta está sujeta a cotización y disponibilidad.",
    "destinationCta": "Consultar mi ruta",
    "experienceEyebrow": "LO COORDINAMOS CONTIGO",
    "experienceLine1": "De tu idea",
    "experienceLine2": "a tu próxima ruta.",
    "experienceIntro": "Un primer mensaje para ponernos de acuerdo y preparar tu servicio.",
    "step1Title": "Cuéntanos tu plan",
    "step1Description": "Comparte tu ruta, fecha y cuántas personas viajan. Añade horarios o equipaje si ya los tienes claros.",
    "step2Title": "Conversemos los detalles",
    "step2Description": "Revisa tu solicitud y envíala por WhatsApp. Allí acordamos contigo las opciones para tu traslado.",
    "step3Title": "Confirma tu servicio",
    "step3Description": "Antes de viajar, confirma directamente precio, vehículo, horarios y condiciones con Pro Carga.",
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
    "serviceCta": "Coordinar este servicio",
    "tourismTitle": "La isla, a tu ritmo.",
    "tourismDescription": "Una escapada a Samaná, un día en Boca Chica o un recorrido entre ciudades. Tú eliges el plan; conversemos sobre la ruta.",
    "tourismLink": "Cotizar transporte turístico",
    "cargoTitle": "¿Necesitas mover algo más?",
    "cargoDescription": "También coordinamos flete, carga y mudanzas. Cuéntanos qué necesitas trasladar, su volumen y los puntos de recogida y entrega.",
    "cargoLink": "Cotizar flete, carga o mudanza",
    "luxuryEyebrow": "PRO LUXURY · TRASLADOS CON CHOFER",
    "luxuryLine1": "Tu agenda,",
    "luxuryLine2": "a tu ritmo.",
    "luxuryIntro": "Una reunión, una llegada al hotel o una ocasión especial. Cuéntanos tus horarios y paradas; coordinamos contigo el traslado para que puedas dedicarte a tus planes.",
    "luxuryFeature1": "Corporativo & VIP",
    "luxuryFeature2": "Chofer privado",
    "luxuryFeature3": "Eventos y bodas",
    "luxuryCta": "Coordinar mi traslado",
    "luxuryImageLabel": "El viaje también cuenta.",
    "hotelAlt": "Vehículo frente a un hotel",
    "routeAlt": "Trayecto urbano junto al mar",
    "floatingLabel": "Preparar una cotización con Pro Carga",
    "floatingText": "Planea tu traslado",
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
    "panoramaOpen": "Ver el ambiente de Pro Luxury",
    "panoramaCaption": "El camino también se disfruta.",
    "suburbanAlt": "Chevrolet Suburban negra, vista exterior frontal",
    "toyotaFrontAlt": "Minibús Toyota blanco, vista frontal",
    "toyotaSideAlt": "Minibús Toyota blanco, vista lateral con la puerta abierta",
    "toyotaInteriorAngleAlt": "Interior del minibús Toyota, vista lateral de los asientos y el pasillo",
    "toyotaInteriorRowsAlt": "Interior del minibús Toyota, filas de asientos vistas desde adelante",
    "filmTitle": "Así se vive tu traslado.",
    "cabinVideo": "Video del interior y techo panorámico de la Suburban, sin audio",
    "arrivalVideo": "Video de la Suburban en la entrada de un hotel, sin audio",
    "walkaroundVideo": "Video del exterior de la Suburban junto al mar, sin audio",
    "videoFallback": "Tu navegador no admite este video.",
    "photoDialog": "Momentos del servicio",
    "photoDetail": "Un vistazo a tu experiencia",
    "closePhoto": "Cerrar",
    "vehicleLabel": "¿Tienes preferencia de vehículo? (opcional)",
    "vehicleEmpty": "Prefiero que me orienten",
    "toyotaOption": "Minibús Toyota · 19 pasajeros",
    "navDestinations": "Destinos",
    "luxuryModels": "Opciones Chevrolet Suburban y Cadillac. Consulta disponibilidad al coordinar tu servicio.",
    "luxuryPoint1": "Un traslado que sigue tu agenda",
    "luxuryPoint1Body": "Comparte los trayectos y horarios que necesitas coordinar.",
    "luxuryPoint2": "Un espacio para disfrutar el camino",
    "luxuryPoint2Body": "Conoce el ambiente a bordo antes de tu próximo viaje.",
    "panoramaEyebrow": "UN MOMENTO PARA TI",
    "watchExperience": "Ver los videos",
    "seeMoments": "Ver más momentos",
    "groupGalleryOpen": "Ver el espacio para tu grupo",
    "groupCaption": "La familia. Los amigos. Todo el grupo.",
    "groupEyebrow": "ESCAPADAS · FAMILIAS · EQUIPOS",
    "groupLine1": "El mejor plan",
    "groupLine2": "es ir juntos.",
    "groupIntro": "Del aeropuerto al hotel, de paseo por la isla o camino a una celebración. Organicemos un traslado para compartir el viaje desde el primer momento.",
    "groupCapacity": "Minibús Toyota · 19 pasajeros",
    "groupCapacityBody": "Cuéntanos la fecha, cuántos viajan y qué equipaje llevan para coordinar el traslado de tu grupo.",
    "groupCta": "Organizar nuestro traslado",
    "groupGalleryCta": "Conoce el espacio para tu grupo",
    "quoteHelp": "¿No sabes qué servicio elegir?",
    "quoteHelpCta": "Te orientamos por WhatsApp ↗",
    "faq7Question": "¿Tengo que elegir un vehículo?",
    "faq7Answer": "No hace falta. Cuéntanos tu ruta, cuántas personas viajan y qué equipaje llevan. Pro Carga te orienta sobre las opciones y confirma contigo el vehículo al cotizar.",
    "previousPhoto": "Foto anterior",
    "nextPhoto": "Siguiente foto",
    "photoChoices": "Fotos de la experiencia",
    "openPhoto": "Ampliar foto",
    "luxuryCarousel": "Momentos de Pro Luxury",
    "groupCarousel": "Espacio para viajar en grupo",
    "carouselRole": "carrusel",
    "videosEyebrow": "MOMENTOS DE PRO LUXURY",
    "videosLine1": "Tu traslado,",
    "videosLine2": "en movimiento.",
    "videosIntro": "Conoce el interior, una llegada al hotel y un recorrido junto al mar. Dale play al momento que quieras ver.",
    "videosMobileHint": "Desliza para descubrir los tres videos",
    "cabinFilm": "Un momento a bordo",
    "arrivalFilm": "Tu llegada al hotel",
    "walkaroundFilm": "En ruta, junto al mar"
  },
  "en": {
    "pageTitle": "Pro Carga — Transportation and logistics in the Dominican Republic",
    "description": "Airport transfers, tourism transportation, Pro Luxury, freight and moving in the Dominican Republic. Request a quote from Pro Carga.",
    "scrollExplore": "DISCOVER PRO CARGA",
    "skip": "Skip to content",
    "homeLabel": "Pro Carga, home",
    "navLabel": "Main navigation",
    "navServices": "Services",
    "navExperience": "How it works",
    "navContact": "Contact",
    "navQuote": "Get a quote",
    "menuOpen": "Open menu",
    "menuClose": "Close menu",
    "heroEyebrow": "TRANSPORT & LOGISTICS · DOMINICAN REPUBLIC",
    "heroLine1": "You make the plans.",
    "heroLine2": "We take you there.",
    "heroDescription": "From the airport to your hotel, between meetings or exploring the island. Private transfers at your own pace in the Dominican Republic.",
    "heroCta": "Plan my transfer",
    "heroSecondary": "Explore services",
    "heroBase": "SANTO DOMINGO",
    "heroMeta": "PRIVATE TRANSFERS · GROUP TRAVEL",
    "quoteEyebrow": "YOUR NEXT JOURNEY STARTS HERE",
    "quoteTitle": "Tell us your route.",
    "quoteLead": "Tell us where your journey starts. We work out the details with you on WhatsApp.",
    "requiredNote": "* Required fields",
    "originLabel": "Pick-up location *",
    "originPlaceholder": "Airport, hotel or address",
    "destinationLabel": "Destination *",
    "destinationPlaceholder": "Where are you heading?",
    "dateLabel": "Service date *",
    "dateHint": "Local date in the Dominican Republic",
    "passengersLabel": "Passengers *",
    "passengersPlaceholder": "E.g. 2",
    "detailsSummary": "Add flight, timing, luggage or preferences",
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
    "servicesEyebrow": "WHAT DO YOU HAVE IN MIND?",
    "servicesLine1": "Every plan deserves",
    "servicesLine2": "a good beginning.",
    "servicesIntro": "An arrival, a getaway or a day of work. Find the service for that moment.",
    "airportTitle": "From your flight to your destination.",
    "airportDescription": "Land and continue your journey. We coordinate transfers between the airport and your hotel, home or next destination.",
    "airportLink": "Request an airport transfer quote",
    "corporateTitle": "Keep your day moving.",
    "corporateDescription": "Meetings, business visits and appointments. Share your schedule and routes to organize transport for your day.",
    "corporateLink": "Request a corporate or VIP quote",
    "chauffeurTitle": "Private chauffeur",
    "chauffeurDescription": "For an itinerary that follows your plans. Discuss routes, stops and timing with Pro Carga.",
    "chauffeurLink": "Request a private chauffeur quote",
    "eventsTitle": "The journey is part of the celebration.",
    "eventsDescription": "Weddings, events and special moments together. Let’s coordinate transport for your guests as part of the big day.",
    "eventsLink": "Request an events or weddings quote",
    "routeWord": "YOUR STARTING POINT",
    "destinationsEyebrow": "ONE ISLAND. SO MANY WAYS TO EXPERIENCE IT.",
    "destinationsLine1": "Where will",
    "destinationsLine2": "your plans take you?",
    "destinationsDescription": "Beach, city or a getaway? Choose a destination and let’s start planning how to get there.",
    "yourDestination": "Another destination",
    "destinationsNote": "Each route is subject to a quote and availability.",
    "destinationCta": "Discuss my route",
    "experienceEyebrow": "WE WORK OUT THE DETAILS TOGETHER",
    "experienceLine1": "From your idea",
    "experienceLine2": "to your next journey.",
    "experienceIntro": "One first message to work out the details and prepare your service.",
    "step1Title": "Tell us your plan",
    "step1Description": "Share your route, date and group size. Add timing or luggage details if you already know them.",
    "step2Title": "Let’s work out the details",
    "step2Description": "Review your request and send it on WhatsApp. We discuss the options for your transfer with you there.",
    "step3Title": "Confirm your service",
    "step3Description": "Before travelling, confirm the price, vehicle, timing and terms directly with Pro Carga.",
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
    "serviceCta": "Plan this service",
    "tourismTitle": "The island, at your pace.",
    "tourismDescription": "A Samaná getaway, a day in Boca Chica or a trip between cities. Choose your plan and let’s talk about your route.",
    "tourismLink": "Request a tourism transportation quote",
    "cargoTitle": "Need to move something else?",
    "cargoDescription": "We also coordinate freight, cargo and moving. Tell us what you need transported, its size and the pick-up and delivery locations.",
    "cargoLink": "Request a freight or moving quote",
    "luxuryEyebrow": "PRO LUXURY · CHAUFFEUR TRANSFERS",
    "luxuryLine1": "Your schedule,",
    "luxuryLine2": "at your pace.",
    "luxuryIntro": "A meeting, a hotel arrival or a special occasion. Share your timing and stops; we coordinate your transfer so you can focus on your plans.",
    "luxuryFeature1": "Corporate & VIP",
    "luxuryFeature2": "Private chauffeur",
    "luxuryFeature3": "Events & weddings",
    "luxuryCta": "Arrange my transfer",
    "luxuryImageLabel": "The journey matters, too.",
    "hotelAlt": "Vehicle outside a hotel",
    "routeAlt": "A coastal city route",
    "floatingLabel": "Prepare a quote request with Pro Carga",
    "floatingText": "Plan your transfer",
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
    "panoramaOpen": "Explore the Pro Luxury experience",
    "panoramaCaption": "Enjoy the journey, too.",
    "suburbanAlt": "Black Chevrolet Suburban, front exterior view",
    "toyotaFrontAlt": "White Toyota minibus, front view",
    "toyotaSideAlt": "White Toyota minibus, side view with the door open",
    "toyotaInteriorAngleAlt": "Toyota minibus interior, side view of the seats and aisle",
    "toyotaInteriorRowsAlt": "Toyota minibus interior, seat rows viewed from the front",
    "filmTitle": "A glimpse of your journey.",
    "cabinVideo": "Silent video of the Suburban interior and panoramic roof",
    "arrivalVideo": "Silent video of the Suburban at a hotel entrance",
    "walkaroundVideo": "Silent video of the Suburban exterior by the sea",
    "videoFallback": "Your browser does not support this video.",
    "photoDialog": "Service moments",
    "photoDetail": "A glimpse of your experience",
    "closePhoto": "Close",
    "vehicleLabel": "Any vehicle preference? (optional)",
    "vehicleEmpty": "I would like your guidance",
    "toyotaOption": "Toyota minibus · 19 passengers",
    "navDestinations": "Destinations",
    "luxuryModels": "Chevrolet Suburban and Cadillac options. Ask about availability when arranging your service.",
    "luxuryPoint1": "A transfer that follows your plans",
    "luxuryPoint1Body": "Share the routes and timing you need to coordinate.",
    "luxuryPoint2": "Room to enjoy the journey",
    "luxuryPoint2Body": "Take a look at the atmosphere on board before your next trip.",
    "panoramaEyebrow": "A MOMENT FOR YOU",
    "watchExperience": "Watch the videos",
    "seeMoments": "See more moments",
    "groupGalleryOpen": "Explore the space for your group",
    "groupCaption": "Family. Friends. Everyone together.",
    "groupEyebrow": "GETAWAYS · FAMILIES · TEAMS",
    "groupLine1": "The best plans",
    "groupLine2": "bring everyone along.",
    "groupIntro": "From the airport to your hotel, around the island or on the way to a celebration. Let’s arrange a transfer to share the journey from the start.",
    "groupCapacity": "Toyota minibus · 19 passengers",
    "groupCapacityBody": "Tell us your travel date, group size and luggage needs so we can arrange your group transfer.",
    "groupCta": "Arrange our group transfer",
    "groupGalleryCta": "Explore the space for your group",
    "quoteHelp": "Not sure which service to choose?",
    "quoteHelpCta": "Ask us on WhatsApp ↗",
    "faq7Question": "Do I need to choose a vehicle?",
    "faq7Answer": "No. Tell us your route, group size and luggage needs. Pro Carga will guide you through the options and confirm your vehicle when preparing the quote.",
    "previousPhoto": "Previous photo",
    "nextPhoto": "Next photo",
    "photoChoices": "Experience photos",
    "openPhoto": "Enlarge photo",
    "luxuryCarousel": "Pro Luxury moments",
    "groupCarousel": "Space for group travel",
    "carouselRole": "carousel",
    "videosEyebrow": "PRO LUXURY MOMENTS",
    "videosLine1": "Your journey,",
    "videosLine2": "in motion.",
    "videosIntro": "Explore the interior, a hotel arrival and a coastal ride. Press play on the moment you would like to see.",
    "videosMobileHint": "Swipe to discover all three videos",
    "cabinFilm": "A moment on board",
    "arrivalFilm": "Your hotel arrival",
    "walkaroundFilm": "On the road, by the sea"
  }
};

const photoCollections = {
  luxury: [['suburban-panorama-clean', 'interiorAlt'], ['suburban-front-framed', 'suburbanAlt']],
  group: [['toyota-hiace-side', 'toyotaSideAlt'], ['toyota-hiace-front', 'toyotaFrontAlt'], ['toyota-hiace-interior-angle', 'toyotaInteriorAngleAlt'], ['toyota-hiace-interior-rows', 'toyotaInteriorRowsAlt']],
};
let activeCollection = 'luxury';
let activePhotoIndex = 0;
let carouselController = null;

function renderPhoto() {
  const photos = photoCollections[activeCollection];
  const [file, key] = photos[activePhotoIndex];
  const full = document.querySelector('#media-full-image');
  full.src = `./assets/fleet/${file}.webp`;
  full.alt = copy[language][key];
  document.querySelector('#media-caption').textContent = full.alt;
  document.querySelector('#media-count').textContent = `${activePhotoIndex + 1} / ${photos.length}`;
  document.querySelectorAll('.media-thumb').forEach((button, index) => {
    button.hidden = index >= photos.length;
    if (button.hidden) return;
    button.setAttribute('aria-pressed', String(index === activePhotoIndex));
    button.setAttribute('aria-label', copy[language][photos[index][1]]);
    button.querySelector('img').src = `./assets/fleet/${photos[index][0]}-640.webp`;
  });
}

function refreshGalleryLanguage() {
  if (document.querySelector('#media-dialog').open) renderPhoto();
  carouselController?.refresh();
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
    if (link.dataset.service === 'cargo') document.querySelector('.trip-details').open = true;
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

const mediaDialog = document.querySelector('#media-dialog');
let activePhotoTrigger;
function releaseDialogLock() {
  if (!mediaDialog.open) document.body.classList.remove('photo-open');
}
document.querySelectorAll('[data-open-gallery]').forEach(button => {
  button.addEventListener('click', () => {
    activePhotoTrigger = button;
    activeCollection = button.dataset.openGallery;
    activePhotoIndex = Number(button.dataset.galleryIndex || 0);
    renderPhoto();
    mediaDialog.showModal();
    document.body.classList.add('photo-open');
  });
});
function movePhoto(step) {
  activePhotoIndex = (activePhotoIndex + step + photoCollections[activeCollection].length) % photoCollections[activeCollection].length;
  renderPhoto();
}
document.querySelector('#media-prev').addEventListener('click', () => movePhoto(-1));
document.querySelector('#media-next').addEventListener('click', () => movePhoto(1));
document.querySelectorAll('.media-thumb').forEach(button => {
  button.addEventListener('click', () => { activePhotoIndex = Number(button.dataset.photoIndex); renderPhoto(); });
});
mediaDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); movePhoto(event.key === 'ArrowLeft' ? -1 : 1); }
});
document.querySelector('#media-close').addEventListener('click', () => mediaDialog.close());
mediaDialog.addEventListener('click', event => { if (event.target === mediaDialog) mediaDialog.close(); });
mediaDialog.addEventListener('close', () => { releaseDialogLock(); activePhotoTrigger?.focus({ preventScroll: true }); });

carouselController = mountCarousels({
  getText: key => copy[language][key],
});

const serviceFilms = document.querySelectorAll('.service-films video');
serviceFilms.forEach(video => {
  video.addEventListener('play', () => {
    serviceFilms.forEach(other => { if (other !== video) other.pause(); });
  });
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) serviceFilms.forEach(video => video.pause());
});
