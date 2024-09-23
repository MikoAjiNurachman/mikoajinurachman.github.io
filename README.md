<<<<<<< HEAD
# Miko Aji Nurachman | Software Engineer

Fullstack Developer thats familliar in Golang, Reactjs, and Kotlin Jetpack Compose

## 🙋‍♂️ About Me

* I'm a passionate web developer with a focus on full-stack development.
* I'm always eager to learn new technologies and implement them in my projects.
* I have experience in building responsive and user-friendly web applications.

## 🚀 Technologies I Use

### Mobile

* **Kotlin**
* **Framework/Library:** 
    * Jetpack Compose
    * Material-UI
* **API Management:** Retrofit
* **Dependency Injection:** Hilt

### Frontend

* **HTML5, CSS3, JavaScript (ES6+)**
* **Framework/Library:** 
    * React
    * shadcn-ui
* **CSS Preprocessor:** Sass/SCSS (or Less, Stylus, etc.)
* **State Management:** Redux

### Backend

* **Programming Language:** Golang, Node js(can do)
* **Framework:** Fiber
* **Database:** PostgreSQL, MySQL, Redis, Elastic, etc.)
* **ORM/Query Builder:** Gorm
* **Authentication:** JSON Web Tokens (JWT), Oauth
* **API Design:** RESTful API (or Grpc)
* **Testing:** Golang Testing

### Others

* **Version Control:** Git
* **Deployment:** Docker, Kubernetes, Nginx

## 📫 How to Reach Me

* [[LinkedIn]](https://www.linkedin.com/in/miko-aji-nurachman-653bb2201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
* [Link to your online portfolio (if you have one)]
* Email: mikoajin14@gmail.com

## ✨ Let's Collaborate!

I'm always open to collaboration opportunities or freelance projects. Feel free to reach out if you have any exciting ideas or need help with web development.
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
>>>>>>> 7311193 (first commit)
