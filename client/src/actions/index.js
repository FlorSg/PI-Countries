import axios from 'axios';


export const GET_COUNTRIES = 'GET_COUNTRIES'; 
export const GET_DETAILS = 'GET_DETAILS';
export const BY_NAME = 'BY_NAME';
export const BY_ORDER = 'BY_ORDER';
export const BY_POPULATION = 'BY_POPULATION';
export const BY_CONTINENT = 'BY_CONTINENT';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const BY_ACTIVITY = 'BY_ACTIVITY'
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';


export function getCountries(){     //acá TODA la conexion entre el front y el back
    return async function(dispatch){   //es asincronico
        let res = await axios.get("http://localhost:3001/countries");
        return dispatch({   //ruta de get a countries
            type: GET_COUNTRIES,
            payload: res.data
        })
    }
}

export function searchCountries(name){
    return async function(dispatch){
        try{
        let res = await axios.get(`http://localhost:3001/countries?name=${name}`);
        return dispatch({
            type: SEARCH_COUNTRY,
            payload: res.data
        })
        }catch(error){
            console.log(error)
        }
    }
}

export function getActivity() {
    return async function (dispatch) {
        let res = await axios.get(`http://localhost:3001/activities`);
        return dispatch({
            type: GET_ACTIVITY,
            payload: res.data
        })
    }
}

export function postActivity(payload){
    return async function() {
        const res = await axios.post('http://localhost:3001/activities',payload);
        return res;
    }
}


export function getDetails(id){      
    return async function(dispatch){
        let res = await axios.get(`http://localhost:3001/countries/${id}`);
        return dispatch({   
            type: GET_DETAILS,
            payload: res.data
        })
 }
};

  export function byOrder(payload) {
    return {
        type: BY_ORDER,
        payload
    }
}

  export function byPopulation(payload) {
    return {
        type: BY_POPULATION,
        payload
    }
}
  
  export function byContinent(payload) {
    return {
        type: BY_CONTINENT,
        payload
    }
}

export function byActivity(payload) {
    return{
        type: BY_ACTIVITY,
        payload
    }
}



