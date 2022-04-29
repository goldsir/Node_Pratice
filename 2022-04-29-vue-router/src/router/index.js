import Vue from 'vue'
import VueRouter from '@/vue-router'  // 改成自己的router
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

Vue.use(VueRouter)  // 會調用 VueRouter.install方法

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
    , children: [
      {
        path: 'a', component: {
          render(h) {
            return <h1>about a</h1>
          }
        }
      }, {
        path: 'b', component: {
          render(h) {
            return <h1>about b</h1>
          }
        }
      }]
  }
]

const router = new VueRouter({
  routes
  , mode: 'hash'
})

export default router
