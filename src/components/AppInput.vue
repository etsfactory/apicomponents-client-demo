<template>
  <div class="appinput" :class="{ 'has-icon': icon, error: hasError }">
    <app-money
      v-if="type === 'currency'"
      ref="money"
      class="input"
      :value="value"
      v-bind="moneyBinds"
      @input="onInput"
      @focus.native="toggleFocus"
      @blur.native="toggleFocus"
    />
    <input
      v-else
      ref="input"
      class="input"
      :type="type === 'password' ? 'password' : 'text'"
      :value="value || null"
      @input="onInput"
      @focus="toggleFocus"
      @blur="toggleFocus"
    />
    <label class="label" :class="{ 'label--float': isLabelFloated }">{{ label }}</label>
    <app-icon v-if="icon" class="icon" :icon="icon" />
  </div>
</template>

<script>
import { Money as AppMoney } from "v-money";
const types = { currency: "currency", text: "text", number: "number", password: "password" };
export default {
  components: {
    AppMoney
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: types.text,
      validator: value => {
        return Object.values(types).indexOf(value) !== -1;
      }
    },
    icon: {
      type: String,
      default: null
    },
    hasError: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    focused: false,
    moneyBinds: {
      decimal: ",",
      thousands: ".",
      suffix: " €",
      precision: 0
    }
  }),
  computed: {
    isLabelFloated() {
      return this.focused || this.value;
    }
  },
  methods: {
    toggleFocus() {
      const moneyInput = this.$refs.money;
      this.focused = !this.focused;
      if (!this.value && moneyInput) {
        moneyInput.$el.value = this.focused ? "0 €" : null;
      }
    },
    focus() {
      const input = this.$refs.input || this.$refs.money.$el;
      input.focus();
    },
    onInput(e) {
      let value = this.type === types.currency ? e : e.target.value;
      if (value === 0) {
        this.$nextTick(function() {
          this.$refs.money.$el.value = null;
        });
      }
      if (this.type === types.number || this.type === types.currency) {
        value = Number(value);
      }
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.appinput {
  max-width: 400px;
  position: relative;
  padding-top: 16px;
}
.input {
  @include font-paragraph-m;
  border: none;
  border-bottom: 1px solid $gray-1;
  background-color: transparent;
  padding: 7px 30px 7px 0;
  width: 100%;
  outline: none;
  transition-property: border-bottom-color, color;
  transition-duration: 0.15s;
  &:focus,
  &:active {
    border-bottom-color: #fff;
    color: #fff;
  }
}
.label {
  @include font-highlight-m;
  color: $gray-1;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  transform: translateY(28px);
  transition-property: transform, font-weight, color;
  transition-duration: 0.15s;
}
.has-icon {
  padding-left: 34px;
  .label {
    left: 34px;
  }
}
.label--float {
  @include font-highlight-s;
  color: #fff;
  transform: translateY(0);
  + .icon {
    fill: #fff;
  }
}
.icon {
  position: absolute;
  fill: $gray-1;
  left: 0;
  top: 24px;
  transition: fill 0.15s;
}
.appinput.error {
  .label {
    color: red;
  }
  .icon {
    fill: red;
  }
  .input {
    border-bottom: 1px solid red;
  }
}
</style>
