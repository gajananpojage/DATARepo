<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text slot="activator" class="btn-default" v-on="on"
        >Create New</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <h4>Create a new Connection</h4>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            label="Connection Name: "
            :counter="25"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-select
            :items="connectionTypes"
            v-model="connectionType"
            label="Connection Type:"
            required
            :rules="selectRule"
          ></v-select>
          <v-text-field v-model="host" label="Host: " required></v-text-field>
          <v-text-field v-model="port" label="Port: " required></v-text-field>
          <v-text-field v-model="url" label="URL: " required></v-text-field>
          <v-text-field
            v-model="userName"
            label="User Name: "
            :counter="10"
            :rules="userNameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="password"
            :rules="passwordRules"
            required
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
                  text
                  @click="cancel"
                  class="cancel-btn mx-0 mt-3"
          >Cancel</v-btn
          >
          <v-btn
            text
            @click="submit"
            class="bg-color text-white mx-1 mt-3 ml-4"

            >Create</v-btn
          >
          <v-btn
            text
            @click="snackbar = true"
            class="bg-color text-white mx-1 mt-3 ml-4"
            >Test</v-btn
          >
          <v-snackbar v-model="snackbar">
            Connected successfully
            <v-btn color="yellow" text @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      snackbar: false,
      name: "",
      host: "",
      port: "",
      userName: "",
      password: "",
      menu: false,
      connectionTypes: ["SQL", "MySQL", "ORACLE", "PostgreSQL"],
      connectionType: "",
      url: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      selectRule: [v => !!v || "Connection type is required"],
      userNameRules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Minimum length is 3 characters"
      ],
      passwordRules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Minimum length is 3 characters"
      ],

      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {

        const connection = {
          name: this.name,
          connectionType: this.connectionType,
          host: this.host,
          port: this.port,
          url: this.url
        };
        this.$store.dispatch("addConnection", connection.name);
        this.dialog = false;
      }
    },
    cancel() {
      this.dialog = false;
    }
  },
  computed: {}
};
</script>
<style lang="scss">
@import ".././styles/styles.scss";
</style>
