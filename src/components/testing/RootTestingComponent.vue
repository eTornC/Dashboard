<template>
	<div class="py-5 px-5 flexxx justify-content-center">
		
		<div v-if="showTurnsModal">
			<TurnsListModal :store="storeModal" @closeModal="closeModal()" />
		</div>

		<template v-for="store in stores" >
			<TestingStoreComponent :key="store.name" :store="store" class="d-inline" @turnsList="showTurnsListModal"/>
		</template>
	</div>
</template>

<script>
import urls from '../../api/config';

import TestingStoreComponent from './TestingStoreComponent.vue';
import TurnsListModal from './TurnsListModal.vue';

import axios from 'axios';

export default {
	components: {
		TestingStoreComponent,
		TurnsListModal
	},
	data() {
		return {
			stores: [],

			showTurnsModal: false,
			storeModal: {},
		}
	},
	created() {
		const url = urls.host + urls.routes.prefix + urls.routes.stores
		axios.get(url)
			.then(res => {
				console.log(res.data);
				this.stores = res.data;
			})
			.catch(err => {
				console.log(err);
			});
	},
	methods: {
		showTurnsListModal(store) {
			this.storeModal = store;
			this.showTurnsModal = true;
		},
		closeModal() {
			this.showTurnsModal = false;
		}
	}
}
</script>

<style>
.flexxx {
	display: flex;
	flex-wrap: wrap;
}
</style>
