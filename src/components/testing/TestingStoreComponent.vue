<template>
	<div class="store my-2 mx-2">
		<img :src="urls.host + urls.routes.prefix + store.photo_path" class="img-card"> 
		<h1 class="mb-3 mt-2">{{ store.name }}</h1>

		<h4>Torn Actual:</h4>

		<h3 class="mb-1">{{ computedActualTurn }}</h3>

		<div class="mb-3">
			<button class="btn btn-primary" @click="nextTurn()">Passar torn</button>
		</div>

		<h4>Demanar torn</h4>

		<div class="row justify-content-center">
			<div class="mx-2">
				<button class="btn btn-primary" @click="normalTurn()">Normal</button>
			</div>
			<div class="mx-2">
				<button class="btn btn-primary" @click="vipTurn()">VIP</button>
			</div>
		</div>

		
		<button class="btn btn-primary" @click="viewTurnsList()">Veure llista de torns</button>
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
	methods: {
		nextTurn() {
			const url = urls.host + urls.routes.prefix + urls.routes.store + '/' + this.store.id + '/nextTurn';
			console.log(url)

			axios.post(url)
				.then(res => {
					if (res.data.done) {
						this.$swal('success');
						this.updateActualTurn();
					} else {
						this.$swal(JSON.stringify(res.data));
					}
				})
				.catch(err => {

				});
		},
		updateActualTurn() {
			const url = urls.host + urls.routes.prefix + urls.routes.store + '/' + this.store.id + '/actualTurn';
			axios.get(url)
				.then(res => {
					if (res.data.error) {
						this.actualTurn = {};
					} else {
						this.actualTurn = res.data;
					}
				})
				.catch(err => {
					console.log(err)
				});
		},
		normalTurn() {


			const url = urls.host + urls.routes.prefix + urls.routes.store + '/' + this.store.id + urls.routes.turn;
			
				console.log(url)

			axios.post(url)
				.then(res => {
					this.$swal('Torn normal demanat.' + JSON.stringify(res.data));
				})
				.catch(err => {
					this.$swal('Failako');
				});
		},
		vipTurn() {
			const url = urls.host + urls.routes.prefix + urls.routes.store + '/' + this.store.id + '/vipTurn';

			axios.post(url)
				.then(res => {
					this.$swal('Torn VIP demanat.' + JSON.stringify(res.data));
				})
				.catch(err => {
					this.$swal('Failako');
				});
		},
		viewTurnsList() {
			this.$emit('turnsList', this.store);
		}
	},
	created() {
		this.updateActualTurn();
	},
	computed: {
		computedActualTurn() {
			switch (this.actualTurn.type) {
				case 'VIP':
					return 'V' + ("0" + this.actualTurn.number).slice(-2);
				case 'NORMAL':
					return 'T' + ("0" + this.actualTurn.number).slice(-2);
				case 'MOBILE':
					return 'M' + ("0" + this.actualTurn.number).slice(-2);
				default:
					return 'NO TURNS';
			}
		}
	}
}
</script>

<style>

.store {
	width: 350px;
	height: 700px;
	border: 1px solid rgba( 50, 50, 50, 0.5);
	border-radius: 3px;
	box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);

}

.img-card {
	height: 150px;
	width: auto;

	margin: auto;
}

</style>
