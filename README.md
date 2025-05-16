# Combate Mortal

![Combate Mortal Logo](assets/images/Fondo-logo.jpg)

## 📋 Descripción

Combate Mortal es una aplicación web diseñada para gestionar batallas de rap. Esta plataforma ofrece herramientas para configurar diferentes formatos de batallas, seleccionar participantes y controlar el tiempo durante las competiciones.

## ✨ Características

- **Múltiples formatos de batalla:**
  - Minuto libre (60 segundos)
  - Temática (120 segundos con palabras aleatorias)
    - Sistema inteligente de palabras que evita repeticiones
    - Persistencia de palabras usadas entre sesiones
  - Minutos libre (120 segundos)

- **Selección de caracteres:**
  - Interfaz visual intuitiva
  - Soporte para imágenes y videos de los participantes

- **Temporizador avanzado:**
  - Visualización circular del tiempo restante
  - Efectos visuales durante la cuenta regresiva
  - Contenedor de palabras temáticas con efecto cristal semitransparente
  - Control por teclado (espacio para iniciar, retroceso para reiniciar, escape para volver)
  - Botones con estilo visual consistente

- **Interfaz responsive:**
  - Adaptable a diferentes dispositivos y tamaños de pantalla
  - Optimizada para rendimiento en dispositivos móviles

## 🏗️ Arquitectura

El proyecto ha sido refactorizado siguiendo los principios SOLID y las mejores prácticas de código limpio:

### Estructura de directorios

```
combate-mortal/
├── assets/            # Recursos estáticos (imágenes, videos)
├── css/               # Estilos modularizados
│   ├── base/          # Estilos base (reset, variables)
│   ├── components/    # Estilos de componentes
│   ├── layout/        # Estilos de layout
│   └── pages/         # Estilos específicos de página
├── data/              # Datos de la aplicación
├── js/                # JavaScript modularizado
│   ├── components/    # Componentes reutilizables
│   ├── modules/       # Módulos funcionales
│   └── utils/         # Utilidades
├── index.html         # Página principal
└── contador.html      # Página del temporizador
```

### Principios SOLID implementados

- **S (Responsabilidad Única):** Cada clase tiene una sola responsabilidad.
- **O (Abierto/Cerrado):** Los componentes se pueden extender sin modificar su código.
- **L (Sustitución de Liskov):** Los componentes pueden ser reemplazados por otros sin afectar la funcionalidad.
- **I (Segregación de Interfaces):** Se definen interfaces limpias entre componentes.
- **D (Inversión de Dependencias):** Las dependencias se pasan a los constructores.

### Optimizaciones de rendimiento

- Lazy loading de imágenes
- Limpieza de recursos de video
- Debounce para eventos frecuentes
- Minimización de reflow y repaint
- Persistencia inteligente con localStorage para palabras temáticas

## 🚀 Instalación

1. Clone el repositorio:
   ```bash
   git clone https://github.com/tuusuario/combate-mortal.git
   cd combate-mortal
   ```

2. Abra el proyecto con un servidor web local:
   ```bash
   # Usando Python
   python -m http.server 8000
   
   # Usando Node.js
   npx serve
   ```

3. Acceda a la aplicación en su navegador:
   ```
   http://localhost:8000
   ```

## 🎮 Uso

1. **Página principal:**
   - Seleccione un formato de batalla
   - Escoja los participantes en ambos lados
   - Presione "¡FIGHT!" para iniciar la batalla

2. **Temporizador:**
   - El botón "Iniciar" comienza la cuenta regresiva
   - En el formato "Temática", se mostrará una palabra aleatoria sin repeticiones
   - Use "Reiniciar" para volver a empezar (mostrará una nueva palabra temática)
   - Use "Volver" para regresar a la selección

3. **Atajos de teclado:**
   - Espacio: Iniciar/Pausar temporizador
   - Retroceso: Reiniciar temporizador
   - Escape: Volver a la pantalla anterior

## 💻 Tecnologías utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (ES6+, Módulos)
- Lazy Loading API
- Intersection Observer API
- Web Storage API (localStorage)

## 📝 Créditos

Desarrollado como proyecto de refactorización para mejorar la estructura y mantenibilidad de la aplicación, siguiendo las mejores prácticas de desarrollo web moderno.

## 🆕 Actualizaciones recientes

- Mejora en el sistema de palabras temáticas (evita repeticiones entre sesiones)
- Estilo visual consistente para botones en la pantalla del temporizador
- Diseño semitransparente tipo cristal para el contenedor de palabras temáticas
- Mejoras de rendimiento y corrección de errores
