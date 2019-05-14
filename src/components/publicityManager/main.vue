<template>
  <div class="row">
    <div class="col-12 d-sm-flex align-items-center justify-content-between mb-4 mt-4">
      <h1 class="h3 mb-0 text-gray-800">Publicidad</h1>
      <span
        v-if="model !='view'"
        @click="setModel('view')"
        class="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"
      >
        <i class="fas fa-sm text-white-50"></i> Cancelar
      </span>
      <span
        v-else
        @click="setModel('add')"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      >
        <i class="fas fa-sm text-white-50"></i> Afegir publicidad
      </span>
    </div>
    <div class="col-12" v-if="model == 'view'">
      <div v-for="(publicity,index) in publicitys" :key="index">
        <div class="card flex-md-row mb-4 mt-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <h3 class="mb-0">
              <strong class="d-inline-block mb-2 text-dark">{{publicity.name}}</strong>
            </h3>
            <div class="mb-1 text-muted">{{publicity.updated_at}}</div>
            <p class="card-text mb-auto">{{publicity.description}}</p>

            <div>
              <span class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Editar</span>
              <span @click="deletePublicity(publicity)"
                class="d-none text-white-50 d-sm-inline-block btn btn-sm btn-danger shadow-sm"
              >Borrar</span>
            </div>
          </div>
          <div
            class="card-img-right flex-auto d-none d-md-block"
            style="width: 700px;height: 250px; background-color:#EEE"
            v-html="publicity.html"
          ></div>
        </div>
      </div>
    </div>
    <div class="col-12" v-else-if="model == 'add'">
      <add-publicity></add-publicity>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../api/config";
import addPublicity from "./publicityAdd.vue";

export default {
  data() {
    return {
      publicitys: [],
      model: "view"
    };
  },
  components: {
    "add-publicity": addPublicity
  },
  mounted() {
    this.getPubliocity();
  },
  created() {},
  methods: {
    getPubliocity() {
      const url = config.host + config.routes.prefix + config.routes.publicitys;

      axios
        .get(url)
        .then(res => {
          this.publicitys = res.data;
        })
        .catch(err => {
          console.log("Fail");
        });
    },
    deletePublicity(publicity) {
      axios
        .delete(
          config.host +
            config.routes.prefix +
            config.routes.publicity +
            "/" +
            publicity.id
        )
        .then(res => {
          if (res.data) {
            this.$swal("Publicidad eliminado.");
            this.getPubliocity();
          }
        });
    },

    setModel(model) {
      this.model = model;
    }
  }
};
</script>

<style scoped>
.row {
  margin: 0;
}
</style>
