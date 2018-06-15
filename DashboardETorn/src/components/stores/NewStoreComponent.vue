<template>
	<div class="card container w-25">
		<p class="h1 text-center mb-2 mt-3 title">Nova parada</p>
		<form @submit.prevent="newStore()">
			<input type="submit" value="done" /> 
		</form>
	</div>
</template>

<script>
export default {
	methods: {
		newStore() {
			this.$swal('Aloha')
		}
	}
}
</script>

<style>

</style>
