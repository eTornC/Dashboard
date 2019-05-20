<template>
  <div class="col-md-12" style="height:100%">
    <h1>TEST</h1>
    <a-componet :mode="mode" :config="jsonLayout"/>
    <counter-componet/>
    <button @click="showMode()">show</button>
    <button @click="$store.state.count ='change'">change</button>

  </div>
</template>

<script>
import componetA from "./a.vue";
import counter from "./counter.vue";
export default {
  //per agafar data externa.
  components: {
    "a-componet": componetA,
    "counter-componet": counter 
  },
  data() {
    return {
      jsonLayout: JSON.parse(
        `{"height":"100","cols":[{"height":"100","width":12,"rows":[{"height":"100","cols":[{"height":"100","width":4,"type":"TrunList","id":1},{"height":"100","width":4,"type":"TotemStore","id":1},{"height":"100","width":4,"type":"Publicity","id":1}]}]}]}`
      ),
      mode: "min"
    };
  },

  mounted() {
    //this.htmlGrid = this.generateGrid(this.jsonConfig);
    //console.log(this.htmlGrid);
  },

  methods: {
    showMode() {
      console.log(this.mode);
    },
    chenge(){
      $store.state.count ="change";      
    }
  },
  created() {
    console.log(this.jsonConfig);
  }
};
</script>

<style scoped>
.col-md-12 {
  padding: 0 !important;
}
</style>


