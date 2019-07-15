<template>
  <div class="dropdown d-inline-block">
    <div
      class="button-standard dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span>
        {{ label }} <strong v-if="select">{{ selected }}</strong>
      </span>
    </div>
    <div class="dropdown-menu partner-dropdown-menu" aria-labelledby="navbarDropdown">
      <div
        v-for="(item, index) in data"
        :class="['dropdown-item', (item === selected ? 'active' : '')]"
        :key="index"
        @click="onClickOption(item, index)"
      >{{ item }}</div>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    data: Array,
    label: String,
    select: Boolean,
  },

  data: () => ({
    selected: ''
  }),

  methods: {
    onClickOption(item, index) {
      this.selected = item;
      this.$emit('onSelect', { item, index, target: this });
    }
  },

  watch: {
    data() {
      this.selected = this.data[0];
    }
  }

}

</script>

<style scoped>

.button-standard {
  background-color: white;
  border: 2px solid rgb(0, 123, 255);
  border-radius: 20px;
  padding: 4px 15px;
  color: rgb(0, 123, 255);
}

</style>
