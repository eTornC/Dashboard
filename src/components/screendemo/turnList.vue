<template>
  <div class="main">
    <div v-if="store" class="card" style="width: 100%; height: 100%">
      <h5 class="store_name m-1">{{store.name}}</h5>
      <div class="card-body p-1">
        <h5 v-if="actualTurn.error"> No Turn</h5>
        <span v-else :key="index" v-for="(turn,index) in actualTurn">T{{turn.number}}</span>
        <ul class=" p-0 waitingTurns">
          <li :key="index" v-for="(turn,index) in waitingTurns">T{{turn.number}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import config from "../../api/config";

export default {
  props: {
    jsonConfig: Object,
    id: Number
  },
  data() {
    return {
      store: null,
      actualTurn: null,
      waitingTurns: null
    };
  },
  mounted: function() {
    this.getStore();
    this.getActualTurn();
    this.getWaitingTurn();
  },
  methods: {
    getStore() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.store +
        "/" +
        this.id;
      axios
        .get(url)
        .then(res => {
          this.store = res.data;
          this.store.photo_path = config.host + this.store.photo_path;
        })
        .catch(err => {
          console.log("Fail");
        });
    },
    getActualTurn() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.store +
        "/" +
        this.id +
        config.routes.actualTurn;
      console.log(url);

      axios
        .get(url)
        .then(res => {
          this.actualTurn = res.data;
          console.log(this.actualTurn);
        })
        .catch(err => {
          console.log("Fail");
        });
    },
    getWaitingTurn() {
      const url =
        config.host +
        config.routes.prefix +
        config.routes.store +
        "/" +
        this.id +
        config.routes.waitingTurns;
      axios
        .get(url)
        .then(res => {
          this.waitingTurns = res.data;
        })
        .catch(err => {
          console.log("Fail");
        });
    }
  }
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
}
.store_name {
  background-color: #eee;
  border-radius: 10px;
}
.actualTurn {
}
.waitingTurns {
  list-style-type:none;
}
</style>
