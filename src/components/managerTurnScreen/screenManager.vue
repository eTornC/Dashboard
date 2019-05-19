<template>
  <div class="app">
    <!--HOME-->
    <div v-if="mode == 'home'" class="screenConten">
      <div class="screen" v-for="screen in turnScreen" :key="screen.id">
        <header>
          <div class="screen_name">
            <span>{{screen.name}}</span>
          </div>
          <div class="screen_option">
            <div @click="viewTurns(screen.id)">
              <img
                class="optionIcon"
                src="../../assets/view.svg"
                alt="Smi"
                height="100%"
                width="100%"
              >
            </div>
            <div @click="editScreen(screen.id)">
              <img
                class="optionIcon"
                src="../../assets/edit.svg"
                alt="Smi"
                height="100%"
                width="100%"
              >
            </div>
            <div @click="delScreen(screen.id)">
              <img
                class="optionIcon"
                src="../../assets/remove.svg"
                alt="delete"
                height="100%"
                width="100%"
              >
            </div>
          </div>
        </header>
        <div class="content">
          <screen-demo-component :jsonConfig="screen.layout"/>
        </div>
      </div>
      <div class="turnScreenBottom">
        <div @click="setmode('create')" class="addButton">
          <img src="https://image.flaticon.com/icons/svg/748/748113.svg" width="50%" height="50%">
        </div>
      </div>
    </div>
    <!--EDIT MODE-->
    <div class="main_edit" v-else-if="mode == 'edit'">
      <edit-component
        v-on:input="mode = $event; getScreen();"
        :id="this.screenId"
        :mode="this.mode"
      />
    </div>
    <!--CREAR MODE-->
    <create-component
      v-else-if="mode == 'create'"
      v-on:input="mode = $event; getScreen();"
      :mode="this.mode"
    />
  </div>
</template>

<script>
import axios from "axios";
import urls from "../../api/config.js";
import edit from "./edit.vue";
import newScreen from "./newScreen.vue";
//!!!!!!old
//import demoScreen from "./screenDemo.vue";
import demoScreen from "../demoLayoutBuild/LayoutGenerator.vue";

export default {
  components: {
    "edit-component": edit,
    "create-component": newScreen,
    "screen-demo-component": demoScreen
  },
  data() {
    return {
      turnScreen: null,
      mode: "home",
      edit_screen: null,
      StoreListHtmlCode: "",
      stores: [],
      screenId: null
    };
  },
  mounted: function() {
    this.getScreen();
    this.getStores();
  },
  methods: {
    getStores() {
      const url = urls.host + urls.routes.prefix + urls.routes.stores;
      //console.log(url);
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
    getScreen() {
      const url = urls.host + urls.routes.prefix + urls.routes.layouts;
      console.log(url);
      var reference = this;
      axios
        .get(url)
        .then(res => {
          reference.turnScreen = res.data.filter(
            layout => layout.type == "TURNSCREEN"
          );
          console.log(res.data);

          console.log(reference.turnScreen);
        })
        .catch(err => {
          console.error(err);
        });
    },
    delScreen(id) {
      let url = urls.host + urls.routes.prefix + urls.routes.layout + "/" + id;
      var reference = this;
      axios
        .delete(`${url}`)
        .then(function(response) {
          console.log(response);
          reference.getScreen();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getScreenLayout(id) {
      let url = urls.host + urls.routes.prefix + urls.routes.layout + "/" + id;
      var reference = this;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          //console.log(res.data);
          reference.edit_screen = res.data;
          reference.StoreListHtmlCode = reference.generateGrid(
            JSON.parse(reference.edit_screen.layout)
          );
          console.log(reference.StoreListHtmlCode);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateScreenName: function(e) {
      console.log("UPDATING  this Screen" + e.target.innerText);
      let url =
        urls.host +
        urls.routes.apiPrefix +
        urls.routes.turnScreen +
        "/" +
        this.edit_screen.id;
      axios
        .put(url, {
          name: e.target.innerText
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    editScreen(id) {
      this.setmode("edit");
      this.screenId = id;
      console.log(id);
    },
    createScreen() {
      this.setmode("create");
    },
    setmode(mode) {
      this.mode = mode;
      if (this.mode == "home") {
        this.getScreen();
      }
    }
  }
};
</script>

<style scoped>
/*main layout*/
.app {
  width: 100%;
  height: 100%;
  position: absolute;
}

.screenConten {
  display: flex;
  flex-wrap: wrap;
}

.turnScreenBottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.addButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #2e9fcc;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Screen */
.screen {
  width: 350px;
  height: 250px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px auto;
  -webkit-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 2px 1px 10px 2px rgba(0, 0, 0, 0.5);
}
.screen header {
  height: 15%;
  width: 100%;
  display: flex;
}
.screen_name {
  width: 70%;
  height: 100%;
  background-color: #b1ccef;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 1.5rem;
}
.screen_name span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.screen_option {
  background-color: #b1ccef;
  display: flex;
  align-items: center;
  width: 30%;
}
.screen_option div {
  margin: 0 5px;
  width: 80%;
  height: 80%;
  cursor: pointer;
}
.screen .content {
  height: 85%;
  width: 100%;
  margin: 0%;
}
.optionIcon {
  height: 100%;
}
</style>