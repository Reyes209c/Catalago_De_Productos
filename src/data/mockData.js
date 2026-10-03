import expandedCatalog from './expandedCatalog.json';
import exchangeRates from './exchangeRates.json';
import { convertToQuetzales, productDisplayName } from '../utils/catalog';
import verifiedCatalog from './verifiedCatalog.json';
import imageSources from './imageSources.json';
import additionalOffers from './additionalOffers.json';
import variants from './catalogVariants.json';

export const categories = [
  "Procesadores (CPU)", "Tarjetas gráficas (GPU)", "Memoria RAM", "SSD",
  "Tarjetas madre", "Monitores/Pantallas", "Gabinetes/Cajas", "Teclados", 
  "Mouse", "Auriculares", "Sillas", "Tablets", "Celulares", 
  "Computadoras", "Consolas", "Microcontroladores",
  "Impresoras", "Discos duros HDD", "Tarjetas SD", "Micrófonos", "SmartWatch",
  "Cañoneras", "Fotocopiadoras", "Scanners", "Plotters", "Inteligencia artificial"
];

const catalogProducts = [
  // ================= PROCESADORES (CPU) =================
  {
    id: 1, name: "AMD Ryzen 5 5500", brand: "AMD", category: "Procesadores (CPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Núcleos": "6", "Hilos": "12", "Frec. base": "3.6 GHz", "Frec. máxima": "4.2 GHz", "Socket": "AM4", "TDP": "65W", "Rendimiento": 75, "Calidad": 85, "Relación calidad/precio": 95, "Ventajas": "Excelente precio, incluye disipador.", "Desventajas": "No soporta PCIe 4.0." }
  },
  {
    id: 2, name: "Intel Core i5-12400F", brand: "Intel", category: "Procesadores (CPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Núcleos": "6", "Hilos": "12", "Frec. base": "2.5 GHz", "Frec. máxima": "4.4 GHz", "Socket": "LGA1700", "TDP": "65W", "Rendimiento": 82, "Calidad": 90, "Relación calidad/precio": 88, "Ventajas": "Mejor rendimiento por núcleo (IPC).", "Desventajas": "Placas madre costosas." }
  },
  {
    id: 3, name: "AMD Ryzen 7 5800X", brand: "AMD", category: "Procesadores (CPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Núcleos": "8", "Hilos": "16", "Frec. base": "3.8 GHz", "Frec. máxima": "4.7 GHz", "Socket": "AM4", "TDP": "105W", "Rendimiento": 90, "Calidad": 92, "Relación calidad/precio": 85, "Ventajas": "Excelente multitarea.", "Desventajas": "Calienta bastante." }
  },
  {
    id: 4, name: "Intel Core i7-13700K", brand: "Intel", category: "Procesadores (CPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Núcleos": "16", "Hilos": "24", "Frec. base": "3.4 GHz", "Frec. máxima": "5.4 GHz", "Socket": "LGA1700", "TDP": "125W", "Rendimiento": 97, "Calidad": 95, "Relación calidad/precio": 80, "Ventajas": "Potencia bestial para gaming 4K.", "Desventajas": "Consumo de energía muy alto." }
  },
  {
    id: 5, name: "AMD Ryzen 9 7900X", brand: "AMD", category: "Procesadores (CPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Núcleos": "12", "Hilos": "24", "Frec. base": "4.7 GHz", "Frec. máxima": "5.6 GHz", "Socket": "AM5", "TDP": "170W", "Rendimiento": 98, "Calidad": 96, "Relación calidad/precio": 78, "Ventajas": "Frecuencias de reloj altísimas.", "Desventajas": "Requiere memorias DDR5." }
  },

  // ================= TARJETAS GRÁFICAS (GPU) =================
  {
    id: 6, name: "ASUS Dual RTX 4060", brand: "NVIDIA", category: "Tarjetas gráficas (GPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "VRAM": "8GB GDDR6", "CUDAs": "3072", "Consumo": "115W", "Tecnología": "DLSS 3", "Rendimiento": 82, "Calidad": 90, "Relación calidad/precio": 85, "Ventajas": "Bajo consumo y DLSS 3.", "Desventajas": "8GB VRAM limitan a futuro." }
  },
  {
    id: 7, name: "Gigabyte RX 7600", brand: "AMD", category: "Tarjetas gráficas (GPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "VRAM": "8GB GDDR6", "Stream Proc.": "2048", "Consumo": "165W", "Tecnología": "FSR 3", "Rendimiento": 80, "Calidad": 85, "Relación calidad/precio": 92, "Ventajas": "Mejor rendimiento bruto por su precio.", "Desventajas": "Ray Tracing deficiente." }
  },
  {
    id: 8, name: "MSI RTX 4070 Ventus", brand: "NVIDIA", category: "Tarjetas gráficas (GPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "VRAM": "12GB GDDR6X", "CUDAs": "5888", "Consumo": "200W", "Tecnología": "DLSS 3.5", "Rendimiento": 92, "Calidad": 94, "Relación calidad/precio": 82, "Ventajas": "Perfecta para 1440p, 12GB de VRAM aseguran longevidad.", "Desventajas": "El precio saltó bastante." }
  },
  {
    id: 9, name: "Sapphire Pulse RX 7800 XT", brand: "AMD", category: "Tarjetas gráficas (GPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "VRAM": "16GB GDDR6", "Stream Proc.": "3840", "Consumo": "263W", "Tecnología": "FSR 3", "Rendimiento": 94, "Calidad": 92, "Relación calidad/precio": 90, "Ventajas": "16GB de VRAM, gran valor.", "Desventajas": "Consumo alto." }
  },
  {
    id: 10, name: "ASUS ROG Strix RTX 4090", brand: "NVIDIA", category: "Tarjetas gráficas (GPU)", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "VRAM": "24GB GDDR6X", "CUDAs": "16384", "Consumo": "450W", "Tecnología": "DLSS 3.5", "Rendimiento": 100, "Calidad": 100, "Relación calidad/precio": 60, "Ventajas": "La mejor gráfica del mundo.", "Desventajas": "Precio exorbitante." }
  },

  // ================= SSD =================
  {
    id: 11, name: "Samsung 980 PRO 1TB", brand: "Samsung", category: "SSD", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "1TB", "Interfaz": "PCIe Gen 4.0 x4", "Vel. Lectura": "7000 MB/s", "Vel. Escritura": "5000 MB/s", "Rendimiento": 95, "Calidad": 98, "Relación calidad/precio": 85, "Ventajas": "Extremadamente rápido.", "Desventajas": "Requiere disipador." }
  },
  {
    id: 12, name: "Crucial P3 Plus 1TB", brand: "Crucial", category: "SSD", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "1TB", "Interfaz": "PCIe Gen 4.0", "Vel. Lectura": "5000 MB/s", "Vel. Escritura": "3600 MB/s", "Rendimiento": 85, "Calidad": 88, "Relación calidad/precio": 95, "Ventajas": "Gran velocidad a buen precio.", "Desventajas": "No tiene caché DRAM." }
  },
  {
    id: 13, name: "WD_BLACK SN850X 2TB", brand: "Western Digital", category: "SSD", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "2TB", "Interfaz": "PCIe Gen 4.0", "Vel. Lectura": "7300 MB/s", "Vel. Escritura": "6600 MB/s", "Rendimiento": 98, "Calidad": 97, "Relación calidad/precio": 88, "Ventajas": "De los discos más rápidos del mercado.", "Desventajas": "Precio premium." }
  },
  {
    id: 14, name: "Kingston NV2 1TB", brand: "Kingston", category: "SSD", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "1TB", "Interfaz": "PCIe Gen 4.0", "Vel. Lectura": "3500 MB/s", "Vel. Escritura": "2100 MB/s", "Rendimiento": 75, "Calidad": 80, "Relación calidad/precio": 98, "Ventajas": "El más barato y confiable.", "Desventajas": "Velocidades lentas para Gen 4." }
  },
  {
    id: 15, name: "Corsair MP600 PRO 2TB", brand: "Corsair", category: "SSD", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "2TB", "Interfaz": "PCIe Gen 4.0", "Vel. Lectura": "7000 MB/s", "Vel. Escritura": "6550 MB/s", "Rendimiento": 95, "Calidad": 95, "Relación calidad/precio": 82, "Ventajas": "Incluye disipador masivo.", "Desventajas": "Disipador muy grande." }
  },

  // ================= MEMORIA RAM =================
  {
    id: 16, name: "Corsair Vengeance RGB 16GB", brand: "Corsair", category: "Memoria RAM", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "16GB (2x8GB)", "Tipo": "DDR4", "Velocidad": "3200 MHz", "Rendimiento": 85, "Calidad": 95, "Relación calidad/precio": 90, "Ventajas": "Hermoso RGB.", "Desventajas": "DDR4." }
  },
  {
    id: 17, name: "Kingston FURY Beast 32GB", brand: "Kingston", category: "Memoria RAM", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "32GB (2x16GB)", "Tipo": "DDR5", "Velocidad": "5200 MHz", "Rendimiento": 92, "Calidad": 90, "Relación calidad/precio": 85, "Ventajas": "Capacidad enorme.", "Desventajas": "Sin RGB." }
  },
  {
    id: 18, name: "G.Skill Trident Z5 32GB", brand: "G.Skill", category: "Memoria RAM", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "32GB (2x16GB)", "Tipo": "DDR5", "Velocidad": "6000 MHz", "Rendimiento": 98, "Calidad": 98, "Relación calidad/precio": 80, "Ventajas": "Rendimiento premium.", "Desventajas": "Precio elevado." }
  },
  {
    id: 19, name: "Crucial Pro 32GB", brand: "Crucial", category: "Memoria RAM", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "32GB (2x16GB)", "Tipo": "DDR4", "Velocidad": "3200 MHz", "Rendimiento": 82, "Calidad": 90, "Relación calidad/precio": 95, "Ventajas": "Mucha RAM barata.", "Desventajas": "Estética simple." }
  },
  {
    id: 20, name: "T-Force Delta RGB 16GB", brand: "TeamGroup", category: "Memoria RAM", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Capacidad": "16GB (2x8GB)", "Tipo": "DDR4", "Velocidad": "3600 MHz", "Rendimiento": 88, "Calidad": 85, "Relación calidad/precio": 92, "Ventajas": "Velocidad a bajo costo.", "Desventajas": "Plástico barato." }
  },

  // ================= TARJETAS MADRE =================
  {
    id: 21, name: "MSI MAG B550 TOMAHAWK", brand: "MSI", category: "Tarjetas madre", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Socket": "AM4", "Chipset": "B550", "Formato": "ATX", "Memoria": "DDR4", "Rendimiento": 90, "Calidad": 95, "Relación calidad/precio": 88, "Ventajas": "VRMs potentes.", "Desventajas": "Plataforma AM4 sin actualizaciones." }
  },
  {
    id: 22, name: "ASUS ROG Strix B650E-F", brand: "ASUS", category: "Tarjetas madre", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Socket": "AM5", "Chipset": "B650E", "Formato": "ATX", "Memoria": "DDR5", "Rendimiento": 95, "Calidad": 98, "Relación calidad/precio": 80, "Ventajas": "PCIe 5.0.", "Desventajas": "Precio elevado." }
  },
  {
    id: 23, name: "Gigabyte Z790 AORUS ELITE", brand: "Gigabyte", category: "Tarjetas madre", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Socket": "LGA1700", "Chipset": "Z790", "Formato": "ATX", "Memoria": "DDR5", "Rendimiento": 96, "Calidad": 92, "Relación calidad/precio": 85, "Ventajas": "Excelente Overclocking.", "Desventajas": "RGB Fusion es complicado." }
  },
  {
    id: 24, name: "MSI PRO B660M-A", brand: "MSI", category: "Tarjetas madre", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Socket": "LGA1700", "Chipset": "B660", "Formato": "Micro-ATX", "Memoria": "DDR4", "Rendimiento": 85, "Calidad": 85, "Relación calidad/precio": 95, "Ventajas": "Placa económica.", "Desventajas": "Conectividad básica." }
  },
  {
    id: 25, name: "ASUS Prime Z690-P", brand: "ASUS", category: "Tarjetas madre", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Socket": "LGA1700", "Chipset": "Z690", "Formato": "ATX", "Memoria": "DDR5", "Rendimiento": 90, "Calidad": 90, "Relación calidad/precio": 90, "Ventajas": "Entrada a Z690.", "Desventajas": "Estética simple." }
  },

  // ================= MONITORES =================
  {
    id: 26, name: "LG UltraGear 24GN60R", brand: "LG", category: "Monitores/Pantallas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tamaño": "24\"", "Resolución": "1080p", "Hz": "144Hz", "Panel": "IPS", "Rendimiento": 88, "Calidad": 90, "Relación calidad/precio": 90, "Ventajas": "Colores IPS.", "Desventajas": "Soporte no gira." }
  },
  {
    id: 27, name: "Samsung Odyssey G3", brand: "Samsung", category: "Monitores/Pantallas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tamaño": "24\"", "Resolución": "1080p", "Hz": "144Hz", "Panel": "VA", "Rendimiento": 82, "Calidad": 85, "Relación calidad/precio": 80, "Ventajas": "Contraste profundo.", "Desventajas": "Ghosting en oscuros." }
  },
  {
    id: 28, name: "ASUS TUF VG27AQ", brand: "ASUS", category: "Monitores/Pantallas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tamaño": "27\"", "Resolución": "1440p (2K)", "Hz": "165Hz", "Panel": "IPS", "Rendimiento": 95, "Calidad": 95, "Relación calidad/precio": 85, "Ventajas": "Balance perfecto.", "Desventajas": "HDR pobre." }
  },
  {
    id: 29, name: "Dell S2721DGF", brand: "Dell", category: "Monitores/Pantallas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tamaño": "27\"", "Resolución": "1440p (2K)", "Hz": "165Hz", "Panel": "Fast IPS", "Rendimiento": 97, "Calidad": 98, "Relación calidad/precio": 82, "Ventajas": "Garantía Dell.", "Desventajas": "Difícil de encontrar." }
  },
  {
    id: 30, name: "Gigabyte M27Q", brand: "Gigabyte", category: "Monitores/Pantallas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tamaño": "27\"", "Resolución": "1440p (2K)", "Hz": "170Hz", "Panel": "IPS", "Rendimiento": 94, "Calidad": 90, "Relación calidad/precio": 96, "Ventajas": "KVM switch integrado.", "Desventajas": "Disposición BGR." }
  },

  // ================= TECLADOS =================
  {
    id: 31, name: "Redragon Kumara K552", brand: "Redragon", category: "Teclados", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tipo": "Mecánico", "Switches": "Outemu Red", "Formato": "TKL (80%)", "Iluminación": "RGB", "Inalámbrico": "No", "Rendimiento": 80, "Calidad": 85, "Relación calidad/precio": 98, "Ventajas": "Construcción en metal muy robusta a un precio bajísimo.", "Desventajas": "Switches ruidosos." }
  },
  {
    id: 32, name: "Corsair K70 RGB", brand: "Corsair", category: "Teclados", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tipo": "Mecánico", "Switches": "Cherry MX Red", "Formato": "Completo", "Iluminación": "RGB", "Inalámbrico": "No", "Rendimiento": 95, "Calidad": 95, "Relación calidad/precio": 80, "Ventajas": "Chasis de aluminio premium y reposamuñecas incluido.", "Desventajas": "Cable grueso y no removible." }
  },
  {
    id: 33, name: "Logitech G Pro X", brand: "Logitech", category: "Teclados", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tipo": "Mecánico", "Switches": "GX Blue (Intercambiables)", "Formato": "TKL", "Iluminación": "RGB Lightsync", "Inalámbrico": "No", "Rendimiento": 92, "Calidad": 90, "Relación calidad/precio": 85, "Ventajas": "Switches hotswap, perfecto para eSports.", "Desventajas": "Teclas ABS (se desgastan con el tiempo)." }
  },
  {
    id: 34, name: "Razer BlackWidow V3", brand: "Razer", category: "Teclados", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tipo": "Mecánico", "Switches": "Razer Green", "Formato": "Completo", "Iluminación": "Razer Chroma", "Inalámbrico": "No", "Rendimiento": 90, "Calidad": 92, "Relación calidad/precio": 82, "Ventajas": "Rueda de volumen multifunción y RGB espectacular.", "Desventajas": "Switches muy escandalosos (Clicky)." }
  },
  {
    id: 35, name: "Keychron K2 V2", brand: "Keychron", category: "Teclados", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Tipo": "Mecánico", "Switches": "Gateron Brown", "Formato": "75%", "Iluminación": "Retroiluminación Blanca/RGB", "Inalámbrico": "Sí (Bluetooth)", "Rendimiento": 94, "Calidad": 95, "Relación calidad/precio": 90, "Ventajas": "Excelente para Mac y Windows, diseño minimalista.", "Desventajas": "Es bastante alto, puede requerir reposamuñecas." }
  },

  // ================= MOUSE =================
  {
    id: 36, name: "Logitech G502 HERO", brand: "Logitech", category: "Mouse", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sensor": "HERO 25K", "DPI Máximo": "25,600", "Botones": "11 programables", "Peso": "Ajustable", "Inalámbrico": "No", "Rendimiento": 95, "Calidad": 95, "Relación calidad/precio": 95, "Ventajas": "El mouse gamer más vendido de la historia, comodísimo.", "Desventajas": "Pesado para juegos competitivos tipo shooter." }
  },
  {
    id: 37, name: "Logitech G Pro Wireless", brand: "Logitech", category: "Mouse", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sensor": "HERO 25K", "DPI Máximo": "25,600", "Botones": "8 programables", "Peso": "80g", "Inalámbrico": "Sí (Lightspeed)", "Rendimiento": 98, "Calidad": 95, "Relación calidad/precio": 85, "Ventajas": "Cero latencia, batería duradera, diseño ambidiestro perfecto.", "Desventajas": "Propenso a fallas de doble click tras mucho uso." }
  },
  {
    id: 38, name: "Razer Viper Mini", brand: "Razer", category: "Mouse", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sensor": "Óptico", "DPI Máximo": "8,500", "Botones": "6", "Peso": "61g", "Inalámbrico": "No", "Rendimiento": 88, "Calidad": 90, "Relación calidad/precio": 100, "Ventajas": "Extremadamente ligero y con switches ópticos que no fallan.", "Desventajas": "Muy pequeño para manos grandes." }
  },
  {
    id: 39, name: "Razer DeathAdder V2", brand: "Razer", category: "Mouse", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sensor": "Focus+ 20K", "DPI Máximo": "20,000", "Botones": "8", "Peso": "82g", "Inalámbrico": "No", "Rendimiento": 94, "Calidad": 92, "Relación calidad/precio": 90, "Ventajas": "Ergonomía perfecta para agarre de palma.", "Desventajas": "Diseño exclusivo para diestros." }
  },
  {
    id: 40, name: "Glorious Model O", brand: "Glorious", category: "Mouse", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sensor": "Pixart PMW-3360", "DPI Máximo": "12,000", "Botones": "6", "Peso": "67g", "Inalámbrico": "No", "Rendimiento": 90, "Calidad": 88, "Relación calidad/precio": 88, "Ventajas": "Carcasa de panal hiper ligera, cable de tipo paracord.", "Desventajas": "Se acumula polvo en los agujeros del panal." }
  },

  // ================= CAJAS / GABINETES =================
  {
    id: 41, name: "NZXT H510", brand: "NZXT", category: "Gabinetes/Cajas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Formato": "Mid Tower", "Panel Lateral": "Vidrio Templado", "Soporte Motherboard": "ATX, Micro-ATX, Mini-ITX", "Ventiladores incluidos": "2", "Rendimiento": 85, "Calidad": 92, "Relación calidad/precio": 88, "Ventajas": "Estética minimalista envidiable y fácil gestión de cables.", "Desventajas": "Flujo de aire restringido en el panel frontal." }
  },
  {
    id: 42, name: "Corsair 4000D Airflow", brand: "Corsair", category: "Gabinetes/Cajas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Formato": "Mid Tower", "Panel Lateral": "Vidrio Templado", "Soporte Motherboard": "ATX, Micro-ATX", "Ventiladores incluidos": "2", "Rendimiento": 98, "Calidad": 95, "Relación calidad/precio": 92, "Ventajas": "Flujo de aire espectacular gracias a su panel frontal perforado.", "Desventajas": "Pocos puertos USB en el panel frontal." }
  },
  {
    id: 43, name: "Lian Li PC-O11 Dynamic", brand: "Lian Li", category: "Gabinetes/Cajas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Formato": "Mid Tower", "Panel Lateral": "Vidrio (Lateral y Frontal)", "Soporte Motherboard": "E-ATX, ATX", "Ventiladores incluidos": "0", "Rendimiento": 95, "Calidad": 98, "Relación calidad/precio": 85, "Ventajas": "El rey de la estética PC, ideal para refrigeración líquida custom.", "Desventajas": "No incluye ningún ventilador de fábrica." }
  },
  {
    id: 44, name: "Phanteks Eclipse P360A", brand: "Phanteks", category: "Gabinetes/Cajas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Formato": "Mid Tower", "Panel Lateral": "Vidrio Templado", "Soporte Motherboard": "ATX", "Ventiladores incluidos": "2 (D-RGB)", "Rendimiento": 90, "Calidad": 88, "Relación calidad/precio": 95, "Ventajas": "Excelente flujo de aire y RGB incluido a buen precio.", "Desventajas": "Materiales ligeramente más delgados." }
  },
  {
    id: 45, name: "Fractal Design Pop Air", brand: "Fractal", category: "Gabinetes/Cajas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Formato": "Mid Tower", "Panel Lateral": "Vidrio Templado", "Soporte Motherboard": "ATX, Micro-ATX", "Ventiladores incluidos": "3", "Rendimiento": 92, "Calidad": 95, "Relación calidad/precio": 90, "Ventajas": "Compartimiento oculto brillante, diseño sueco elegante.", "Desventajas": "Puerto USB-C frontal se vende por separado." }
  },

  // ================= CELULARES =================
  {
    id: 46, name: "Samsung Galaxy A54", brand: "Samsung", category: "Celulares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "6.4\" Super AMOLED 120Hz", "Procesador": "Exynos 1380", "RAM": "8GB", "Batería": "5000 mAh", "Cámara": "50MP OIS", "Rendimiento": 82, "Calidad": 92, "Relación calidad/precio": 85, "Ventajas": "Gran cámara, 4 años de soporte de software.", "Desventajas": "Carga algo lenta (25W)." }
  },
  {
    id: 47, name: "POCO X5 Pro", brand: "Xiaomi", category: "Celulares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "6.67\" AMOLED 120Hz", "Procesador": "Snapdragon 778G", "RAM": "8GB", "Batería": "5000 mAh", "Cámara": "108MP", "Rendimiento": 88, "Calidad": 80, "Relación calidad/precio": 92, "Ventajas": "Potente para gaming móvil, carga rápida 67W.", "Desventajas": "Mucho bloatware (apps basura preinstaladas)." }
  },
  {
    id: 48, name: "iPhone 13", brand: "Apple", category: "Celulares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "6.1\" OLED 60Hz", "Procesador": "A15 Bionic", "RAM": "4GB", "Batería": "3240 mAh", "Cámara": "12MP dual", "Rendimiento": 90, "Calidad": 95, "Relación calidad/precio": 80, "Ventajas": "Excelente optimización y ecosistema.", "Desventajas": "Pantalla de solo 60Hz." }
  },
  {
    id: 49, name: "iPhone 14 Pro", brand: "Apple", category: "Celulares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "6.1\" OLED 120Hz", "Procesador": "A16 Bionic", "RAM": "6GB", "Batería": "3200 mAh", "Cámara": "48MP", "Rendimiento": 98, "Calidad": 100, "Relación calidad/precio": 75, "Ventajas": "Dynamic Island, cámara suprema.", "Desventajas": "Precio premium muy elevado." }
  },
  {
    id: 50, name: "iPhone 15", brand: "Apple", category: "Celulares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "6.1\" OLED 60Hz", "Procesador": "A16 Bionic", "RAM": "6GB", "Batería": "3349 mAh", "Cámara": "48MP", "Rendimiento": 95, "Calidad": 98, "Relación calidad/precio": 82, "Ventajas": "Por fin incluye puerto USB-C.", "Desventajas": "Sigue siendo 60Hz." }
  },

  // ================= TABLETS =================
  {
    id: 51, name: "iPad Air (5ta Gen)", brand: "Apple", category: "Tablets", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "10.9\" Liquid Retina", "Procesador": "Apple M1", "Almacenamiento": "64GB", "Batería": "Hasta 10 horas", "Rendimiento": 98, "Calidad": 98, "Relación calidad/precio": 85, "Ventajas": "Rendimiento a nivel de laptop gracias al chip M1.", "Desventajas": "Versión base con muy poco almacenamiento (64GB)." }
  },
  {
    id: 52, name: "iPad (10ma Gen)", brand: "Apple", category: "Tablets", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "10.9\" Liquid Retina", "Procesador": "A14 Bionic", "Almacenamiento": "64GB", "Batería": "Hasta 10 horas", "Rendimiento": 90, "Calidad": 92, "Relación calidad/precio": 80, "Ventajas": "Diseño renovado y cámara frontal centrada.", "Desventajas": "Solo compatible con Apple Pencil de primera generación." }
  },
  {
    id: 53, name: "Galaxy Tab S7 FE", brand: "Samsung", category: "Tablets", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "12.4\" TFT", "Procesador": "Snapdragon 778G", "Almacenamiento": "64GB", "Batería": "10090 mAh", "Rendimiento": 85, "Calidad": 90, "Relación calidad/precio": 88, "Ventajas": "Incluye el S-Pen en la caja, pantalla enorme.", "Desventajas": "Panel TFT en vez de AMOLED." }
  },
  {
    id: 54, name: "Galaxy Tab A8", brand: "Samsung", category: "Tablets", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "10.5\" TFT", "Procesador": "Unisoc T618", "Almacenamiento": "64GB", "Batería": "7040 mAh", "Rendimiento": 75, "Calidad": 80, "Relación calidad/precio": 95, "Ventajas": "Excelente tablet económica para multimedia y niños.", "Desventajas": "Lenta para tareas pesadas." }
  },
  {
    id: 55, name: "Xiaomi Pad 5", brand: "Xiaomi", category: "Tablets", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Pantalla": "11\" IPS 120Hz", "Procesador": "Snapdragon 860", "Almacenamiento": "128GB", "Batería": "8720 mAh", "Rendimiento": 92, "Calidad": 90, "Relación calidad/precio": 98, "Ventajas": "Pantalla 120Hz brutal a un precio inigualable.", "Desventajas": "Sistema MIUI for Pad puede ser confuso." }
  },

  // ================= COMPUTADORAS =================
  {
    id: 56, name: "MacBook Air M2", brand: "Apple", category: "Computadoras", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "Apple M2", "RAM": "8GB Unificada", "Almacenamiento": "256GB SSD", "Pantalla": "13.6\"", "Rendimiento": 92, "Calidad": 98, "Relación calidad/precio": 85, "Ventajas": "Batería insuperable, diseño ligero.", "Desventajas": "Nada es actualizable." }
  },
  {
    id: 57, name: "ASUS TUF Gaming A15", brand: "ASUS", category: "Computadoras", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "Ryzen 7 6800H", "RAM": "16GB DDR5", "Almacenamiento": "512GB SSD", "Gráficos": "RTX 3050 Ti", "Rendimiento": 88, "Calidad": 85, "Relación calidad/precio": 90, "Ventajas": "Robusta y buena gráfica.", "Desventajas": "Pantalla deslavada." }
  },
  {
    id: 58, name: "Lenovo Legion 5", brand: "Lenovo", category: "Computadoras", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "Ryzen 7 5800H", "RAM": "16GB DDR4", "Almacenamiento": "1TB SSD", "Gráficos": "RTX 3060", "Rendimiento": 95, "Calidad": 95, "Relación calidad/precio": 88, "Ventajas": "El mejor enfriamiento en laptops gamer.", "Desventajas": "Adaptador de corriente es gigante." }
  },
  {
    id: 59, name: "HP Victus 15", brand: "HP", category: "Computadoras", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "Core i5-12450H", "RAM": "8GB DDR4", "Almacenamiento": "512GB SSD", "Gráficos": "GTX 1650", "Rendimiento": 78, "Calidad": 82, "Relación calidad/precio": 92, "Ventajas": "Muy económica para tareas y eSports.", "Desventajas": "La pantalla vibra mucho al teclear." }
  },
  {
    id: 60, name: "Acer Nitro 5", brand: "Acer", category: "Computadoras", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "Core i5-11400H", "RAM": "16GB DDR4", "Almacenamiento": "512GB SSD", "Gráficos": "RTX 3050", "Rendimiento": 82, "Calidad": 80, "Relación calidad/precio": 88, "Ventajas": "Fácil de expandir almacenamiento.", "Desventajas": "Diseño muy agresivo y de plástico." }
  },

  // ================= CONSOLAS =================
  {
    id: 61, name: "PlayStation 5 (Edición Digital)", brand: "Sony", category: "Consolas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Resolución Máxima": "4K", "Almacenamiento": "825GB SSD", "Control incluido": "DualSense", "Rendimiento": 95, "Calidad": 95, "Relación calidad/precio": 85, "Ventajas": "Exclusivos de Sony.", "Desventajas": "Sin lector de discos." }
  },
  {
    id: 62, name: "Xbox Series S", brand: "Microsoft", category: "Consolas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Resolución Máxima": "1440p", "Almacenamiento": "512GB SSD", "Control incluido": "Xbox Wireless", "Rendimiento": 80, "Calidad": 90, "Relación calidad/precio": 98, "Ventajas": "Perfecto para Game Pass.", "Desventajas": "Poco espacio." }
  },
  {
    id: 63, name: "Xbox Series X", brand: "Microsoft", category: "Consolas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Resolución Máxima": "4K", "Almacenamiento": "1TB SSD", "Control incluido": "Xbox Wireless", "Rendimiento": 98, "Calidad": 98, "Relación calidad/precio": 90, "Ventajas": "La consola más potente del mercado.", "Desventajas": "Exclusivos menos populares que PS." }
  },
  {
    id: 64, name: "Nintendo Switch OLED", brand: "Nintendo", category: "Consolas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Resolución Máxima": "1080p (TV)", "Almacenamiento": "64GB", "Control incluido": "Joy-Con", "Rendimiento": 70, "Calidad": 95, "Relación calidad/precio": 85, "Ventajas": "Pantalla OLED espectacular para portabilidad.", "Desventajas": "Hardware anticuado." }
  },
  {
    id: 65, name: "Nintendo Switch (Normal)", brand: "Nintendo", category: "Consolas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Resolución Máxima": "1080p (TV)", "Almacenamiento": "32GB", "Control incluido": "Joy-Con", "Rendimiento": 70, "Calidad": 88, "Relación calidad/precio": 82, "Ventajas": "Catálogo de Nintendo increíble.", "Desventajas": "Pantalla LCD regular." }
  },

  // ================= AURICULARES =================
  {
    id: 66, name: "HyperX Cloud II", brand: "HyperX", category: "Auriculares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sonido": "7.1 Virtual", "Conexión": "Cable / USB", "Micrófono": "Desmontable", "Rendimiento": 92, "Calidad": 95, "Relación calidad/precio": 98, "Ventajas": "Comodidad extrema y durabilidad comprobada.", "Desventajas": "Diseño anticuado." }
  },
  {
    id: 67, name: "Razer Kraken V3", brand: "Razer", category: "Auriculares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sonido": "THX Spatial Audio", "Conexión": "USB", "Micrófono": "Cardioide", "Rendimiento": 90, "Calidad": 88, "Relación calidad/precio": 85, "Ventajas": "Audio espacial muy inmersivo.", "Desventajas": "Son pesados." }
  },
  {
    id: 68, name: "Logitech G435", brand: "Logitech", category: "Auriculares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sonido": "Estéreo", "Conexión": "Bluetooth / Lightspeed", "Micrófono": "Integrado (Invisible)", "Rendimiento": 85, "Calidad": 85, "Relación calidad/precio": 95, "Ventajas": "Extremadamente ligeros (165g) e inalámbricos.", "Desventajas": "Micrófono de calidad regular." }
  },
  {
    id: 69, name: "Corsair HS80 RGB", brand: "Corsair", category: "Auriculares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sonido": "Dolby Atmos", "Conexión": "Inalámbrico (Slipstream)", "Micrófono": "Abatible omnidireccional", "Rendimiento": 95, "Calidad": 96, "Relación calidad/precio": 88, "Ventajas": "El mejor micrófono inalámbrico del mercado.", "Desventajas": "Batería dura poco (15 hrs)." }
  },
  {
    id: 70, name: "SteelSeries Arctis Nova 7", brand: "SteelSeries", category: "Auriculares", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Sonido": "Sonido Espacial 360", "Conexión": "Inalámbrico + Bluetooth", "Micrófono": "Retráctil con IA", "Rendimiento": 98, "Calidad": 98, "Relación calidad/precio": 82, "Ventajas": "Conexión simultánea a PC y Celular.", "Desventajas": "Costosos." }
  },

  // ================= SILLAS =================
  {
    id: 71, name: "Razer Iskur", brand: "Razer", category: "Sillas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Material": "Cuero Sintético multicapa", "Soporte Lumbar": "Integrado y esculpido", "Reposabrazos": "4D", "Capacidad": "136 kg", "Rendimiento": 95, "Calidad": 98, "Relación calidad/precio": 80, "Ventajas": "Soporte lumbar inigualable.", "Desventajas": "Asiento estrecho." }
  },
  {
    id: 72, name: "Corsair T3 Rush", brand: "Corsair", category: "Sillas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Material": "Tela transpirable", "Soporte Lumbar": "Cojín", "Reposabrazos": "4D", "Capacidad": "120 kg", "Rendimiento": 85, "Calidad": 90, "Relación calidad/precio": 92, "Ventajas": "La tela evita sudoración.", "Desventajas": "Ruedas plásticas básicas." }
  },
  {
    id: 73, name: "Respawn 110", brand: "Respawn", category: "Sillas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Material": "Cuero Sintético", "Soporte Lumbar": "Integrado fijo", "Reposabrazos": "Fijos acolchados", "Capacidad": "125 kg", "Rendimiento": 80, "Calidad": 80, "Relación calidad/precio": 95, "Ventajas": "Incluye reposapiés extendible.", "Desventajas": "Material calienta mucho." }
  },
  {
    id: 74, name: "X Rocker Pro Series", brand: "X Rocker", category: "Sillas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Material": "Cuero", "Soporte Lumbar": "Ergonómico de pedestal", "Reposabrazos": "Fijos", "Capacidad": "125 kg", "Rendimiento": 88, "Calidad": 85, "Relación calidad/precio": 85, "Ventajas": "Bocinas integradas en la cabecera.", "Desventajas": "Muy pesada e incómoda para escritorios altos." }
  },
  {
    id: 75, name: "AutoFull Pink Bunny", brand: "AutoFull", category: "Sillas", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Material": "Cuero PU (Piel sintética)", "Soporte Lumbar": "Cojín orejas de conejo", "Reposabrazos": "2D", "Capacidad": "150 kg", "Rendimiento": 85, "Calidad": 88, "Relación calidad/precio": 88, "Ventajas": "Diseño Kawaii muy popular.", "Desventajas": "Reposabrazos con poca movilidad." }
  },

  // ================= MICROCONTROLADORES =================
  {
    id: 76, name: "Arduino Uno R3", brand: "Arduino", category: "Microcontroladores", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "ATmega328P", "Pines I/O": "14 Digitales, 6 Análogos", "Voltaje": "5V", "Conectividad": "USB-B", "Rendimiento": 70, "Calidad": 95, "Relación calidad/precio": 100, "Ventajas": "La placa estándar para aprender robótica.", "Desventajas": "Poca memoria y sin Wi-Fi." }
  },
  {
    id: 77, name: "Raspberry Pi 4 (4GB)", brand: "Raspberry Pi", category: "Microcontroladores", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "Broadcom BCM2711 (Quad-core)", "Pines I/O": "40 GPIO", "Voltaje": "5V 3A (USB-C)", "Conectividad": "Wi-Fi, BT, Ethernet, 2x microHDMI", "Rendimiento": 98, "Calidad": 98, "Relación calidad/precio": 90, "Ventajas": "Es una mini computadora completa, corre Linux.", "Desventajas": "Requiere refrigeración." }
  },
  {
    id: 78, name: "ESP32 (NodeMCU)", brand: "Espressif", category: "Microcontroladores", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "Tensilica Xtensa Dual-Core", "Pines I/O": "30 GPIO", "Voltaje": "3.3V", "Conectividad": "Wi-Fi y Bluetooth Integrado", "Rendimiento": 90, "Calidad": 90, "Relación calidad/precio": 100, "Ventajas": "Rey del IoT (Internet de las Cosas), baratísimo.", "Desventajas": "Lógica de 3.3V puede quemar periféricos de 5V." }
  },
  {
    id: 79, name: "Arduino Nano", brand: "Arduino", category: "Microcontroladores", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "ATmega328P", "Pines I/O": "14 Digitales, 8 Análogos", "Voltaje": "5V", "Conectividad": "Mini-USB", "Rendimiento": 70, "Calidad": 92, "Relación calidad/precio": 95, "Ventajas": "Mismo poder que el Uno pero cabe en una protoboard.", "Desventajas": "Conector anticuado (Mini-USB)." }
  },
  {
    id: 80, name: "Raspberry Pi Pico", brand: "Raspberry Pi", category: "Microcontroladores", price: null, source: "Pendiente de verificar", updatedAt: "Sin precio verificado",
    image: null, demo: false,
    specs: { "Procesador": "RP2040 (Dual-core ARM Cortex-M0+)", "Pines I/O": "26 GPIO", "Voltaje": "3.3V", "Conectividad": "Micro-USB", "Rendimiento": 85, "Calidad": 95, "Relación calidad/precio": 100, "Ventajas": "Programable en MicroPython o C++, excelente silicio propio.", "Desventajas": "La versión normal no tiene Wi-Fi (se necesita la Pico W)." }
  }
];

export const products = [...catalogProducts, ...expandedCatalog].map(product => {
  const verified = verifiedCatalog[product.id];
  const photo = imageSources[product.id];
  const variant = variants[product.id];
  const offer = additionalOffers[product.id];
  return convertToQuetzales({
    currency: 'GTQ',
    priceStatus: 'unverified',
    ...product,
    ...([46, 47].includes(product.id) ? { gama: 'Media' } : {}),
    ...([48, 49, 50].includes(product.id) ? { gama: 'Alta' } : {}),
    sourceUrl: `https://www.pacifiko.com/index.php?route=product/search&search=${encodeURIComponent(product.name)}`,
    ...(product.sourceUrl ? { sourceUrl: product.sourceUrl } : {}),
    ...(photo ? { ...photo, image: `/images/product-${product.id}.jpg` } : {}),
    ...verified,
    ...variant,
    ...offer,
    name: productDisplayName(offer?.name || variant?.name || verified?.name || product.name),
    specs: { ...product.specs, ...variant?.specs, ...offer?.specs },
  }, exchangeRates);
});
