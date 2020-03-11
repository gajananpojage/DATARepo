<template>
  <div class="dashboard">
    <v-container class="my-5">
      <v-form class="px-3" ref="form"  v-model="valid">
        <div v-if="!nextClicked">
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="ruleName"
              label="Rule Name:"
              required
              :rules="nameRules"
               :counter="20"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-textarea
              clearable
              name="ruleDescription"
              label="Rule Description:"
              value=" "
              no-resize
              rows="2"
              clear-icon="cancel"
              v-model="ruleDescription"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="ownerName"
              label="Rule Owner:"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col  cols="10">
              <v-radio-group v-model="profileGroup">
      <v-radio
        v-for="(profile,i) in profileOption"
        :key="i"
        :label="`${profile}`"
        :value="profile"
        ></v-radio>
    </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-btn text @click="getNextView" class="success mx-0 mt-3"
            >Next</v-btn
          ></v-row
        ></div>
        <div v-if="nextClicked">
          <v-row>
          <v-col cols="10">
            <v-select
              :items="connectionList"
              v-model="connection"
              label="Connection:"
              @change="onConnectionChange"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn text @click="snackbar = true" class="primary mt-2 btn"
              >Test</v-btn
            ><v-snackbar v-model="snackbar">
              {{ connectionText }}
              <v-btn color="green" text @click="snackbar = false">
                Close
              </v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-select 
              :items="dataBaseList"
              v-model="database"
              label="Database/File:"
              @change="onDBChange"
            ></v-select>
          </v-col>
          <v-col cols="5">
            <v-select
              :items="tableNames"
              v-model="table"
              label="Table:"
              @change="onTableChange"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
           <v-combobox
          v-model="columns"
          :items="columnList"
          label="Columns"
          multiple
          chips
        >
        </v-combobox></v-col>
            <v-col cols="5">
            <v-text-field
              v-model="target"
              label="Target DQI:"
              required
            ></v-text-field>
          </v-col> 
        </v-row><v-row>    
          <v-col cols="5">
            <v-text-field
              v-model="threshold"
              label="Threshold:"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="5">
           Frequency<timeselector v-model="frequency" :value="time"></timeselector>
          </v-col>
        </v-row>
       
        <v-row><v-col cols="1">
          <v-btn text class="cancel-btn mx-0 mt-3" @click="getInitView">Back</v-btn>
          </v-col>
          <v-col cols="1">
          <v-btn text @click="createProfile" class="success mx-0 mt-3"
            >Create</v-btn
          ></v-col></v-row
        >
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import profileList from '../../data/profileList.json';
import Timeselector from 'vue-timeselector';
export default {
  data: () => ({
    profileOption: ["Database Level Profile","Table Level Profile","Column Based Profile","File Based Profile"],
    profileGroup: "Database Level Profile",
    nextClicked: false,
    columns:'',
    columnList: [],
    connectionList: ["userConn", "resourceConn", "peopleConn"],
    dataBaseList: [],
    tableNames: [],
    snackbar: false,
    ruleName: '',
    ruleDescription: '',
    connection: '',
    connectionText: "Connected Successfully",
    database: '',
    table:'',
    target: '',
    threshold:'',
    frequency: '',
    ownerName: '',
    dataBaseObj: {},
    time: new Date(),
    valid: false,
     nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 20 || 'Rule name must be less than 20 characters'
        ],
  }),
 components: {
    Timeselector
  },
  methods: {
    getNextView() {
      let valid=this.$refs.form.validate();
      if(valid)
       this.nextClicked =!this.nextClicked;
    },
    getInitView() {
 this.nextClicked =!this.nextClicked;
    },
    async onConnectionChange() {
      this.dataBaseList= [];
      this.tableNames = [];
      this.dataBaseObj= await profileList.filter((conn)=>conn.name==this.connection);
      this.dataBaseList.push(this.dataBaseObj[0].database[0].name);
    },

    onDBChange() {
      this.tableNames= [];
      //console.log(this.dataBaseObj[0].database[0].tables);
      this.dataBaseObj[0].database[0].tables.forEach((item)=>this.tableNames.push(item.name))
      //this.tableNames = this.dataBaseObj[0].database[0].tables;
    },
    onTableChange() {
      this.columnList= [];
      const selectedTable= this.dataBaseObj[0].database[0].tables.filter((table)=>table.name==this.table);
      console.log(selectedTable)
      selectedTable[0].columns.forEach((column)=>this.columnList.push(column))

    },
    createProfile() {
      //this.$store.dispatch("incrementJobId");
      // eslint-disable-next-line no-unused-vars
      const profileObject = {
        id: "p"+this.$store.state.jobId,
        name: this.ruleName,
        description: this.ruleDescription,
        ownerName: this.ownerName,
        profileGroup: this.profileGroup,
        connection: this.connection,
        database: this.database,
        table: this.table,
        columns: this.columns,
        targetDQI: this.target,
        threshold:this.threshold,
        frequency: this.frequency        
      };
      console.log(profileObject)
      this.$store.dispatch("addProfile", profileObject);
      this.$router.push("/profiling/list");
    },

  }
};
</script>

<style>
.row {
  margin-top: -10px;
}
</style>
