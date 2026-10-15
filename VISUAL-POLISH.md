# Pro Carga · Simplificación y revisión visual

15 de octubre de 2026 · Cambios solicitados por el propietario sobre la versión de medios.

## Cambios vigentes

- Debajo de cada carrusel quedan únicamente las bolitas. Eliminados contador, flechas y botón de pausa/reanudación. Las fotos siguen avanzando cada seis segundos después de usar una bolita y al mantener el puntero sobre ellas. Las transiciones se eliminan con la preferencia de reducir movimiento; el avance de fotos continúa.
- Los puntos quedan centrados respecto a la fotografía en escritorio y móvil. Ambos carruseles admiten deslizar con el dedo hacia los dos lados, con vuelta al inicio o al final. Un deslizamiento no abre la galería; tocar la foto sí la amplía. Los gestos verticales siguen desplazando la página y la rotación automática continúa tras deslizar.
- Los tres videos utilizan exclusivamente los controles nativos del navegador. Se retiró el botón azul superpuesto, conservando la reproducción dentro de la página, la carga bajo demanda y la pausa de otros clips al iniciar uno.
- La rotación se detiene fuera de pantalla, al ocultar la pestaña, al ampliar una fotografía, al reproducir un video o al conservar foco de teclado en una foto. Estas pausas no añaden controles visibles.
- Eliminados los indicadores de ampliación sobre las imágenes y los números de los cinco accesos a servicios. Se conservan los pasos numerados del proceso de cotización, donde indican una secuencia.
- Eliminadas las menciones de incorporación prevista y diciembre de 2026 en español e inglés, incluidos el texto de grupos y la opción del formulario. El propietario indicó que el lanzamiento tendrá lugar cuando ya dispongan del minibús.
- Flechas de la galería sustituidas por SVG centrados dentro de botones circulares. Las imágenes ampliadas se ajustan a su proporción para reducir bandas vacías, especialmente en móvil.
- Nueva versión de la foto exterior de Suburban, con encuadre cercano y horizontal, tanto en la página como en la galería y su miniatura. Se conserva la imagen anterior como recurso histórico. La composición de Pro Luxury pasa a 4:3 para mostrar el vehículo completo.

## Edición de la fotografía

Se utilizó la herramienta integrada ImageGen para centrar el encuadre en la Suburban, seguida de optimización WebP. La salida publicada está en `dist/assets/fleet/suburban-front-framed.webp` (1280 × 960) y la variante móvil en `suburban-front-framed-640.webp` (640 × 480). El prompt exacto se guarda en [scripts/prompts/suburban-exterior-framing.txt](scripts/prompts/suburban-exterior-framing.txt). Los originales suministrados por el cliente se conservaron.

## Verificación efectuada

- Recorrido visual de las diez secciones en escritorio de 1440 px y móvil de 390 px, con capturas y hojas de revisión. Inspección adicional en viewport real de 320 px.
- Inspección de ambas galerías abiertas, del encuadre de la Suburban y de la alineación de las flechas en escritorio y móvil. Los centros de los SVG se verifican con una diferencia inferior a un píxel respecto a sus botones.
- 9 pruebas unitarias y 42 comprobaciones de navegador aprobadas: gestos táctiles en ambos sentidos, vuelta al inicio/final, desplazamiento vertical, ampliación por toque, continuidad automática tras deslizar o seleccionar una bolita, puntos centrados, reproducción mediante controles nativos, ambos idiomas, galería, menús y cotización.
- Sin desbordamiento horizontal a 320, 390, 768 y 1440 px. Sin errores de consola ni solicitudes externas en las pruebas locales.

Informe reproducible: `evidence/browser-report.json`. Capturas locales: `evidence/polish-*.png`; las hojas `polish-desktop-overview.png` y `polish-mobile-overview.png` reúnen el recorrido. Las notas anteriores de [MEDIA-UPDATE.md](MEDIA-UPDATE.md) documentan la versión con controles visibles y aviso de incorporación.

Revisión visual de los últimos ajustes: `evidence/swipe-mobile-overview.png` reúne los dos carruseles y el video en móvil; `evidence/swipe-desktop-group.png` muestra la alineación en escritorio. Las pruebas táctiles utilizan eventos de contacto de Chromium con emulación móvil.
