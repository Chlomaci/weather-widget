import {ref} from "vue";

export function useLocalStorage(city?: string, country?: string) {
    const localStorageCountry = ref('');
    const localStorageCity = ref('');
    const isLocalStorage = ref(false);

    const setLocalStorage = (city?: string, country?: string) => {
        if (city && country) {
            localStorageCountry.value = country;
            localStorageCity.value = city;
        }
        isLocalStorage.value = true;
    }

    return  {
        localStorageCountry, localStorageCity, isLocalStorage, setLocalStorage
    }
}