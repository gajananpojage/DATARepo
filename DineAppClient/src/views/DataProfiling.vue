<template>
 <div>
      <h3 class="subheading grey--text">Data Profiling</h3>
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact>
        {{ tab.name }}
      </v-tab>

      <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
        <router-view></router-view>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {

   data() {
    return {
      activeTab: `/profiling`,
      tabs: [
        { id: 1, name: "Create", route: `/profiling` },
        { id: 2, name: "List", route: `/profiling/list` },
        { id: 3, name: "Rule Info", route: `/profiling/result` },
        { id: 4, name: "Output", route: `/profiling/output` }
      ]
    };
  }
};
</script>
