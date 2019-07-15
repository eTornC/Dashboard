<template>
	<div class="w-100 px-4 py-3">
		<div id="dashboard">
			<div class="row mx-0">

				<div class="col-md-12 card">
					<div class="row py-0">
						<div class="col-md-5 py-1">
							<h2 class="mb-0">{{ turnCount }} torns.</h2>
						</div>
						<div class="col-md-2 py-1">
							<img v-show="downloading" class="loader" src="../../assets/chat-loader.gif" />
						</div>
						<div class="col-md-5 py-2">
							<div class="row">
								<div class="col-md-6 justify-content-center">
									<dropdown-button 
										:data="stores" 
										:select="true" 
		 								label="Parada"
										@onSelect="onSelectStore"
										/>
								</div>
								<div class="col-md-6 justify-content-center">
									<datetimepicker @change="onChangeDate" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="w-100 mt-1">
					<div class="row mx-0">
						<div class="col-md-6 px-0 mx-0">
							<pie-chart 
								:title="turnsPerType.title"
								:labels="turnsPerType.labels"
								:data="turnsPerType.data"
								:legend="true"
								class="w-100 h-100"
								/>
						</div>
						<div class="col-md-6 pl-1 pr-0  mx-0">
							<line-chart 
								:title="timelineData.title"
								:labels="timelineData.labels"
								:data="timelineData.data"
								:legend="true"
								class="w-100"
								/>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

import PieChart from './PieChart';
import LineChart from './LineChart';
import DropdownButton from './DropdownButton';
import DateRangePicker from './DateRangePicker';

const axios = require('axios');

export default {
	
	components: {
		'pie-chart': PieChart,
		'line-chart': LineChart,
		'dropdown-button': DropdownButton,
		'datetimepicker': DateRangePicker
	},

	data: () => ({
		stores: [],

		downloading: false,
		
		startDate: '2018-01-01',
		endDate: '2020-01-01',
		actualStore: '',

		firstLoad: true,
		
		turnCount: 0,
		turnsPerType: {
			title: 'Torns per tipus',
			labels: [
				'Normal', 'Reserva', 'VIP'
			],
			data: [
				50, 43, 12
			]
		},
		timelineData: {
			title: 'Torns aquest mes',
			labels: [
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
				11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
				21, 22, 23, 24, 25, 26, 27, 28, 29, 30
			],
			data: [
				50, 43, 12, 1, 3, 4, 6, 8, 9, 12, 10, 8, 23, 24, 26, 24, 27
			]
		}
	}),

	beforeMount() {
		this.downloadStores(() => {
			this.actualStore = this.stores[0];
			this.downloadData();
		});
	},

	computed: {
		params() {
			return '?start_date=' + this.startDate + '&end_date=' +
			 		this.endDate + '&store=' + this.actualStore; 
		}
	},

	methods: {
		downloadStores(cb) {
			axios.get('http://localhost/stores')
				.then(res => {
					this.stores = res.data.map(store => store.name);
					cb();
				});
		},
		async downloadData() {
			this.downloading = true;
			this.turnCount = (await this.downloadTurnsNumber()).data.total;
			
			let turnsPerType = (await this.downloadTurnsPerType()).data;
			this.turnsPerType.labels = turnsPerType.map(turn => turn.type);
			this.turnsPerType.data = turnsPerType.map(turn => turn.total);

			let timelineData = (await this.downloadTimelineTurns()).data;
			this.timelineData.labels = timelineData.map(turn => turn.day);
			this.timelineData.data = timelineData.map(turn => turn.total);

			this.downloading = false;
		},
		downloadTurnsNumber() {
			return axios.get('http://localhost/turns-number' + this.params);
		},
		downloadTurnsPerType() {
			return axios.get('http://localhost/turns-per-type' + this.params);;
		},
		downloadTimelineTurns() {
			return axios.get('http://localhost/turns-by-day' + this.params);;
		},
		onSelectStore(ev) {
			this.actualStore = ev.item;
			this.downloadData();
		},
		onChangeDate(ev) {
			this.startDate = this.formatDate(ev.startDate);
			this.endDate = this.formatDate(ev.endDate);

			if (this.firstLoad) {
				this.firstLoad = false;
				return;
			}

			this.downloadData();
		},
		formatDate(date) {
			if (date instanceof Date) {

				let month   = (date.getMonth()+1);
				let day     = date.getDate();
				let hours   = date.getHours();
				let minutes = date.getMinutes();
				let seconds = date.getSeconds();

				if (month < 10)   month   = '0' + month;
				if (day < 10)     day     = '0' + day;
				if (hours < 10)   hours   = '0' + hours;
				if (minutes < 10) minutes = '0' + minutes;
				if (seconds < 10) seconds = '0' + seconds;

				return date.getFullYear() + '-' + month + '-' + day +
				' ' + hours + ':' + minutes + ':' + seconds;
			}

        	return '';
		}
	}

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
	height: 40px !important;
	width: auto;
}
</style>

