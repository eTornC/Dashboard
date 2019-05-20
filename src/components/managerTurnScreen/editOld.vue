<template>
  <div class="main_edit">
    <div class="content">
      <div class="name">
        <input
          class="text-center border-0 turnName"
          v-if="edit_screen"
          v-focus="focused"
          @focus="focused = true"
          @blur="focused = false"
          @keydown.enter="updateScreenName"
          v-model="edit_screen.name"
          style="background-color: #999;"
        >
      </div>
      <div class="template">
        <!--layout-component :sections="sections" :jsonConfig=" JSON.parse(edit_screen.layout)"/-->
        <div id="option" class="p-3"></div>
      </div>
    </div>
    <div class="option">
      <div class="cancel">
        <button @click="$emit('input', 'home');" type="button" class="btn btn-danger">Cancelar</button>
      </div>
      <div class="save">
        <button @click="save" type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urls from "../../api/config.js";
//import $ from "../assets/jquery.js";
import swal from "sweetalert2";
import VueFocus from "vue-focus";

global.jQuery = require("jQuery");
var $ = global.jQuery;
window.$ = $;

export default {
  props: {
    id: Number,
    mode: String
  },
  mixins: [VueFocus.mixin],
  data() {
    return {
      edit_screen: null,
      StoreListHtmlCode: "",
      stores: [],
      sections: [0],
      storeSelect: [],
      selectPositionCountID: 0,
      layoutPositionCountID: 0,
      newScreenLayout: "",
      focused: false
    };
  },
  mounted: function() {
    this.getStores();
    console.log(this.id);
  },
  methods: {
    getStores() {
      const url = urls.host + urls.routes.prefix + urls.routes.stores;
      console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.stores = res.data;
          this.getScreenLayout(this.id);
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getScreenLayout(id) {
      const url =
        urls.host + urls.routes.prefix + urls.routes.layout + "/" + id;
      var reference = this;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          //console.log(res.data);
          reference.edit_screen = res.data;
          reference.StoreListHtmlCode = reference.generateGrid(
            reference.edit_screen.layout
          );

          console.log(reference.edit_screen.layout);
          $("#option").html(reference.StoreListHtmlCode);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateScreenName: function(e) {
      this.focused = false;
      console.log("UPDATING  this Screen" + this.edit_screen.name);

      const url =
        urls.host +
        urls.routes.prefix +
        urls.routes.layout +
        "/" +
        this.edit_screen.id;
      axios
        .put(url, {
          name: this.edit_screen.name
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    generateGrid(jsonConfig) {
      this.StoreListHtmlCode = "";
      if (jsonConfig.rows) {
        for (let i = 0; i < jsonConfig.rows.length; i++) {
          this.StoreListHtmlCode += `<div class="row px-0 py-0 mx-0" style="height: ${
            jsonConfig.rows[i].height
          }%;border: 0px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }

        return this.StoreListHtmlCode;
      } else if (jsonConfig.cols) {
        for (let i = 0; i < jsonConfig.cols.length; i++) {
          this.StoreListHtmlCode += `<div class="col-md-${
            jsonConfig.cols[i].width
          } px-0 py-0 mx-0 " style=" height: ${
            jsonConfig.cols[i].height
          }%; border: 0px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }
        return this.StoreListHtmlCode;
      } else {
        return this.crearStoreList(jsonConfig.id);
      }
      //console.log(StoreListHtmlCode);

      this.StoreListHtmlCode = StoreListHtmlCode;
    } ,
    crearStoreList(id) {
      this.StoreListHtmlCode +=
        '<div class="storelistbox p-3" style=" height: 100%; width: 100%; border: 1px solid black;">';

      this.StoreListHtmlCode +=
        `<select selectId="${
          this.selectPositionCountID
        }" class="form-control selecte` + '">';
      for (let i = 0; i < this.stores.length; i++) {
        if (this.stores[i].id == id) {
          this.StoreListHtmlCode +=
            '<option selected value="' +
            this.stores[i].id +
            '">' +
            this.stores[i].name +
            "</option>";
        } else {
          this.StoreListHtmlCode +=
            '<option value="' +
            this.stores[i].id +
            '">' +
            this.stores[i].name +
            "</option>";
        }
      }
      this.StoreListHtmlCode += "</select>";
      this.StoreListHtmlCode += "</div>";

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
    },
    updateLayout() {
      const url =
        urls.host + urls.routes.prefix + urls.routes.layout + "/" + this.id;
      var reference = this;
      axios
        .put(url, {
          name: this.edit_screen.name,
          layout: JSON.parse(this.newScreenLayout)
        })
        .then(function(response) {
          console.log(response);
          reference.templateSelect = null;
          swal.fire({
            position: "top-end",
            type: "success",
            title: "Tu cambio ha guardado",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    save() {
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
      this.generateNewScreenLayout(this.edit_screen.layout);
      this.newScreenLayout += "}";
      console.log(this.newScreenLayout);
      this.updateLayout();
      this.layoutPositionCountID = 0;
    },

    setmode(mode) {
      this.mode = mode;
    }
  }
};
</script>

<style scoped>
/* edit */
.main_edit {
  height: 80%;
}
.main_edit .content {
  height: 500px;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.main_edit .content .name {
  width: 100%;
  font-size: 2rem;
  background-color: #999;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1% 0;
  border-radius: 5px;
}

.main_edit .content .template {
  background-color: #ccc;
  height: 85%;
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

.turnName {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>