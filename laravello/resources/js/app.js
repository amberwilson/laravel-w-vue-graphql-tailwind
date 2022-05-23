import App from '@components/App'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import { apolloClient } from './apollo.js'
import { pinia } from './pinia.js'
import { router } from './router.js'

createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})
    .use(router)
    .use(pinia)
    .mount('#app')
