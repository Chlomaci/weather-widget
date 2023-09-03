import IData from "@/types/types";
import {useData} from "@/hooks/useData";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export  function useLocation() {
    const {setData} = useData();
    const {setLocalStorage} = useLocalStorage();
    const api_key = "4f10d8ada7d0a9704cb516365e3b18e1";

    async function getActualLocationData(lat: number, lon: number) {
        try {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
            ).then(response => response.json()
            ).then(json => {
                setData(json);
                // this.setCachedCities(json.name);
            })
        } catch (e) {
            console.log(e)
        }
    }

    async function getLocationData(city: string) {
        try {
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
            ).then(response => response.json()
            ).then(json => {
                setData(json);
                setLocalStorage(json.name, json.sys.country);
                // this.setCachedCities(json.name);
            })
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getActualLocationData, getLocationData
    }
}