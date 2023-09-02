import { createStore } from "vuex";
import IData from "@/types/types";

export default createStore({
  state: {
    // API data
    api_key: "4f10d8ada7d0a9704cb516365e3b18e1",
    city_name: "",
    localStorageCity: '',
    localStorageCountry: '',
    citiesArr: [''],
    country: '',
    icon: '',
    temp: 0,
    feels_like: 0,
    wind: 0,
    pressure: 0,
    description: '',
    humidity: 0,
    visibility: 0,

    // Show data
    isLocalStorage: false,
  },
  getters: {},
  mutations: {
    setData(state, json:IData) {
      state.city_name = json.name;
      state.temp = Math.round(json.main.temp);
      state.feels_like = Math.round(json.main.feels_like);
      state.wind = json.wind.speed;
      state.pressure = json.main.pressure;
      state.icon = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      state.description = json.weather[0].description;
      state.humidity = json.main.humidity;
      state.visibility = json.visibility;
      state.country = json.sys.country;
    },
    setLocalStorage(state, city?: string, country?: string) {
      if (city && country) {
        state.localStorageCountry = country;
        state.localStorageCity = city;
      }
      state.isLocalStorage = true;
    },
    setCachedCities(state, city: string) {
      if (state.citiesArr.length < 5) {
        state.citiesArr.unshift(city)
        } else {
        state.citiesArr.pop()
        state.citiesArr.unshift(city)
        }
      console.log(`cities arr is ${state.citiesArr}`)
    }
  },
  actions: {
  },
  modules: {},
});
