<template>
  <component :is="`Icon${icon}`" v-bind="$props" v-on="$listeners" fill="#fff" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
