<template>
    <v-container
            fluid
            fill-height
    class="mt-12">
        <v-layout
                align-center
                justify-center>
            <v-flex
                    xs12
                    sm8
                    md4>
                <v-card class="elevation-12">
                    <v-toolbar
                            class="bg-color"
                            dark
                            flat>
                        <v-toolbar-title>Welcome</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-toolbar-title>Logged In As:</v-toolbar-title>
                                <v-radio-group v-model="loggedUser" row class="center-align" :rules="[v => !!v || 'Selection is required']">
                                    <v-radio label="Admin" value="admin"></v-radio>
                                    <v-radio label="User" value="user"></v-radio>
                                    <v-radio label="Approver" value="approver"></v-radio>
                                </v-radio-group>
                            <v-text-field
                                    label="Username"
                                    name="login"
                                    prepend-icon="person"
                                    type="text"
                                    :rules="userNameRule"
                                    required
                            ></v-text-field>

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="lock"
                                    type="password"
                                    :rules="passwordRule"
                                    required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="submit" :class=" { 'primary--text white--text' : valid, disabled: !valid }" class="bg-color text-white">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {bus} from '../main'
    export default {
        name: "Login",
        data () {
            return {
                loggedUser: null,
                valid: false,
                loggedIn: false,
                //e1: false,
                password: '',
                passwordRule: [
                    (v) => !!v || 'Password is required',
                ],
                username: '',
                userNameRule: [
                    (v) => !!v || 'Username is required'
                ],
            }
        },
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    //console.log(this.loggedUser);
                    this.loggedIn = true;
                    localStorage.setItem('loggedIn', this.loggedIn);
                    localStorage.setItem('loggedUser', this.loggedUser);
                    bus.$emit('loggedIn', this.loggedIn);
                    bus.$emit('loggedUser', this.loggedUser);
                    //routing
                    this.loggedUser === 'admin' ? this.$router.push('/onboarding') : this.$router.push('/approval');

                }
            }
        }
    }
</script>

<style scoped>
    .center-align {
        margin-left: 58px;
    }
</style>
