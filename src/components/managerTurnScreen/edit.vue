<template>
  <div class="main_edit">
    <div class="content">
      <div class="name">
        <input
          class="text-center border-0 turnName"
          v-if="screen"
          v-focus="focused"
          @focus="focused = true"
          @blur="focused = false"
          @keydown.enter="updateScreenName"
          v-model="screen.name"
          style="background-color: #999;"
        >
      </div>
      <div class="template">
        <!--layout-component :sections="sections" :jsonConfig=" JSON.parse(edit_screen.layout)"/-->
        <layout-generator :mode="'TrunList'" :jsonConfig="$store.state.jsonLayout"/>
      </div>
    </div>
    <!--div class="row">
      <div class="col-12">
        <textarea v-model="newScreenLayout" rows="4" cols="50"></textarea>
        <button @click="getNewLayout()" type="button" class="btn btn-danger">getNewLayout</button>
      </div>
    </div-->
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
import { mapGetters, mapActions } from "vuex";
import LayoutGenerator from "../LayoutBuild/LayoutGenerator";

import urls from "../../api/config.js";
//import $ from "../assets/jquery.js";
import swal from "sweetalert2";
import VueFocus from "vue-focus";

global.jQuery = require("jQuery");
var $ = global.jQuery;
window.$ = $;

export default {
  components: {
    "layout-generator": LayoutGenerator
  },
  props: {
    screen: Object,
    mode: String
  },
  mixins: [VueFocus.mixin],
  data() {
    return {
      newScreenLayout: "",
      focused: false
    };
  },
  mounted: function() {
    console.log(this.screen);
  },
  methods: {
    ...mapActions(["jsonLayoutToObject", "setJsonLayout"]),
    updateScreenName: function(e) {
      this.focused = false;
      console.log("UPDATING  this Screen" + this.screen.name);

      const url =
        urls.host +
        urls.routes.prefix +
        urls.routes.layout +
        "/" +
        this.screen.id;
      axios
        .put(url, {
          name: this.screen.name
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getNewLayout() {
      this.newScreenLayout = JSON.stringify(this.$store.state.jsonLayout);
    },
    updateLayout() {
      const url =
        urls.host + urls.routes.prefix + urls.routes.layout + "/" + this.screen.id;
      var reference = this;
      axios
        .put(url, {
          name: this.screen.name,
          layout: JSON.parse(this.newScreenLayout)
        })
        .then(function(response) {
          console.log(response);
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
      this.getNewLayout();
      this.updateLayout();
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