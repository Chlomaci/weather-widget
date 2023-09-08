import { createStore } from "vuex";
import IData from "@/types/types";

export default createStore({
  state: {
    // API data
    city_name: "",
    country: '',
    icon: '',
    temp: 0,
    feels_like: 0,
    wind: 0,
    pressure: 0,
    description: '',
    humidity: 0,
    visibility: 0,
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

      console.log(`setData city: ${state.city_name}`)
    },

    // setCachedCities(state, city: string) {
    //   if (state.citiesArr.length < 5) {
    //     state.citiesArr.unshift(city)
    //     } else {
    //     state.citiesArr.pop()
    //     state.citiesArr.unshift(city)
    //     }
    //   console.log(`cities arr is ${state.citiesArr}`)
    // }
  },
  actions: {
  },
  modules: {},
});
