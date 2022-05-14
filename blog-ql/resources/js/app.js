import { ApolloClient, InMemoryCache } from '@apollo/client'
import App from '@components/App'
import AuthorPostsPage from '@pages/AuthorPostsPage'
import NotFound from '@pages/NotFound'
import PostPage from '@pages/PostPage'
import PostsPage from '@pages/PostsPage'
import TopicPostsPage from '@pages/TopicPostsPage'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import timeago from 'vue-timeago3'

const routes = [
    {
        path: '/', name: 'index', component: PostsPage,
    },
    {
        path: '/posts/:id', name: 'post', component: PostPage,
    },
    {
        path: '/topics/:slug', name: 'topic', component: TopicPostsPage,
    },
    {
        path: '/authors/:id', name: 'author', component: AuthorPostsPage,
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
    .use(timeago, { name: 'TimeAgo' })
    .mount('#app')
