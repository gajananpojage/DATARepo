<template>
  <div class="dashboard">
    <h3 class="subheading grey--text">Create a Job</h3>
    <v-container fluid>
      <v-form class="px-3" ref="form" lazy-validation>
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="jobName"
              label="Job Name: "
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-select
              :items="connectionList"
              v-model="sourceDb"
              label="Source Connection:"
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
          <v-col cols="10">
            <v-select
              :items="connectionList"
              v-model="targetDb"
              label="Target Connection:"
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
            <v-textarea
              clearable
              name="source-query"
              label="Source Query:"
              value=" "
              no-resize
              rows="1"
              clear-icon="cancel"
              v-model="sourceQuery"
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
            ></v-textarea
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="10">
            <v-datetime-picker label="Schedule:" v-model="datetime">
            </v-datetime-picker></v-col
        ></v-row>
        <v-row>
          <v-btn text @click="createJob" class="success mx-0 mt-3"
            >Create</v-btn
          ></v-row
        >
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    connectionList: ["CustomDB", "ResourceDB", "UserDB", "TestDB"],
    snackbar: false,
    connectionText: "Connected Successfully",
    jobName: "",
    sourceDb: "",
    targetDb: "",
    sourceQuery: "",
    targetQuery: "",
    datetime: ""
  }),

  methods: {
    createJob() {
      this.$store.dispatch("incrementJobId");
      // eslint-disable-next-line no-unused-vars
      const jobObject = {
        jobId: this.$store.state.jobId,
        name: this.jobName,
        sourceConnection: this.sourceDb,
        targetConnection: this.targetDb,
        sourceQuery: this.sourceQuery,
        targetQuery: this.targetQuery,
        scheduled: this.datetime,
        status: "scheduled"
      };
      this.$store.dispatch("addJob", jobObject);
      this.$router.push('results')
    }
  }
};
</script>

<style>
.row {
  margin-top: -10px;
}
</style>
