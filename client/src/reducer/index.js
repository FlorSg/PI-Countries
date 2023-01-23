import { 
    GET_COUNTRIES, 
    SEARCH_COUNTRY,  
    BY_CONTINENT, 
    BY_ORDER, 
    BY_POPULATION ,
    POST_ACTIVITY, 
    GET_ACTIVITY,
    BY_ACTIVITY,
    GET_DETAILS
} from '../actions/index'



const initialState = {
    countries : [], //el estado que renederizo y que se modifica
    allCountries: [], // copia del estado que siempre tiene todos los paises 
    activity: [],
    detail: {},

}

export default function rootReducer (state = initialState, action ){
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
        }
        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload
             }   
        case SEARCH_COUNTRY:
            return {
                ...state,
                countries: action.payload,

            }
        case POST_ACTIVITY:
            return {
                ...state,
                countries: action.payload,
            }
        case GET_ACTIVITY:
            return {
                ...state,
                activity: action.payload
            } 
        case BY_CONTINENT:
            const copCountries = state.allCountries;
            const continent =action.payload === "All" ? copCountries : copCountries.filter(e => e.continent === action.payload);
            return {
                ...state,
                countries: continent
            }
        case BY_ORDER:
            let orderCountries = [];
            if(action.payload === 'asc'){
                orderCountries = [...state.countries].sort((a,b) => a.name.localeCompare(b.name))
            }
            if(action.payload === 'desc'){
                orderCountries = [...state.countries].sort((a,b) => b.name.localeCompare(a.name))
            }
            if(action.payload === 'All'){
                orderCountries = state.allCountries;
            }
            return{
                ...state,
                countries: orderCountries
            }

        case BY_POPULATION:
            let orderPopulation = [...state.countries]
            orderPopulation = orderPopulation.sort((a,b) => {
                if (a.population > b.population){
                    return action.payload === 'Max' ? -1 : 1;
                }
                if (a.population < b.population){
                    return action.payload === 'Max' ? 1 : -1;
                } 
                return 0;
            })
            if(action.payload === 'All'){
                orderPopulation = state.allCountries;
            }
                return{
                    ...state,
                    countries: orderPopulation
                }     
        case BY_ACTIVITY:
            let copyCountries = state.allCountries;
            let activity = action.payload === 'All' ? copyCountries : copyCountries.filter(e => e.activities.some(e => e.name === action.payload))
            return{
                ...state,
                countries: activity
            }
            
        default:
            return state;
   }
}

