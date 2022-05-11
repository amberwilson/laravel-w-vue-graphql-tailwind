import { ApolloClient, InMemoryCache } from '@apollo/client'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './components/App'
import Post from './components/Post'
import PostList from './components/PostList'

const routes = [{
    path: '/', name: 'index', component: PostList,
}, {
    path: '/post/:id', name: 'post', component: Post,
}]

const router = createRouter({
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
    // .use(VueApolloComponents)
    .mount('#app')
