<template>
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

		

  </div>
</template>

<script>
	import NewStoreComponent from './NewStoreComponent.vue'
	
	import axios from 'axios'
	import config from '../../api/config'

	export default {		
		components: {
			NewStoreComponent
		},
		beforeCreate() {

			axios.get(config.routes.stores)
				.then(res => {
					
				})

		}
	}
</script>

<style>

</style>
