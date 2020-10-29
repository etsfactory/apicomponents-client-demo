<template>
  <div class="appinfo error">{{ text }}</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "error"
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.appinfo {
  @include font-paragraph-s;
  padding: 10px 0;
}
.error {
  color: #f00;
}
</style>
