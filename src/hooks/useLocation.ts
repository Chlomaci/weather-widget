import {useStore} from "vuex";

export  function useLocation() {
    const api_key = "4f10d8ada7d0a9704cb516365e3b18e1";
    const store = useStore()

    // async function getActualLocationData(lat: number, lon: number): Promise<IData> {
    //     return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    //         .then(resp => resp.json())
    //         .catch(e => console.log(e)
    //         )as IData;
    // }
    async function getActualLocationData(lat: number, lon: number) {
        return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(resp => resp.json())
            .then(data => {
                store.commit('setData', data);
                localStorage.citiesArr = [{}];
            })
            .catch(e => console.log(e)
            );
    }

    // async function getLocationData(city: string): Promise<IData>  {
    //     return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    //         ).then(resp => resp.json())
    //          .catch(e => console.log(e)) as IData;
    // }

    async function getLocationData(city: string) {
        return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        ).then(resp => resp.json())
            .then(data => {
                store.commit('setData', data);
                localStorage.city_name = store.state.city_name;
                localStorage.country = store.state.country;
                if (checkTheSameCity(store.state.citiesArr, data.name)) {
                    return
                } else {
                    store.commit('setCachedCities');
                    localStorage.setItem('citiesArrStore', JSON.stringify(store.state.citiesArr));
                }
            })
            .catch(e => console.log(e));
    }

    const checkTheSameCity = (citiesArr: [{city_name: string, country: string}], city_name: string): boolean => {
        if (citiesArr.some(e => e.city_name === city_name)) {
            return true;
        }
        return false;
    }

    return {
        getActualLocationData, getLocationData
    }
}