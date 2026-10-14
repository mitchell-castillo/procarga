# Decisiones y evidencia

> Documento histórico de la versión inicial. La dirección visual y validación vigentes están en [REDESIGN.md](REDESIGN.md).

## Identidad y dirección

Diseño editorial: azul noche `#0b242d`, dorado discreto `#dec595`, turquesa `#45bcb4`, papel cálido `#fffcf5`. Tipografía de sistema: Georgia y Arial; no requiere descargas ni fuentes externas. La portada usa un paisaje abstracto SVG, ruta punteada y brújula, dibujados para esta versión. No hay fotos de vehículos, imágenes generadas como prueba de flota, marcas de autos ni inventario.

El monograma y el texto de marca son una **identidad tipográfica provisional para revisión**, no un logotipo oficial atribuido a Pro Carga. Se indica junto a las ilustraciones conceptuales en el pie. Antes de una entrega pública definitiva, Juan puede validar o proporcionar el logotipo oficial.

La web prioriza el plan del visitante: entender servicios → definir ruta → revisar solicitud → conversación por WhatsApp. La portada evita usar testimonios, cifras, certificaciones, clientes, garantías, tiempos de respuesta o disponibilidad no comprobados.

## Contenido autorizado

La delegación aporta servicios publicados: aeropuerto, corporativo/VIP, chauffeur privado, eventos y bodas. WhatsApp entregado por el usuario: `8092532740`; formato internacional usado: `18092532740`.

El acceso web directo al perfil [@pro_carga](https://www.instagram.com/pro_carga/) fue limitado por Instagram (`Online fetch throttled`). No se accedió a sesiones ni al navegador personal. El padre envió estas observaciones verificadas; no se realizó verificación independiente adicional:

- Bio: Transporte Turístico y Santo Domingo.
- [Pro Luxury / Cibao](https://www.instagram.com/pro_carga/reel/DeFgFWnOZIq/): promoción hacia Mao y Moca. Se usa solo la referencia regional Cibao, sujeta a consulta.
- [Publicidad en inglés](https://www.instagram.com/pro_carga/reel/Dd5cktOhBs7/): respalda la dirección bilingüe para viajeros internacionales.
- [Origen de la propuesta](https://www.instagram.com/pro_carga/p/DeCJdJ6lrp0/): viajeros extranjeros interesados en mayor comodidad al llegar al aeropuerto. Orienta el tono, sin convertirlo en promesas de calidad comprobada.
- [Paraíso, Barahona](https://www.instagram.com/pro_carga/reel/DX79erENj8W/): contenido etiquetado IA. No se usa como evidencia visual o prueba de viaje realizado.
- Un destacado antiguo menciona aeropuertos en todo el país. No se convierte en garantía vigente ni cobertura nacional confirmada.

No se encontraron tarifas, condiciones ni inventario vigente. Santo Domingo y Cibao aparecen como referencias para planear y solicitar cotización; cobertura y disponibilidad quedan por confirmar. No se añade una lista de aeropuertos o destinos que implique cobertura garantizada.

## Interacción y privacidad

El formulario no transmite al enviarlo: muestra un borrador en la misma página. Un enlace `wa.me` codifica el mensaje únicamente para que el visitante lo abra a voluntad. Abrirlo comparte el contenido con WhatsApp; enviar a Pro Carga requiere la acción del visitante allí. Se explica antes de continuar.

No se guarda origen, destino, fecha, pasajeros o notas en almacenamiento persistente ni en la URL del sitio. Se conservan temporalmente en los campos para permitir editar. Idioma en `?lang=en` para enlaces directos. Entrada se muestra con `textContent`, nunca `innerHTML`. Datos sintéticos en pruebas; no envío de prueba ni apertura de terceros.

Se confirma explícitamente que el formulario es una solicitud de cotización. Precio, disponibilidad, vehículo y condiciones deben acordarse con Pro Carga. La fecha mínima usa el calendario de `America/Santo_Domingo`, aunque el visitante esté en otro país.

## Entorno

Trabajo realizado en la nueva carpeta `pro-carga/` dentro de la tarea. Se buscó AGENTS.md en la carpeta y ancestros: ninguno encontrado. No existían archivos, manifest, repos o código previo en la carpeta. Se consultaron Sites, diseño para sitios de presentación y vista previa portable. No había instrucciones adicionales de desarrollo en `.agents/skills`; el directorio personal de skills tenía únicamente `.system`.

El primer intento con navegador integrado falló al iniciar el runtime (`cannot locate required Windows platform directory`). Las pruebas funcionales se ejecutan con Chromium headless aislado ya instalado, sin perfil personal. La primera navegación a loopback quedó restringida por sandbox; se solicitó la ejecución autorizada y acotada a pruebas, con red externa bloqueada por el propio script. Ver `VALIDATION.md` para el resultado final.
