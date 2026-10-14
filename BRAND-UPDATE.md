# ProCarga · Identidad de marca

Actualización: 14 de octubre de 2026, hora de República Dominicana.

La demo pública vigente se publica desde GitHub en https://mitchell-castillo.github.io/procarga/. Se incorporaron, a petición del propietario, la portada costera y el interior de asientos del [Site Signature](https://pro-carga-signature-oct2026.juan-mitchell.chatgpt.site/), usando sus WebP originales. Se conservan el logo, colores, fotos de Instagram y paisaje anterior. Se quitaron los rótulos «Imagen de concepto»; la procedencia ilustrativa se mantiene discretamente en el pie.

La portada explica «Traslados y logística. A tu manera.». Los seis accesos rápidos preparan el tipo de servicio; las sugerencias de destinos rellenan el formulario sin enviar datos. Pro Luxury tiene acceso en el menú, y cotizar muestra los pasos ruta → revisión → WhatsApp. No se añadieron promesas de inventario, cobertura o disponibilidad.

Se recuperó la fuente del Site existente en esta carpeta mediante el flujo de Sites. Se conservan el proyecto `appgprj_6acec4214ed481918c3f171ee3031956`, el enlace y el acceso privado al propietario.

La identidad se basa en el [Instagram oficial @pro_carga](https://www.instagram.com/pro_carga/), abierto y revisado en el navegador integrado. La biografía publica aeropuertos, flete/carga, mensajería, transporte turístico y el lema «Tu necesidad, Nuestro Compromiso». El WhatsApp del perfil es 809-253-2740. Las piezas visibles respaldan Pro Luxury, transporte ejecutivo, chauffeur, eventos, bodas, traslados grupales y mudanzas.

## Diseño

Logo original conservado sin redibujarlo, descargado de la imagen de perfil. El archivo disponible mide 150 × 150 y se muestra a 53–67 px. Azul marino #073b59, azul #087da1, celeste #41b9d1 y blanco; son una adaptación visual del logo, no valores de un manual de marca proporcionado. Cabecera clara, portada fotográfica azul, seis servicios, sección Pro Luxury con fotos del perfil, destinos, proceso, FAQ y contacto.

Se mantienen los textos ES/EN. El selector de servicio aparece antes de la ruta; carga y mensajería ocultan pasajeros y los excluyen del borrador. El visitante revisa el mensaje antes de abrir WhatsApp.

## Recursos

- `dist/assets/procarga-logo.jpg`: imagen de perfil original.
- `dist/assets/procarga-hotel.jpg`: imagen publicada en [este reel](https://www.instagram.com/pro_carga/reel/DeQf4SsN45T/).
- `dist/assets/procarga-route.jpg`: imagen publicada en [este reel](https://www.instagram.com/pro_carga/reel/DeVyGyvM31n/).
- `dist/assets/procarga-luxury.jpg`: pieza de Pro Luxury, [publicación](https://www.instagram.com/pro_carga/p/DeCMxZutwU3/), conservada como referencia.
- `dist/assets/procarga-services.jpg`: pieza de transporte y logística, [reel](https://www.instagram.com/pro_carga/reel/DXyLoqAxyJP/), conservada como referencia.

Las fotos son miniaturas observadas en el perfil. No se afirma inventario, capacidad o disponibilidad a partir de ellas. `coastal-transfer.webp` y `luxury-interior.webp` proceden del Site Signature indicado por el propietario. `coast-concept.webp` conserva el paisaje anterior. Algunas publicaciones requieren iniciar sesión; el perfil y sus miniaturas bastaron para obtener la marca y servicios.

## Verificación realizada

- Ocho pruebas unitarias de cotización aprobadas; sintaxis JavaScript comprobada.
- HTTP local 200 y revisión visual de portada, formulario, servicios y Pro Luxury.
- Navegador integrado: escritorio 1280 px, sin imágenes rotas ni textos sin traducir; sin errores de consola observados.
- Validación de campos vacíos, borrador de carga sin pasajeros, cambio del borrador a inglés, edición y borrador de aeropuerto con tres pasajeros.
- Vistas del documento en 390, 320 y 900 px: sin desbordamiento horizontal. En esta actualización el control de viewport sí aplicó las dimensiones y se restableció al terminar.
- Menú móvil abre y cierra al navegar; textos en inglés completos a 390 px.
- Enlace preparado apunta a `wa.me/18092532740` con el mensaje correcto. Las pruebas no abrieron WhatsApp ni enviaron mensajes.

Los accesos rápidos seleccionan servicio; los destinos completan el campo sin borrar el origen. Se comprobó un borrador de carga a Punta Cana, su traducción a inglés y la edición mediante el acceso a Barahona. Carga elimina correctamente los errores antiguos de pasajeros. La consola no mostró errores de la web.

Las capturas de esta actualización están en `evidence/refresh-mobile.jpg` y `evidence/refresh-luxury.jpg`. El script histórico de pruebas Playwright no se ejecutó en esta actualización; la verificación de navegador se realizó mediante Computer Use.
