import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"


const Header = () => {
    const [searchFilters, SetSearchFilters] = useState({            // state para guardar el ingrediente y categoria
        ingredient: '',
        category: ''
    })

    const {pathname} = useLocation()                                // accede al pathname mediante location.pathname
    
    const isHome = useMemo( () => pathname === '/' , [pathname])    // detecta si está en home
    
    const fetchCategories = useAppStore(state => state.fetchCategories)     // extrae del slice la funcion de consulta API
    const categories = useAppStore(state => state.categories)               // extrae las categorias consultadas
    const searchRecipes = useAppStore(state => state.searchRecipes)         // extrae la funcion para consulta de recetas con la API
    const showNotification = useAppStore(state => state.showNotification)
    
    
    useEffect(() => {
        fetchCategories()                                                   // consulta la API cuando la app carga
    }, [fetchCategories]);  // [] genera error de lint de exhaustive-deps, [fetchCategories] es estable porque viene de store

    // funcion para modificar state local al escribir en el input y select
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {   
        SetSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value,
        })
    }

    // funcoin para el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validacion
        if(Object.values(searchFilters).includes('')){
            // notificacion de error
            showNotification({                              // atributos del payload
                text: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }
        // consultar las recetas
        searchRecipes(searchFilters)
    }

    return (
        <header className={ isHome ? ' bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="logotipo" className='w-32' />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink 
                            to="/"
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                        >Inicio</NavLink>
                        <NavLink 
                            to="/favoritos"
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}  
                        >Favoritos</NavLink> 
                        <NavLink 
                            to="/generate"
                            className={({isActive}) => 
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}  
                        >Generar con IA</NavLink> 
                    </nav>
                </div>

                {isHome && (                        /** Formulario de bebidas */
                    <form 
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label 
                                htmlFor="ingredient" 
                                className="block text-white uppercase font-extrabold text-lg"
                                >Nombre o Ingredientes</label>

                            <input 
                                type="text" 
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                value={searchFilters.ingredient}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-4">
                            <label 
                                htmlFor="category" 
                                className="block text-white uppercase font-extrabold text-lg"
                                >Nombre o Ingredientes</label>

                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                value={searchFilters.category}
                                onChange={handleChange}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(drink => (                       // iteración en el array categories.drinks
                                    <option 
                                        key={drink.strCategory} 
                                        value={drink.strCategory}
                                    >{drink.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="submit" 
                            value="Buscar Recetas"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}

export default Header
