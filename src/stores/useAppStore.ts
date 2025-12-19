import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { createRecipesSlice, RecipeSliceType } from "./recipeSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";
import { AISliceType, createAIslice } from "./aislice";

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType & AISliceType>()(  // union de types de recipeSlice y FavoriteSlice
    devtools(
        (...a) => ({                                                        // creacion del hook principal del store
            ...createRecipesSlice(...a),                                    // trae una copia del slice createRecipesSlice
            ...createFavoritesSlice(...a),                                  // copia del slice de favoritos
            ...createNotificationSlice(...a),                               // copia del slice de notificaciones
            ...createAIslice(...a)                                          // copia del slice de generateAI
        })
    )
)