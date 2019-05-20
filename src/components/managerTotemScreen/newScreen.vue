<template>
  <div>
    <div v-if="model == 'edit'" class="main_edit">
      <div class="content">
        <div class="info">
          <div class="card">
            <div class="card-header">Datos de pantalla</div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="newName"
                      placeholder="nom"
                      class="form-control text-dark"
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="description"
                      placeholder="descripcion"
                      class="form-control text-dark"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="template">
          <layout-generator :mode="'TotemStore'" :jsonConfig="$store.state.jsonLayout"/>
          <!--div id="option" class="p-3"></div-->
        </div>
      </div>
      <!-- div class="row">
        <div class="col-12">
          <textarea v-model="newScreenLayout" rows="4" cols="50"></textarea>
          <button @click="getNewLayout()" type="button" class="btn btn-danger">getNewLayout</button>
        </div>
      </div -->
      <div class="option">
        <div class="cancel">
          <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
        </div>
        <div class="save">
          <button @click="save();" type="button" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
    <div v-else-if="model === 'select'">
      <h1>Selecciona una plantilla</h1>
      <div class="templateContent">
        <div
          :class="{ select: template.id == templateSelect.id }"
          class="template templateTotem"
          @click="select(index)"
          v-for="(template, index) in templates"
          :key="template.id"
        >
          <header>
            <div class="template_name">
              <span>{{template.name}}</span>
            </div>
          </header>
          <div class="content">
            <screen-demo-component :jsonConfig="template.layout"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="model != 'edit'" class="test-center">
      <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
      <button
        v-if="templateSelect && model != 'edit' && templateSelect.id !=0 "
        @click="crear()"
        class="btn btn-primary"
      >Crear</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import swal from "sweetalert2";
global.jQuery = require("jQuery");
var $ = global.jQuery;
window.$ = $;

import urls from "../../api/config.js";
import demoScreen from "./screenDemo.vue";
import LayoutGenerator from "../LayoutBuild/LayoutGenerator";

export default {
  components: {
    "screen-demo-component": demoScreen,
    "layout-generator": LayoutGenerator
  },
  data() {
    return {
      templates: null,
      templateSelect: { id: 0 },
      newName: null,
      description: null,
      model: "select",
      newScreenLayout: "",
      publicities: []
    };
  },
  mounted: function() {
    this.getTemplates();
  },

  methods: {
    ...mapActions(["jsonLayoutToObject", "setJsonLayout"]),
    getNewLayout() {
      this.newScreenLayout = JSON.stringify(this.$store.state.jsonLayout);
    },
    getTemplates() {
      const url = urls.host + urls.routes.prefix + urls.routes.layouts;
      //console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.templates = res.data.filter(
            layout => layout.type == "TEMPLATE"
          );
          console.log(reference.templates);
        })
        .catch(err => {
          console.error(err);
        });
    },
    save() {
      if (this.templateSelect && this.newName && this.description) {
        console.log("Name:" + this.newName);
        console.log("Descripcion:" + this.description);
        console.log(this.newScreenLayout);
        this.getNewLayout();
        let reference = this;

        const url = urls.host + urls.routes.prefix + urls.routes.totem_screen;
        console.log(url);
        axios
          .post(url, {
            name: this.newName,
            layout: JSON.parse(this.newScreenLayout),
            description: this.description,
            type: "TURNSCREEN"
          })
          .then(function(response) {
            console.log(response);
            swal.fire({
              position: "top-end",
              type: "success",
              title: "Pantalla creada",
              showConfirmButton: false,
              timer: 1500
            });
            this.setmode("select");
            $router.push("/totemScreenManager");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        swal("Aviso!", "Falten el nombre o el descripcions!");
      }
    },
    crear() {
      this.model = "edit";
    },
    select(index) {
      console.log(index);
      this.templateSelect = this.templates[index];
      this.$store.dispatch("setJsonLayout", this.templateSelect.layout);
      //this.jsonLayoutToObject();
    },
    setmode(mode) {
      this.mode = mode;
    }
  }
};
</script>

 <style scoped>
.templateContent {
  display: flex;
  flex-wrap: wrap;
}
.templateTotem {
  border-radius: 5px;
  -webkit-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.template {
  width: 350px;
  height: 250px;
  background-color: #e4e4e4;
  position: relative;
  overflow: hidden;
  margin: 50px auto;
}

.template header {
  height: 15%;
  width: 100%;
  display: flex;
}
.template_name {
  width: 100%;
  height: 100%;
  background-color: #b1ccef;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.template .content {
  height: 85%;
  width: 100%;
  margin: 0%;
}

/* edit */
.main_edit {
  height: 80%;
}
.main_edit .content {
  height: 700px;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.info {
  width: 100%;
  font-size: 2rem;
  background-color: #999;
  margin: 1% 0;
  border-radius: 5px;
}

.info .col-sm-10 {
  display: flex;
  align-items: center;
}

.main_edit .content .template {
  background-color: #ccc;
  height: 90%;
  width: 100%;
  padding: 0;
}

.main_edit .option {
  height: 20%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.template #option {
  height: 100%;
}
.select {
  border: 5px solid #007bff;
}
.storelistbox {
  height: 100%;
  width: 100%;
  border: 1px solid black;
}
</style>