import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import { TreeSelect } from 'ant-design-vue';
Vue.use(TreeSelect);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
