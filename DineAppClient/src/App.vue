<template>
  <v-app class="my-app">
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
import { bus } from './main'
export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    loggedIn: false
  }),
  props: {
    //loggedIn: localStorage.getItem('loggedIn')
  },
  created() {
    bus.$on('loggedIn', (data) => {
      this.loggedIn = data;
    })
    /* Set Initial Some Default Recordsfrom JSON for display in List*/
    this.$store.dispatch("setConnections");
    this.$store.dispatch("setJobs");
    this.$store.dispatch("setValidations");
    this.$store.dispatch("setProfiles");

  },
    mounted() {
    // eslint-disable-next-line no-unused-vars
    window.onpopstate = event => {
      console.log(localStorage.getItem('loggedUser'));
      if (localStorage.getItem('loggedIn') !== null && localStorage.getItem('loggedUser') === 'admin') {
        this.$router.push('/onboarding') // redirect to home
      } else if (localStorage.getItem('loggedIn') !== null && localStorage.getItem('loggedUser') !== 'admin') {
        this.$router.push('/approval');
      } else {
        this.$router.push('/');
      }
    };
  }
};
</script>

<style lang="scss">
  .my-app.v-application .primary--text {
    color: #00857a !important;
    caret-color: #00857a !important;
  }

  .my-app.v-application .primary {
    background-color: #00857a !important;
    border-color: #00857a !important;
  }

  .bg-color {
    background-color:#00857a !important;
  }

  .text-white {
    color: #fff !important;
  }

  .cancel-btn {
    color: #00716b;
    border: 1px solid #c0d1d0;
    background-color: #edf7f7;
    min-width: 100px;
    margin-right: 20px;
  }

  .my-app.v-application .green--text.text--darken-1 {
    color: #00857a !important;
    caret-color: #00857a !important;
  }

  .my-app.v-application .accent {
    background-color: #83bfba !important;
    border-color: #83bfba !important;
  }
</style>
