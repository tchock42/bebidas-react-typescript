import {z} from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFilterSchema } from '../schema/recipe-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>        // type de categorias de la API

export type SearchFilter = z.infer<typeof SearchFilterSchema>               // type de informacion del form

export type Drinks = z.infer<typeof DrinksAPIResponse>                      // type de recetas obtenidas de la API

export type Drink = z.infer<typeof DrinkAPIResponse>                        // type de una sola receta

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>                // type de drink seleccionada para ver receta 