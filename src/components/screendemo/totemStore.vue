<template>
  <div class="main d-flex align-items-center">
    <div v-if="store" class="card" style="width: 100%;">
      <img class="card-img-top" :src="store.photo_path" alt="Card image cap">
      <div class="card-body p-1">
        <h5 >{{store.name}}</h5>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import config from "../../api/config";

export default {
  props: {
    jsonConfig: Object,
    id: Number
  },
  data() {
    return {
      store: null,
      store_photo_path: null
    };
  },
  mounted: function() {
    this.getStore();
  },
  methods: {
     getStore(){
      const url = config.host + config.routes.prefix + config.routes.store+"/"+this.id;
      axios
        .get(url)
        .then(res => {
          this.store = res.data;
          this.store.photo_path = config.host + this.store.photo_path ;
        })
        .catch(err => {
          console.log("Fail");
        });
    }
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
}
</style>
