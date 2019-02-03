<template>
  <div style="border: 1px solid black"
    @click="select"
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

export default {

  props: {
    config: Object
  },

  methods: {

    select(ev) {
      ev.target.style.backgroundColor = ("#"+((1<<24)*Math.random()|0).toString(16))
    }
  }
};
</script>

