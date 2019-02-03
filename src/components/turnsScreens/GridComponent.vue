<template>
	<div>
		<div v-if="grid.rows">
			<div class="row px-3 py-3 mx-0" 
						style="border: 1px solid black" 
						v-for="(row, index) in grid.rows"
						v-bind:key="index">
				<grid-component :grid="row"></grid-component>
			</div>
		</div>	
		<div v-else-if="grid.cols">
			<div v-for="(col, index) in grid.cols"
						style="border: 1px solid black" 
						:class="'px-3 py-3 mx-0 col-md-' + col.width"
						v-bind:key="index">
				<grid-component :grid="col"></grid-component>
			</div>
		</div>
		<div v-else>
			<span>{{ grid.content }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		grid: Object,
		index: Number
	},
}
</script>
