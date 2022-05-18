import BoardPage from '@pages/BoardPage'
import LoginPage from '@pages/LoginPage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: '/', component: BoardPage }, {
    path: '/login',
    component: LoginPage,
}]

export const router = createRouter({
    history: createWebHistory(), routes,
})
