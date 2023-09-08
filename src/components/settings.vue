<template>
  <transition name="fade" mode="out-in">
    <div class="widget__settings">
      <div class="header__settings">
        <h3>Settings</h3>
      </div>
      <form name="addCityForm" @submit.prevent="$emit('formSubmit', inputValue)" >
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
          <button type="submit" class="form__submit" >
            <img :src="enter_svg" alt="enter" class="settings_img" />
          </button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import burger_svg from "@/assets/burger.svg";
import delete_svg from "@/assets/delete.svg";
import enter_svg from "@/assets/enter.svg";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {defineEmits} from "vue";

const {isLocalStorage, localStorageCity, localStorageCountry, setLocalStorage} = useLocalStorage();
const inputValue = ref('');

const emit = defineEmits<{
  (e: 'formSubmit', value: string): void
}>()

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
.query__img{
  width: 20px;
  height: 20px;
}
</style>

