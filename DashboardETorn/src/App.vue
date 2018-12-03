<template>
  <div id="app">
    <nav class="navbar bg-primary navbar-expand-lg navbar-dark py-2">
<<<<<<< HEAD
			<div class="navbar-brand mr-4" @click="$router.push({ name: 'main', })">
				eTorn!
			</div>
			<a class="nav-link active text-white" :href="$router.resolve({ name: 'stores' }).href">Parades</a>
			<a class="nav-link text-white" href="/">Dades</a>
      <a class="nav-link text-white" :href="$router.resolve({ name: 'test' }).href">Testing</a>
=======
			<a @click="$router.push('/')">
        <div class="navbar-brand mr-4">
          eTorn!
        </div>
      </a>
			<a class="nav-link active text-white" @click="$router.push('/Stores')">Parades</a>
			<a class="nav-link text-white">Dades</a>
      <a class="nav-link text-white" @click="$router.push('/Config')">Configuració</a>
>>>>>>> f8485d044cd7b085772d452e50d3750b14fccc61
    </nav>
    
    <router-view class="" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    beforeCreate() {
      console.log(this.$router.resolve({ name: 'stores' }))
    }
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
