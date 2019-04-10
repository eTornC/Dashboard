<template>
  <div>
    <div v-if="templateSelect && model != 'edit'" class="form">
      <h1>Plantilla selectionado : {{templateSelect.NAME}}</h1>
      <button @click="crear()" class="btn btn-primary mb-2">Crear</button>
    </div>

    <div v-if="model == 'edit'" class="main_edit">
      <div class="content">
        <div class="info">
          <div class="form-group row">
            <div class="col-sm-2">
              <h1 class=" col-form-label">Nom</h1>
            </div>
            <div class="col-sm-10">
              <input
                required="required"
                v-model="newName"
                type="text"
                class="form-control"
                placeholder="nuevo nombre"
              >
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-2">
              <h1 class="col-form-label">Descripcion</h1>
            </div>
            <div class="col-sm-10">
              <input
                required="required"
                v-model="description"
                type="text"
                class="form-control"
                placeholder
              >
            </div>
          </div>
        </div>
        <div class="template">
          <div id="option"></div>
        </div>
      </div>
      <div class="option">
        <div class="cancel">
          <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
        </div>
        <div class="save">
          <button @click="save();" type="button" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
    <div v-else-if="model === 'select'" class="templateContent">
      <div
        class="template"
        @click="select(index)"
        v-for="(template, index) in templates"
        :key="template.ID"
      >
        <header>
          <div class="template_name">
            <span>{{template.NAME}}</span>
          </div>
        </header>
        <div class="content">
          <screen-demo-component :jsonConfig="JSON.parse(template.LAYOUT)"/>
        </div>
      </div>
    </div>
    <div v-if="model != 'edit'" class="cancel">
      <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../../api/config.js";
import demoScreen from "./screenDemo.vue";

import swal from "sweetalert2";
global.jQuery = require("jQuery");
var $ = global.jQuery;
window.$ = $;

export default {
  components: {
    "screen-demo-component": demoScreen
  },
  data() {
    return {
      templates: null,
      templateSelect: null,
      newName: null,
      description: null,

      model: "select",
      StoreListHtmlCode: "",
      stores: [],
      sections: [0],
      storeSelect: [],
      selectPositionCountID: 0,
      layoutPositionCountID: 0,
      newScreenLayout: ""
    };
  },
  mounted: function() {
    this.getTemplates();
  },
  methods: {
    getTemplates() {
      const url = urls.host + urls.routes.apiPrefix + urls.routes.layouts;
      //console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.templates = res.data.records.filter(
            layout => layout.TYPE == "TEMPLATE"
          );
          console.log(reference.templates);
        })
        .catch(err => {
          console.error(err);
        });
    },
    save() {
      if (this.templateSelect && this.newName && this.description) {
        console.log("save");
        let storeSelect = [];
        $(".selecte").each(function(i) {
          storeSelect[$(this).attr("selectId")] = $(this)
            .children("option:selected")
            .val();
        });
        this.storeSelect = storeSelect;
        console.log(this.storeSelect);
        this.newScreenLayout = "{";
        this.generateNewScreenLayout(JSON.parse(this.templateSelect.LAYOUT));
        this.newScreenLayout += "}";
        this.layoutPositionCountID = 0;

        console.log("Name:" + this.newName);
        console.log("Descripcion:" + this.description);
        console.log(this.newScreenLayout);

        let reference = this;

        const url = urls.host + urls.routes.apiPrefix + urls.routes.layouts;
        axios
          .post(url, {
            NAME: this.newName,
            LAYOUT: this.newScreenLayout,
            DESCRIPTION: this.description,
            TYPE: "TURN"
          })
          .then(function(response) {
            console.log(response);
            reference.templateSelect = null;
            reference.model = "select";
            swal.fire({
              position: "top-end",
              type: "success",
              title: "Pantalla creada",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        swal("Aviso!", "Falten el nombre o el descripcions!");
      }
    },
    crear() {
      this.getStores();
      this.model = "edit";
    },
    select(index) {
      console.log(index);
      this.templateSelect = this.templates[index];
    },
    setmode(mode) {
      this.mode = mode;
    },
    getStores() {
      const url = urls.host + urls.routes.prefix + urls.routes.stores;
      console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.stores = res.data;
          this.createScreenLayout();
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    createScreenLayout() {
      this.StoreListHtmlCode = this.generateGrid(
        JSON.parse(this.templateSelect.LAYOUT)
      );
      console.log(this.templateSelect.LAYOUT);
      $("#option").html(this.StoreListHtmlCode);
    },
    generateGrid(jsonConfig) {
      this.StoreListHtmlCode = "";
      if (jsonConfig.rows) {
        for (let i = 0; i < jsonConfig.rows.length; i++) {
          this.StoreListHtmlCode += `<div class="row px-3 py-3 mx-0" style="height: ${
            jsonConfig.rows[i].height
          }%;border: 1px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else if (jsonConfig.cols) {
        for (let i = 0; i < jsonConfig.cols.length; i++) {
          this.StoreListHtmlCode += `<div class="col-md-${
            jsonConfig.cols[i].width
          } px-3 py-3 mx-0 " style=" height: ${
            jsonConfig.cols[i].height
          }%; border: 1px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }
        return this.StoreListHtmlCode;
      } else {
        return this.crearStoreList(jsonConfig.id);
      }
      //console.log(StoreListHtmlCode);

      this.StoreListHtmlCode = StoreListHtmlCode;
    },
    crearStoreList(id) {
      this.StoreListHtmlCode +=
        `<select selectId="${
          this.selectPositionCountID
        }" class="form-control selecte` + '">';
      for (let i = 0; i < this.stores.length; i++) {
        if (i + 1 == id) {
          this.StoreListHtmlCode +=
            '<option selected value="' +
            `${i + 1}` +
            '">' +
            this.stores[i].name +
            "</option>";
        } else {
          this.StoreListHtmlCode +=
            '<option value="' +
            `${i + 1}` +
            '">' +
            this.stores[i].name +
            "</option>";
        }
      }
      this.StoreListHtmlCode += "</select>";
      this.selectPositionCountID++;
      return this.StoreListHtmlCode;
      //console.log(this.StoreListHtmlCode);
    },
    generateNewScreenLayout(newLayout) {
      if (newLayout.rows) {
        this.newScreenLayout += `"height":"${newLayout.height}","width":${
          newLayout.width
        },"rows":[`;
        for (let i = 0; i < newLayout.rows.length; i++) {
          this.newScreenLayout += "{";

          this.generateNewScreenLayout(newLayout.rows[i]);
          if (i == newLayout.rows.length - 1) {
            this.newScreenLayout += "}";
          } else {
            this.newScreenLayout += "},";
          }
        }
        this.newScreenLayout += "]";
        return this.newScreenLayout;
      } else if (newLayout.cols) {
        this.newScreenLayout += `"height":"${newLayout.height}","cols":[`;
        for (let i = 0; i < newLayout.cols.length; i++) {
          this.newScreenLayout += "{";

          this.generateNewScreenLayout(newLayout.cols[i]);
          if (i == newLayout.cols.length - 1) {
            this.newScreenLayout += "}";
          } else {
            this.newScreenLayout += "},";
          }
        }
        this.newScreenLayout += "]";
        return this.newScreenLayout;
      } else {
        this.newScreenLayout += `"height":"${newLayout.height}",`;
        this.newScreenLayout += `"width":${newLayout.width},`;
        this.newScreenLayout += `"id":${
          this.storeSelect[this.layoutPositionCountID]
        }`;
        this.layoutPositionCountID++;
        return this.newScreenLayout;
      }
    }
  }
};
</script>

<style scoped>
.templateContent {
  display: flex;
  flex-wrap: wrap;
}

.template {
  width: 350px;
  height: 250px;
  background-color: #e4e4e4;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin: 50px auto;
  -webkit-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  cursor: pointer;
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
  background-color: #aaa;
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
</style>