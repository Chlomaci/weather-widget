<template>
  <h1>Weather widget</h1>
  <div class="widget">
    <transition name="fade" mode="out-in" >
      <div class="widget__weather" v-show="!isSettingsShowed">
        <div class="header__weather">
          <h3>{{ city_name ? city_name : 'Moscow' }}, {{ country }}</h3>
          <img :src="settings_svg" alt="settings" class="settings_img" @click="changeSettings" />
        </div>
        <div class="widget__temp">
          <img :src="icon" alt="temp" class="weather_img" />
          <h2 class="widget_celsius">{{ temp }}°C</h2>
        </div>
        <div class="widget__descr">
          Feels like {{ feels_like }}°C. {{ description }}.
        </div>
        <div class="widget__grid">
          <div class="widget__grid__item, wind">
            <img :src="wind_svg" alt="wind" class="wind_img" />
            <div>{{ wind }}m/s</div>
          </div>
          <div class="widget__grid__item, pressure">
            <img :src="pressure_svg" alt="pressure" class="pressure_img" />
            <div>{{ pressure }}hPa</div>
          </div>
          <div class="widget__grid__item">Humidity: {{ humidity }}%</div>
          <div class="widget__grid__item">Visibility: {{ visibility }}km</div>
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="widget__settings" v-show="isSettingsShowed">
        <div class="header__settings">
          <h3>Settings</h3>
          <img :src="close_svg" alt="close" class="settings_img" @click="changeSettings" />
        </div>
        <form name="addCityForm" @submit.prevent="computedData" >
          <h4>Add Location</h4>
          <div class="form__lastQuery" v-if="isLocalStorage" >
            <div class="query__data">
              <img :src="burger_svg" alt="burger" class="query__img" />
              <span class="city__name">{{localStorageCity}}, {{localStorageCountry}}</span>
            </div>
            <img :src="delete_svg" alt="delete" class="query__img" />
          </div>
          <div class="form__input">
            <input type="text" v-model="inputValue" @keypress.prevent.enter="changeSettings" placeholder="Type in the name of the place" />
            <button type="submit" class="form__submit" @click="changeSettings" >
              <img :src="enter_svg" alt="enter" class="settings_img" />
            </button>
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import store from "@/store";
import IData from "@/types/types";
import {mapState, mapMutations} from "vuex";

export default defineComponent({
  name: "WeatherWidget",
  store: store,
  data() {
    return {
      // svg icons
      settings_svg: require("./assets/settings.svg"),
      wind_svg: require("./assets/wind.svg"),
      pressure_svg: require("./assets/pressure.svg"),
      close_svg: require("./assets/close.svg"),
      enter_svg: require("./assets/enter.svg"),
      burger_svg: require("./assets/burger.svg"),
      delete_svg: require("./assets/delete.svg"),

      inputValue: '',

      // Show data
      isSettingsShowed: false,
    };
  },
  methods: {
    ...mapMutations({
      setData: 'setData',
      setLocalStorage: "setLocalStorage",
      setCachedCities: "setCachedCities",
    }),

    changeSettings() {
      if (!this.isSettingsShowed) {
        this.isSettingsShowed = true;
      } else {
        this.isSettingsShowed = false;
      }
    },

    async getActualLocationData(lat: number, lon: number) {
      try {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.api_key}&units=metric`
        ).then(response => response.json()
        ).then(json => {
          this.setData(json);
          this.setCachedCities(json.name);
        })
      } catch (e) {
        console.log(e)
      }
    },

    async getLocationData(city: string) {
      try {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_key}&units=metric`
        ).then(response => response.json()
        ).then(json => {
          this.setData(json);
          this.setLocalStorage(json.name, json.sys.country);
          this.setCachedCities(json.name);
        })
      } catch (e) {
        console.log(e)
      }
    },
  },

  mounted() {
    if (localStorage.city_name) {
      this.setLocalStorage(localStorage.city_name, localStorage.country)
      console.log(`this is ${this.localStorageCity}`)
      this.getLocationData(this.localStorageCity);
    } else {
      console.log('cache is clear')
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude)
        this.getActualLocationData(position.coords.latitude, position.coords.longitude);
      });
    }
  },

  computed: {
    ...mapState(['city_name',  "localStorageCountry", "localStorageCity", "country", "humidity", "pressure",
      "visibility", "temp", "icon", "feels_like", "wind", "description", "api_key", "isLocalStorage"]),

    computedData() {
      this.getLocationData(this.inputValue);
    }
  },

  watch: {
    city_name(newName) {
      localStorage.city_name = newName;
    },
    country(newCountry) {
      localStorage.country = newCountry;
    }
  }

});
</script>

<style lang="scss">
*{
  font-family: "Calibri Light";
}

h3 {
  margin: 0px;
}

h4 {
  margin: 15px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.widget {
  background: rgba(145, 202, 255, 0.2);
  border-radius: 12px;
  border: 4mm ridge rgba(255, 255, 255, .6);
  padding: 20px;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  height: 300px;
  width: 200px;
  font-size: 18px;
  &__weather{
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
    //width: 115%;
    grid-template-columns: auto auto;
    column-gap: 5px;
    row-gap: 15px;
  }
  &__settings{
    width: 100%;
    height: 100%;
  }
}

.header{
  &__weather,
  &__settings{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.settings_img,
.wind_img,
.pressure_img {
  width: 30px;
  height: 30px;
}

.query__img{
  width: 20px;
  height: 20px;
}

.weather_img{
  width: 100px;
  height: 100px;
}

.wind,
.pressure {
  display: flex;
  div{
    margin-left: 2px;
  }
}

.form {
  &__input{
    display: flex;
    justify-content: space-between;
    input {
      position: relative;
      height: 20px;
      width: 90%;
      padding: 5px;
    }
    img{
      margin-left: 3px;
    }
  }
  &__submit{
    background-color: transparent;
    border: none;
  }
  &__lastQuery {
    background-color: #e2dfdf;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 7px;
    border-radius: 5px;
  }
}

.query__data{
  display: flex;
  align-items: center;
}

.city__name {
  margin-left: 5px;
}

</style>
