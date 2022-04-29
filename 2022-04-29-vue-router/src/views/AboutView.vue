<template>
  <div class="home">
    <h1>About</h1>
    <nav>
      <router-link to="/about/a">a</router-link>
      <router-link to="/about/b">b</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "AboutView",
  components: {},
};
</script>
