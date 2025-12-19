import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types/types"

type DrinkCardProps = {
    drink: Drink
}
const DrinkCard = ({drink}: DrinkCardProps) => {                    // recibe la bebida (no la receta)

    const selectRecipe = useAppStore(state => state.selectRecipe)
    return (
        <div className="border shadow-lg">
            <div className="overflow-hidden">
                <img 
                    src={drink.strDrinkThumb} 
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-110 transition-transform hover:rotate-3"
                />
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
                    type="button"
                    onClick={() => selectRecipe(drink.idDrink)}
                >Ver Receta</button>
            </div>
        </div>
  )
}

export default DrinkCard
