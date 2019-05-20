<template>
  <div :style="'height:'+ config.height +'%'+';border: 1px solid black'" v-if="config.rows">
    <template v-for="(row, index) in config.rows">
      <row-component-select :mode="mode" :config="row" :key="index"/>
    </template>
  </div>
  <div v-else :style="'height:'+ config.height+'%' +';border: 1px solid black'" class="px-0 py-0">
    <div class="turnBox">
      <div style="border: 1px solid black;" class="col-12">
        <div class="pt-2 form-check form-check-inline">
          <input
            type="checkbox"
            v-model="StoreChecked"
            @click="setOption(); config.type =mode;"
            value="Store"
          >Store
        </div>
        <div class="pt-2 form-check form-check-inline">
          <input
            type="checkbox"
            v-model="PublicityChecked"
            @click="setOption(); config.type ='Publicity';"
            value="Publicity"
          >Publicity
        </div>
        <div v-if="StoreChecked" class="p-3" style=" width: 100%; ">
          <select v-model="config.id" class="form-control">
            <option v-for="(store,index) in stores" :key="index" :value="store.id">{{store.name}}</option>
          </select>
        </div>
        <div v-else class="p-3" style=" width: 100%; ">
          <select v-model="config.id" class="form-control">
            <option
              v-for="(publicity,index) in publicities"
              :key="index"
              :value="publicity.id"
            >{{publicity.name}}</option>
          </select>
        </div>
      </div>

      <!--{{config.type}}
      {{config.id}}
      <input type="text" name id v-model="config.type">
      <input type="text" name id v-model="config.id"-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../../api/config.js";

export default {
  props: {
    config: Object,
    mode: String
  },
  data() {
    return {
      stores: null,
      publicities: null,
      StoreChecked: null,
      PublicityChecked: null
    };
  },
  methods: {
    setOption() {
      this.StoreChecked = !this.StoreChecked;
      this.PublicityChecked = !this.PublicityChecked;
    },
    select(ev) {
      ev.target.style.backgroundColor =
        "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    },
    getStores() {
      const url = urls.host + urls.routes.prefix + urls.routes.stores;
      console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.stores = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getPublicities() {
      const url = urls.host + urls.routes.prefix + urls.routes.publicitys;
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.publicities = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {
    this.getStores();
    this.getPublicities();
  },
  mounted() {
    if (this.config.type) {
      if (this.config.type == "Publicity") {
        this.config.type = "Publicity";
        this.StoreChecked = false;
        this.PublicityChecked = true;
        this.start = true;
      } else {
        this.config.type = this.mode;
        this.StoreChecked = true;
        this.PublicityChecked = false;
        this.start = true;
      }
      console.log(this.config.type);
    }
  },
  beforeCreate() {}
};
</script>

<style scoped>
.turnBox {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}
.col {
  padding: 0;
}
</style>
