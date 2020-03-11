<template>
  <div class="dashboard">
    <v-container class="my-5">
      <v-form class="px-3" ref="form" v-model="valid" >
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="jobName"
              label="Job Name: "
               :rules="nameRules"
               :counter="20"
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
              required
              :rules="valueRequiredRules"
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
              required
              :rules="valueRequiredRules"
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
            <v-datetime-picker label="Schedule:" v-model="datetime" required>
            </v-datetime-picker></v-col
        ></v-row>
        <v-row>
          <v-col cols="1">
           <v-btn text class="cancel-btn mx-0 mt-3" @click="clear">clear</v-btn></v-col>
           <v-col cols="1">
          <v-btn text @click="createJob" class="success mx-0 mt-3" :class="{ red: !valid, green: valid }"
            >Create</v-btn
          ></v-col></v-row
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
    datetime: "",
     valid: false,
     nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v && v.length <= 20 || 'Job name must be less than 20 characters'
        ],
        valueRequiredRules: [
          (v) => !!v || 'Value is required',
        ]
  }),

  methods: {
    createJob() {
      let valid=this.$refs.form.validate();
      if(valid) {
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
      this.$router.push("/reconciliation/list");
      }
    
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
.row {
  margin-top: -10px;
}
.cancel-btn {
  color: #00716b;
  border: 1px solid #c0d1d0;
  background-color: #edf7f7;
  min-width:100px;
  margin-right:20px;
}
</style>
