<template>
  <div class="dropdown"
       :class="{'dropdown_state_focus': dropDownIsOpen}">
    <div class="dropdown__header" >
      <span class="dropdown__placeholder"> {{selected}} </span>
      <input type="text" style="display: none" :value="selected">
    </div>
    <div class="dropdown__options-list"  v-if="dropDownIsOpen">
      <div class="dropdown__option"
        v-for="(option, index) in options"
        @click="onSelected(option)"
        :class="option === selected ? 'dropdown__option_state_selected' : ''"
        :key="index"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        dropDownIsOpen: false,
        selected: this.default
      }
    },
    props: {
        options: Array,
        default: String
    },
    methods: {
      ...mapActions(['sortCards']),
      closeDropdown() {
        this.dropDownIsOpen = false;
      },
      openDropdown() {
        this.dropDownIsOpen = true;
      },
      toggleDropdown() {
        this.dropDownIsOpen = !this.dropDownIsOpen;
      },
      onSelected(option) {
          console.log(option);
          this.selected = option
          const direction = option.indexOf('возрастанию') !== -1  ? 'asc' : 'desc'
          const type = option.indexOf('Цена') !== -1 ? 'price' : option.indexOf('Название') !== -1 ? 'name' : 'default'
          console.log({direction, type})
          // console.log('option.indexOf', option.indexOf('возрастанию'))
          this.sortCards({direction, type})
          // this.sort({direction, type})
      },
    },
    mounted() {
      document.addEventListener('click', e => {
        if(e.target.className !== "dropdown__header") this.closeDropdown();
        if(e.target.className === "dropdown__header" || e.target.className === "dropdown__placeholder") this.toggleDropdown();
      });
    }
  }
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  width: 200px;
  margin-bottom: 20px;
  @include borderShadow;


  &__header {
   position: relative;

   display: flex;
   align-items: center;

   box-sizing: border-box;


   padding: 10px 28px 11px 16px;

   cursor: pointer;

   transition: box-shadow, border .2s;

   &::after {
       content: '';

        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;

        background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.48532 1.24264L4.24268 4.48528L1.00003 1.24264' stroke='%23B4B4B4'/%3E%3C/svg%3E%0A");
        background-size: cover;
        width: 12px;
        height: 8px;
   }

    &:hover {
      .dropdown__placeholder {
        color: #222;
      }
    }
  }

  &__placeholder {
   transition: color .2s;

   font-size: 12px;
    line-height: 15px;

    color: #B4B4B4;

    &_state {
      &_focus {
       }

      &_selected {
        color: #222;
      }
    }
  }

  &__options-list {
    position: absolute;
    z-index: 9;
    width: 100%;

      @include borderShadow;
    margin-top: 4px;
   }

  &__option {
    text-align: left;
    padding: 10px 16px;

    font-size: 12px;
    line-height: 15px;

    color: #B4B4B4;

    cursor: pointer;

    &:hover {
       color: #858585;
    }

    &_state {
      &_selected {
        color: #858585;
      }
    }
  }
}
</style>
