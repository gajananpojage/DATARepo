<template>
  <div class="dashboard">
    <v-container class="my-5">
      <v-form class="px-3" ref="form" v-model="valid">
        <div v-if="!nextClicked">
          <v-row>
            <v-col cols="10">
               <v-select
                    :items="applicationList"
                    v-model="appName"
                    label="Select an Application:"
                    required
                    :rules="valueRequiredRules"
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
                :rules="nameRules"
                :counter="30"
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
            <v-col cols="10">
              <v-radio-group v-model="profileGroup">
                <v-radio
                  v-for="(profile, i) in profileOption"
                  :key="i"
                  :label="`${profile}`"
                  :value="profile"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-btn text @click="getNextView" class="bg-color text-white mx-0 mt-3"
              >Next</v-btn
            ></v-row
          >
        </div>
        <div v-if="nextClicked">
          <v-row>
            <v-col cols="8">
              <v-select
                :items="connectionList"
                v-model="connection"
                label="Connection:"
                @change="onConnectionChange"
              ></v-select>
            </v-col>
            <v-col cols="1">
              <Popup />
            </v-col>
            <v-col cols="2">
              <v-btn text @click="snackbar = true" class="primary mx-2 btn btn-text"
                >Test</v-btn
              ><v-snackbar v-model="snackbar">
                {{ connectionText }}
                <v-btn color="yellow" text @click="snackbar = false">
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
              </v-combobox
            ></v-col>
            <v-col cols="5">
              <v-text-field
                v-model="target"
                label="Target DQI:"
                type="number"
                required
              ></v-text-field>
            </v-col> </v-row
          ><v-row>
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
                :scheduleValue="frequency"
                @scheduleCreated="addSchedule"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10">
              <v-select
                :items="alertItems"
                v-model="alert"
                label="Send Notification:"
              ></v-select>
            </v-col>
          </v-row>
          <v-row
            ><v-col cols="1">
              <v-btn text class="cancel-btn mx-0 mt-3" @click="getInitView"
                >Back</v-btn
              >
            </v-col>
            <v-col cols="1">
              <v-btn text @click="createProfile" class="success mx-0 mt-3"
                >Create</v-btn
              ></v-col
            ></v-row
          >
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dbConnectionList from "../../data/dbConnectionDetails.json";
import Popup from "../../components/ConnPopup";
import Schedule from "../../components/Schedule";
export default {
  data: () => ({
    profileOption: [
      "Database Level Profile",
      "Table Level Profile",
      "Column Based Profile",
      "File Based Profile"
    ],
    profileGroup: "Database Level Profile",
    alertItems: ["Service Now","Email"],
    nextClicked: false,
    appName: "",
    columns: "",
    columnList: [],
    dataBaseList: [],
    tableNames: [],
    snackbar: false,
    ruleName: "",
    ruleDescription: "",
    connection: "",
    connectionText: "Connected Successfully",
    database: "",
    table: "",
    target: "",
    threshold: "",
    frequency: "",
    ownerName: "",
    dataBaseObj: {},
    alert: "",
    time: new Date(),
    valid: false,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Rule name must be less than 30 characters"
    ],
     valueRequiredRules: [v => !!v || "Value is required"]

  }),
  components: {
    Schedule,
    Popup
  },
  computed: {
    ...mapState({
      connectionList: state => state.allConnections,
      applicationList: state=>state.applicationList
    })
  },
  methods: {
    getNextView() {
      let valid = this.$refs.form.validate();
      if (valid) this.nextClicked = !this.nextClicked;
    },
    getInitView() {
      this.nextClicked = !this.nextClicked;
    },
    async onConnectionChange() {
      this.dataBaseList = [];
      this.tableNames = [];
      this.dataBaseObj = await dbConnectionList.filter(
        conn => conn.name == this.connection
      );
      this.dataBaseList.push(this.dataBaseObj[0].database[0].name);
    },

    onDBChange() {
      this.tableNames = [];
      this.dataBaseObj[0].database[0].tables.forEach(item =>
        this.tableNames.push(item.name)
      );
    },
    onTableChange() {
      this.columnList = [];
      const selectedTable = this.dataBaseObj[0].database[0].tables.filter(
        table => table.name == this.table
      );
      selectedTable[0].columns.forEach(column => this.columnList.push(column));
    },
    createProfile() {
      // eslint-disable-next-line no-unused-vars
      const profileObject = {
        id: "p" + this.$store.state.jobId,
        "Application Name": this.appName,
        "Rule Name": this.ruleName,
        "Rule Description": this.ruleDescription,
        "Rule Owner": this.ownerName,
        "Profile Group": this.profileGroup,
        Connection: this.connection,
        Database: this.database,
        Table: this.table,
        Columns: this.columns,
        "Target DQI": this.target,
        Threshold: this.threshold,
        Frequency: this.frequency,
        Alert: this.alert
      };
      console.log(profileObject);
      this.$store.dispatch("addProfile", profileObject);
      this.$router.push("/profiling/list");
    },
    addSchedule(obj) {
      const filters = this.$options.filters;
      this.frequency = `Start:${filters.formatDate(
        obj.startDatetime
      )} End:${filters.formatDate(obj.endDatetime)}`;
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
