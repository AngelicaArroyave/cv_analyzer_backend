import { GoogleGenerativeAI } from "@google/generative-ai"

process.loadEnvFile()

const API_KEY = process.env.GEMINI_API_KEY || ""
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash"

const initialPrompt = `
    Eres un experto reclutador ATS y asesor de carrera. Evalúa el siguiente CV contra la descripción del trabajo (Job Description).
    Tu respuesta DEBE ser ÚNICAMENTE un objeto JSON válido con la siguiente estructura (no incluyas markdown ni texto adicional):
        {
        "match_score": <número del 0 al 100 indicando el porcentaje de coincidencia>,
        "missing_keywords": [<array de strings con palabras clave o habilidades importantes que están en la oferta pero no en el CV>],
        "improvement_suggestions": [
            {
                "section": "<sección del CV a mejorar, ej: 'Experiencia', 'Resumen'>",
                "suggestion": "<recomendación específica para alinear el perfil con la oferta>"
            }
        ]
    }
`

export const getAnalysis = async (cvInformation: string, jobDescription: string) => {
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })
    const prompt = `
        ${initialPrompt}
        
        Job Description:
        ${jobDescription}
        
        CV:
        ${cvInformation}
    `

    try {
        const result = await model.generateContent(prompt)
        const response = await result.response
        let text = response.text().trim()
        text = text.replace(/^```(json)?\s*/i, '').replace(/\s*```$/i, '').trim();

        return JSON.parse(text)
    } catch (error) {
        throw new Error("Failed to analyze CV" + error)
    }
}