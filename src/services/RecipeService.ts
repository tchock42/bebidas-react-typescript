import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../schema/recipe-schema"
import { Drink, SearchFilter } from "../types/types"

export async function getCategories(){                                          // consulta de categorias
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

    const {data} = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)                  // validacion con el schema

    if(result.success){
        return result.data
    }
}

export async function getRecipes(filters: SearchFilter) {                       // consulta las bebidas a apartir del ingrediente
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data} = await axios(url)
    
    const result = DrinksAPIResponse.safeParse(data)                            // validacion con el schema
    if(result.success){
        return result.data
    }
}

export async function getRecipeById(id: Drink['idDrink']){                      // consulta la receta de la bebida seleccionada
    const url = `http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}` 
    const {data} = await axios(url)
    
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])            // validación con el schema
    
    if(result.success){
        return result.data
    }
}