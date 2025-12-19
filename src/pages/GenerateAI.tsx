import { useAppStore } from "../stores/useAppStore"

const GenerateAI = () => {

    const showNotification = useAppStore(state => state.showNotification)   // extrae la funcion del store para setear la notificacion
    const generateRecipe = useAppStore(state => state.generateRecipe)
    const recipe = useAppStore(state => state.recipe)
    const isGenerating = useAppStore(state => state.isGenerating)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // validación
        const form = new FormData(e.currentTarget)
        const prompt = form.get('prompt') as string           // extrae el valor del name prompt

        if (prompt.trim() === ''){
            showNotification({
                text: 'La búsqueda no puede ir vacía',
                error: true,
            })
            return                  // sale del handleSubmit
        }

        // consultar la ia de openrouter
        await generateRecipe(prompt)     // generateRecipe está en el slide de ia
    }

    
    return (

        <>
            <h1 className="text-6xl text-center font-extrabold">Generar receta con IA</h1>

            <div className="max-w-4xl mx-auto">
                <form 
                    action=""
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-3 py-10"
                >
                    <div className="relative">
                        <input 
                            type="text" 
                            name="prompt"
                            className="border bg-white p-4 rounded-lg w-full border-slate-800"
                            placeholder="Genera una receta con ingredientes. Ej. Bebida con tequila y fresa"
                        />

                        <button
                            typeof="submit"
                            aria-label="Enviar"
                            className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${isGenerating ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={isGenerating}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                {isGenerating && <p className="text-center animate-blink">Generando...</p>}
                <div className="py-10 whitespace-pre-wrap">
                    {recipe}
                </div>
            </div>
        </>
    )
}

export default GenerateAI
