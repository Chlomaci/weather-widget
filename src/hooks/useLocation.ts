import IData from "@/types/types";
import {useData} from "@/hooks/useData";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useStore} from "vuex";

export  function useLocation() {
    const {setData} = useData();
    const {setLocalStorage} = useLocalStorage();
    const api_key = "4f10d8ada7d0a9704cb516365e3b18e1";

    const store = useStore()

    async function getActualLocationData(lat: number, lon: number): Promise<IData> {
        return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(resp => resp.json())
            .catch(e => console.log(e)
            )as IData;
    }
    // async function getActualLocationData(lat: number, lon: number) {
    //     await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    //         .then(resp => resp.json())
    //         .then(data => store.commit('setData', data))
    //         .catch(e => console.log(e)
    //         );
    // }

    async function getLocationData(city: string): Promise<IData>  {
        return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
            ).then(resp => resp.json())
             .catch(e => console.log(e)) as IData;
    }

    return {
        getActualLocationData, getLocationData
    }
}