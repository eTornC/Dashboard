<template>
  <div class="main d-flex align-items-center justify-content-center">
    <div v-if="mode =='min'">
      <img src="../../assets/turn_list.svg" width="50px" alt>
    </div>
    <template v-else-if="mode =='complet'">
      <div v-if="store" class="card" style="width: 100%; height: 100%">
        <h5 class="store_name m-1">{{store.name}}</h5>
        <div class="card-body p-1">
          <h5 v-if="!actualTurn">No Turn</h5>
          <h5  v-else :key="index" v-for="(turn,index) in actualTurn">> T{{turn.number}}</h5>
          <ul class="p-0 waitingTurns">
            <li :key="index" v-for="(turn,index) in waitingTurns">T{{turn.number}}</li>
          </ul>
        </div>
      </div>
    </template>
    <div v-else>mode Error</div>
  </div>
</template>


<script>
import axios from "axios";
import config from "../../api/config";

export default {
  props: {
    jsonConfig: Object,
    id: Number,
    mode: String
  },
  data() {
    return {
      store: null,
      actualTurn: [],
      waitingTurns: null
    };
  },
  mounted: function() {
    this.getStore();
    this.getActualTurn();
    this.getWaitingTurn();
  },
  methods: {
    refresh(){
      this.getStore();
      this.getActualTurn();
      this.getWaitingTurn();
    },
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
      //console.log(url);

      axios
        .get(url)
        .then(res => {
          this.actualTurn = res.data;
          //console.log(this.actualTurn);
          if(res.data.error){
            this.actualTurn = false;
          }
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
  list-style-type: none;
}
</style>
