import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import Settings from "./components/Settings";
import Main from "./components/Main";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Main", component: Main, props: true },
    {
      path: "/vue-weather-widget/settings",
      name: "Settings",
      component: Settings,
      props: true,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
