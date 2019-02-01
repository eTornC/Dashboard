<template>
  <div>
    <div class="row">
      <div class="col-md-2 pt-4" style="border: 1px solid black">
        <div class="mb-3">
          <button class="btn btn-primary">Add Row</button>
        </div>
        <div class="mb-3">
          <button class="btn btn-primary">Add Col</button>
        </div>
      </div>
      <div class="col-md-10 px-5 py-5" style="border: 1px solid black">
        <div v-html="htmlGrid" class></div>

        <div v-if="jsonConfig.rows">
          <template v-for="row in jsonConfig.rows">
            <row :key="row" :jsonConfig="row"/>
          </template>
        </div>
        <div v-else-if="jsonConfig.cols">
          <template v-for="column in jsonConfig.column">
            <column :key="column" :jsonConfig="column"/>
          </template>
        </div>
        <div v-else>{{jsonConfig.content}}</div>
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
        rows: [
          {
            cols: [
              {
                width: 4,
                content: "Aloha"
              },
              {
                width: 4,
                content: "Aloha"
              },
              {
                width: 4,
                rows: [
                  {
                    content: "Alo"
                  },
                  {
                    content: "Alo"
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
    console.log(this.htmlGrid);
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

