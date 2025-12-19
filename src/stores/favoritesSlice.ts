import { StateCreator } from "zustand";
import { Recipe } from "../types/types";
import { createRecipesSlice, RecipeSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {                                                  // type del slice
    favorites: Recipe[];                                                            // array de favoritos
    handleClickFavorite: (recipe: Recipe) => void                                   // agrega y elimina favoritos en favorites
    favoriteExists: (id: Recipe['idDrink']) => boolean                              // detecta si existe una bebida en favorites
    loadFromStorage: () => void                                                     // carga del LS los favoritos previamente guardados ahi
}


export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({      // creacion del slice
    favorites: [],                                                                          // array de favoritos valor inicial
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)){                                           // si ya existe en favoritos, se elimina | usa el otro action de este slice
            // console.log('Si existe')
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)  // filtra los objetos que no tengan el id seleccionado
            }))
            createNotificationSlice(set, get, api).showNotification({                            // activa notificación
                text:'Se eliminó de favoritos', 
                error:false
            })
 
        }else{                                                  // si no existe en favoritos se agrega
            // console.log('No existe')
            // set({                            
            //     favorites: [...get().favorites, recipe]                          // accede a favorites con get y lo modifica añadiendo recipe actual
            // })
            set((state) => ({                                                       // toma el state global y modifica favorites añadiendo recipe actual
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({                            // activa notificación
                text:'Se agregó a favoritos', 
                error:false
            })
        }
        createRecipesSlice(set, get, api).closeModal();                             // acceso al metodo closeModal del otro slice
        
        // Agregar a local Storage
        localStorage.setItem('favorites', JSON.stringify(get().favorites))          // accede a favorites mediante get y guarda en LS
    },
    favoriteExists: (id) => {                                                       // detecta si la bebida está en favoritos | retorna true o false
        return get().favorites.some( favorite => favorite.idDrink === id )          // toma el id de la bebida e itera en favoritos
    },

    // obtener favorites de LS
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');                  // carga de localStorage los favorites

        if(storedFavorites){                                                        // si hay algo en LS
            set({
                favorites: JSON.parse(storedFavorites)                              // entonces se guardan en el state
            })
        }
    }
})
