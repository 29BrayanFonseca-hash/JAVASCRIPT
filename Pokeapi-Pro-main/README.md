# 🧢 PokeAPI | Trainer Edition

Aplicación web interactiva que consume la API pública de PokéAPI para mostrar los primeros 151 Pokémon (Generación I) con búsqueda dinámica y panel de detalles estilizado.

Diseñada con HTML, CSS y JavaScript Vanilla, enfocada en rendimiento, diseño moderno y experiencia responsive.

---

## 🚀 Demo

Puedes desplegar el proyecto fácilmente en:

- **GitHub Pages**
- **Netlify**
- **Vercel**

> Solo necesitas servir archivos estáticos.

---

## 📸 Características

- ✅ Carga los primeros 151 Pokémon
- ✅ Renderizado dinámico de tarjetas
- ✅ Panel lateral con estadísticas completas
- ✅ Búsqueda en tiempo real por nombre o ID
- ✅ Colores dinámicos según tipo
- ✅ Diseño responsive (desktop y móvil)
- ✅ Animaciones suaves en barras de estadísticas
- ✅ Lazy loading de imágenes

---

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Custom Properties + Glassmorphism)
- JavaScript ES6+
- Fetch API
- [PokéAPI](https://pokeapi.co/)

---

## 📂 Estructura del Proyecto

```plaintext
📦 pokeapi-trainer-edition
┣ 📜 index.html
┣ 📜 style.css
┣ 📜 app.js
┗ 📁 resources
  ┗ pokebola.ico
```

---

## ⚙️ Instalación y Uso

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/pokeapi-trainer-edition.git
```

2. Entra al directorio:

```bash
cd pokeapi-trainer-edition
```

3. Abre `index.html` en tu navegador.

> No requiere instalación de dependencias ni servidor backend.

---

## 🧠 Funcionamiento Interno

### 1️⃣ Carga Inicial

Se realiza una petición a:

```plaintext
https://pokeapi.co/api/v2/pokemon?limit=151
```

Luego se cargan en paralelo los detalles de cada Pokémon y se almacenan en memoria para permitir filtrado local sin nuevas peticiones.

### 2️⃣ Renderizado de Tarjetas

Cada tarjeta muestra:

- Imagen sprite
- Número formateado (ej: `N.º 001`)
- Nombre en mayúsculas
- Al hacer clic → se renderiza el panel de detalles

### 3️⃣ Panel de Detalles

Incluye:

- Imagen oficial
- Tipos con colores dinámicos
- Peso y altura
- Estadísticas base con barras animadas
- Color del borde dinámico según tipo principal

### 4️⃣ Buscador en Tiempo Real

Filtra localmente por:

- Nombre (coincidencia parcial)
- ID exacto

Sin nuevas llamadas a la API.

---

## 🎨 Sistema de Colores por Tipo

Se utilizan variables CSS personalizadas (`--fire`, `--water`, `--grass`, `--electric`, ...) mapeadas dinámicamente en `app.js` para estilizar badges de tipos, barras de estadísticas y el borde del panel.

---

## 📱 Responsive Design

- **Pantallas < 850px:** diseño en columna, panel de detalles arriba.
- **Móviles < 600px:** se ocultan imágenes en las cards y layout más compacto.

---

## 📈 Posibles Mejoras Futuras

- 🔄 Paginación o carga infinita
- ⭐ Sistema de favoritos (LocalStorage)
- 🌙 Modo claro/oscuro
- 🎵 Sonidos retro al seleccionar Pokémon
- 🧬 Filtro por tipo
- ⚡ Mejora de rendimiento con cache persistente

---

## 📝 Licencia

Este proyecto es de uso libre con fines educativos y demostrativos. Los datos pertenecen a [PokéAPI](https://pokeapi.co/).

---

## 👨‍💻 Autor
Desarrollado por Cristian Diaz - **Trainer en Desarrollo de Software**

Desarrollado como proyecto frontend para práctica de consumo de APIs y manipulación del DOM.

---


<p align="center">
  <img width="300" src="https://i.imgur.com/YYf2LgH.png" alt="Logo del autor">
</p>

---
<p align="center">
  2026
</p> 
---
## ⭐ Si te gustó el proyecto...

¡Dale una estrella al repositorio y compártelo!