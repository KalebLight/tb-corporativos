import Vue from 'vue';
import App from './App.vue';
import router from './router';

// -------------------------------------------------------
import Navbar from '../src/components/estruturaView/Navbar';
Vue.component('Navbar', Navbar);

import btnCurtir from '../src/components/reutilizaveis/btnCurtir';
Vue.component('btnCurtir', btnCurtir);
import btnSeguir from '../src/components/reutilizaveis/btnSeguir';
Vue.component('btnSeguir', btnSeguir);
import salvarImagem from '../src/components/reutilizaveis/salvarImagem';
Vue.component('salvarImagem', salvarImagem);

import infoTatuador from '../src/components/reutilizaveis/infoTatuador';
Vue.component('infoTatuador', infoTatuador);

import listarPublicacoes from '../src/components/views/explorar/listarPublicacoes';
Vue.component('listarPublicacoes', listarPublicacoes);

import Multiselect from 'vue-multiselect';
Vue.component('multiselect', Multiselect);

import adicionarPublicacao from '../src/components/reutilizaveis/adiconarPublicacao';
Vue.component('adicionarPublicacao', adicionarPublicacao);

import btnAdicionarPublicacao from '../src/components/reutilizaveis/btnAdicionarPublicacao';
Vue.component('btnAdicionarPublicacao', btnAdicionarPublicacao);
// -------------------------------------------------------
import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
Vue.use(VueFormWizard);
// -------------------------------------------------------
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
library.add(faWhatsapp, faInstagram);

import {
  faFire,
  faCloudUploadAlt,
  faPlus,
  faBookmark,
  faUser,
  faSmileWink,
  faStoreAlt,
  faSortAmountDown,
  faEllipsisV,
  faCog,
  faTrash,
  faUserPlus,
  faSearch,
  faHome,
  faCompass,
  faSpinner,
  faMapMarkerAlt,
  faEnvelope,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
library.add(
  faFire,
  faCloudUploadAlt,
  faPlus,
  faBookmark,
  faUser,
  faSmileWink,
  faStoreAlt,
  faSortAmountDown,
  faEllipsisV,
  faCog,
  faTrash,
  faUserPlus,
  faSearch,
  faHome,
  faCompass,
  faSpinner,
  faMapMarkerAlt,
  faEnvelope,
  faUserFriends,
);
// -------------------------------------------------------
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
// CONFIGURO O BOOTSTRAP
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// ------------------------------

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');

// Vue.http.options.crossOrigin = true;
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
