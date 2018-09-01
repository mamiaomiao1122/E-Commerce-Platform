// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './App'
import VueRouter from 'vue-router'
import layout from './components/layout.vue'
import IndexPage from './pages/index'

Vue.config.productionTip = false
Vue.use(VueRouter)

let router = new VueRouter({
	mode:'history',
	routes:[
	{
		path:'/',
		component:IndexPage
	}
	]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { layout },
  template: '<layout/>'
})
