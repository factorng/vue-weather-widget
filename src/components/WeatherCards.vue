<script>
import WeatherCard from "./WeatherCard";

export default {
  components: {
    WeatherCard
  },
  props: ['cities'],
}
</script>

<template>
  <div class="weather-informer">
    <div class="weather-cards" v-for="city in cities" :key="city.id">
      <WeatherCard :city="city"/>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: transparent;
  border: 0;
  padding: 0;
}
</style>