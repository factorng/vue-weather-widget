<template>
  <router-view @addCity="onSearchHintClick"
               @deleteWeatherCard="deleteWeatherCard"
               @sortLocations="sortLocations"
               :cities="citiesByOrder"
               :isLoading="isLoading">
  </router-view>
</template>

<script>
import {getCityWeaterById} from "@/utils/api";
import cities from "@/assets/city.list.json";

export default {
  name: 'App',
  methods: {
    async onSearchHintClick(id) {
      this.isLoading = true;
      let weatherCard = {};
      try {
        weatherCard = await getCityWeaterById(id);
      } catch (error) {
        console.error(error);
      }
      if (weatherCard?.cod == '200') {
        weatherCard.order = ++this.order;
        this.cities.push(weatherCard);
      } else {
        console.log(weatherCard?.cod, weatherCard?.message);
      }
      this.isLoading = false;
      console.log(this.cities)
    },
    deleteWeatherCard(id) {
      this.cities = this.cities.filter(city => city.id !== id);
    },
    sortLocations($event) {
      const indexCityDropOn = this.cities.findIndex(city => {
        return city.id == $event.target.id;
      });
      const indexCityToDrop = this.cities.findIndex(city => {
        return city.id == $event.dataTransfer.getData('cityId');
      });
      if (this.cities[indexCityDropOn]?.order && this.cities[indexCityToDrop]?.order) {
        const temp = this.cities[indexCityDropOn].order;
        this.cities[indexCityDropOn].order = this.cities[indexCityToDrop].order;
        this.cities[indexCityToDrop].order = temp;
      }
    }
  },
  data() {
    return {
      cities: [],
      isLoading: false,
      order: 0,
    };
  },
  watch: {
    search: function (value) {
      if (value) {
        const citiesToDisplay = cities.filter((city) => {
          return city.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        this.citiesHints = citiesToDisplay;
      }
    }
  },
  computed: {
    citiesByOrder: function () {
      return structuredClone(this.cities).sort(function (a, b) {
        return (a.order > b.order) ? 1 : -1;
      });
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 300px;
  height: 400px;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
}
</style>
