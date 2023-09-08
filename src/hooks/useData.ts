import {ref} from "vue";
import IData from "@/types/types";

export function useData() {

    const city_name = ref('')
    // const citiesArr = ref([''])
    const country = ref('')
    const icon = ref('')
    const temp = ref(0)
    const feels_like = ref(0)
    const wind = ref(0)
    const pressure = ref(0)
    const description = ref('')
    const humidity = ref(0)
    const visibility = ref(0)

    const setData = (json:IData) => {
        city_name.value = json.name;
        temp.value = Math.round(json.main.temp);
        feels_like.value = Math.round(json.main.feels_like);
        wind.value = json.wind.speed;
        pressure.value = json.main.pressure;
        icon.value = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
        description.value = json.weather[0].description;
        humidity.value = json.main.humidity;
        visibility.value = json.visibility;
        country.value= json.sys.country;
    }

    return {
        city_name, country, wind, temp, icon, feels_like, pressure, description, humidity, visibility, setData
    }
}