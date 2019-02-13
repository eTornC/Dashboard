<template>
  <div style="border: 1px solid black" @click="select" v-if="config.rows" class="px-3 py-3">
    <template v-for="(row, index) in config.rows">
      <row-component :config="row" :key="index"/>
    </template>
  </div>
  <div v-else style="border: 1px solid black" class="px-3 py-3">
   <template v-for="store in stores" >
			<content-component :key="store.name" :store="store"/>
		</template>
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
    }
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
          this.stores = res.data;
          //console.log(this.stores);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

