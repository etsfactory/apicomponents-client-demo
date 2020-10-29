<template>
  <div>
    <router-link to="/" class="home">
      <app-icon
        class="logo-icon"
        icon="logo"
        :class="{ 'logo-icon--dark': ['assessment-result', 'proposal-result'].includes($route.name) }"
      />
    </router-link>
    <div class="owner">
      <app-icon icon="ets-logo" />
      <div class="owner-text">Engineered by ETS Factory</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  position: fixed;
  top: 40px;
  left: 40px;
}
.logo-icon {
  width: 64px;
  height: 64px;
  ::v-deep {
    .path,
    .dot {
      transition: fill 0.15s;
    }
  }
  &.logo-icon--dark {
    ::v-deep .path {
      fill: rgba($anthrazit, 0.3);
    }
    ::v-deep .dot {
      fill: $background;
    }
  }
}
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
</style>
