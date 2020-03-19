<template>
  <div>
    <h3 class="subheading grey--text">Application Onboarding</h3>
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
  name: "Onboarding",
  data() {
    return {
      activeTab: `/onboarding`,
      tabs: [
        { id: 1, name: "Onboard", route: `/onboarding` },
        { id: 2, name: "List", route: `/onboarding/list` }
      ]
    };
  }
}
</script>

<style>

</style>
