import { provideApolloClient } from '@vue/apollo-composable'
import { acceptHMRUpdate, defineStore } from 'pinia'
import ME from '../gql/Me.gql'
import { apolloClient } from '../plugins/apollo.js'

const defaultState = {
    id: null, email: null, name: null,
}

/**
 *
 * @type {StoreDefinition<"user", {name: null, id: null, email: null}, {}, {clearUser(): void, setUser(Integer, String, String): void, fetchCurrentUser(): Promise<*>}>}
 */
export const useUserStore = defineStore('user', {
    state: () => defaultState,

    actions: {
        /**
         * Set the current user
         * @param {Integer} id
         * @param {String} email
         * @param {String} name
         */
        setUser (id, email, name) {
            this.$patch({
                id: +id, email, name,
            })
        },

        /**
         * Clear the current user
         */
        clearUser () {
            this.$patch(defaultState)
        },

        /**
         * Fetch the user for the current session
         * @returns {Promise<unknown>}
         */
        async fetchCurrentUser () {
            provideApolloClient(apolloClient)

            return new Promise((resolve, reject) => {
                try {
                    apolloClient.query({
                        query: ME, fetchPolicy: 'no-cache',
                    }).then((result) => {
                        if (result.data?.me) {
                            const { id, email, name } = result.data.me
                            this.setUser(id, email, name)

                            resolve(result.data.me)
                        } else {
                            resolve(null)
                        }
                    })
                } catch (exception) {
                    reject('Exception while retrieving `me`', exception)
                }
            })
        },
    },

    getters: {},
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
