import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { useUserStore } from '@stores/user'
import { AuthenticationError, graphQlErrors } from '../utils.js'
import { router } from './router.js'

// Reference : https://www.apollographql.com/docs/react/data/error-handling/

const httpLink = new HttpLink({
    uri: 'http://localhost/graphql',
    credentials: 'same-origin',
    headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
})

const errorLink = onError((err) => {
    try {
        graphQlErrors(err)
    } catch (err) {
        if (err instanceof AuthenticationError) {
            const user = useUserStore()
            user.clearUser()
            router.push({ name: 'login' })
        }
    }
})

export const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
})
