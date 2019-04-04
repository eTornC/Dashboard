<template>
  <div class="row">
    <div class="col">{{menssage}}</div>
    <div class="col">
      <textarea name id cols="30" rows="10" v-model="jsonLayout" v-on:keyup="isValidLayout"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValid: null,
      jsonLayout: "JsonCode",
      menssage: ""
    };
  },
  created() {},
  methods: {
    isValidLayout: function() {
      this.isValid = true;
      if (this.IsJsonString(this.jsonLayout)) {
        this.jsonLayout = JSON.parse(this.jsonLayout);
        if (this.jsonLayout.cols || this.jsonLayout.rows) {
          this.jsonLayoutValidator(this.jsonLayout);
        } else {
          this.menssage = "No hiha cols or rows";
        }
        this.jsonLayout = JSON.stringify(this.jsonLayout, null, "\t");
      } else {
        this.menssage = "Error, is not json String!";
      }
    },
    jsonLayoutValidator: function(newLayout) {
      console.log("Check layout");
      if (newLayout.rows) {
        if (Array.isArray(newLayout.rows) && newLayout.rows.length > 0) {
          if (newLayout.height && newLayout.width && this.isValid) {
            for (let i = 0; i < newLayout.rows.length; i++) {
              this.jsonLayoutValidator(newLayout.rows[i]);
            }
          } else {
            this.isValid = false;
            this.menssage = "this object need 'height' and 'width'.";
          }
        } else {
          this.isValid = false;
          this.menssage = "this rows is not Array or is empty";
        }
      } else if (newLayout.cols) {
        if (Array.isArray(newLayout.cols) && newLayout.cols.length > 0) {
          if (newLayout.height && this.isValid) {
            for (let i = 0; i < newLayout.cols.length; i++) {
              this.jsonLayoutValidator(newLayout.cols[i]);
            }
          } else {
            this.isValid = false;
            this.menssage = "this object need 'height'.";
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
		  this.IsJsonString(JSON.stringify(newLayout))
        ) {
          this.menssage = "OK";
        } else {
          this.isValid = false;
          this.menssage = "this array to be object, this object need 'height','width' adn 'id'";
        }
      }
    },
    IsJsonString: function(str) {
      // console.log("String to check: " + str);
      try {
        JSON.parse(str);
      } catch (e) {
        // console.log("false");
        return false;
      }
      //console.log("true");
      return true;
    }
  }
};
</script>

<style>
.flexxx {
  display: flex;
  flex-wrap: wrap;
}
</style>
