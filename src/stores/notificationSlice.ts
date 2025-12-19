import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceType = {                                                       // type del slice
    notification: Notification                                                              // type con toda la información de la notificacion
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void               // funcion que texto y boleano para abrir una notificacion
    hideNotification: () => void                                                            // cerrar notification, no toma argumentos
}


export const createNotificationSlice: StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> = (set, get) => ({// creacion del slice y sus metodos
    notification: {                                                                         // valor inicial de notificación
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => {                                                        // muestra la notificacion usando el payload desde el componente
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 5000);
    },
    hideNotification: () => {                                                               // ocultar notificacion
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})