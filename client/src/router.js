import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Homepage from './components/Homepage.vue'
// import Detail from './views/Detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
      // ,
      // children: [{
      //   path: ':id',
      //   name: 'id',
      //   component: Detail,
      //   props: true
      // }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
