import {ref} from "vue";

export function useChangeSettings() {
    const isSettingsShowed = ref(false);

    const changeSettings = () => {
        isSettingsShowed.value = !isSettingsShowed.value;
    }

    return {
        isSettingsShowed, changeSettings
    }
}