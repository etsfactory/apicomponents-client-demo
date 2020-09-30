<template>
  <div :class="theme">
    <h1 class="title" :class="{ 'title--big': size === 'big' }">{{ title }}</h1>
    <p v-if="desc" class="desc">{{ desc }}</p>
  </div>
</template>

<script>
const themes = { dark: "dark", light: "light" };
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "normal"
    },
    theme: {
      type: String,
      default: themes.dark,
      validator(value) {
        return Object.values(themes).includes(value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.light .title {
  color: $marine;
}
.title {
  @include font-highlight-l;
  color: $ocean;
  margin: 0;
  padding: 4px 0 24px;
  border-top: 1px solid $white-opacity;
  border-bottom: 1px solid $white-opacity;
}
.title--big {
  @include font-heading-xl;
}
.desc {
  @include font-paragraph-s;
}
</style>
