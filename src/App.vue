<template>
  <h1>Weather widget</h1>
  <div class="widget">
    <img :src="settings_svg" v-show="!isSettingsShowed" alt="settings" class="settings_img" @click="changeSettings" />
    <img :src="close_svg" v-show="isSettingsShowed" alt="close" class="settings_img" @click="changeSettings" />
    <Weather :data="data" v-show="!isSettingsShowed"/>
    <Settings v-show="isSettingsShowed" @formSubmit="onSubmit"/>
  </div>
</template>

<script lang="ts" setup>
import Weather from "@/components/weather.vue";
import Settings from "@/components/settings.vue";
import settings_svg from "@/assets/settings.svg";
import close_svg from "@/assets/close.svg";
import {useData} from "@/hooks/useData";
import {useLocation} from "@/hooks/useLocation";
import {useChangeSettings} from "@/hooks/useChangeSettings";

const {isSettingsShowed, changeSettings} = useChangeSettings()
const {setData} = useData();
const {getLocationData} = useLocation();


const onSubmit = async (inputValue: string) => {
  const data = await getLocationData(inputValue);
  setData(data);
  changeSettings();
}

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
  height: 300px;
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
  .settings_img {
    position: absolute;
    right: 10px;
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
