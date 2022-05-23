import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// Reference : https://www.apollographql.com/docs/react/data/error-handling/

const httpLink = new HttpLink({
    uri: 'http://localhost/graphql',
    credentials: 'same-origin',
    headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
})

const errorLink = onError((err) => {
    const { graphQLErrors, networkError } = err
    if (graphQLErrors)
        graphQLErrors.forEach(({ message }) =>
            console.error(
                {
                    message: `[GraphQL error]: Message: ${message}`,
                    fullError: err,
                },
            ),
        )

    if (networkError) console.error(`[Network error]: ${networkError}`)
})

export const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
})
