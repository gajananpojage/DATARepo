<template>
  <v-card>
    <v-app-bar app class="pink-top">
      <v-app-bar-nav-icon  @click="drawer = !drawer" style="background:#f5f5f5"  v-if="loggedIn && loggedUser === 'admin'"></v-app-bar-nav-icon>
       <!--<v-spacer class="white&#45;&#45;text" align="center">
        <v-toolbar-title v-if="loggedIn && $route.path === '/onboarding'">
          Application OnBoarding
       </v-toolbar-title>
        <v-toolbar-title v-if="loggedIn && $route.path === '/reconciliation'">
            Data Reconciliation
       </v-toolbar-title>
        <v-toolbar-title v-if="loggedIn && $route.path === '/profiling'">
            Data Profiling
       </v-toolbar-title>
        <v-toolbar-title v-if="loggedIn && $route.path === '/validation'">
            Data Validation
       </v-toolbar-title>
        <v-toolbar-title v-if="loggedIn && $route.path === '/approval'">
          Data Approval
       </v-toolbar-title>
        </v-spacer>-->
        <!--<v-toolbar-title v-if="loggedIn && $route.path === ''">
          Data Viewer
       </v-toolbar-title>-->
       <v-layout align-center justify-end v-if="!loggedIn">
          <v-toolbar-title  class="white--text">Digitized Information Management Ecosysyem</v-toolbar-title>
        </v-layout>
       <v-spacer></v-spacer>
   <v-menu offset-y v-if="loggedIn && loggedUser === 'admin'">
      <template v-slot:activator="{ on }">
        <v-btn text color="white"
          v-on="on" >
         <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
         router :to="item.route"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      <v-btn text color="white" v-if="loggedIn" @click="logout">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-if="loggedIn && loggedUser === 'admin'" app  v-model="drawer" class="primary dark-bg">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/data_icon.jpg">
          </v-avatar>
          <p class="white--text subheading mt-1">DIME Application</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
        </v-flex>
      </v-layout>
        <v-list>
        <v-list-item v-for="item in items" :key="item.text" router :to="item.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-card>
</template>

<script>
    import { bus } from '../main';
export default {
  components: {  },
  data() {
    return {
      loggedIn: false,
      loggedUser: null,
      drawer: false,
      items: [
        { icon: 'store', text: 'Application OnBoarding', route: '/onboarding' },
        { icon: 'create', text: 'Data Reconciliation', route: '/reconciliation' },
        { icon: 'widgets', text: 'Data Profiling', route: '/profiling' },
        { icon: 'done_outline', text: 'Data Validation', route: '/validation' }
      ],
       headerText: '',
      snackbar: false
    }
  },
   computed: {
  },
    async mounted() {
        /*this.$route.path === '/onboarding' ? this.headerText = 'Application OnBoarding' :
            this.$route.path === '/reconciliation' ? this.headerText = 'Data Reconciliation' :
                this.$route.path === '/profiling' ? this.headerText = 'Data Profiling' :
                    this.$route.path === '/validation' ? this.headerText = 'Data Validation' :
                        this.$route.path === '/approval' ? this.headerText = 'Data Approver' : this.headerText = 'Data Viewer' ;*/
    },
    created() {
            bus.$on('loggedIn', (data) => {
                console.log(data);
                this.loggedIn = data;
            });
            bus.$on('loggedUser', (data) => {
                console.log(data);
                this.loggedUser = data;
            });
            this.loggedIn = localStorage.getItem('loggedIn');
            this.loggedUser = localStorage.getItem('loggedUser');
    },
    methods: {
      logout() {
          localStorage.removeItem('loggedIn');
          this.loggedIn = false;
          this.$router.push('/');
      }
    }
}
</script>

<style>
.cart-icon {
  background-color:#1976d2;
}
.pink-top {
  background-color:#00857a!important
}
.dark-bg .theme--light.v-sheet {
   background-color: #00857a !important;
}
</style>
