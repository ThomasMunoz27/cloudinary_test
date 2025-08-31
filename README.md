# 🌐 Cloudinary Test - Frontend

Este es el **Frontend** del proyecto **Cloudinary Test**, una aplicación web desarrollada con **React + Vite** que permite a los usuarios registrarse, iniciar sesión y gestionar imágenes en la nube a través de **Cloudinary**.  

El frontend se comunica con el **Backend (Spring Boot)** mediante peticiones HTTP usando **Axios**, con un **Interceptor** configurado para manejar la autenticación con **JWT**.  

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React** con **Vite** como bundler
- 📡 **Axios** para peticiones HTTP
- 🔑 **Axios Interceptor** para manejar el token JWT automáticamente
- 🎨 **CSS Modules** para estilos encapsulados
- 🎉 **SweetAlert2** para notificaciones y alertas modernas

---

## ⚙️ Requisitos previos

Antes de ejecutar este proyecto, necesitas tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Tener corriendo el **Backend del proyecto** 👉 [Repositorio Backend](https://github.com/ThomasMunoz27/cloudinary_test_backend)

---

## 📦 Instalación

Clona el repositorio:


git clone https://github.com/ThomasMunoz27/cloudinary_test.git
cd cloudinary_test

Instala las dependencias:
npm install
# o
yarn install
Esto levantará la aplicación en:
👉 http://localhost:5173

🔗 Conexión con el Backend

Este frontend depende del backend para funcionar correctamente.
El backend debe estar levantado en el puerto correspondiente (por defecto http://localhost:8080).

Si necesitas cambiar la URL base de la API, revisa el archivo donde está configurado axios

📸 Funcionalidades principales

🔐 Autenticación con JWT (Registro / Login)

🖼️ Subir imágenes a Cloudinary desde el frontend

📂 CRUD de imágenes (crear, ver, borrar)

🏷️ Manejo de categorías y usuarios

📱 Interfaz responsive y amigable

⚡ Alertas dinámicas con SweetAlert2

## 🧑‍💻 Autor

👤 Thomas Muñoz

## 📜 Licencia

Este proyecto es de uso libre con fines educativos y demostrativos. 🚀
