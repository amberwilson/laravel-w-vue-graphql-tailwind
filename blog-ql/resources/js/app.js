import { ApolloClient, InMemoryCache } from '@apollo/client'
import App from '@components/App'
import PostPage from '@pages/PostPage'
import PostsPage from '@pages/PostsPage'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import timeago from 'vue-timeago3'

const routes = [{
    path: '/', name: 'index', component: PostsPage,
}, {
    path: '/post/:id', name: 'post', component: PostPage,
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
    .use(timeago, { name: 'TimeAgo' })
    .mount('#app')
