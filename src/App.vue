<template>
  <main class="main">
    <section :class="{ result: ['assessment-result', 'proposal-result'].includes($route.name) }" class="content">
      <transition name="fade">
        <router-view />
      </transition>
    </section>
    <app-frame />
  </main>
</template>

<script>
import AppFrame from "@/components/AppFrame";
export default {
  components: {
    AppFrame
  }
};
</script>

<style lang="scss">
*,
:after,
:before {
  box-sizing: border-box;
}
body {
  background: $background url("~@/assets/background.jpg") no-repeat;
  background-size: cover;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  padding: 0;
  margin: 0;
  color: #fff;
}
a {
  color: #fff;
  text-decoration: none;
}
ul {
  padding: 0;
}
li {
  list-style: none;
}
input {
  font-family: "Montserrat", sans-serif;
  color: #fff;
}
::-webkit-scrollbar {
  width: 1px;
}
::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.3);
}
::-webkit-scrollbar-thumb {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}
.content {
  position: relative;
  margin-top: $square-size;
  margin-left: $square-size;
  width: calc(100vw - #{$square-size});
  height: calc(100vh - #{$square-size});
  &.result {
    margin-top: 0;
    height: 100vh;
  }
}
</style>
