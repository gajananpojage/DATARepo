<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    //
  }),
  created() {
    /* Set Initial Some Default Recordsfrom JSON for display in List*/
    this.$store.dispatch("setJobs");
    this.$store.dispatch("setValidations");
    this.$store.dispatch("setProfiles");
  }
};
</script>
