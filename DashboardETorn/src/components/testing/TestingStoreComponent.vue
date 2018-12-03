<template>
	<div class="store my-2 mx-2">
		<!--<img :src="urls.host + urls.routes.prefix + '/' + store.photopath" class="img-card"> -->
		<h1 class="mb-5">{{ store.name }}</h1>

		<h4>Torn Actual:</h4>

		<h3 class="mb-5">{{ actualTurn }}</h3>

		<h4>Demanar torn</h4>

		<div class="row justify-content-center">
			<div class=" mx-2">
				<button class="btn btn-primary">Normal</button>
			</div>
			<div class=" mx-2">
				<button class="btn btn-primary">VIP</button>
			</div>
		</div>
		<!--
		<div class="row">
			<div class="col-md-12">
				<select v-model="selectedHour">
					<option v-for="hour in availableHours" :key="hour">hour</option>
				</select>
			</div>
		</div>
		-->
	</div>
</template>

<script>
import urls from '../../api/config.js';
import axios from 'axios';

export default {
	props: {
		store: Object
	},
	data() {
		return {
			urls,

			actualTurn: 0,
			turnInterval: {},

			availableHours: [],
			selectedHour: '',

		}
	},
	created() {
		const url = urls.host + urls.routes.prefix + urls.routes.store + '/' + this.store.id + '/actualTurn';
		
		//this.turnInterval = setInterval( ()=> {
		axios.get(url)
			.then(res => {
				console.log(res.data);

				if (res.data.error) {
					this.actualTurn = 'NO TURNS'
				} else {
					this.actualTurn = res.data.number;
				}
			})
		//}, 5000);

	}
}
</script>

<style>

.store {
	width: 400px;
	height: 600px;
	border: 1px solid grey;
	border-radius: 5px;
	box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);

}

.img-card {
	height: 150px;
	width: auto;

	margin: auto;
}

</style>
