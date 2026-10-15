# Pro Carga · Actualización del cliente

15 de octubre de 2026 · República Dominicana.

La publicación vigente es [GitHub Pages](https://mitchell-castillo.github.io/procarga/), desde `main` del repositorio `mitchell-castillo/procarga`. Se conserva la identidad azul marino/celeste, la portada costera, Manrope local y el flujo de cotización ES/EN.

## Cambios

- Sustituida la antigua foto de asientos por la imagen panorámica suministrada por el cliente, vista desde atrás hacia adelante. Se conserva su marca incorporada. La nueva composición le da espacio al techo y al interior.
- Nueva sección de flota: Chevrolet Suburban, Cadillac y minibús Toyota de 19 pasajeros. La capacidad procede de la indicación expresa del cliente.
- Exterior de la Suburban encuadrado mediante CSS para reducir edificio y pavimento, sin modificar la foto original. Las fotos se pueden ampliar completas en un diálogo accesible.
- Minibús con dos fotos exteriores y dos interiores, seleccionables por vista. Se conserva el vehículo completo en sus miniaturas y el detalle completo al ampliar.
- Cadillac aparece en Pro Luxury y en una tarjeta propia con acceso a cotizar. No se atribuyó a Cadillac una foto de Chevrolet, GMC o Toyota: no había una imagen de Cadillac identificable en el material entregado.
- Tres clips locales de Suburban: interior/techo, llegada al hotel y exterior junto al mar. H.264, sin audio, controles nativos, reproducción inline y sin autoplay. El clip de interior selecciona los últimos ocho segundos, centrados en techo y asientos. Se carga el video al solicitar reproducirlo.
- Eliminada mensajería de accesos rápidos, tarjetas, formulario, metadatos, traducciones, FAQ y servicios aceptados por la validación.
- Añadidos Samaná, Boca Chica y Santiago a destinos y sugerencias. Su selección conserva el origen y otros datos ya introducidos.
- Texto normal móvil de 16 px, botones/etiquetas de 14–15 px y ayudas de 13 px. Antes numerosos párrafos usaban 11–12 px. Campos de 16 px y controles cómodos de tocar.
- La preferencia de vehículo se incluye en el borrador de WhatsApp en ambos idiomas, conserva su valor al editar y se oculta para carga.

## Medios

Los originales suministrados están fuera del repositorio, en la carpeta `Desktop/procargoMedia` del propietario, y se mantuvieron intactos. `dist/assets/fleet/manifest.json` relaciona fuentes, versiones optimizadas y recortes temporales de video. `scripts/prepare-client-media.py` permite reproducir la conversión con Pillow e imageio-ffmpeg. Los WebP pequeños tienen sufijo `-640` (640 corresponde al lado mayor, no siempre al ancho); el HTML usa descriptores acordes con el ancho real.

Se conservan alternativas optimizadas no seleccionadas para futuras ediciones. La web descarga solo las fotografías utilizadas, con carga diferida y variantes responsive. Los tres videos suman aproximadamente 1,8 MB y no se incluyen en la descarga inicial de video.

## Validación

- 9 pruebas unitarias de solicitudes aprobadas.
- 30 verificaciones de navegador con Chrome 155 y Playwright 1.62.1: ES/EN, enlaces, validación, borrador, edición y conservación de ruta/vehículo.
- Imágenes utilizadas decodificadas correctamente; MP4 con MIME correcto y metadatos de video decodificados en el navegador.
- Vistas de galería, dos fotos de cada vista del Toyota y diálogo con cierre por Escape/botón y retorno de foco.
- Sin desbordamiento horizontal a 320, 390, 768 y 1440 px. Menú validado también al redimensionar 900 → 1200 → 900 px.
- Párrafos principales móviles de al menos 16 px. Revisión visual de portada, Pro Luxury, flota, videos y formularios.
- Sin errores de consola ni solicitudes a sitios externos durante las pruebas. No se envió ningún mensaje por WhatsApp.

El informe reproducible se guarda en `evidence/browser-report.json`; capturas locales en `evidence/` (excluidas de Git). Las notas históricas de publicación y marca del 14 de octubre describen versiones anteriores.
