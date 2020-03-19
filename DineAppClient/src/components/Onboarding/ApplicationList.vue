<template>
    <div class="dashboard">
        <v-container class="my-5" v-if="onBoardAppData">
            <v-row>
                <v-col class="d-flex" cols="10" sm="6">
                    <v-select
                            :items="onBoardAppData"
                            label="Application Name:"
                            item-text="name"
                            item-value="name"
                            @change="onJobChanged"
                            v-model="job"
                            dense
                            outlined
                    ></v-select></v-col
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
                                @click="sortBy('name')"
                                v-on="on"
                        >
                            <v-icon small left>queue</v-icon>
                            <span class="caption ">By Application Name</span>
                        </v-btn>
                    </template>
                    <span>Sort by Application Name</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('ownerName')" v-on="on">
                            <v-icon small left>sort</v-icon>
                            <span class="caption">By Owner Name</span>
                        </v-btn>
                    </template>
                    <span>Sort by Owner Name</span>
                </v-tooltip>
            </v-layout>

            <v-card
                    flat
                    v-for="application in selectedJobs"
                    :key="application.JobId"
            >
                <v-layout row wrap :class="`pa-3 application ${application.name}`">
                    <v-flex xs6 sm4 md3>
                        <div class="caption grey--text">Application Name</div>
                        <div>{{ application.name }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md3>
                        <div class="caption grey--text">Application Owner Name</div>
                        <div>{{ application.ownerName }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Email Id</div>
                        <div>{{ application.emailId }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Application Description</div>
                        <div>{{ application.description }}</div>
                    </v-flex>
                    <v-flex xs2 sm4 md2>
                        <div class="caption grey--text">Application Alert Option</div>
                        <div>{{ application.toolName }}</div>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "ApplicationList",
        data() {
            return {
                onBoardAppData: [],
                selectedJobs: this.onBoardAppData,
                job: ""
            };
        },
        async mounted() {
            this.onBoardAppData = this.$store.state.appDataList;
            this.selectedJobs = this.onBoardAppData;
        },
        methods: {
            sortBy(prop) {
                this.onBoardAppData.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
            },
             onJobChanged(name) {
                if (name) {
                    let job = this.onBoardAppData.filter(p => p.name === name);
                    this.selectedJobs = job;
                }
            },
            clearFilter() {
                this.onBoardAppData = this.$store.state.appDataList;
                this.selectedJobs = this.onBoardAppData;
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
