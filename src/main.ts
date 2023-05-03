import * as Pinia from 'pinia';
import messages from './i18n/index'
const lang = uni.getLocale()
import { createSSRApp } from "vue";
import App from "./App.vue";
import { createI18n } from 'vue-i18n'
export function createApp() {
  const app = createSSRApp(App);
  const i18n = createI18n({
  	locale: lang,
  	messages
  })
  app.use(i18n)
  return {
    app,
    Pinia
  };
}

