<template>
	<div class="card container">
		<p class="h1 text-center mb-2 mt-3 title">Nova parada</p>
		<form @submit.prevent="newStore()">

			<div class="mr-5 ml-5">
      	<md-field class="">
          <label class="text-info">Nom de la parada</label>
          <md-input v-model="name" type="text" required></md-input>
        </md-field>
      </div>

			<div class="mr-5 mt-2 ml-5 text-info">
        <md-field>
          <label class="text-info">Foto de la parada</label>
          <md-file v-model="photo" accept="image/*" required 	@md-change="fileListEvent" />
        </md-field>
      </div>

			<input type="submit" class="btn btn-primary bg-primary border-0 mt-1 py-2 mb-3" value="Crea">

		</form>
	</div>
</template>

<script>

import axios from 'axios'
import config from '../../api/config'

export default {
	data() {
		return {
			name: '',
			photoFile: null,
			focused: false
		}
	},
	methods: {
		newStore() {
			this.$swal('Aloha')

			axios.post(config.host + config.routes.store, {
				data: {
					// Body
				}
			})
		},
		fileListEvent(fileList) {
			this.photoFile = fileList[0] 
    }
	}
}
</script>

<style>

</style>
