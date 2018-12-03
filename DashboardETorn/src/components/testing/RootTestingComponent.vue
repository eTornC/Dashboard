<template>
	<div class="py-5 px-5 flexxx justify-content-center">
		<template v-for="store in stores" >
			<TestingStoreComponent :key="store.name" :store="store" class="d-inline"/>
		</template>
	</div>
</template>

<script>
import urls from '../../api/config';
import TestingStoreComponent from './TestingStoreComponent.vue';
import axios from 'axios';

export default {
	components: {
		TestingStoreComponent
	},
	data() {
		return {
			stores: []
		}
	},
	created() {
		const url = urls.host + urls.routes.prefix + urls.routes.stores
		axios.get(url)
			.then(res => {
				this.stores = res.data;
			})
			.catch(err => {
				console.log(err);
			});
	}
}
</script>

<style>
.flexxx {
	display: flex;
	flex-wrap: wrap;
}
</style>
