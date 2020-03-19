<template>
  <div class="dashboard">
    <v-container class="my-5">
      <v-form class="px-3" ref="form" v-model="valid">
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
              v-model="jobName"
              label="Rule Name: "
              :rules="nameRules"
              :counter="30"
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
              v-model="sourceDb"
              label="Source Connection:"
              required
              :rules="valueRequiredRules"
            ></v-select>
          </v-col>
          <v-col cols="1">
            <Popup />
          </v-col>
          <v-col cols="2">
            <v-btn text @click="snackbar = true" class="primary  mx-2 btn btn-text ml-12"
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
          <v-col cols="8">
            <v-select
              :items="connectionList"
              v-model="targetDb"
              label="Target Connection:"
              required
              :rules="valueRequiredRules"
            ></v-select>
          </v-col>
          <v-col cols="1">
            <Popup />
          </v-col>
          <v-col cols="2">
            <v-btn text @click="snackbar = true" class="primary mx-2 btn btn-text ml-12"
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
            <v-textarea
              clearable
              name="source-query"
              label="Source Query:"
              value=" "
              no-resize
              rows="1"
              clear-icon="cancel"
              v-model="sourceQuery"
              required
              :rules="valueRequiredRules"
            ></v-textarea>
          </v-col>
          <v-col cols="5">
            <v-textarea
              clearable
              name="target-query"
              label="Target Query:"
              value=" "
              no-resize
              rows="1"
              clear-icon="cancel"
              v-model="targetQuery"
              required
              :rules="valueRequiredRules"
            ></v-textarea
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="5">
            <Schedule
              displayLabel="Schedule"
              @scheduleCreated="addSchedule"
              :scheduleValue="scheduleVal"
            />
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="ownerName"
              label="Rule Owner:"
              required
            ></v-text-field>
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
        <v-row>
          <v-col cols="1">
            <v-btn text class="cancel-btn mx-0 mt-3" @click="clear"
              >clear</v-btn
            ></v-col
          >
          <v-col cols="1">
            <v-btn
              text
              @click="createJob"
              class="bg-color text-white mx-0 mt-3 ml-12"
              >Create</v-btn
            ></v-col
          ></v-row
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Popup from "../../components/ConnPopup";
import Schedule from "../../components/Schedule";
export default {
  data: () => ({
    alertItems: ["Service Now", "Email"],
    alert: "",
    appName: "",
    snackbar: false,
    snackbarConn: false,
    connectionText: "Connected Successfully",
    jobName: "",
    ruleDescription: "",
    sourceDb: "",
    targetDb: "",
    sourceQuery: "",
    targetQuery: "",
    scheduleVal: "",
    ownerName: "",
    valid: false,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Rule name must be less than 30 characters"
    ],
    valueRequiredRules: [v => !!v || "Value is required"]
  }),
  computed: {
    ...mapState({
      connectionList: state => state.allConnections,
      applicationList: state=>state.applicationList
    })
  },
  components: { Popup, Schedule },
  methods: {
    createJob() {
      let valid = this.$refs.form.validate();
      if (valid) {
        this.$store.dispatch("incrementJobId");
        // eslint-disable-next-line no-unused-vars
        const jobObject = {
          JobId: this.$store.state.jobId,
          "Application Name": this.appName,
          "Rule Name": this.jobName,
          "Rule Description": this.ruleDescription,
          "Rule Owner": this.ownerName,
          "Source Connection": this.sourceDb,
          "Target Connection": this.targetDb,
          "Source Query": this.sourceQuery,
          "Target Query": this.targetQuery,
          Schedule: this.scheduleVal,
          Status: "scheduled",
          Alert: this.alert
        };
        this.$store.dispatch("addJob", jobObject);
        this.$router.push("/reconciliation/list");
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    addSchedule(obj) {
      const filters = this.$options.filters;
      this.scheduleVal = `Start:${filters.formatDate(
        obj.startDatetime
      )} End:${filters.formatDate(obj.endDatetime)}`;
    },
     getSelectedApp(val) {
      this.appName= val;
    }
  }
};
</script>

<style lang="scss">
@import "../../styles/styles.scss";
.row {
  margin-top: -10px;
}
</style>
