<template>
  <h1>Weather widget</h1>
  <div class="widget">
    <Weather v-show="!store.state.isSettingsShowed"/>
    <Settings v-show="store.state.isSettingsShowed"/>
  </div>
</template>

<script lang="ts" setup>
import Weather from "@/components/weather.vue";
import Settings from "@/components/settings.vue";

import {useStore} from "vuex";
const store = useStore()

</script>

<style lang="scss">
*{
  font-family: "Calibri Light";
}

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
  position: relative;
  background: rgba(145, 202, 255, 0.2);
  border-radius: 12px;
  border: 4mm ridge rgba(255, 255, 255, .6);
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 200px;
  font-size: 18px;

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

.wind,
.pressure {
  display: flex;
  div{
    margin-left: 2px;
  }
}

.city__name {
  margin-left: 5px;
}
}

</style>
