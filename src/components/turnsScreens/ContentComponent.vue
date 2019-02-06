<template>
  <div class="store_pantalla my-2 mx-2">
		<h1 class="mb-3 mt-2">Torns {{ store.name }}</h1>
		<h3 class="mb-1">Torn Actual: {{ computedActualTurn }}</h3>
        
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
			resfescar:null,
		}
    },
    methods: {
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
    },
    created() {
       this.updateActualTurn();
       this.resfescar =  setInterval(this.updateActualTurn, 1000);

	},
  
}
</script>
