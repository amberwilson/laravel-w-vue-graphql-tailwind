import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        email: null,
        name: null,
    }),

    actions: {
        /**
         * Set the current user
         * @param {Integer} id
         * @param {String} email
         * @param {String} name
         */
        setUser (id, email, name) {
            this.$patch({
                id: Number(id), email, name,
            })
        },
    },

    getters: {},
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
