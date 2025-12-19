// router de react-router-dom
import { lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
const FavoritesPage = lazy( () => import('./pages/FavoritesPage'))  // importa mas tarde favoritesPage
import Layout from './layouts/Layout'
import GenerateAI from './pages/GenerateAI'

function AppRouter(){
    return( // retorna un arbol de elementos JSX que representa la configuración de la app
            // Routes son las rutas de la aplicación
            // Route element={Layout/>} ruta que usa el componente layout, todos los componentes internos usaran layout
        <BrowserRouter>        
            <Routes>            
                <Route element={<Layout/>}>
                    <Route path='/' element={<IndexPage/>} index /> 
                    <Route path='/favoritos' element={              // rutas especificas, / y /favoritos
                        <Suspense fallback="Cargando...">
                            <FavoritesPage/>
                        </Suspense>
                    } /> 
                    <Route path='/generate' element={<GenerateAI/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter