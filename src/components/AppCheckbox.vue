<template>
  <label class="checkbox-label" :class="theme">
    <span class="bottom-corners" />
    <input type="checkbox" class="checkbox" :checked="checked" @click="$emit('click')" />
    <span class="checkmark" />
  </label>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: "dark"
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-label {
  position: relative;
  user-select: none;
  height: 16px;
  width: 16px;
  min-height: 16px;
  min-width: 16px;
  cursor: pointer;
  input {
    margin: 0;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .checkmark {
      display: block;
      &:after {
        opacity: 1;
      }
    }
  }
  &:hover {
    .checkmark {
      display: block;
    }
  }
  &.dark {
    &::before,
    &::after,
    .bottom-corners:before,
    .bottom-corners:after {
      background: $marine;
    }
    .checkmark {
      border: 0.5px solid $marine;
    }
  }
  &.light {
    &::before,
    &::after,
    .bottom-corners:before,
    .bottom-corners:after {
      background: #fff;
    }
    .checkmark {
      border: 0.5px solid $white-opacity;
    }
  }
}
.checkbox-label:before,
.checkbox-label:after,
.checkbox-label .bottom-corners:before,
.checkbox-label .bottom-corners:after {
  content: "";
  height: 1px;
  width: 1px;
  position: absolute;
}
.checkbox-label:after {
  right: 1px;
  top: 1px;
}
.checkbox-label:before {
  left: 1px;
  top: 1px;
}
.checkbox-label .bottom-corners:before {
  bottom: 1px;
  left: 1px;
}
.checkbox-label .bottom-corners:after {
  bottom: 1px;
  right: 1px;
}
.checkmark {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
}
.checkmark:after {
  content: "";
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 8px;
  width: 8px;
  background-color: $ocean;
}
</style>
