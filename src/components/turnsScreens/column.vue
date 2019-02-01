<template>
 <div class="col-md-{{jsonConfig.cols[i].width}} px-3 py-3 mx-0" style="border: 1px solid black">
  <div v-if="jsonConfig.rows">
			  <template v-for="row in jsonConfig.rows" >
					<row  :key="row" :jsonConfig="row" />
			  </template>	
		</div>
        <div v-else-if="jsonConfig.cols">
			<template v-for="column in jsonConfig.column" >
					<column  :key="column" :jsonConfig="column" />
			  </template>
		</div>
        <div v-else> {{jsonConfig.content}}</div>
</div>
   
</template>

<script>
export default {
  props: {
    jsonConfig: Object
  },
  data() {

  },

  mounted() {
   
  },

  methods: {
  }
};
</script>

