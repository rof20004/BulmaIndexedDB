import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import TopicoCreate from '@/components/topico/TopicoCreate.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'Topico',
          component: TopicoCreate
        }
      ]
    }
  ]
})
