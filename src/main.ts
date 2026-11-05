import { createApp } from "vue";
import { Quasar, Notify, Dialog } from "quasar";
import zhTW from "quasar/lang/zh-TW";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./ui/theme.css";
import "./studio.css";
import App from "./App.vue";
const app = createApp(App);
app.use(Quasar, {
  lang: zhTW,
  plugins: { Notify, Dialog },
  config: { brand: { primary: "#635bdf", secondary: "#23a99a" } },
});
app.mount("#app");
