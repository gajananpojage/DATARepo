<template>
  <div class="dashboard">
    <v-container class="my-5" v-if="jobList">
      <v-row>
        <v-col class="d-flex" cols="10" sm="6">
          <v-select
            :items="jobList"
            label="Rule Name:"
            item-text="Rule Name"
            item-value="JobId"
            @change="onJobChanged"
            v-model="job"
            dense
            outlined
          ></v-select> </v-col
        ><v-col class="d-flex" cols="2" sm="1"
          ><v-btn text @click="clearFilter" class="cancel-btn mx-0 mt-1"
            >Reset</v-btn
          ></v-col
        ></v-row
      >
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              text
              color="grey"
              @click="sortBy('Rule Name')"
              v-on="on"
            >
              <v-icon small left>queue</v-icon>
              <span class="caption ">By Rule Name</span>
            </v-btn>
          </template>
          <span>Sort by Rule Name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('Status')" v-on="on">
              <v-icon small left>sort</v-icon>
              <span class="caption">By Status</span>
            </v-btn>
          </template>
          <span>Sort by Status</span>
        </v-tooltip>
      </v-layout>

      <v-card
        flat
        v-for="job in selectedJobs"
        :key="job.JobId"
        @click="onClick(job.JobId)"
      >
        <v-layout row wrap :class="`pa-3 job ${job.Status}`">
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Application Name</div>
            <div>{{ job["Application Name"] }}</div>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Rule Name</div>
            <div>{{ job["Rule Name"] }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Source Connection</div>
            <div>{{ job["Source Connection"] }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Target Connection</div>
            <div>{{ job["Target Connection"] }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${job.Status} white--text my-2 caption`">{{
                job.Status
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
      jobList: [],
      selectedJobs: this.jobList,
      job: ""
    };
  },
  async mounted() {
    this.jobList = this.$store.state.allJobs;
    this.selectedJobs = this.jobList;
  },
  methods: {
    sortBy(prop) {
      this.jobList.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    async onJobChanged(jobId) {
      if (jobId) {
        let job = await this.jobList.filter(p => p.JobId === jobId);
        this.selectedJobs = job;
      }
    },
    onClick(itemId) {
      this.$store.dispatch("setActiveItem", itemId);
      this.$router.push({ path: `/reconciliation/result` });
    },
    clearFilter() {
      this.jobList = this.$store.state.allJobs;
      this.selectedJobs = this.jobList;
      this.job = "";
    }
  }
};
</script>

<style>
.job.completed {
  border-left: 4px solid #3cd1c2;
}
.job.running {
  border-left: 4px solid #ffaa2c;
}
.job.failed {
  border-left: 4px solid #f83e70;
}
.job.scheduled {
  border-left: 4px solid blue;
}

.v-chip.completed {
  background: #3cd1c2 !important;
}
.v-chip.running {
  background: #ffaa2c !important;
}
.v-chip.failed {
  background: #f83e70 !important;
}
.v-chip.scheduled {
  background: blue !important;
}
</style>
