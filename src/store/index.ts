import { createStore } from "vuex";
import {IData} from "@/types/types";
import {IStoreData} from "@/types/types";

export default createStore<IStoreData>({
  state: {
    // API data
    city_name: '',
    country: '',
    icon: '',
    temp: 0,
    feels_like: 0,
    wind: 0,
    pressure: 0,
    description: '',
    humidity: 0,
    visibility: 0,

    // booleans
    isSettingsShowed: false,
    isLocalStorage: false,

    //cache
    citiesArr: [],
  },
  getters: {},
  mutations: {
    setData(state, data:IData) {
      state.city_name = data.name;
      state.temp = Math.round(data.main.temp);
      state.feels_like = Math.round(data.main.feels_like);
      state.wind = data.wind.speed;
      state.pressure = data.main.pressure;
      state.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      state.description = data.weather[0].description;
      state.humidity = data.main.humidity;
      state.visibility = data.visibility;
      state.country = data.sys.country;
    },
    changeSettings(state) {
      state.isSettingsShowed = !state.isSettingsShowed;
    },
    setCachedCities(state) {
      if (state.citiesArr.length < 5) {
        state.citiesArr.unshift({city_name: state.city_name, country: state.country,});
      } else {
        state.citiesArr.pop();
        state.citiesArr.unshift({city_name: state.city_name, country: state.country,});
      }
      console.log(state.citiesArr)
    },
    setLocalStorage(state) {
      state.isLocalStorage = true;
    },
    setLocalStorageCities(state, localStorageArr) {
      state.citiesArr = localStorageArr;
      state.isLocalStorage = true;
    },
    deleteCachedCity(state, element) {
      const index = state.citiesArr.indexOf(element);
      state.citiesArr.splice(index, 1);
      localStorage.setItem('citiesArrStore', JSON.stringify(state.citiesArr));
    }
  },
  actions: {
  },
  modules: {},
});
