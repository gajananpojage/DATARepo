<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-text-field
        text
        slot="activator"
        :label="displayLabel"
        :value="scheduleValue"
        v-on="on"
      ></v-text-field>
    </template>
    <v-card>
      <v-card-title>
        <h4>Set {{ displayLabel }}</h4>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-datetime-picker
                label="Start:"
                v-model="startDatetime"
                required
              >
              </v-datetime-picker></v-col
            ><v-col cols="6">
              <v-datetime-picker label="End:" v-model="endDatetime" required>
              </v-datetime-picker
            ></v-col>
          </v-row>
          <v-row>
            <v-checkbox v-model="repeat" label="Repeat"></v-checkbox>
            <v-col v-if="repeat">
              <v-radio-group v-model="repeatValue">
                <v-radio
                  v-for="n in repeatOptions"
                  :key="n.value"
                  :label="`${n.name}`"
                  :value="n.value"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row class="custom-opt" v-if="repeat && repeatValue === 3"
            ><v-spacer></v-spacer
            ><v-col cols="4">
              <PlusMinusText
                @plusMinusValueChanged="addRepeatValue"
              ></PlusMinusText> </v-col
            ><v-col cols="4">
              <v-select
                :items="timeOptions"
                v-model="customMinHrs"
                label="Min/Hrs"
              ></v-select> </v-col
          ></v-row>
          <v-row>
            <v-checkbox v-model="retry" label="Retry if Failed"></v-checkbox
          ></v-row>
          <v-row v-if="retry">
            <v-col cols="4">
              <PlusMinusText @plusMinusValueChanged="addRetryTo"></PlusMinusText
            ></v-col>
            <v-col cols="2" class="label-custom"> Hour for</v-col>
            <v-col cols="4">
              <PlusMinusText
                @plusMinusValueChanged="addRetryFor"
              ></PlusMinusText> </v-col
            ><v-col cols="2" class="label-custom">Hours</v-col></v-row
          >

          <v-spacer></v-spacer>
          <v-btn text @click="cancel" class="cancel-btn mx-0 mt-3">Cancel</v-btn>
          <v-btn text @click="submit" class="primary mx-1 mt-3 ml-12">Schedule</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import PlusMinusText from "./PlusMinusText";
export default {
  props: ["displayLabel","scheduleValue"],
  data() {
    return {
      valid: true,
      snackbar: false,
      dialog: false,
      startDatetime: "",
      endDatetime: "",
      repeat: false,
      repeatValue: 1,
      customRepeat: "",
      customMinHrs: "",
      retry: false,
      retry_from: "",
      retry_to: "",
      repeatOptions: [
        { name: "daily", value: 1 },
        { name: "weekly", value: 2 },
        { name: "custom", value: 3 }
      ],
      timeOptions: ["Min", "Hrs"]
    };
  },
  components: {
    PlusMinusText
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const schedule = {
          startDatetime: this.startDatetime,
          endDatetime: this.endDatetime,
          repeat: this.repeat,
          repeatValue: this.repeatValue,
          customRepeat: this.customRepeat,
          customMinHrs: this.customMinHrs,
          retry: this.retry,
          retry_from: this.retry_from,
          retry_to: this.retry_to
        };
        this.$emit("scheduleCreated", schedule);
        this.dialog = false;
      }
    },
    cancel() {
      this.dialog = false;
    },
    addRepeatValue(value) {
      this.customRepeat = value;
    },
    addRetryTo(val) {
      this.retry_to = val;
    },
    addRetryFor(val) {
      this.retry_from = val;
    }
  },
  computed: {}
};
</script>
<style lang="scss">
@import ".././styles/styles.scss";

.custom-opt {
  margin-top: -40px !important;
}
.label-custom {
  padding-top: 30px;
}
</style>
