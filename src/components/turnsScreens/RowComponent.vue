<template> 
  <div class="row w-100 py-3 px-3" 
    v-if="config.cols"
    style="border: 1px solid black"> 
      <template v-for="(col, index) in config.cols" >
        <col-component 
          :class="'px-3 py-3 mx-0 col-md-' + col.width"
          :config="col"
          :key="index"  
          />
      </template>
  </div>
  <div v-else 
    style="border: 1px solid black" 
    class="px-3 py-3">
      <span>{{config.content}}</span>
  </div>
</template>

<script>
import ColComponent from './ColComponent.vue';

export default {

  name: 'row-component',
  
  components: {
    'col-component': ColComponent
  },

  props: {
    config: Object
  },

};
</script>

