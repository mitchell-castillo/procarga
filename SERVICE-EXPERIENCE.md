# Pro Carga · Experiencia centrada en el servicio

15 de octubre de 2026 · Revisión posterior a la presentación de flota.

La observación del propietario cambió la jerarquía: el visitante necesita organizar un traslado. Se sustituyó el catálogo de modelos por situaciones de viaje, manteniendo los medios solicitados por el cliente como apoyo a la decisión.

## Criterio y referencias

Se revisaron las páginas oficiales de [Blacklane](https://www.blacklane.com/en/) y la explicación de [Welcome Pickups sobre cómo solicitar un traslado](https://support.welcomepickups.com/en/articles/4698604-how-can-i-book-a-transfer-with-welcome). Ambas presentan el recorrido y la necesidad del pasajero antes de la selección de opciones. La interpretación aplicada aquí es de diseño: guiar por ocasión, ruta y coordinación. No se copiaron textos, imágenes, precios, reseñas, garantías, seguimiento de vuelos ni otras prestaciones de esas empresas.

## Resultado

- Portada: «Tú haces los planes. Nosotros te llevamos.». La acción principal prepara un traslado; la secundaria explora servicios.
- Navegación hacia servicios, Pro Luxury, destinos, proceso y contacto. Eliminada la entrada de catálogo de flota; el ancla antigua `#flota` sigue llegando al contenido grupal.
- Servicios explicados como momentos: continuar tras un vuelo, recorrer la isla, organizar la agenda de trabajo y llegar a una celebración. Carga y mudanzas tienen una franja de menor peso visual.
- Formulario centrado en ruta, fecha y pasajeros. La preferencia de modelo queda dentro de los detalles opcionales; seleccionar un servicio de pasajeros no fuerza su apertura. Carga sí abre los detalles para describir lo que se transporta.
- Pro Luxury explica la coordinación de agenda y la experiencia a bordo. Suburban y Cadillac se mencionan como opciones del servicio, sin tarjetas de compra o botones para cotizar un automóvil individual.
- «El mejor plan es ir juntos» presenta el traslado grupal. El Toyota de 19 pasajeros es un dato de apoyo a la ocasión, y el botón organiza un servicio turístico.
- Fotografías completas disponibles en galerías opcionales: dos momentos de Pro Luxury y cuatro fotos del Toyota (dos exteriores, dos interiores). Controles por miniaturas, flechas, teclado y Escape.
- Los tres clips se conservan en un diálogo accesible de momentos del servicio: «A bordo», «Tu llegada» y «En ruta». No se solicita video al cargar la portada; al abrir la experiencia se solicitan metadatos y el visitante controla la reproducción. Cerrar pausa el video.
- FAQ nueva que explica que Pro Carga puede orientar al visitante sin que este elija primero un vehículo.
- Identidad, idioma ES/EN, contacto, destinos y lectura móvil conservados.

## Verificación

9 pruebas unitarias de cotización; comprobaciones de navegador del flujo ES/EN, cargo, selección de servicios, conservación de datos, galerías, los tres MP4 y menús. Se comprueban 320, 390, 768, 900, 1200 y 1440 px según el flujo. Párrafos principales móviles de al menos 16 px. Galerías y video también se verifican abiertos en 390 px, con cierre, pausa y retorno de foco.

El informe efectivo está en `evidence/browser-report.json`; las capturas locales están en `evidence/journey-*.png`. Las notas de `CLIENT-REFRESH.md` describen la versión anterior basada en flota.
