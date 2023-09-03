<script lang="ts" setup>
import Weather from "@/components/weather.vue";
</script>

<template>
  <h1>Weather widget</h1>
  <div class="widget">
<!--    <transition name="fade" mode="out-in" >-->
<!--      <div class="widget__weather" v-show="!isSettingsShowed">-->
<!--        <div class="header__weather">-->
<!--          <h3>{{ city_name ? city_name : 'Moscow' }}, {{ country }}</h3>-->
<!--          <img :src="settings_svg" alt="settings" class="settings_img" @click="changeSettings" />-->
<!--        </div>-->
<!--        <div class="widget__temp">-->
<!--          <img :src="icon" alt="temp" class="weather_img" />-->
<!--          <h2 class="widget_celsius">{{ temp }}°C</h2>-->
<!--        </div>-->
<!--        <div class="widget__descr">-->
<!--          Feels like {{ feels_like }}°C. {{ description }}.-->
<!--        </div>-->
<!--        <div class="widget__grid">-->
<!--          <div class="widget__grid__item, wind">-->
<!--            <img :src="wind_svg" alt="wind" class="wind_img" />-->
<!--            <div>{{ wind }}m/s</div>-->
<!--          </div>-->
<!--          <div class="widget__grid__item, pressure">-->
<!--            <img :src="pressure_svg" alt="pressure" class="pressure_img" />-->
<!--            <div>{{ pressure }}hPa</div>-->
<!--          </div>-->
<!--          <div class="widget__grid__item">Humidity: {{ humidity }}%</div>-->
<!--          <div class="widget__grid__item">Visibility: {{ visibility }}km</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </transition>-->
    <Weather />
<!--    <transition name="fade" mode="out-in">-->
<!--      <div class="widget__settings" v-show="isSettingsShowed">-->
<!--        <div class="header__settings">-->
<!--          <h3>Settings</h3>-->
<!--          <img :src="close_svg" alt="close" class="settings_img" @click="changeSettings" />-->
<!--        </div>-->
<!--        <form name="addCityForm" @submit.prevent="computedData" >-->
<!--          <h4>Add Location</h4>-->
<!--          <div class="form__lastQuery" v-if="isLocalStorage" >-->
<!--            <div class="query__data">-->
<!--              <img :src="burger_svg" alt="burger" class="query__img" />-->
<!--              <span class="city__name">{{localStorageCity}}, {{localStorageCountry}}</span>-->
<!--            </div>-->
<!--            <img :src="delete_svg" alt="delete" class="query__img" />-->
<!--          </div>-->
<!--          <div class="form__input">-->
<!--            <input type="text" v-model="inputValue" @keypress.prevent.enter="changeSettings" placeholder="Type in the name of the place" />-->
<!--            <button type="submit" class="form__submit" @click="changeSettings" >-->
<!--              <img :src="enter_svg" alt="enter" class="settings_img" />-->
<!--            </button>-->
<!--          </div>-->
<!--        </form>-->
<!--      </div>-->
<!--    </transition>-->
  </div>
</template>

<style lang="scss">
*{
  font-family: "Calibri Light";
}

//h3 {
//  margin: 0px;
//}

h4 {
  margin: 15px 0;
}

//.fade-enter-active,
//.fade-leave-active {
//  transition: opacity 0.5s ease;
//}
//
//.fade-enter-from,
//.fade-leave-to {
//  opacity: 0;
//}

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
  //&__weather{
  //  display: flex;
  //  flex-direction: column;
  //  justify-content: space-between;
  //  height: 100%;
  //}
  //&__temp {
  //  display: flex;
  //  justify-content: space-between;
  //  align-items: center;
  //}
  //&_celsius {
  //  font-size: 30px;
  //}
  //&__grid {
  //  display: grid;
  //  //width: 115%;
  //  grid-template-columns: auto auto;
  //  column-gap: 5px;
  //  row-gap: 15px;
  //}
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

//.weather_img{
//  width: 100px;
//  height: 100px;
//}

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
