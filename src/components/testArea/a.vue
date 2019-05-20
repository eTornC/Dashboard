<template>
      <div class="col-md-12" style="height:100%" >
        <input type="text" v-model="$store.state.count" name="" id="">
      </div>
</template>

<script>
export default {
  //per agafar data externa.
  props: {
    jsonConfig: Object,
    mode:String
  },
  data() {
    return {
    };
  },

  mounted() {
    //this.htmlGrid = this.generateGrid(this.jsonConfig);
    //console.log(this.htmlGrid);
  },

  methods: {

  },
  created(){
     console.log(this.jsonConfig)
  }
};
</script>

<style scoped> 
.col-md-12{
  padding: 0 !important;
}
</style>


