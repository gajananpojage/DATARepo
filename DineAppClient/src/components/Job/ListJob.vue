<template>
  <div class="dashboard">
    <v-container class="my-5" v-if="jobList">
      <v-row>
        <v-col class="d-flex" cols="10" sm="6">
          <v-select
            :items="jobList"
            label="Job Name:"
            item-text="name"
            item-value="jobId"
            @change="onJobChanged"
            v-model="job"
            dense
            outlined
          ></v-select> </v-col
        ><v-col class="d-flex" cols="2" sm="1"
          ><v-btn text @click="clearFilter" class="success mx-0 mt-3"
            >Reset</v-btn
          ></v-col
        ></v-row
      >
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('name')" v-on="on">
              <v-icon small left>queue</v-icon>
              <span class="caption ">By Job Name</span>
            </v-btn>
          </template>
          <span>Sort by Job Name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('status')" v-on="on">
              <v-icon small left>sort</v-icon>
              <span class="caption">By Job Status</span>
            </v-btn>
          </template>
          <span>Sort by Job Status</span>
        </v-tooltip>
      </v-layout>

      <v-card
        flat
        v-for="job in selectedJobs"
        :key="job.jobId"
        @click="onClick(job.jobId)"
      >
        <v-layout row wrap :class="`pa-3 job ${job.status}`">
          <v-flex xs12 md4>
            <div class="caption grey--text">Job Name</div>
            <div>{{ job.name }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Source Connection</div>
            <div>{{ job.sourceConnection }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Target Connection</div>
            <div>{{ job.targetConnection }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${job.status} white--text my-2 caption`">{{
                job.status
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
        let job = await this.jobList.filter(p => p.jobId === jobId);
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
