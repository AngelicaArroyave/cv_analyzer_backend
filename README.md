# 📄 CV Analyzer - Backend

Este repositorio contiene el código backend para el proyecto **Analizador de CV con IA**. Se trata de una API REST que permite cargar una hoja de vida (formato PDF) y una descripción de oferta laboral (Job Description) para generar una puntuación de compatibilidad y recomendaciones de mejora utilizando la inteligencia artificial de **Google Gemini**.

## 🚀 Características Principales
- **Procesamiento de PDF**: Extracción de texto desde archivos PDF subidos temporalmente en memoria usando `multer` y `pdf-parse`.
- **Integración con IA**: Conexión con el modelo de Gemini (`gemini-2.5-flash` por defecto) para un análisis semántico del perfil.
- **Respuestas Estructuradas**: Manejo de Prompts (Prompt Engineering) para garantizar que la IA responda con una estructura JSON estricta y fácilmente procesable.
- **Manejo Centralizado de Errores**: Middleware global para atrapar excepciones y mantener el servidor estable.

## 🛠️ Tecnologías Utilizadas
- **Entorno**: Node.js
- **Lenguaje**: TypeScript
- **Framework**: Express.js
- **IA**: `@google/generative-ai` (Gemini API)
- **Manejo de Archivos**: `multer`, `pdf-parse@1.1.1`
- **Ejecución de desarrollo**: `tsx`

## ⚙️ Requisitos Previos
- Node.js (v18 o superior recomendado)
- Una API Key válida de [Google AI Studio](https://aistudio.google.com/)

## 🔧 Instalación y Configuración

1. **Clonar el repositorio y entrar a la carpeta del backend:**
   ```bash
   cd cv_analyzer_backend
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo llamado `.env` en la raíz de este proyecto y añade tus credenciales.
   ```env
   PORT=3000
   GEMINI_API_KEY=tu_api_key_aqui
   GEMINI_MODEL=gemini-2.5-flash
   ```

4. **Ejecutar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```
   *El servidor se iniciará en `http://localhost:3000` (o el puerto configurado).*

## 🛣️ Endpoints de la API

### 1. Subir y procesar CV
- **Ruta:** `POST /api/upload-cv`
- **Descripción:** Recibe un archivo PDF, lo lee en memoria y devuelve el texto plano extraído.
- **Body (form-data):** 
  - `cvFile`: Archivo PDF
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "text": "Texto completo extraído del currículum...",
    "metadata": {
      "filename": "mi_cv.pdf",
      "size": 12345
    }
  }
  ```

### 2. Analizar Perfil con IA
- **Ruta:** `POST /api/analyze`
- **Descripción:** Envía el texto del CV extraído y la oferta laboral a la API de Gemini para generar el análisis de compatibilidad.
- **Body (JSON):**
  ```json
  {
    "cvText": "Texto del CV extraído previamente...",
    "jobDescription": "Buscamos un desarrollador Node.js con experiencia en..."
  }
  ```
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "match_score": 85,
    "missing_keywords": ["TypeScript", "Pruebas Unitarias"],
    "improvement_suggestions": [
      {
        "section": "Experiencia",
        "suggestion": "Destaca los proyectos donde hayas utilizado TypeScript explícitamente."
      }
    ]
  }
  ```

## 📝 Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo usando `tsx watch` (detecta cambios y reinicia automáticamente).
- `npm run build`: Transpila el código TypeScript a JavaScript de producción en la carpeta `dist`.
- `npm start`: Inicia el servidor usando el código ya compilado para producción.
