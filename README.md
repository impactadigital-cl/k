# KARINNA G. — PORTFOLIO 2026

Sitio web estático HTML/CSS/JS, diseñado con una dirección editorial minimalista y responsive.

## Estructura

- `index.html` — Home, About, Servicios, Skills, videos/reels, marcas y contacto.
- `portfolio.html` — Portfolio curado con proyectos del PDF 2026.
- `shop.html` — Productos digitales, cursos, consultoría y servicios.
- `consultoria.html` — Masterclasses y consultoría para personas y empresas.
- `css/style.css` — Sistema visual completo.
- `js/main.js` — Menú móvil, scroll reveal, header, microinteracciones y formulario.
- `assets/videos/` — 9 mockups SVG reemplazables por videos 9:16.
- `assets/portfolio/` — Imágenes renderizadas desde el portfolio PDF.
- `assets/portfolio-source.pdf` — PDF original aportado.
- `assets/images/reference.jpg` — Imagen de referencia visual.

## Cómo reemplazar los mockups por videos

En `index.html`, busca cada bloque `<article class="video-card ...">` y cambia la imagen SVG por:

`<video src="assets/videos/mi-video.mp4" muted loop playsinline controls></video>`

También puedes dejar una imagen `poster` si quieres una carga inicial más cuidada.

## Formulario

El formulario usa `mailto:` hacia `karinna.gonzalez@gmail.com` para funcionar sin backend. Para producción, conviene conectarlo a Formspree, Resend, Brevo, un endpoint propio o el CRM que utilices.

## Dirección visual

Paleta inspirada en la referencia: carbón, hueso, beige cálido, taupe y gris suave.
Tipografía: Playfair Display para titulares editoriales + DM Sans / DM Mono para interfaz.

## Contenido

El contenido de experiencia y proyectos se basa en el portfolio 2026 aportado. Skills nuevas como IA avanzada y automatización fueron incorporadas según el brief de actualización solicitado.

## Publicación

Puedes abrir `index.html` directamente o subir toda la carpeta a GitHub/Vercel/Netlify.
