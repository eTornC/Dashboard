<template>
  <div style="border: 1px solid black"
    v-if="config.rows"
    class="px-3 py-3">
      <template v-for="(row, index) in config.rows">
        <row-component 
          :config="row" 
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
import RowComponent from './RowComponent.vue';

export default {

  name: 'col-component',
  
  components: {
    'row-component': RowComponent
  },

  props: {
    config: Object
  },
};
</script>

