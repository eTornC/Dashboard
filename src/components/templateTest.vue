<template>
  <div class="container">
    <h1>Testing</h1>
    <div class="row">
      <h3>Exemple: <small
        class="text-muted"
      >{ "height": "100", "cols": [ { "height": "100", "width": 12, "rows": [ { "height": "100", "cols": [ { "height": "100", "width": 6, "id": 1 }, { "height": "100", "width": 6, "id": 1 } ] } ] } ] }</small>
    </h3>
    </div>
    <div class="row">
      <div class="col showLayout">
        <screen-demo-component v-if="templateLayout" :jsonConfig="JSON.parse(templateLayout)"/>
      </div>
      <div class="col">
        <textarea
          :class="{ 'correct': valid, 'error': !valid }"
          class="jsonCode"
          rows="4"
          cols="60"
          v-model="layoutInput"
          v-on:keyup="updateJson"
        ></textarea>
      </div>
    </div>
    <button @click="formateJson">fortamte</button>
    <button @click="checkJsonCode">generate</button>
  </div>
</template>

<script>
import axios from "axios";
import demoScreen from "./managerTurnScreen/screenDemo.vue";

export default {
  components: {
    "screen-demo-component": demoScreen
  },
  data() {
    return {
      templateLayout: null,
      layoutInput: null,
      valid: true,
      newScreenLayout: ""
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
