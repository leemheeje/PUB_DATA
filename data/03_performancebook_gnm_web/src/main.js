import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/common.css'
import axios from 'axios'
import router from './router'
import store from './store'
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import json from '@/assets/works.json'
window.$ = window.jQuery = require('jquery');


const { detect } = require('detect-browser');
Vue.use(VueAwesomeSwiper)
Vue.prototype.$http = axios
Vue.prototype.$json = json;
Vue.config.productionTip = false
Vue.prototype.$dev_path = process.env.NODE_ENV === 'development' ? '//localhost:86' : ''
Vue.prototype.$browser = detect()

Vue.filter('filters_dateformat', (s, format) => {
	if (!s) return
	let v_f = format ? format : 'yyyy-mm-dd hh-mm-ss'
	let v_s = s.replace(/[\s-:]/g, '')
	let f_f = ''
	switch (v_f) {
		case 'yyyy-mm-dd hh-mm-ss':
			f_f = '$1-$2-$3 $4:$5:$6'
			break
		case 'yyyy-mm-dd':
			f_f = '$1-$2-$3'
			break
	}
	return f_f ? v_s.replace(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/g, f_f) : false
})
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
