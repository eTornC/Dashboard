<template>
  <div
    class="row w-100 py-3 px-3 mx-0"
    @click="select"
    v-if="config.cols"
    style="border: 1px solid black"
  >
    <template v-for="(col, index) in config.cols">
      <col-component :class="'px-3 py-3 mx-0 col-md-' + col.width" :config="col" :key="index"/>
    </template>
  </div>
  <div v-else style="border: 1px solid black" class="px-3 py-3">
    <span>{{config.id}}</span>
    <content-component :store="stores"/>
  </div>
</template>

<script>
import urls from "../../api/config.js";
import axios from "axios";
export default {
  props: {
    config: Object
  },
  data() {
    return {
      stores: null
    };
  },

  methods: {
    select(ev) {
      ev.target.style.backgroundColor =
        "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    },
    getStore() {}
  },
  created() {
    if (this.config.id != null) {
      const url =
        urls.host +
        urls.routes.prefix +
        urls.routes.store +
        "/" +
        this.config.id;
      console.log(url);

      axios
        .get(url)
        .then(res => {
          this.stores = res.data[0];
         // console.log(this.stores);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

