<template>
<<<<<<< HEAD
  <div class="px-5 py-5">
		<div class="row">
			<new-store-component class="col-md-4" />


			<table class="col-md-6" style="border: 1px solid black">
				<thead>
					<th>ID</th>
					<th>Nom</th>
					<th>Foto</th>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>

		

=======
  <div class="container">
	<div class="row pt-2 mt-3 h-50 mb-5" >
		
		<new-store-component class="col-md-4 ml-2 h-75" />

		<div class="col-md-6 ml-2 mr-3 ">
			<p class="title h2 mb-3">Parades</p> 	
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Id</th>
						<th>Nom</th>
						<th>Foto </th>
						<th>Accions </th>
					</tr>
				</thead>
				<tbody>
					<template v-for="store in stores">
						<tr v-bind:key="store">
							<td> {{ store.id }} </td>
							<td> {{ store.name }} </td>
							<td>
								<img :src="store.photoPath" /> 
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
>>>>>>> f8485d044cd7b085772d452e50d3750b14fccc61
  </div>
</template>

<script>
	import NewStoreComponent from './NewStoreComponent.vue'
	
	import axios from 'axios'
	import config from '../../api/config'

<<<<<<< HEAD
	export default {		
		components: {
			NewStoreComponent
		},
		beforeCreate() {

			axios.get(config.routes.stores)
				.then(res => {
					
				})
=======
import axios from 'axios'
import config from '../../api/config'

export default {
	data() {
		return {
			stores: []
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
			axios.get(config.host + config.routes.stores)
				.then((res) => {
					this.stores = res.data
				})
				.catch(err => {
					console.log('Fail')
				})
		},
		deleteStore(store) {
			axios.delete(config.host + config.routes.store + '/' + store.id) 
				.then(res => {
					if (res.data) {
						this.$swal('Parada eliminada.');
						this.downloadStores();
					}
				})
		}
	}
>>>>>>> f8485d044cd7b085772d452e50d3750b14fccc61

		}
	}
</script>

<style>

</style>
