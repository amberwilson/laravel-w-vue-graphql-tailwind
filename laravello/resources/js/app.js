import { ApolloClient, InMemoryCache } from '@apollo/client'
import App from '@components/App'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import { router } from './router.js'

const apolloClient = new ApolloClient({
    uri: 'http://localhost/graphql',
    cache: new InMemoryCache(),
})

createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})
    .use(router)
    .mount('#app')
