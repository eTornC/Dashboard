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

@import url('https://unpkg.com/vue-material@beta/dist/vue-material.min.css');
@import url('https://unpkg.com/vue-material@beta/dist/theme/default.css');
@import url("http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900");


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
