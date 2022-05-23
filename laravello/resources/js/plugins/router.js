import BoardPage from '@pages/BoardPage'
import LoginPage from '@pages/LoginPage'
import RegisterPage from '@pages/RegisterPage'
import { useUserStore } from '@stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/boards/:id', name: 'board', component: BoardPage },
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

const router = createRouter({
    history: createWebHistory(), routes,
})

router.beforeEach(async (to) => {
    const user = useUserStore()

    if (!user.id) {
        if (to.name !== 'login') {
            return { name: 'login' }
        }
    } else {
        try {
            const me = await user.fetchCurrentUser()

            if (!me) {
                // session expired
                return { name: 'login' }
            }

            if (to.name !== 'board') {
                return { name: 'board' }
            }
        } catch (exception) {
            console.log('Exception while trying to fetch the user', exception)
            user.clearUser()

            if (to.name !== 'login') {
                return { name: 'login' }
            }
        }
    }
})

export { router }
