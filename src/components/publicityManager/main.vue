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
    <div class="container">
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
                <span
                  class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                  @click="editPublicity(publicity)"
                >Editar</span>
                <span
                  @click="deletePublicity(publicity)"
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
      <div class="col-12" v-else-if="model == 'edit'">
        <edit-publicity
          v-on:toHome="model =$event; getPublicity(); "
          :publicity="this.publicityChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../api/config";
import addPublicity from "./publicityAdd.vue";
import editPublicity from "./publicityEdit.vue";

export default {
  data() {
    return {
      publicitys: [],
      model: "view",
      publicityChange: null
    };
  },
  components: {
    "add-publicity": addPublicity,
    "edit-publicity": editPublicity
  },
  mounted() {
    this.getPublicity();
  },
  created() {},
  methods: {
    getPublicity() {
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
      this.$swal
        .fire({
          title: "Seguro quires borrar-lo?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si borra!",
          cancelButtonText: "No"
        })
        .then(result => {
          if (result.value) {
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
                  this.getPublicity();
                }
              });
          }
        });
    },
    editPublicity(publicity) {
      this.publicityChange = publicity;
      this.model = "edit";
    },

    setModel(model) {
      if (model == "view") {
        this.getPublicity();
      }
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
