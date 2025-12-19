import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useAppStore } from "../stores/useAppStore"
import { useEffect } from "react"
import Notification from "../components/Notification"

export default function Layout() {
    const loadFromStorage = useAppStore(state => state.loadFromStorage) // extrae funcion de LS
    useEffect(() => {
        loadFromStorage()                                               // carga de LS los favoritos guardados
    }, []);
    return (

        <>
            <Header/>
            
            <main className="container mx-auto py-16">
                <Outlet/>       {/**inyeccion de la aplicación */}
            </main>
            <Modal/>
            <Notification />
        </>
       

  )
}
