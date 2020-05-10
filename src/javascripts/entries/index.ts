import "@css/index.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";

library.add(fas, fab, far);
Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  el: "#vue-root",
  components: {},
});
