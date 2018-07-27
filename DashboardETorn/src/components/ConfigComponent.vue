<template>
    <div class="card container w-50 mt-5">
        <p class="h1 text-center mb-2 mt-3 title">Configuració torns App</p>

        <form @submit.prevent="submit" class="mt-3">

            <div class="mr-5 row ml-5">
                <md-field class="col">
                    <label class="text-info">Hora de apertura</label>
                    <md-input v-model="params.HOUR_START_ALL_BUCKETS" type="number" maxlength="2" required></md-input>
                </md-field>
            </div>

            <div class="mr-5 row ml-5">
                <md-field class="col ">
                    <label class="text-info">Hora de tancament</label>
                    <md-input v-model="params.HOUR_FINAL_ALL_BUCKETS" type="number" maxlength="2" required></md-input>
                </md-field>
            </div>

            <div class="mr-5 row ml-5">
                <md-field class="col">
                    <label class="text-info">Duració dels buckets de torns (en minuts)</label>
                    <md-input v-model="params.MIN_DURATION_BUCKETS" type="number" maxlength="2" required></md-input>
                </md-field>
            </div>

            <input type="submit" class="btn btn-primary bg-warning border-0 mt-4 mb-3" value="APLICA">

        </form>

    </div>    
</template>

<script>

import axios from 'axios'
import config from '../api/config'

export default {
    data() {
        return {
            params: {
                MIN_DURATION_BUCKETS: 0,
                HOUR_START_ALL_BUCKETS: 0,
                HOUR_FINAL_ALL_BUCKETS: 0
            }
        }
    },
    created() {
        axios.get(config.host + config.routes.config)
            .then(response => {

                response.data.forEach(element => {

                    switch (element.key) {

                        case 'MIN_DURATION_BUCKETS':
                            this.params.MIN_DURATION_BUCKETS = element.value
                            break;
                        
                        case 'HOUR_START_ALL_BUCKETS':
                            this.params.HOUR_START_ALL_BUCKETS = element.value
                            break;

                        case 'HOUR_FINAL_ALL_BUCKETS':
                            this.params.HOUR_FINAL_ALL_BUCKETS = element.value
                            break;

                        default: 
                            console.log('Hi ha una configuració ' + element.key + 
                                            ' que no es contempla ' )
                    }
                });

            })
    },
    methods: {
        submit() {
            axios.post(config.host + config.routes.config, {
                data: {
                    params: this.params
                }
            }).then(response => {
                if (response.data.done) {
                    console.log(response.data)
                    this.$swal('Configuració actualitzada')
                } else {
                    this.$swal('Configuració NO actualitzada')
                }
            })
            .catch(err => {
                this.$swal('Error: ' + err)
            })
        }
    }
}
</script>

<style>

</style>
