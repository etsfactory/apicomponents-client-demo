<template>
  <div class="appsquare">
    <span v-for="i in 4" :key="i" class="corner" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.appsquare {
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  width: $square-size;
  height: $square-size;
  display: flex;
  justify-content: center;
  align-items: center;
}
.corner {
  $position: -1px;
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: #fff;
  &:nth-child(1) {
    top: $position;
    left: $position;
  }
  &:nth-child(2) {
    top: $position;
    right: $position;
  }
  &:nth-child(3) {
    bottom: $position;
    left: $position;
  }
  &:nth-child(4) {
    bottom: $position;
    right: $position;
  }
}
</style>
