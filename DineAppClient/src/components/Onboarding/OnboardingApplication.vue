<template>
    <div class="dashboard">
        <v-container class="my-5">
            <v-form class="px-3" ref="form" v-model="valid">
                <v-row>
                    <v-col cols="10">
                        <v-text-field
                                v-model="applicationName"
                                label="Application Name: "
                                :rules="nameRules"
                                :counter="20"
                                required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <v-text-field
                                v-model="applicationDescription"
                                label="Description: "
                                :rules="descriptionRules"
                                :counter="100"
                                required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5">
                        <v-text-field
                                v-model="applicationOwnerName"
                                label="Owner Name: "
                                :rules="nameRules"
                                :counter="20"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field
                                v-model="applicationOwnerEmailId"
                                label="Owner Email Id: "
                                :rules="emailRules"
                                required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <v-select
                                :items="sendNotification"
                                v-model="toolName"
                                label="Send Notification:"
                                required
                                :rules="valueRequiredRules"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="1">
                        <v-btn text @click="submit" class="mx-0 mt-3 bg-color text-white"
                        >Submit</v-btn
                        ><v-snackbar v-model="snackbar">
                        {{ submitSuccessfully }}
                        <v-btn color="green" text @click="snackbar = false">
                            Close
                        </v-btn>
                    </v-snackbar></v-col></v-row
                >
            </v-form>
        </v-container>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    export default {
        name: "OnboardingApplication",
        data: () => ({
            source: ["RDS", "OPSI", "GOLD", "DIAL"],
            sendNotification: ["Service Now", "Email"],
            applicationName: '',
            applicationOwnerName: '',
            applicationDescription: '',
            applicationOwnerEmailId: '',
            toolName: '',
            submitSuccessfully: 'Data has been submitted successfully',
            snackbar: false,
            valid: false,
            formObj: {},
            nameRules: [
                (v) => !!v || 'Name is required',
                (v) => v && v.length <= 20 || 'Application name must be less than 20 characters'
            ],
            descriptionRules: [
                (v) => !!v || 'Description is required',
                (v) => v && v.length <= 100 || 'Description name must be less than 100 characters'
            ],
            valueRequiredRules: [
                (v) => !!v || 'Value is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        }),

        computed: {
            ...mapState({
                appDataList: state => state.appDataList()
            })
        },
        created() {},
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true;
                    this.formObj = {
                        'name': this.applicationName,
                        'ownerName':this.applicationOwnerName,
                        'emailId': this.applicationOwnerEmailId,
                        'description': this.applicationDescription,
                        'toolName': this.toolName
                    };
                    console.log(this.formObj);
                    //localStorage.setItem('applicationData', JSON.stringify(this.formObj))
                    //this.$store.dispatch("onboardApp",  JSON.parse(localStorage.getItem('applicationData')));
                    this.$store.dispatch("onboardApp",  this.formObj);
                    this.$store.dispatch("addApplication", this.applicationName);
                    this.snackbar = true;
                    setTimeout(() => {this.$router.push('/reconciliation') }, 1000)
                }
            }
        }
    };
</script>

<style>
    .row {
        margin-top: -10px;
    }
</style>
