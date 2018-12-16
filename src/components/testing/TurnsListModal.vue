<template>
    <div id="turns-list-modal-wrapper">
        <div id="turns-list-modal">

            <h1 class="mb-5">Torns {{ store.name }} </h1>

            <div class="row mt-2 turns-row">

                <div class="col-md-4 turn-column">
                    <h3>Normal</h3>
                    <template v-for="(turn, index) in normalTurns">
                        <p :key="index">T{{ turn.number }}</p>
                    </template>
                </div>

                <div class="col-md-4 turn-column">
                    <h3>Mòbil</h3>
                    <template v-for="(turn, index) in mobileTurns">
                        <p :key="index">M{{ turn.number }}</p>
                    </template>
                </div>

                <div class="col-md-4 turn-column">
                    <h3>VIP</h3>
                    <template v-for="(turn, index) in vipTurns">
                        <p :key="index">V{{ turn.number }}</p>
                    </template>
                </div>

            </div>
            <button @click="close()" class="btn btn-primary">Close</button>
        </div>
    </div>
</template>

<script>
import urls from '../../api/config.js';

import axios from 'axios';

export default {
    props: {
        store: Object,
    },
    data() {
        return {
            normalTurns: [],
            mobileTurns: [],
            vipTurns: [],
        }
    },
    methods: {
        close() {
            this.$emit('closeModal');
        },
        downloadTurns() {

            const url = urls.host + urls.routes.prefix 
                        + urls.routes.store + '/' + this.store.id + '/turns';

            axios.get(url)
                .then(res => {

                    res.data.forEach(item => {
                        switch (item.type) {
                            case 'NORMAL':
                                this.normalTurns.push(item);
                                break;
                            case 'VIP':
                                this.vipTurns.push(item);
                                break;
                            case 'BUCKET_QUEUE':
                                this.mobileTurns.push(item);
                                break;
                        }
                    });

                })
                .catch(err => {
                    console.error(err);
                })
        }
    },
    beforeMount() {
        this.downloadTurns();
    },
}
</script>

<style>
 
#turns-list-modal-wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0px;
  left: 0px;
  z-index: 99999;
}

#turns-list-modal {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50vh;
  left: 50vw;
  width: 110vw;
  max-height: 98vh;
  overflow: scroll;
  background-color: white;
  padding: 24px 24px;
  border-radius: 13px;
  max-width: 700px;
}

.turn-column {
    border-right: 1px solid black;
    border-left: 1px solid black;
    padding-top: 20px;
    padding-bottom: 20px;
}

.turns-row {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

</style>

