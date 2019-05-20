<template>
  <div class="app">
    <div v-if="addScreen">
      <div class="closeButton">
        <button @click="tanca" type="button" class="close" aria-label="Close">
          <div>&times;</div>
        </button>
      </div>
      <div class="row editPanet">
        <div class="col-3">
          <ul class="screenList">
            <li
              @click="selectScreenTemplate(index)"
              v-for="(screenTemplate,index) in screensTemplate"
              :key="screenTemplate.name"
            >
              <h3>{{screenTemplate.name}}</h3>
              <screen-component :jsonConfig="screensTemplate[index]"/>
            </li>
          </ul>
        </div>
        <div class="col-6">
          <div class="screenContent">
            <div class="screen">
              <div>
                <screen-component v-if="ScreenTemplateSelect!=null"
                  :jsonConfig="ScreenTemplateSelect"
                />
              </div>
            </div>
          </div>
          <button  class="btn btn-primary" type="button">
              <div>Seve</div>
            </button>
        </div>
        <div class="col-3">
          <div class="storeListContent">
            <div class="storeList">
              <div v-for="(store,index) in stores" :key="store.name">
               {{index}}-{{store.name}}
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Gerstio de pantalla de turns</h1>
      <div class="screenConten">
        <div v-for="(screen,index) in screens" :key="screen.name" class="turnScreen row">
          <div class="screenName">
            <h1 @blur="updateScreenName" :name="index" contenteditable="true">{{screen.name}}</h1>
          </div>
          <screen-component :jsonConfig="screen"/>
        </div>

        <div @click="add" class="turnScreenBottom">
          <div class="addButton">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TurnScreenComponent from "../turnsScreens/TurnsScreenComponent.vue";

export default {
  components: {
    "screen-component": TurnScreenComponent
  },
  data() {
    return {
      ScreenTemplateSelectIndex: 0,
      ScreenTemplateSelect:null,
      addScreen: false,
      stores:[{"id":"1","name":"Carnisseria","date_created":"2019-01-12 12:30:44","photopath":"\/images\/carnisseria.jpeg"},{"id":"2","name":"Peixateria","date_created":"2019-01-12 12:30:44","photopath":"\/images\/peix.jpg"},{"id":"3","name":"Sushi","date_created":"2019-01-12 12:30:44","photopath":"\/images\/sushi.jpg"},{"id":"4","name":"Xarcuteria","date_created":"2019-01-12 12:30:44","photopath":"\/images\/xarcuteria.jpg"},{"id":"5","name":"Forn de pa","date_created":"2019-01-12 12:30:44","photopath":"\/images\/pan.jpg"}],
      screensTemplate: [
        {
          name: "plantilla1",
          cols: [
            {
              width: 12,
              rows: [
                {
                  id: 1
                },
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,

                      id: 1
                    }
                  ]
                },
                {
                  id: 1
                },
              ]
            }
          ]
        },
        {
          name: "plantilla2",
          cols: [
            {
              width: 12,
              rows: [
                {
                  id: 1
                },
                {
                  id: 1
                },
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,

                      id: 1
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "plantilla3",
          cols: [
            {
              width: 12,
              rows: [
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,
                      rows: [
                        {
                          id: 1
                        },
                        {
                          id: 1
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 1
                }
              ]
            }
          ]
        },
        {
          name: "plantilla4",
          cols: [
            {
              width: 12,
              rows: [
                {
                  id: 1
                },
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,
                      rows: [
                        {
                          id: 1
                        },
                        {
                          id: 1
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 1
                }
              ]
            }
          ]
        }
      ],
      screens: [
        {
          name: "pantalla1",
          cols: [
            {
              width: 12,
              rows: [
                {
                  id: 1
                },
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,
                      rows: [
                        {
                          id: 3
                        },
                        {
                          id: 2
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 4
                }
              ]
            }
          ]
        },
        {
          name: "pantalla2",
          cols: [
            {
              width: 12,
              rows: [
                {
                  id: 2
                },
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,
                      rows: [
                        {
                          id: 3
                        },
                        {
                          id: 2
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 4
                }
              ]
            }
          ]
        },
        {
          name: "pantalla3",
          cols: [
            {
              width: 12,
              rows: [
                {
                  id: 3
                },
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,
                      rows: [
                        {
                          id: 3
                        },
                        {
                          id: 2
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "pantalla4",
          cols: [
            {
              width: 12,
              rows: [
                {
                  id: 4
                },
                {
                  cols: [
                    {
                      width: 6,
                      id: 1
                    },
                    {
                      width: 6,
                      rows: [
                        {
                          id: 3
                        },
                        {
                          id: 2
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },

  mounted() {},

  methods: {
    updateScreenName: function(e) {
      var index = e.target.getAttribute("name");
      this.screens[index].name = e.target.innerText;
      console.log("UPDATING this Screen" + this.screens[index].name);
    },
    add() {
      this.addScreen = true;
    },
    tanca() {
      this.addScreen = false;
    },
    selectScreenTemplate(id) {
      //this.ScreenTemplateSelectIndex = id;
        this.ScreenTemplateSelect =null;
      this.ScreenTemplateSelect = this.screensTemplate[id];
      console.log( this.ScreenTemplateSelect);
    }
  }
};
</script>

<style>
body {
  background-color: #ddd;
}
.app {
  width: 100%;
  position: relative;
}
h1 {
  margin: 5px;
  text-align: center;
}
.screenConten {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.screenName {
  width: 100%;
  font-variant: small-caps;
}
.turnScreen {
  width: 450px;
  background-color: #c5c5c5;
  margin: 20px;
  padding: 0px !important;
  border-radius: 2%;
}

.turnScreenBottom {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.turnScreenBottom:hover {
  cursor: pointer;
}

.addButton {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #0d0;
  margin: 20px;
  justify-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  color: #e70;
  align-self: flex-end;
}

.closeButton {
  z-index: 7;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.closeButton div {
  display: none;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-size: 70px;
  border-radius: 50%;
  background-color: #ddd;
}

.closeButton:hover div {
  display: flex;
}

.editPanet {
  padding-top: 50px;
}
.screenList {
  padding-left: 10px;
  list-style: none;
  padding: 0;
  height: 900px;
  overflow: auto;
}
.screenList li {
  background-color: #68f;
  margin: 10px;
  border-radius: 10px;
}
.screenList li h3 {
  padding: 0px 0;
  font-size: 1em !important;
}
.screenList li:hover {
  background-color: #68b;
}
.screenList h1 {
  font-size: 1em !important;
}
.storeList div{
  background-color: #68f;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}
.screenContent {
  display: flex;
  justify-content: center;
}
.screen {
  width: 700px;
  background-color: rgb(107, 162, 235);
  border-radius: 10px;
}

.turnScreen h1 {
  font-size: 2em !important;
}
.turnScreen h3 {
  font-size: 1.5em !important;
}
.px-3,
.py-3 {
  padding: 0 !important;
}
.col-md-12 {
  padding: 15px;
}
</style>


