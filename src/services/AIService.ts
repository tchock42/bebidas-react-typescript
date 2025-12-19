import { streamText } from "ai"
import { openrouter } from "../lib/ai"

export default{
    async createRecipe(prompt: string){
        // consulta a openrouter.ai

        const response = streamText({
            model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            system: 'Eres un bartender que tiene 50 años de experiencia',
            temperature: 0.5,
            prompt
        });
        return response.textStream

    }
}