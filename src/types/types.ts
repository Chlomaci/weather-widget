export interface IData {
    "coord": {
        "lon": number,
        "lat": number
    },
    "weather": [
        {
            "id": number,
            "main": string,
            "description": string,
            "icon": string
        }
    ],
    "base": string,
    "main": {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "humidity": number,
        "sea_level": number,
        "grnd_level": number
    },
    "visibility": number,
    "wind": {
        "speed": number,
        "deg": number,
        "gust": number
    },
    "clouds": {
        "all": number
    },
    "dt": number,
    "sys": {
        "type": number,
        "id": number,
        "country": string,
        "sunrise": number,
        "sunset": number
    },
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number
}

export interface IStoreData{
    city_name: string,
    country: string,
    icon: string,
    temp: number,
    feels_like: number,
    wind: number,
    pressure: number,
    description: string,
    humidity: number,
    visibility: number,

    // isLocalStorage: boolean,
    isSettingsShowed: boolean,
    isLocalStorage: boolean,

    citiesArr: [{
        city_name: string,
        country: string,
    }?],
}