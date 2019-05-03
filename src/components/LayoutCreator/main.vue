<template>
  <div class="row">
    <div class="col-3">
      <button type="button" class="btn btn-primary btn-lg">ADD ROW</button>
      <button type="button" class="btn btn-primary btn-lg">ADD COL</button>
    </div>
    <div class="col">
      <div class="view">
        <row-component :config="$store.state.jsonLayout"/>
        {{$store.state.position }}
        <button class="btn btn-success" @click="increment">+</button>
        <button class="btn btn-danger" @click="decrement">-</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  created() {},
  methods: mapActions(["increment", "decrement"]),
  computed: {},
  components: {}
};
</script>

<style>
.view {
  width: 90%;
  height: 500px;
  margin: auto;
  background-color: lightgray;
}
</style>
