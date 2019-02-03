<template>
  <div>
    <div class="row w-100">
      <div class="col-md-2 pt-4" style="border: 1px solid black">
        <div class="mb-3">
          <button class="btn btn-primary">Add Row</button>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary">Add Col</button>
        </div>
      </div>
      
      
      <div class="col-md-10 px-5 py-5">
        <!--<grid-component :grid="jsonConfig"></grid-component>-->
        <row-component-root :config="jsonConfig" class="px-3 py-3 mx-0" />
      </div>
      
      <div class="row px-5 py-5 w-100" style="border: 1px solid black">
        <span v-html="htmlGrid" class="w-100"></span>
      <!--div v-html="htmlGrid" class></div-->
      </div>

      <div v-if="jsonConfig.rows">
        <div class="row px-3 py-3 mx-0" style="border: 1px solid black">
          <template v-for="(row, index) in jsonConfig.rows">
            <row :key="index" :jsonConfig="row"/>
          </template>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>

import RowComponent from './RowComponent.vue';

import row from "./my-row.vue";
import column from "./my-column.vue";

export default {
  components: {
    'row-component-root': RowComponent,
    row: row,
    column: column
  },
  data() {
    return {
      htmlGrid: "",
      jsonConfig: {
        cols: [
          {
            width: 12,
            rows: [
              {
                cols: [
                  {
                    width: 4,
                    rows: [
                      {
                        content: 'fila1',
                        
                      },
                      {
                        content: 'fila2',
                        
                      },
                      {
                        content: 'fila3',
                        
                      },
                    ]
                  },
                  {
                    width: 4,
                    content: "Aloha",
                  },
                  {
                    width: 4,
                    rows: [
                      {
                        content: "Alo",
                      },
                      {
                        content: "Alo",
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },

  mounted() {
    this.htmlGrid = this.generateGrid(this.jsonConfig);
    //console.log(this.htmlGrid);
  },

  methods: {
    generateGrid(jsonConfig) {
      let htmlCode = "";

      if (jsonConfig.rows) {

        for (let i = 0; i < jsonConfig.rows.length; i++) {
          htmlCode += `<div class="row px-3 py-3 mx-0" style="border: 1px solid black">
													${this.generateGrid(jsonConfig.rows[i])}
												</div>`;
        }
        
        return htmlCode;

      } else if (jsonConfig.cols) {

        for (let i = 0; i < jsonConfig.cols.length; i++) {
          htmlCode += `<div class="col-md-${
            jsonConfig.cols[i].width
          } px-3 py-3 mx-0" style="border: 1px solid black">
													${this.generateGrid(jsonConfig.cols[i])}
												</div>`;
        }

        return htmlCode;
      } else {
        return jsonConfig.content;
      }
    },

    addCol() {},
    addRow() {}
  }
};
</script>

