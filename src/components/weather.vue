<template>
  <transition name="fade" mode="out-in" >
    <div class="widget__weather" v-show="!isSettingsShowed">
      <div class="header__weather">
        <h3>{{ store.state.city_name ? store.state.city_name : 'Moscow' }}, {{ store.state.country }}</h3>
        <img :src="settings_svg" v-show="!store.state.isSettingsShowed" alt="settings" class="settings_img" @click="store.commit('changeSettings')" />
      </div>
      <div class="widget__temp">
        <img :src="store.state.icon" alt="temp" class="weather_img" />
        <h2 class="widget_celsius">{{ store.state.temp }}°C</h2>
      </div>
      <div class="widget__descr">
        Feels like {{ store.state.feels_like }}°C. {{ store.state.description }}.
      </div>
      <div class="widget__grid">
        <div class="widget__grid__item, wind">
          <img :src="wind_svg" alt="wind" class="wind_img" />
          <div>{{ store.state.wind }}m/s</div>
        </div>
        <div class="widget__grid__item, pressure">
          <img :src="pressure_svg" alt="pressure" class="pressure_img" />
          <div>{{ store.state.pressure }}hPa</div>
        </div>
        <div class="widget__grid__item">Humidity: {{ store.state.humidity }}%</div>
        <div class="widget__grid__item">Visibility: {{ store.state.visibility }}km</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {useLocation} from "@/hooks/useLocation";
import {useChangeSettings} from "@/hooks/useChangeSettings";
import {onMounted} from "vue";
import {useStore} from "vuex";
import wind_svg from "@/assets/wind.svg";
import pressure_svg from "@/assets/pressure.svg";
import settings_svg from "@/assets/settings.svg";

const store = useStore()

const {getActualLocationData, getLocationData} = useLocation();
const {isSettingsShowed} = useChangeSettings();

const checkLocalStorage = async () => {
  if (localStorage.city_name !== undefined) {
    console.log(`this is ${localStorage.city_name}`)
    store.commit('setLocalStorageCities', JSON.parse(localStorage.getItem('citiesArrStore') || ""))
    await getLocationData(localStorage.city_name);
  } else {
    console.log('cache is clear')
    navigator.geolocation.getCurrentPosition(async position => {
      await getActualLocationData(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude, position.coords.longitude, store.state.city_name)
    });
  }
}

onMounted(checkLocalStorage);

</script>

<style scoped lang="scss">
.widget {
  &__weather {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  }
  &__temp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
  &_celsius {
  font-size: 30px;
  }
  &__grid {
  display: grid;
  width: 115%;
  grid-template-columns: auto auto;
  column-gap: 5px;
  row-gap: 15px;
  }
}

.weather_img{
  width: 100px;
  height: 100px;
}

</style>

