<template>
<div>
       <v-text-field 
                v-model="plusminusCalc"
                type="number"
                label="Every"
                append-outer-icon="add"
                @click:append-outer="increment"
                prepend-icon="remove"
                @click:prepend="decrement"
              ></v-text-field>

</div>
</template>
<script>
export default {
  data: () => ({
   plusminusCalc:0,
  }),

  methods: {
   increment() {
      this.plusminusCalc = parseInt(this.plusminusCalc, 10) + 1;
      this.$emit("plusMinusValueChanged", this.plusminusCalc);
    },
    decrement() {
      this.plusminusCalc = parseInt(this.plusminusCalc, 10) - 1;
      this.$emit("plusMinusValueChanged", this.plusminusCalc);
    },
  }
};
</script>
