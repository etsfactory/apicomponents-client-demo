<template>
  <router-link v-if="to" :disabled="disabled" :class="size" class="appbutton" :to="to">{{ text }}</router-link>
  <button v-else :disabled="disabled" :class="size" class="appbutton" @click="disabled ? null : $emit('click')">{{ text }}</button>
</template>

<script>
const sizes = { small: "small", medium: "medium" };
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    to: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: sizes.medium,
      validator: value => {
        return Object.values(sizes).indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.appbutton {
  $gap: 17px;
  display: inline-block;
  color: #fff;
  border: 1px solid #fff;
  background-color: transparent;
  position: relative;
  outline: none;
  overflow: hidden;
  transition: color 0.25s ease-out;
  z-index: 1;
  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
  &:not([disabled]) {
    cursor: pointer;
    &:hover,
    &:focus {
      color: $background;
      &:before {
        transform: translateX(-49%) skewX(35deg);
      }
      &:after {
        transform: translateX(49%) skewX(35deg);
      }
    }
    &:active {
      color: $background;
      border-color: $gray-2;
      background-color: $gray-2;
    }
    &:before,
    &:after {
      content: "";
      background-color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: 0.25s ease-out;
      z-index: -1;
    }
    &:before {
      transform: translateX(-100%) translateX(-$gap) skewX(35deg);
    }
    &:after {
      transform: translateX(100%) translate($gap) skewX(35deg);
    }
  }
}
.medium {
  @include font-highlight-m;
  padding: 16px 32px;
}
.small {
  @include font-highlight-s;
  padding: 5px 16px;
}
</style>
