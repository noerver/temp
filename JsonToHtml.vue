<template>
  <div class="table-main">
    <div>
      <textarea v-model="json" style="width:100%;height:400px;overflow:scroll"></textarea>
      <button @click="jsonFormat()">提交</button>
      <VueJsonTable :data="data"></VueJsonTable>
    </div>
  </div>
</template>

<script>
import VueJsonTable from "./vue-table/VueJsonTable";

export default {
  name: "JsonToHtml",
  components: {
    VueJsonTable
  },
  data() {
    return {
      data: new Object(),
      json: ""
    };
  },
  methods: {
    jsonFormat() {
      this.data = new Object();
    }
  }
};
</script>

