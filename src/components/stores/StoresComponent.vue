<template>
	<div class="px-5 py-5">

		<div class="row mt-3 h-50 mb-5" >

			<new-store-component class="col-md-4 ml-2 h-75" />

			<div class="col-md-7 ml-2 mr-3 ">

				<p class="title h2 mb-3">Parades</p> 	

				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Id</th>
							<th>Nom</th>
							<th>Foto </th>
							<th>Accions</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="store in stores">
							<tr v-bind:key="store.id">
								<td> {{ store.id }} </td>
								<td> {{ store.name }} </td>
								<td>
									<img :src="config.host + config.routes.prefix + store.photo_path" width="150px" /> 
								</td>
								<td>
									<button @click="updateStore(store)" class="btn btn-info">
										Actualitza
									</button>
									<button @click="deleteStore(store)" class="btn btn-danger">
										Elimina
									</button>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import NewStoreComponent from './NewStoreComponent.vue'

import axios from 'axios'
import config from '../../api/config'

export default {
	data() {
		return {
			stores: [],
			config
		}
	},		
	components: {
		NewStoreComponent
	},
	created() {
		this.downloadStores();
	},
	methods: {
		downloadStores() {

			const url = config.host + config.routes.prefix + config.routes.stores;

			axios.get(url)
				.then((res) => {
					this.stores = res.data;
				})
				.catch(err => {
					console.log('Fail')
				})
		},
		deleteStore(store) {

			axios.delete(config.host + config.routes.prefix + config.routes.store + '/' + store.id) 
				.then(res => {
					if (res.data) {
						this.$swal('Parada eliminada.');
						this.downloadStores();
					}
				})
		},
		updateStore(store) {
			this.$swal('Aloha')
		}
	}

}
</script>

<style>

</style>
