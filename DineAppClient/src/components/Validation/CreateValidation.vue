<template>
  <div class="dashboard">
    <v-container class="my-5">
      <v-form class="px-3" ref="form" lazy-validation>
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="ruleName"
              label="Rule Name:"
              required
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
            <v-select
              :items="connectionList"
              v-model="connection"
              label="Rule Connection:"
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
          <v-btn text @click="fetchList" class="success mx-0 mt-3"
            >Fetch List</v-btn
          ></v-row
        >
        <div v-if="dataBaseList.length>0">
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
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-textarea
              clearable
              name="validation-query"
              label="Data Validation Query:"
              value=" "
              no-resize
              rows="1"
              clear-icon="cancel"
              v-model="validationQuery"
            ></v-textarea
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-select :items="labelList" v-model="validationLabel" label="Label:"></v-select
          ></v-col>
            <v-col cols="5">
            <v-text-field
              v-model="target"
              label="Target DQI:"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
        
          <v-col cols="5">
            <v-text-field
              v-model="threshold"
              label="Threshold:"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="5">
           Frequency:<timeselector v-model="frequency" :value="time"></timeselector>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="ownerName"
              label="Owner:"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn text @click="createJob" class="success mx-0 mt-3"
            >Create</v-btn
          ></v-row
        >
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import connectList from '../../data/connectList.json';
import Timeselector from 'vue-timeselector';
export default {
  data: () => ({
    connectionList: ["userConn", "resourceConn", "peopleConn"],
    labelList: ["Latency","Uniqueness","Competences","Accuracy"],
    dataBaseList: [],
    tableNames: [],
    snackbar: false,
    ruleName: '',
    ruleDescription: '',
    connection: '',
    connectionText: "Connected Successfully",
    database: '',
    table:'',
    validationQuery: '',
    validationLabel: '',
    target: '',
    threshold:'',
    frequency: '',
    ownerName: '',
    dataBaseObj: {},
    time: new Date()
  }),
 components: {
    Timeselector
  },
  methods: {
    async fetchList() {
      this.dataBaseList= [];
      this.tableNames = [];
      this.dataBaseObj= await connectList.filter((conn)=>conn.name==this.connection);
      this.dataBaseList.push(this.dataBaseObj[0].database[0].name);
    },
    onConnectionChange() {
      this.dataBaseList= [];
      this.tableNames= [];
    },
    onDBChange() {
      this.tableNames= [];
      console.log(this.dataBaseObj[0].database[0].tables);
      this.tableNames = this.dataBaseObj[0].database[0].tables;
    },
    createJob() {

      const validationObject = {
        id: "v"+this.$store.state.jobId,
        name: this.ruleName,
        description: this.ruleDescription,
        connection: this.connection,
        database: this.database,
        table: this.table,
        validationQuery: this.validationQuery,
        label: this.validationLabel,
        targetDQI: this.target,
        threshold:this.threshold,
        frequency: this.frequency,
        ownerName: this.ownerName,
      };
      console.log(validationObject)
      this.$store.dispatch("addValidation", validationObject);
      this.$router.push("/validation/list");
    }
  }
};
</script>

<style>
.row {
  margin-top: -10px;
}
</style>
