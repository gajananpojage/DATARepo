<template>
  <div class="dashboard">
    <v-container class="my-5">
      <v-form class="px-3" ref="form" lazy-validation>
        <v-row>
          <v-col cols="10">
             <v-select
                    :items="applicationList"
                    v-model="appName"
                    label="Select an Application:"
                    required
                    @change="getSelectedApp"
            ></v-select>
          </v-col>
        </v-row>
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
          <v-col cols="8">
            <v-select
              :items="connectionList"
              v-model="connection"
              label="Rule Connection:"
              @change="onConnectionChange"
            ></v-select>
          </v-col>
          <v-col cols="1">
            <Popup />
          </v-col>
          <v-col cols="2">
            <v-btn text @click="snackbar = true" class="primary mx-2 btn btn-text ml-12">Test</v-btn
            ><v-snackbar v-model="snackbar">
              {{ connectionText }}
              <v-btn color="yellow" text @click="snackbar = false">
                Close
              </v-btn>
            </v-snackbar>
          </v-col>
        </v-row>
        <v-row>
          <v-btn text @click="fetchList" class="bg-color text-white mx-0 mt-3"
            >Fetch List</v-btn
          ></v-row
        >
        <div v-if="dataBaseList.length > 0">
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
              <v-select
                :items="labelList"
                v-model="validationLabel"
                label="Label:"
              ></v-select
            ></v-col>
            <v-col cols="5">
              <v-text-field
                v-model="target"
                label="Target DQI:"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model="threshold"
                label="Threshold:"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <Schedule
                displayLabel="Frequency"
                @scheduleCreated="addSchedule"
                :scheduleValue="frequency"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model="ownerName"
                label="Owner:"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-select
                :items="alertItems"
                v-model="alert"
                label="Send Notification:"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-btn text @click="createJob" class="bg-color text-white mx-0 mt-3"
              >Create</v-btn
            ></v-row
          >
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import connectList from "../../data/dbConnectionDetails.json";
import Popup from "../../components/ConnPopup";
import Schedule from "../../components/Schedule";
export default {
  data: () => ({
    labelList: ["Latency", "Uniqueness", "Competences", "Accuracy"],
    alertItems: ["Service Now", "Email"],
    appName: "",
    dataBaseList: [],
    tableNames: [],
    snackbar: false,
    ruleName: "",
    ruleDescription: "",
    connection: "",
    connectionText: "Connected Successfully",
    database: "",
    table: "",
    validationQuery: "",
    validationLabel: "",
    target: "",
    threshold: "",
    frequency: "",
    ownerName: "",
    dataBaseObj: {},
    time: new Date(),
    alert: ""
  }),
  components: {
    Popup,
    Schedule
  },
  computed: {
    ...mapState({
      connectionList: state => state.allConnections,
      applicationList: state=>state.applicationList
    })
  },
  methods: {
    async fetchList() {
      this.dataBaseList = [];
      this.tableNames = [];
      this.dataBaseObj = await connectList.filter(
        conn => conn.name == this.connection
      );
      this.dataBaseList.push(this.dataBaseObj[0].database[0].name);
    },
    onConnectionChange() {
      this.dataBaseList = [];
      this.tableNames = [];
    },
    onDBChange() {
      this.tableNames = [];
      console.log(this.dataBaseObj[0].database[0].tables);
      let tableList = this.dataBaseObj[0].database[0].tables;
      tableList.forEach(table => this.tableNames.push(table.name));
    },
    createJob() {
      const validationObject = {
        id: "v" + this.$store.state.jobId,
        "Application Name": this.appName,
        "Rule Name": this.ruleName,
        "Rule Description": this.ruleDescription,
        "Rule Owner": this.ownerName,
        "Rule Connection": this.connection,
        Database: this.database,
        Table: this.table,
        "Validation Query": this.validationQuery,
        Label: this.validationLabel,
        "Target DQI": this.target,
        Threshold: this.threshold,
        Frequency: this.frequency,
        Alert: this.alert
      };
      this.$store.dispatch("addValidation", validationObject);
      this.$router.push("/validation/list");
    },
    addSchedule(obj) {
      const filters = this.$options.filters;
      this.frequency =`Start:${filters.formatDate(obj.startDatetime)} End:${filters.formatDate(obj.endDatetime)}`;
    },
     getSelectedApp(val) {
      this.appName= val;
    }
  }
};
</script>

<style>
.row {
  margin-top: -10px;
}
</style>
