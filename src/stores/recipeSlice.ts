import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types/types"
import { FavoritesSliceType } from "./favoritesSlice"

export type RecipeSliceType = {
    categories: Categories                                          // state con las categorias de la API creada con infer de zod
    drinks: Drinks                                                  // state con recetas de la API
    selectedRecipe: Recipe                                          // state drink seleccionada
    modal: boolean                                                  // state del modal
    fetchCategories: () => Promise<void>                            // action de consulta de la API categorias
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>    // consulta de la API para las bebidas
    selectRecipe: (id: Drink['idDrink']) => Promise<void>           // consulta de la API para la receta
    closeModal: () => void                                          // action para cerrar modal
}

// funcion StateCreator para la creacion del slice del store
export const createRecipesSlice: StateCreator<RecipeSliceType & FavoritesSliceType, [], [], RecipeSliceType> = (set) => ({       // slice del store como funcion con argumento categories
    categories: {                                                   // valor inicial objeto con arreglo de drinks
        drinks: []
    },                                                              // state del slice categories
    drinks: {                                                       // la respuesta de la api contiene drinks{ drinks[]}
        drinks: []
    },
    selectedRecipe: {} as Recipe,                                   // inicia como un objeto prometiendo que es Recipe
    modal: false,
    fetchCategories: async () =>{
        const categories = await getCategories()                    // consulta la API y obtiene las categorias
        
        set({
            categories                                              // guarda en el state
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,                                         // guarda en el state selectedRecipe
            modal: true                                             // cambia modal y lo muestra
        })
    },
    closeModal: () => {
        set({
            modal: false,                                           // cerrar modal 
            selectedRecipe: {} as Recipe                           // borra contenido de receta
        })
    }
})