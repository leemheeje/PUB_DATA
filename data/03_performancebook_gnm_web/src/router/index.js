import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import Works from '@/views/Works.vue'
import Ped from '@/views/Ped.vue'
import List from '@/views/List.vue'
import Detail from '@/views/Detail.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    { 
        path: '/works',
        name: 'Works',
        component: Works,
        children: [
            { 
                path: '/', 
                name: 'list',
                component: List
            },
            { 
                path: 'detail/:id', 
                name: 'detail',
                component: Detail
            }
        ]
    },
    {
        path: '/ped',
        name: 'Ped',
        component: Ped
    },
    { 
        path: '*',
        name: 'Home',
        component: Home
    }
]

const router = new VueRouter({
    //mode: 'history',
    base: process.env.BASE_URL,
    // scrollBehavior(to, from, savedPosition) { //라우터될때 항상 스크롤탑0
    //     return {
    //       x: 0,
    //       y: 0
    //     }
    //   },
    routes
})
router.beforeEach((to,from,next)=>{
    if(from.name == 'detail'){
        store.state.currentAtc = {}
    }
    next()
})
export default router
