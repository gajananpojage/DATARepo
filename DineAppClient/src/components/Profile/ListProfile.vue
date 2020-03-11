<template>
  <div class="dashboard">
    
    <v-container class="my-5" v-if="profileList">
      <v-row>
        <v-col class="d-flex" cols="6" sm="3">
          <v-select
            :items="profileGroups"
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
            @change="onProfileChanged"
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
            <v-btn small text color="grey" @click="sortBy('profileGroup')" v-on="on">
              <v-icon small left>sort</v-icon>
              <span class="caption ">By Level</span>
            </v-btn>
          </template>
          <span>Sort by Level</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="profile in selectedProfile" :key="profile.id" @click="onClick(profile.id)">
        <v-layout row wrap :class="`pa-3 listItem ${profile.profileGroup}`">
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Rule Name</div>
            <div>{{ profile.name }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Connection</div>
            <div>{{ profile.connection }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Owner</div>
            <div>{{ profile.ownerName }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Level</div>
            <div>{{ profile.profileGroup }}</div>
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
      profileList: [],
      selectedProfile: this.profileList,
      profileGroups: [{id: 1,name:"Rule Name"}, {id: 2,name:"Level"}],
      labelList: [{id:"label1" ,name:"Database Level Profile"},{id:"label2" ,name:"Table Level Profile"},
                  {id:"label3" ,name:"Column Based Profile"},{id:"label4" ,name:"File Based Profile"}],
      optionValues: [],
      group:'',
    };
  },
  async mounted() {
    console.log(this.$store.state.allProfiles);
    this.profileList = this.$store.state.allProfiles;
    this.selectedProfile = this.profileList;
  },
  methods: {
    sortBy(prop) {
      this.profileList.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    async onProfileChanged(id) {
      let profile=[];
      if (id.indexOf("label")>-1) {
        let labelValue=await this.labelList.find((item)=>item.id==id);
        profile = await this.profileList.filter(p => p.profileGroup === labelValue.name);
      } else {
        profile = await this.profileList.filter(p => p.id === id);       

      }
      this.selectedProfile = profile;
    },
    onClick(itemId){
      this.$store.dispatch("setActiveItem",itemId);
      this.$router.push("/profiling/result");
    },
    onGroupChanged(groupName) {
       if (groupName=="Level") {
       this.optionValues= this.labelList
      } else {
        this.optionValues = this.profileList;
      }
    },
    clearFilter() {
      this.profileList = this.$store.state.allProfiles;
      this.selectedProfile = this.profileList;
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
