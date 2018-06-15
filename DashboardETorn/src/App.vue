<template>
  <div id="app">
    <nav class="navbar bg-primary navbar-expand-lg navbar-dark py-2">
			<div class="navbar-brand mr-4">
				eTorn!
			</div>
			<a class="nav-link active " href="/#/Stores">Parades</a>
			<a class="nav-link text-white" href="#">Dades</a>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.title {
  font-family: 'Roboto Thin';
}
</style>
