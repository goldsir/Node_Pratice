<template>
  <div>兒子1 {{ value }} <button @click="change">修改</button></div>
</template>

<script>
/*
    vue單向數據流， 子組件要往父組件丟數據很麻煩

    方式:1
    由父組件在子組件上綁定事件
*/

export default {
  methods: {
    change() {
      this.$emit("input", 200);
    },
  },
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style>
</style>