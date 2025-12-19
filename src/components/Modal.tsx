import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types/types';

export default function Modal() {

    const modal = useAppStore(state => state.modal)                                 // extrae el state de modal del slice
    const closeModal = useAppStore(state => state.closeModal)                       // funcion para cerrar
    const selectedRecipe = useAppStore(state => state.selectedRecipe)               // funcion para cerrar
    const handleClickFavorite = useAppStore(state => state.handleClickFavorite)     // funcion para cerrar
    const favoriteExists = useAppStore(state => state.favoriteExists)               // funcion para cerrar

    //function para ingredientes
    const renderIngredients = () =>{
        const ingredients: JSX.Element[] = []
        for( let i = 1; i <= 10; i++){
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]  // guarda el ingrediente numero i
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]        // guarda la medida numero i con index tipo atributo de Recipe

            if(ingredient && measure){                                              // si hay ingrediente y medida
                ingredients.push(                                                   // agrega al final del arreglo cada elemento <li>
                    <li key={i} className="text-lg font-normal">    
                        {ingredient} - {measure}                                    {/** ingrediente y cantidad */ }
                    </li>
                )
            }
        }   
        return ingredients;                                                         // retorna el array
    }

    return (
        <Fragment>
        <Transition appear show={modal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-70" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                        {selectedRecipe.strDrink}
                    </Dialog.Title>
                    <img
                        src={selectedRecipe.strDrinkThumb}
                        alt={`imagen de ${selectedRecipe.strDrink}`}
                        className='mx-auto w-96'
                    />
                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                        Ingredientes y Cantidades
                    </Dialog.Title>
                    {renderIngredients()}
                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                        Instrucciones
                    </Dialog.Title>
                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                    <div className="mt-5 flex justify-between gap-4">
                        <button
                            className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500'
                            type='button'
                            onClick={closeModal}
                        >Cerrar</button>

                        <button
                            className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500'
                            type='button'
                            onClick={() => {
                                handleClickFavorite(selectedRecipe)
                                closeModal()
                            }}
                        >{favoriteExists(selectedRecipe.idDrink) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}</button>    {/**muestra condicionalmente el texto */}
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </Fragment>
    ) 
}