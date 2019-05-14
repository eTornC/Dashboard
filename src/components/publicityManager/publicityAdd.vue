<template>
  <div>
    <div class="col-12 p-5 mb-2">
      <div class="card">
        <div class="card-header">Featured</div>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label>Nombre</label>
                <input v-model="name" type="text" class="form-control" placeholder="nombre">
              </div>
            </div>
            <div class="col-6">
              <label>Descripcion</label>
              <textarea v-model="description" class="form-control" rows="3"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row p-4">
      <div class="col-6">
        <div class="row">
          <div class="col-12 viwerBox">
            <div
              class="viwer"
              :style="{ height: viewr.height + 'px', width: viewr.width + 'px' }"
              v-html="htmlCode"
            ></div>
            <div class="mt-2">
              <span>height</span>
              <input type="number" v-model="viewr.height" min="1" max="390">
              <span>width</span>
              <input type="number" v-model="viewr.width" min="1" max="700">
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <div class="code">
              <textarea class="form-control" v-model="htmlCode" rows="12" placeholder="Code HTML"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <button @click="save()" type="button" class="btn btn-primary">Guardar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../../api/config.js";
import swal from "sweetalert2";
export default {
  data() {
    return {
      viewr: {
        height: 300,
        width: 510
      },
      name: null,
      description: null,
      htmlCode: null
    };
  },
  mounted: function() {},
  methods: {
    save() {
      const url = urls.host + urls.routes.prefix + urls.routes.publicity;
      //console.log(url);
      if (
        this.name != null &&
        this.description != null &&
        this.htmlCode != null
      ) {
        axios
          .post(url, {
            name: this.name,
            description: this.description,
            html: this.htmlCode
          })
          .then(function(response) {
            swal.fire({
              position: "top-end",
              type: "success",
              title: "Publicidad Creado",
              showConfirmButton: false,
              timer: 1500
            });
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        swal.fire({
          position: "top-end",
          type: "error",
          title: "Falta datos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  }
};
</script>

 <style scoped>
.viwerBox {
  overflow: hidden;
  height: 430px;
}

.viwer {
  background-color: #bad4ec;
  overflow: hidden;
}
</style>