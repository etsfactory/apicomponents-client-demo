<template>
  <div>
    <router-link to="/" class="home-button">
      <app-icon class="home-button-icon" icon="home-icon" />
      <span class="home-button-text">INICIO</span>
    </router-link>
    <app-square class="square square--logo-right" />
    <app-square class="square square--logo-bottom" />
    <div class="owner">
      <app-icon icon="ets-logo" />
      <div class="owner-text">Engineered by ETS Factory</div>
    </div>
  </div>
</template>

<script>
import AppSquare from "@/components/AppSquare";
export default {
  components: {
    AppSquare
  }
};
</script>

<style lang="scss" scoped>
.square {
  position: fixed;
}
.icon-logo {
  width: 40px;
  height: 40px;
}
.home-button {
  position: fixed;
  top: 58px;
  left: 35px;
  &:hover {
    .home-button-icon {
      fill: $ocean;
    }
  }
}
.home-button-icon {
  fill: white;
  vertical-align: middle;
}
.home-button-text {
  @include font-highlight-s;
  margin-left: 12px;
}
.home-logo {
  position: fixed;
  top: 42.5px;
  left: 66px;
}
.square--top-right {
  top: 0;
  right: 0;
}
// TODO: Reubicar el owner con el nuevo diseño
// .owner {
//   position: fixed;
//   left: 24px;
//   top: 65%;
// }
// .owner-text {
//   @include font-paragraph-xs;
//   padding-left: 10px;
//   transform: rotate(90deg);
//   transform-origin: 10px;
// }
.owner {
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
}
.owner-text {
  @include font-paragraph-xs;
  padding-left: 10px;
}
.log-out {
  cursor: pointer;
  &:hover {
    background-color: $ocean;
  }
}
</style>
