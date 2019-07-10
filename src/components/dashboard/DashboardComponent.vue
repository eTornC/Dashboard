<template>
	<div class="w-100 px-4 py-3">
		<div id="dashboard">
			<div class="row mx-0">

				<div class="col-md-12 card row mx-0 px-0">
					<div class="col-md-5">
						<h2>{{ turnCount }} torns.</h2>
					</div>
					<div class="col-md-2">
						<img class="loader" src="chat-loader.gif" />
					</div>
					<div class="col-md-5">
					
					</div>
				</div>

				<pie-chart 
					:title="turnsPerType.title"
					:labels="turnsPerType.labels"
					:data="turnsPerType.data"
					:legend="true"
					/>

				<line-chart 
					:title="turnsPerType.title"
					:labels="turnsPerType.labels"
					:data="turnsPerType.data"
					:legend="true"
					/>

			</div>
		</div>
	</div>
</template>

<script>

import PieChart from './PieChart';
import LineChart from './LineChart';

export default {
	
	components: {
		'pie-chart': PieChart,
		'line-chart': LineChart
	},

	data: () => ({
		turnCount: 50,
		turnsPerType: {
			title: 'Torns per tipus',
			labels: [
				'Normal', 'Reserva', 'VIP'
			],
			data: [
				50, 43, 12
			]
		}
	}),


}
</script>

<style>

#dashboard {
	max-width: 1400px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
}

.loader {
	height: 25px;
	width: auto;
}
</style>

