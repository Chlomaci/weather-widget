<template>
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
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 0px;
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
/ / width: 115 %;
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