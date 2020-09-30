import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/components/_globals";
import "@/assets/icons";
import store from "./store";

/* eslint-disable no-undef */
new Croupier({
  sources: [
    {
      name: "ets",
      url: process.env.VUE_APP_APICOMPONENTS_HOST,
      token: process.env.VUE_APP_APICOMPONENTS_TOKEN
    }
  ]
});
/* eslint-enable */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
