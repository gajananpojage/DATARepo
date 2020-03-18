<template>
 <div>
   <h3 class="subheading grey--text">Data Validation</h3>
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
      activeTab: `/validation`,
      tabs: [
        { id: 1, name: "Create", route: `/validation` },
        { id: 2, name: "List", route: `/validation/list` },
        { id: 3, name: "Rule Info", route: `/validation/result` },
        { id: 4, name: "Output", route: `/validation/output` }
      ]
    };
  }
};
</script>
