<template>
  <app-module>
    <template #header>
      <app-header section="propuesta" title="Selecciona tus categorías" />
    </template>
    <div :class="{ 'show-warning': !minCategoriesSelected }" class="warning-message">
      <app-icon icon="warning" class="warning-icon" />
      selecciona al menos 4 categorías
    </div>
    <cr-component ref="categories" name="categories" class="categories" @change="setCategoryGroups($event.detail)" />
    <div v-if="showPopup" class="popup">
      <div class="popup-container">
        <h4 class="popup-header">Selecciona tus categorías</h4>
        <p class="popup-description">
          Basado en tu perfil de riesgo la máquina ha pre-seleccionado unas categorías, pero puedes cambiarlas a tu gusto:
        </p>
        <div class="popup-body">
          <template v-for="(item, i) in popupItems">
            <div v-if="i > 0" :key="`line-${i}`" class="vertical-line" />
            <div :key="`item-${i}`" class="popup-item">
              <app-icon :icon="item.icon" class="item-icon" />
              <p class="item-description">{{ item.description }}</p>
            </div>
          </template>
        </div>
        <div class="popup-footer">
          <div class="popup-checkbox">
            <app-checkbox class="checkbox" :checked="reminder" @click="reminder = !reminder" theme="dark" />No volver a mostrar este mensaje
          </div>
          <app-button size="small" text="comenzar" class="popup-confirm-button" @click="togglePopup" />
        </div>
      </div>
      <div class="popup-bg" />
    </div>
  </app-module>
</template>

<script>
import Cookies from "js-cookie";
import { mapState, mapMutations, mapGetters } from "vuex";
import AppModule from "@/components/AppModule";
import AppHeader from "@/components/AppHeader";
import AppCheckbox from "@/components/AppCheckbox";
import AppButton from "@/components/AppButton";
export default {
  components: {
    AppModule,
    AppHeader,
    AppCheckbox,
    AppButton
  },
  data: () => ({
    showPopup: true,
    reminder: false
  }),
  computed: {
    ...mapState(["proposal"]),
    ...mapGetters(["categories"]),
    minCategoriesSelected() {
      return this.categories.filter(e => e.selected).length >= 4;
    },
    popupItems() {
      return [
        {
          icon: "switch-off",
          description: "Activa las categorías que quieras que formen parte de tu selección"
        },
        {
          icon: "starstroke",
          description: "Marca como favoritas las que quieras que estén de forma obligatoria"
        },
        {
          icon: "lock",
          description: "Las bloqueadas por el candado estarán siempre seleccionadas"
        }
      ];
    }
  },
  methods: {
    ...mapMutations(["setCategoryGroups"]),
    togglePopup() {
      const oneYear = new Date().setDate(new Date().getDate() + 365);
      // name of cookie to be determined
      Cookies.set("showCategoriesPopup", !this.reminder, { expires: oneYear });
      this.showPopup = false;
    }
  },
  mounted() {
    this.$refs.categories.load({ groups: this.proposal.categoryGroups });
    const preference = eval(Cookies.get("showCategoriesPopup"));
    if (preference !== undefined) this.showPopup = preference;
  }
};
</script>

<style lang="scss" scoped>
.categories {
  margin-top: 24px;
}
.warning-message {
  @include font-highlight-m;
  color: $marine;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fee9c5;
  min-height: 0;
  height: 0;
  opacity: 0;
  transition: min-height 0.5s, opacity 0.25s;
  &.show-warning {
    min-height: 71px;
    opacity: 1;
  }
}
.warning-icon {
  fill: #fbb33b;
  margin: 0 16px 0 31px;
}
.popup-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 770px;
  padding: 37px 35px 22px;
  z-index: 4;
  overflow: auto;
  background-color: #fff;
}
.popup-header {
  @include font-heading-s;
  margin: 0;
  color: $ocean;
}
.popup-description {
  @include font-paragraph-s;
  color: $marine;
  margin: 12px 0 45px;
}
.popup-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 165px;
  .vertical-line {
    min-height: 136px;
    min-width: 1px;
    background-color: $anthrazit;
    align-self: center;
  }
}
.popup-item {
  .item-icon {
    fill: $ocean;
    width: 40px;
    height: 40px;
  }
  .item-description {
    @include font-data-m;
    margin: 16px 0 0;
    color: #000000;
    max-width: 180px;
  }
}
.popup-footer {
  margin: 28px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .popup-checkbox {
    @include font-paragraph-xs;
    color: $marine;
    display: flex;
    align-items: center;
    .checkbox {
      margin-right: 8px;
    }
  }

  ::v-deep .popup-confirm-button {
    background-color: $ocean;
    border: 1px solid $ocean;
    &[disabled] {
      opacity: 0.3;
      pointer-events: none;
    }
    &:not([disabled]) {
      &:hover,
      &:focus {
        border: 1px solid $marine;
      }
      &:before,
      &:after {
        content: "";
        background-color: white;
      }
    }
  }
}
</style>
