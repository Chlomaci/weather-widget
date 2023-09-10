<template>
  <transition name="fade" mode="out-in">
    <div class="widget__settings">
      <div class="header__settings">
        <h3>Settings</h3>
        <img :src="close_svg" v-show="store.state.isSettingsShowed" alt="close" class="settings_img" @click="store.commit('changeSettings')" />
      </div>
      <form name="addCityForm" @submit.prevent="onSubmit(inputValue)" >
        <h4>Add Location</h4>
        <div class="form__lastQuery" v-if="store.state.isLocalStorage" >
          <draggable v-model="store.state.citiesArr"
                     group="cities"
                     handle=".handle"
                     @start="drag=true"
                     @end="drag=false"
                     item-key="city_name">
            <template #item="{element}">
              <div class="query__items">
                <div class="query__data" >
                  <img :src="burger_svg" alt="burger" class="query__img handle" @cliсk="console.log('click')" />
                  <span class="city__name" @click="onSubmit(element.city_name)">{{element.city_name}}, {{element.country}}</span>
                </div>
                <img :src="delete_svg" alt="delete" class="query__img" @click="store.commit('deleteCachedCity', element)" />
              </div>
            </template>
          </draggable>
        </div>
        <div class="form__input">
          <input type="text" v-model="inputValue" @keypress.prevent.enter="onSubmit(inputValue)" placeholder="Type in the name of the place" />
          <button type="submit" class="form__submit" >
            <img :src="enter_svg" alt="enter" class="settings_img" />
          </button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import {useLocation} from "@/hooks/useLocation";
import {useStore} from "vuex";
import burger_svg from "@/assets/burger.svg";
import delete_svg from "@/assets/delete.svg";
import enter_svg from "@/assets/enter.svg";
import close_svg from "@/assets/close.svg";

const store = useStore();
const {getLocationData} = useLocation();
let inputValue = '';
const drag = false;

const onSubmit = async (city: string) => {
  await getLocationData(city);
  inputValue = '';
  store.commit('changeSettings');
  store.commit('setLocalStorage');
}

</script>

<style lang="scss" scoped>
h4 {
  margin: 15px 0;
}

.widget__settings{
  width: 100%;
  height: 100%;
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
     padding: 0;
   }
  &__lastQuery {
    margin-bottom: 15px;
    & .query__items {
      background-color: #e2dfdf;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 7px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}

.query__data{
  display: flex;
  align-items: center;
}
.query__img{
  width: 20px;
  height: 20px;
}
</style>

