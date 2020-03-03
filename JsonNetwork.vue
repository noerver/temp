<template>
  <div>
    <Upload
      accept=".txt"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      action="http://localhost:8081/"
    >
      <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    <div id="mynetwork" class="mynetwork">
      <!--用于画关系图的部分-->
    </div>
  </div>
</template>
<script>
const vis = require("vis-network/dist/vis-network.min.js");
require("vis-network/dist/vis-network.min.css");

export default {
  data() {
    return {
      file1: null,
      name: "jTopo",
      jsonData: {},
      relationships: [],
      beneficialOwners: []
    };
  },
  methods: {
    beforeUpload(file) {
      let myobj = this;
      var reader = new FileReader();
      reader.onload = function(evt) {
        var jsonResult = JSON.parse(evt.target.result);
        var organization = jsonResult.organization;
        var beneficialOwnershipSummary =
          organization.beneficialOwnershipSummary;
        console.log("C");
        var beneficialOwnership = organization.beneficialOwnership;
        myobj.beneficialOwners = beneficialOwnership.beneficialOwners;
        myobj.relationships = beneficialOwnership.relationships;
      };
      reader.readAsText(file);
      return false;
    },
    draw(nodesData, relationshipData) {
      var nodes = new vis.DataSet(nodesData);

      // create an array with edges
      var edges = new vis.DataSet(relationshipData);
      var container = document.getElementById("mynetwork");

      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      var network = new vis.Network(container, data, options);
    }
  },
  watch: {
    relationships: {
      handler: function(val) {
        var beneficialOwnersArray = [];

        this.beneficialOwners.forEach(element => {
          let beneficialOwner = {
            id: element.memberID,
            label: element.name
          };
          beneficialOwnersArray.push(beneficialOwner);
        });

        var relationshipsArray = [];

        val.forEach(element => {
          let relationship = {
            from: element.sourceMemberID,
            to: element.targetMemberID
          };
          relationshipsArray.push(relationship);
        });
        this.draw(beneficialOwnersArray, relationshipsArray);
        console.log(relationshipsArray);
      }
    }
  }
};
</script>
<style>
#mynetwork {
  min-width: 400px;
  height: 600px;
  overflow: scroll;
  border: 1px solid lightgray;
}
</style>