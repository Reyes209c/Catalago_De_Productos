# Catálogo revisado

Consulta: 2 de octubre de 2026. Todos los precios se muestran en quetzales (GTQ).

- 130 productos en 26 categorías: 128 equipos con fotografías reales y 2 servicios de IA con sus iconos oficiales, guardados localmente.
- 47 precios cotejados en fichas de Pacifiko. Cada registro conserva precio, enlace, fotografía y fecha en `src/data/verifiedCatalog.json`.
- 33 precios adicionales localizados en otras tiendas en `src/data/additionalOffers.json`: 15 en GTQ y 18 en moneda extranjera. Se conservan enlaces, importe original, estado, disponibilidad y notas de variante. 17 de estas fichas están agotadas; algunas son fichas indexadas o antiguas. El veredicto compara el precio publicado y las puntuaciones orientativas; no afirma disponibilidad en tienda.
- Por solicitud del usuario, las tarjetas no muestran etiquetas de referencia ni disponibilidad. Conservan tienda y fecha. El estado se guarda en los datos de origen, pero no se muestra en nombres, tarjetas ni tablas.
- Conversión con ExchangeRate-API, instantánea en `src/data/exchangeRates.json`, publicada el 3 de octubre de 2026 a las 00:02 UTC (2 de octubre en Guatemala). La API expresa unidades de moneda por GTQ: se divide el precio original entre la tasa. Redondeo a dos decimales; sin envío ni importación.
- Las otras fuentes fotográficas se registran en `src/data/imageSources.json`.
- Las variantes específicas y el estado seminuevo del iPhone 13 están indicados en `src/data/catalogVariants.json`.

Los precios son una consulta puntual, no una sincronización automática. Verificar entrega, disponibilidad y condiciones en la tienda. Las puntuaciones del comparador provienen del catálogo original y son orientativas; no son pruebas de laboratorio.

## Ejecutar

`npm run dev` para desarrollo; `npm run build` para producción.

## Actualizar datos

Revisar manualmente la ficha y variante antes de cambiar un precio. `scripts/import_verified_catalog.py` descarga fotos de las ofertas revisadas de `src/data/pacifiko-verified.txt`. `scripts/import_product_photos.py` descarga las fotografías alternativas con sus fuentes registradas. Estos scripts no buscan ni actualizan precios automáticamente.

Validación: `npm run build` y `node --test scripts/catalog.test.js`. Pruebas de monedas, filtros, trazabilidad y comparación de ofertas no equivalentes. Catálogo revisado en navegador.

## Cobertura del trabajo solicitado

Se agregaron 50 registros en `src/data/expandedCatalog.json`, con precio publicado, enlace de tienda, fuente de imagen y especificaciones. Tiendas: TERA, Yaxa Guatemala, Infotech, Ultraprint, Novocolor, Claro y Elektra; los planes de IA utilizan páginas oficiales de OpenAI y Anthropic. Las fichas de TERA pueden estar agotadas; ese estado se conserva internamente, sin las etiquetas visuales que el usuario pidió retirar.

- Categorías incorporadas: impresoras (5), HDD (6), tarjetas SD (4), micrófonos (5), SmartWatch (5), cañoneras (5), fotocopiadoras (3), scanners (4), plotters (3) e inteligencia artificial (2).
- Se mantienen los cinco productos de cada categoría original, además de 2 celulares de gama baja y 6 computadoras adicionales. Total: 7 celulares y 11 computadoras.
- Celulares: Galaxy A06 y Redmi A5 (baja); Galaxy A54 y POCO X5 Pro (media); iPhone 13, 14 Pro y 15 (alta por segmento original).
- Computadoras añadidas: EVOO N4000 y ASUS VivoBook i3 (baja); HP ProBook Core 5 y Lenovo IdeaPad Slim 3 (media); Lenovo LOQ RTX 5060 y ThinkPad Ultra 7/32GB (alta). La gama es una clasificación orientativa para el trabajo, no una prueba de rendimiento.
- Las fotocopiadoras son multifuncionales de oficina con función de copia, identificadas como tales en sus especificaciones.
- ChatGPT Plus y Claude Pro: planes individuales mensuales de US$20, convertidos a Q152.75/mes. La comparación incluye funciones y fuentes oficiales; no inventa puntuaciones ni un ganador universal.
- Inicio incluye accesos por categoría y seis comparaciones por gama; el catálogo permite filtrar por gama y abrir categorías mediante enlaces.
- La comparación de los registros nuevos usa sus especificaciones sin generar puntuaciones ficticias.

Validar la ampliación con `node --test scripts/*.test.js`.

El veredicto ya no se bloquea por disponibilidad ni estado del producto. Con puntuaciones completas compara las valoraciones orientativas; sin ellas, describe la diferencia de precio sin inventar un ganador por rendimiento.
