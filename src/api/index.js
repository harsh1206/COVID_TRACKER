import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    
    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`
    }

    try{
        
        const {data :{confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        console.log("hello")
        return { confirmed, recovered, deaths, lastUpdate };

    }catch(err){
        console.log('ERROR',err);
    }
       
}

export const fetchDailyData = async () =>{
     
    try{
        const {data} = await axios.get(`${url}/daily`);

        const modifiedData = data.map( (DailyData) => ({
            confirmed:DailyData.confirmed.total,
            deaths:DailyData.deaths.total,
            date:DailyData.reportDate
        }))

        return modifiedData;

    }catch(err){

    }

}

export const fetchCountries = async() => {
  
    try{
       const { data: {countries}} = await axios.get (`${url}/countries`);
       
       return countries.map((country)=> country.name)
    }catch(err){

    }
    
}