<template>
 <div>
   <h3 class="subheading grey--text">Data Reconciliation</h3>
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
      activeTab: `/reconciliation`,
      tabs: [
        { id: 1, name: "Create", route: `/reconciliation` },
        { id: 2, name: "List", route: `/reconciliation/list` },
        { id: 3, name: "Result", route: `/reconciliation/result` }
      ]
    };
  }
};
</script>
