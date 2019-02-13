<template>
  <div>
    <div class="row w-100">
      <div class="col-md-2 pt-4" style="border: 1px solid black">
        <div class="mb-3">
          <button @click="addRow" class="btn btn-primary">Add Row</button>
        </div>
        <div class="mb-3">
          <button @click="addCol" class="btn btn-primary">Add Col</button>
        </div>
      </div>

      <div class="col-md-10 px-5 py-5">
        <!--<grid-component :grid="jsonConfig"></grid-component>-->
        <row-component :config="jsonConfig" class="px-3 py-3 mx-0"/>
      </div>

      <!--div class="row px-5 py-5 w-100" style="border: 1px solid black">
        <span v-html="htmlGrid" class="w-100"></span>
        <div v-html="htmlGrid" class></div>
      </div-->
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
export default {
  data() {
    return {
      htmlGrid: "",
      jsonConfig: {
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
              },
              {
                id: 4
              },
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
    addRow() {
      this.jsonConfig.cols[0].rows.push({
        content: "Alo"
      });
    }
  }
};
</script>

