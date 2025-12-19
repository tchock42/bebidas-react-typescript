# Bebidas react + typescript + meta-llama

Este proyecto es una pequeña aplicación que consulta a la API de thecocktaildb para generar recetas a partir de una bebida alcólica.

Hace uso de tailwind, typescript, axios, zustand, react router dom, zod y una implementación de OpenRouter para chat con IA para generar recetas.

---

## 🚀 Tecnologías utilizadas
- [React](https://react.dev/) → Librería principal para la UI
- [Vite](https://vitejs.dev/) → Bundler rápido para desarrollo y build
- [TypeScript](https://www.typescriptlang.org/) → Tipado estático y robustez en el código
- **Zustand** → Gestor de estado de React
- **Zod** → Validación de la respuesta de la API
-  [Tailwind](https://tailwindcss.com/) → Framework CSS
-  [React Router Dom](https://reactrouter.com/en/main) → 

---

## 📂 Estructura del proyecto
src/ components/        # Componentes reutilizables (formularios, listas, etc.) 
__tests__/               # Realiza pruebas (por el momento sanity tests para probar el CI/CD)
layouts/                # Estructura principal del sitio
lib/                    # Funciones de utilidades 
pages/                  # Distintas visualizaciones: Favoritos, IA y página principal
schema/                 # Estructura de los datos recibidos para currencies y precios
types/                  # Tipos de datos
store/                  # Estructura de los datos de estado
services/               # Funciones para realizar consultas de la API
App.tsx                 # Componente principal main.tsx          # Punto de entrada

---

## ⚙️ Instalación y uso
1. Clonar el repositorio:
  ```bash
  git clone https://github.com/tchock42/cripto-react-zustand
  cd clima-react

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```
4. Generar el build de producción:
```bash
npm run build
```
5. Previsualizar build
```bash
npm run preview
```

## 🧪 Scripts disponibles
- npm run dev → entorno local con hot reload
- npm run build → build optimizado para producción
- npm run preview → servidor de preview del build
- npm run type-check → validación de tipos con TypeScript

## 🎯 Funcionalidades principales
- Formulario con información de país y ciudad
- Consulta mediante la api de Open Weather


## 📸 Demo
([Página en Vercel]())


