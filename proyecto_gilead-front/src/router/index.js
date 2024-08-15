import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:  () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/postulante',
    name: 'postulante',
    component: () => import(/* webpackChunkName: "about" */ '../views/Postulante.vue')
  },
  {
    path: '/PoliticaSeguridad',
    name: 'PoliticaSeguridad',
    component: () => import(/* webpackChunkName: "about" */ '../views/PoliticaSeguridad.vue')
  },
  {
    path: '/postulanteTok',
    name: 'postulanteTok',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostulanteToken.vue')
  },
  {
    path: '/hojavida',
    name: 'hojavida',
    component: () => import(/* webpackChunkName: "about" */ '../views/HojaVida.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Administrador.vue')
  },
  {
    path: '/homeInfo',
    name: 'homeInfo',
    component: () => import(/* webpackChunkName: "about" */ '../components/HomeAfiliado.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
