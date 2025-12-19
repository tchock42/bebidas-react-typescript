import { StateCreator } from "zustand";
import AIService from "../services/AIService";

export type AISliceType = {     // definicion de estados y funciones
    recipe: string,
    isGenerating: boolean,
    generateRecipe: (prompt: string) => Promise<void>   // no retorna nada pero es asyncrona
}

// creacion del slice
export const createAIslice: StateCreator<AISliceType> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => { 
       
        set({recipe: '', isGenerating: true})   // limpia recipe y el dom para una nueva receta, isGEneration pasa a true para inhabilitar el botón
        const data = await AIService.createRecipe(prompt)
        for await (const textPart of data){ // itera mientras data tenga elementos llamados textPart
            set( (state => ({
                recipe: state.recipe + textPart     // concatena el texto en stream
            })))
        }
        set({isGenerating:false})
    }
})