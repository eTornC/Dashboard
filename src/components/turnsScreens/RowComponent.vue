<template>
  <div
    @click="select(2)"
    class="row w-100 py-3 px-3 mx-0"
    v-if="config.cols"
    style="border: 1px solid black"
  >
    <template v-for="(col, index) in config.cols">
      <col-component :class="' px-3 py-3 mx-0 col-md-' + col.width" :config="col" :key="index"/>
    </template>
  </div>
  <div v-else style="border: 1px solid black" class="px-3 py-3">
    <!-- solucio del que el store es null utilitza el v-for por pasar objecta.
      si pasar el strores directamente es null
    -->
    <div class="turnBox">
      <template v-for="store in stores">
        <content-component :key="store.name" :store="store"/>
      </template>
    </div>
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
    select_Color(ev) {
      ev.target.style.backgroundColor =
        "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    },
    select(index) {
      console.log(index);
      store.commit("increment", index);
    },
    getStore() {
      if (this.config.id != null) {
        const url =
          urls.host +
          urls.routes.prefix +
          urls.routes.store +
          "/" +
          this.config.id;
        //console.log(url);

        axios
          .get(url)
          .then(res => {
            this.stores = res.data;
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  },
  mounted() {},
  created() {
    this.getStore();
  }
};
</script>

<style>
.turnBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
