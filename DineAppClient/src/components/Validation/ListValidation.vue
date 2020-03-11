<template>
  <div class="dashboard">
    
    <v-container class="my-5" v-if="validationList">
      <v-row>
        <v-col class="d-flex" cols="6" sm="3">
          <v-select
            :items="validationGroups"
            label="Filter By:"
            item-text="name"
            item-value="name"
            @change="onGroupChanged"
            v-model="group"
            dense
            outlined
          ></v-select></v-col>
          <v-col class="d-flex" cols="5" sm="3">
          <v-select
            :items="optionValues"
            label="Filter Value:"
            item-text="name"
            item-value="id"
            @change="onValidationChanged"
            dense
            outlined
          ></v-select></v-col><v-col class="d-flex" cols="2" sm="1"><v-btn text @click="clearFilter" class="success mx-0 mt-3"
            >Reset</v-btn
          ></v-col>
          
          </v-row>
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('name')" v-on="on">
              <v-icon small left>queue</v-icon>
              <span class="caption ">By Rule Name</span>
            </v-btn>
          </template>
          <span>Sort by Rule Name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('label')" v-on="on">
              <v-icon small left>sort</v-icon>
              <span class="caption ">By Label</span>
            </v-btn>
          </template>
          <span>Sort by label</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="validation in selectedValidation" :key="validation.id" @click="onClick(validation.id)">
        <v-layout row wrap :class="`pa-3 listItem ${validation.label}`">
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Rule Name</div>
            <div>{{ validation.name }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Connection</div>
            <div>{{ validation.connection }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Owner</div>
            <div>{{ validation.ownerName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Label</div>
            <div>{{ validation.label }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${validation.label} white--text my-2 caption`">{{
                validation.label
              }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validationList: [],
      selectedValidation: this.validationList,
      validationGroups: [{id: 1,name:"Rule Name"}, {id: 2,name:"Label"}],
      labelList: [{id:"label1" ,name:"Latency"},{id:"label2" ,name:"Uniqueness"},
                  {id:"label3" ,name:"Competences"},{id:"label4" ,name:"Accuracy"}],
      optionValues: [],
      group:'',
    };
  },
  async mounted() {
    this.validationList = this.$store.state.allValidationRules;
    this.selectedValidation = this.validationList;
  },
  methods: {
    sortBy(prop) {
      this.validationList.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    async onValidationChanged(id) {
      let validation=[];
      if (id.indexOf("label")>-1) {
        let labelValue=await this.labelList.find((item)=>item.id==id);
        validation = await this.validationList.filter(p => p.label === labelValue.name);
      } else {
        validation = await this.validationList.filter(p => p.id === id);       

      }
      this.selectedValidation = validation;
    },
    onClick(itemId){
      this.$store.dispatch("setActiveItem",itemId);
      this.$router.push({ path: `/validation/result` })
    },
    onGroupChanged(groupName) {
       if (groupName=="Label") {
       this.optionValues= this.labelList
      } else {
        this.optionValues = this.validationList;
      }
    },
    clearFilter() {
      this.validationList = this.$store.state.allValidationRules;
      this.selectedValidation = this.validationList;
      this.optionValues=[];
      this.group='';
    }
  }
};
</script>

<style>
.listItem.Latency {
  border-left: 4px solid #3cd1c2;
}
.listItem.Uniqueness {
  border-left: 4px solid #ffaa2c;
}
.listItem.Competences {
  border-left: 4px solid #f83e70;
}
.listItem.Accuracy {
  border-left: 4px solid blue;
}

.v-chip.Latency {
  background: #3cd1c2 !important;
}
.v-chip.Uniqueness {
  background: #ffaa2c !important;
}
.v-chip.Competences {
  background: #f83e70 !important;
}
.v-chip.Accuracy {
  background: blue !important;
}
</style>
