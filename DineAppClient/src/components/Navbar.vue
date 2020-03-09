<template>
  <v-card>
    <v-app-bar app class="pink-top">
      <v-app-bar-nav-icon  @click="drawer = !drawer" style="background:#f5f5f5"></v-app-bar-nav-icon>
      <v-toolbar-title>     
       </v-toolbar-title>
       <v-spacer></v-spacer>
   <v-menu offset-y>
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

      <v-btn text color="white">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app  v-model="drawer" class="primary dark-bg">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/data_icon.jpg">
          </v-avatar>
          <p class="white--text subheading mt-1">Data Application</p>
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
export default {
  components: {  },
  data() {
    return {
      drawer: false,
      items: [
        { icon: 'store', text: 'Application OnBoarding', route: '/' },
        { icon: 'create', text: 'Data Reconciliation', route: '/reconciliation' },
        { icon: 'dashboard', text: 'Job Results', route: '/results' },
        { icon: 'widgets', text: 'Data Profiling', route: '/profiling' },
        { icon: 'done_outline', text: 'Data Validation', route: '/validation' }
      ],
      snackbar: false
    }
  },
   computed: {
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

   background-color: #1976d2;
}
</style>
