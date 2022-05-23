import { createPinia } from 'pinia'
import { watch } from 'vue'

const pinia = createPinia()

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('laravelloState', JSON.stringify(state))
    },
    { deep: true },
)

if (localStorage.getItem('laravelloState')) {
    pinia.state.value = JSON.parse(localStorage.getItem('laravelloState'))
}

export { pinia }
