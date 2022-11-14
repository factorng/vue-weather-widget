<template>
  <div class="main">
    <h1 class="main__title">Weather Informer</h1>

    <router-link
        :to="{name: 'Settings', params: {cities}}"
        class="main__button-settings"
    >
      <img
          src="../assets/icon-settings.png"
          alt="settings icon"
          class="main__button-icon"
      />
    </router-link>
  </div>
  <WeatherCards :cities="$props.cities"/>
</template>

<script>
import WeatherCards from './WeatherCards';

export default {
  name: 'Main-Component',
  inheritAttrs: false,
  components: {
    WeatherCards
  },
  props: ['cities']
}
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main__title {
  padding: 0;
  margin: 0;
  font-size: 1rem;
}

.main__button-settings {
  align-self: flex-end;
}

.main__button-icon {
  width: 2rem;
  height: 2rem;
}
</style>
