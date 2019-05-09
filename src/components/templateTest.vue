<template>
  <div class="container">
    <h1>Testing</h1>
    <div class="row">MSG> {{menssage}}</div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="nom"
          >
        </div>
      </div>
      <div class="col-md-6">
          <input
            type="text"
            class="form-control"
            placeholder="descripcion..."
          >
      </div>
    </div>
    <div class="row">
      <h3>
        Exemple:
        <small
          class="text-muted"
        >{ "height": "100", "cols": [ { "height": "100", "width": 12, "rows": [ { "height": "100", "cols": [ { "height": "100", "width": 6, "id": 1 }, { "height": "100", "width": 6, "id": 1 } ] } ] } ] }</small>
      </h3>
    </div>
    <div class="row">
      <div class="col columna showLayout">
        <screen-demo-component v-if="templateLayout" :jsonConfig="templateLayout"/>
      </div>
      <div class="col">
        <textarea
          :class="{ 'correct': isValid, 'error': !isValid }"
          class="jsonCode"
          rows="4"
          cols="60"
          v-model="layoutInput"
          v-on:keyup="clearTemplate"
        ></textarea>
      </div>
    </div>
    <button @click="isValidLayout">Validar</button>
    <button @click="formateJson">fortamte</button>
    <button @click="checkJsonCode">generate</button>
    <button @click="save">save</button>
  </div>
</template>

<script>
import axios from "axios";
import demoScreen from "./managerTurnScreen/screenDemo.vue";
import urls from "../api/config";

export default {
  components: {
    "screen-demo-component": demoScreen
  },
  data() {
    return {
      name: null,
      description: null,
      templateLayout: null,
      layoutInput: null,
      isValid: true,
      newScreenLayout: "",
      menssage: "hola"
    };
  },

  methods: {
    updateJson: function() {
      if (this.IsValidJSONString(this.layoutInput)) {
        this.templateLayout = this.layoutInput;
        this.valid = true;
        console.log("set new json");
      } else {
        console.log("json invalid");
        this.valid = false;
        this.templateLayout = null;
      }
    },
    clearTemplate: function() {
      this.templateLayout = null;
    },
    IsValidJSONString: function(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    formateJson: function() {
      if (this.IsValidJSONString(this.layoutInput)) {
        this.layoutInput = JSON.parse(this.layoutInput);
        this.layoutInput = JSON.stringify(this.layoutInput, null, 4); // stringify with 4 spaces at each level
      }
    },
    isValidLayout: function() {
      if (this.IsValidJSONString(this.layoutInput)) {
        this.isValid = true;
        this.layoutInput = JSON.parse(this.layoutInput);
        if (this.layoutInput.cols || this.layoutInput.rows) {
          this.jsonLayoutValidator(this.layoutInput);
        } else {
          this.menssage = "No hiha cols or rows";
        }
        if (this.isValid) {
          this.templateLayout = this.layoutInput;
          this.layoutInput = JSON.stringify(this.layoutInput, null, "\t");
        } else {
          this.layoutInput = JSON.stringify(this.layoutInput);
        }
        //this.layoutInput = JSON.stringify(this.layoutInput, null, "\t");
        //this.layoutInput = JSON.stringify(this.layoutInput);
      } else {
        this.isValid = false;
        this.templateLayout = null;
        this.menssage = "Error, is not json String!";
      }
    },
    jsonLayoutValidator: function(newLayout) {
      //console.log("Check layout");
      if (this.isValid) {
        if (newLayout.rows) {
          if (Array.isArray(newLayout.rows) && newLayout.rows.length > 0) {
            if (newLayout.height && newLayout.width && this.isValid) {
              let countHeight = 0;
              for (let i = 0; i < newLayout.rows.length; i++) {
                this.jsonLayoutValidator(newLayout.rows[i]);
                countHeight += parseInt(newLayout.rows[i].height);
              }
              //console.log("height:" + countHeight);
              if (countHeight != 100) {
                this.isValid = false;
                this.menssage = "height no add to 100";
              }
            } else {
              this.isValid = false;
              this.menssage = "this rows object need 'height' and 'width'.";
            }
          } else {
            this.isValid = false;
            this.menssage = "this rows is not Array or is empty";
          }
        } else if (newLayout.cols) {
          if (Array.isArray(newLayout.cols) && newLayout.cols.length > 0) {
            if (newLayout.height && this.isValid) {
              let countWidth = 0;
              for (let i = 0; i < newLayout.cols.length; i++) {
                this.jsonLayoutValidator(newLayout.cols[i]);
                countWidth += parseInt(newLayout.cols[i].width);
              }
              //console.log("width:" + countWidth);
              if (countWidth != 12) {
                this.isValid = false;
                this.menssage = "width no add to 12";
              }
            } else {
              this.isValid = false;
              this.menssage = "this cols object need 'height'.";
            }
          } else {
            this.isValid = false;
            this.menssage = "this cols is not Array or is empty";
          }
        } else {
          if (
            newLayout.height &&
            newLayout.width &&
            newLayout.id &&
            this.isValid &&
            this.IsValidJSONString(JSON.stringify(newLayout))
          ) {
            this.menssage = "OK";
          } else {
            this.isValid = false;
            this.menssage =
              "cols and rows array to be object, this object need 'height','width' adn 'id'";
          }
        }
      }
    },
    checkJsonCode: function() {
      this.newScreenLayout = "";
      this.generateNewScreenLayout(JSON.parse(this.layoutInput));
      this.layoutInput = "{";
      this.layoutInput += this.newScreenLayout;
      this.layoutInput += "}";
      //this.templateLayout = this.layoutInput;*/
    },
    generateNewScreenLayout(newLayout) {
      if (newLayout.rows) {
        if (newLayout.height)
          this.newScreenLayout += `"height":"${newLayout.height}",`;
        this.newScreenLayout += `"width":${newLayout.width},"rows":[`;
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
        this.newScreenLayout += `"id":1`;
        return this.newScreenLayout;
      }
    },
    save() {
      const url = urls.host + urls.routes.prefix + urls.routes.layout;
      console.log(url);
      axios
        .post(url, {
          name: this.name,
          description: this.description,
          layout: this.newScreenLayout,
          type: "TEMPLATE"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.showLayout,
.jsonCode {
  height: 400px;
  width: 100%;
  background-color: antiquewhite;
}
.correct {
  background-color: greenyellow;
}
.error {
  background-color: #ffbbbb;
}
</style>
