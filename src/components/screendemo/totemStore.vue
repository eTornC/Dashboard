<template>
  <div class="main d-flex align-items-center justify-content-center">
    <div v-if="mode =='min'">
      <img src="../../assets/ticket.svg" width="50px" alt="">
    </div>
    <template v-else-if="mode =='complet'">
      <div v-if="store" class="card" style="width: 70%; ">
        <img class="card-img-top" style="height:130px;" :src="store.photo_path" alt="Card image cap">
        <div class="card-body p-1">
          <h5>{{store.name}}</h5>
        </div>
      </div>
    </template>
    <div v-else>
      mode Error
    </div>
  </div>
</template>


<script>
import axios from "axios";
import config from "../../api/config";

export default {
  props: {
    jsonConfig: Object,
    id: Number,
    mode: String
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
    getStore() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.store +
        "/" +
        this.id;
      axios
        .get(url)
        .then(res => {
          this.store = res.data;
          this.store.photo_path = config.host + this.store.photo_path;
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
