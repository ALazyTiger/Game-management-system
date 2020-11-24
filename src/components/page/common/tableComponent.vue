<template>
  <table class="mailTable" :style="styleObject" v-if="s_showByRow">
    <tr v-for="index in rowCount" :key="index">
      <td class="column">{{tableData[index*3-3].key}}</td>
      <td>
        <span class="green" v-if="tableData[index*3-3].value===true">是</span>
        <span class="red" v-else-if="tableData[index*3-3].value===false">否</span>
        <span v-else>{{tableData[index*3-3].value}}</span>
      </td>
      <td class="column">{{tableData[index*3-2].key}}</td>
      <td>
        <span class="green" v-if="tableData[index*3-2].value===true">是</span>
        <span class="red" v-else-if="tableData[index*3-2].value===false">否</span>
        <span v-else>{{tableData[index*3-2].value}}</span>
      </td>
      <td class="column">{{tableData[index*3-1] !== undefined ? tableData[index*3-1].key : ''}}</td>
      <td>
        <span class="green" v-if="tableData[index*3-1].value===true">是</span>
        <span class="red" v-else-if="tableData[index*3-1].value===false">否</span>
        <span v-else>{{tableData[index*3-1] !== undefined ? tableData[index*3-1].value : ''}}</span>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      styleObject: {},
      s_showByRow: true,
    };
  },
  props: ['tableData', 'tableStyle', 'showByRow'],
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length/3);
    }
  },
  created() {
    console.log(this.tableData)
    this.styleObject = this.tableStyle;
    if(this.showByRow !== undefined){
      this.s_showByRow = this.showByRow;
    }
  },
}
</script>
<style>

</style>