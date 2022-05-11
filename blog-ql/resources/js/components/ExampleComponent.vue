<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-first-name">
                                    First Name
                                </label>
                                <input v-model="firstName"
                                       class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                       id="grid-first-name" type="text"
                                       placeholder="Jane">
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="grid-last-name">
                                    Last Name
                                </label>
                                <input v-model="lastName"
                                       class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                       id="grid-last-name" type="text"
                                       placeholder="Doe">
                            </div>
                        </div>
                        <div v-if="isNameEntered">
                            Hello there, {{ fullName }}
                        </div>
                        <div v-else>Please enter your first and last names.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";

const firstName = ref('');
const lastName = ref('');

const isNameEntered = computed(() => firstName.value !== '' && lastName.value !== '');
const fullName = computed(() => `${firstName.value} ${lastName.value}`);
</script>
