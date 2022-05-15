import { ApolloClient, InMemoryCache } from '@apollo/client'
import App from '@components/App'
import WelcomePage from '@pages/WelcomePage'
import NotFound from '@pages/NotFound'
import { createApp, h, provide } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import {DefaultApolloClient} from "@vue/apollo-composable";

const routes = [
    {
        path: '/', name: 'index', component: WelcomePage,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }]

const router = createRouter({
    // eslint-disable-next-line no-undef
    history: createWebHistory(process.env.BASE_URL), routes
})

const apolloClient = new ApolloClient({
    uri: 'http://localhost/graphql', cache: new InMemoryCache()
})

createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    }, render: () => h(App),
})
    .use(router)
    .mount('#app')
