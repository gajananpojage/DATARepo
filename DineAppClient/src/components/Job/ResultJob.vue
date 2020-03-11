<template>
  <div class="dashboard">
    <v-container class="my-5">
      <table v-if="selection.length">
        <tr v-for="(value, propertyName) in selection[0]" :key="propertyName">
          <td class="field">
            <span>{{ propertyName }}</span>
          </td>
          <td v-if="propertyName=='scheduled'">{{ value |formatDate}}</td>
          <td v-else>{{ value }}</td>
        </tr>
      </table>

      <div v-else>Please click on a record in List Tab</div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selection: []
    };
  },
  async mounted() {
    let id = this.$store.state.activeItemId;
    this.selection = this.$store.state.allJobs.filter(item => item.jobId == id);
  },
  beforeDestroy() {
    this.$store.dispatch("unsetActiveItem");
  }
};
</script>

<style>
td {
  padding: 5px;
}
.field {
  padding-right: 20px;
}
td::first-letter {
  text-transform: uppercase;
}
td:nth-child(odd) {
  color: gray;
}
</style>
