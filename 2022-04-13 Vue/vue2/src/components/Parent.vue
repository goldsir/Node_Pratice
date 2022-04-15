<template>
  <div>
    parnet {{ mny }}
    <Son1 :value="mny" @input="change"></Son1>
  </div>
</template>

<script>
import Son1 from "./Son1.vue";

export default {
  methods: {
    change(value) {
      this.mny = value;
    },
  },
  components: { Son1 },
  data() {
    return {
      mny: 100,
    };
  },
};
</script>

<style>
</style>