<template>
  <div id="app">
    Clicked: {{ $store.state.count }} times, count is.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions([
      "increment",
      "decrement",
      "incrementIfOdd",
      "incrementAsync",
      "setMessage"
    ]),
    toggle() {
      this.show = !this.show;
    }
  },
  mounted() {
    return this.$store.dispatch("setMessage", "newValue");
  },
  computed: {
    message: {
      get() {
        return this.$store.state.message;
      },
      set(newValue) {
        return this.$store.dispatch("setMessage", newValue);
      }
    }
  }
};
</script>
