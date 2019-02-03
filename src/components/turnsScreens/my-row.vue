<template>
  <div v-if="jsonConfig.rows">
    <div class="row px-3 py-3 mx-0" style="border: 1px solid black">
      <template v-for="(row, index) in jsonConfig.rows">
        <row :key="index" :jsonConfig="row"/>
      </template>
    </div>
  </div>
  <div v-else-if="jsonConfig.cols">
    <div class="col-md-jsonConfig.cols[i].width px-3 py-3 mx-0" style="border: 1px solid black">
      <template v-for="(column, index) in jsonConfig.cols">
        <column :key="index" :jsonConfig="column"/>
      </template>
    </div>
  </div>
  <div v-else>{{jsonConfig.content}}</div>
</template>

<script>
import row from "./my-row.vue";
import column from "./my-column.vue";
export default {
  components: {
    row: row,
    column: column
  },
  props: {
    jsonConfig: Object
  },
  mounted() {},
  created() {
    console.log(this.jsonConfig);
  },
  methods: {}
};
</script>

