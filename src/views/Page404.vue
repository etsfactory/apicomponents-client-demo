<template>
  <div class="page404">
    <app-icon icon="warning" class="icon" />
    <h1 class="title">ERROR 404</h1>
    <h3 class="subtitle">Not found</h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page404 {
  position: absolute;
  top: calc(50% - 70px) !important;
  left: calc(50% - 70px) !important;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon {
  height: 100px;
  width: 100px;
  fill: $ocean;
}
.title {
  @include font-heading-xl;
  margin: 40px 0 20px;
}
.subtitle {
  @include font-highlight-l;
  color: $ocean;
}
</style>
