import App from '@components/App'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import VueClickAway from 'vue3-click-away'
import { apolloClient } from './plugins/apollo'
import { pinia } from './plugins/pinia'
import { router } from './plugins/router'

createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})
    .use(router)
    .use(pinia)
    .use(VueClickAway)
    .mount('#app')
