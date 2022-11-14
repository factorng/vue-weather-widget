<script>
export default {
  props: ['city']
}
</script>

<template>
  <div v-if="city?.main" class="weather-card">
    <h4>{{ `${city.name}, ${city.sys.country}` }}</h4>
    <div class="weather-card__main-info">
      <img :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"/>
      <h2>{{ `${Math.round(city.main.temp)}°C` }}</h2>
    </div>
    <p>
      {{
        `Feels like ${Math.round(city.main.feels_like)}°C. ${city.weather[0].description.charAt(0).toUpperCase()
        + city.weather[0].description.slice(1)}.`
      }}
    </p>
    <p class="weather-card__additional-info">
      {{ `Wind speed: ${city.wind.speed}m/s` }}
      <br/>
      {{ `Pressure:${city.main.pressure}hPa` }}
      <br/>
      {{ `Humidity: ${city.main.humidity}%` }}
      <br/>
      {{ `Visibility: ${city.visibility} meters` }}
    </p>
  </div>
</template>

<style scoped>
.weather-card {
  border: 1px solid white;
  margin-top: .3rem;
  padding: .3rem .6rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.weather-card > * {
  padding: 0;
  margin: 0;
}

.weather-card__main-info {
  align-self: center;
  display: flex;
  align-items: center;
}

.weather-card__additional-info {
  padding: .8rem 0 0 0;
}
</style>
