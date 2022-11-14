<template>
  <div class="settings-header">
    <h1 class="settings-header__title">Settings</h1>
    <router-link class="settings-header__close" to="/">
      <img src="../assets/icon-close.png"
           alt="close icon"
           class="settings-header__close-icon"
      />
    </router-link>
  </div>
  <div class="settings__input-wrapper">
    <input class="settings__input"
           v-model.trim="search"
           placeholder="Enter city name"
    />

    <div
        class="settings__hints"
    >
      <p class="settings__hint"
         @click="onSearchHintClick(city.id)"
         v-for="city in citiesHints.slice(0,10)"
         :key="city.id"
      >
        {{ `${city.name}  ${city.country}` }}
      </p>
    </div>
  </div>
  <div v-if="isLoading" class="settings__preloader">Loading...</div>
  <div
      v-else
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent
      class="settings-cards"
  >
    <div class="settings-card"
         v-for="city in cities"
         :key="city.id"
         :id="city.id"
         draggable="true"
         @dragstart="startDrag($event, city)"
         @dragend="endDrag($event)"
    >

      {{ `${city.name}  ${city.sys.country}` }}
      <button @click="$emit('deleteWeatherCard', city.id)"
              class="settings-card__button-delete"
      >
        <img src="../assets/icon-trash.png"/>
      </button>
    </div>
  </div>
</template>

<script>

import citiesDictionary from "@/assets/city.list.json";

export default {
  name: 'Settings-Component',
  props: ['cities', 'isLoading'],
  inheritAttrs: false,
  emits: ['deleteWeatherCard', 'addCity', 'sortLocations'],
  mounted() {
    window.addEventListener('click', this.onClick);
  },
  unmounted() {
    window.removeEventListener('click', this.onClick);
  },
  methods: {
    onSearchHintClick(id) {
      if (this.cities.find(location => location.id == id)) {
        return;
      }
      this.citiesHints = [];
      this.search = '';
      this.$emit('addCity', id);
    },
    onClick(evt) {
      if (evt.target.className !== 'settings__hint') {
        this.citiesHints = [];
        this.search = '';
      }
    },
    startDrag($event, item) {
      if ($event.target?.classList?.contains('settings-card')) {
        $event.dataTransfer.dropEffect = 'move';
        $event.dataTransfer.effectAllowed = 'move';
        $event.target.classList.toggle('settings-draggable-element');
        $event.dataTransfer.setData('cityId', item.id);
      } else {
        console.log('not draggable item');
      }

    },
    endDrag($event) {
      if ($event.target?.classList?.contains('settings-card')) {
        $event.target.classList.toggle('settings-draggable-element')
      }
    },
    onDrop($event) {
      $event.preventDefault();
      this.$emit('sortLocations', $event);
    }

  },
  data() {
    return {
      search: "",
      citiesHints: [],
    };
  },
  watch: {
    search: function (value) {
      if (value) {
        const citiesToDisplay = citiesDictionary.filter((city) => {
          return city.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        this.citiesHints = citiesToDisplay;
      }
    },
  },
}
</script>

<style scoped>
.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings-header__title {
  padding: 0;
  margin: 0;
  font-size: 1rem;
}

.settings-header__close-icon {
  width: 2rem;
  height: 2rem;
}

.settings__input-wrapper {
  position: relative;
}

.settings__input {
  width: 200px;
  height: 2rem;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
}

.settings__input:focus {
  outline: none;
}


.settings__hints {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top: .3rem;
  width: 200px;
  left: 33px;
}

.settings__hint {
  padding: .3rem;
  cursor: pointer;
  margin: 0;
}

.settings__hint:hover {
  background-color: grey;
}


.settings-card {
  border: 1px solid white;
  margin-top: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  padding: .3rem;
  cursor: pointer;
}

.settings-card-button {
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
}

.settings-card__button-delete {
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.settings-draggable-element {
  background-color: rgba(230, 230, 230, .9);
  cursor: grabbing;
}

.settings__preloader {
  align-self: center;
}
</style>
