<template>
  <div class="appmodule">
    <slot name="header" />
    <div class="appmodule-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.appmodule {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}
.appmodule-content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
