import BoardPage from '@pages/BoardPage'
import LoginPage from '@pages/LoginPage'
import RegisterPage from '@pages/RegisterPage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'board', component: BoardPage },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
    }]

export const router = createRouter({
    history: createWebHistory(), routes,
})
