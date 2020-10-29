<template>
  <section class="proposal">
    <section class="universe">
      <cr-component ref="universe" name="universe" @loaded="onUniverseLoaded" />
    </section>
    <section class="wizard">
      <div class="wizard-steps">
        <template v-for="(step, i) in steps">
          <router-link class="step" :to="step.to" :key="`step${i}`">{{ step.text }}</router-link>
          <div class="step-line" :key="`line${i}`" />
        </template>
      </div>
      <div class="wizard-container">
        <transition name="fade">
          <router-view />
        </transition>
      </div>
      <div class="wizard-footer">
        <cr-component ref="powerBars" class="power-bars" name="power-bars" immediate />
        <div class="buttons">
          <app-button :disabled="routeIndex === 0" text="Anterior" :to="toPrev" />
          <app-button
            :disabled="!minCategoriesSelected || (routeIndex === 0 && !proposal.amount)"
            v-if="routeIndex < pages.length - 1"
            text="Siguiente"
            :to="toNext"
          />
          <app-button v-else text="Calcular inversión" @click="createProposal" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import AppButton from "@/components/AppButton";
export default {
  components: {
    AppButton
  },
  computed: {
    ...mapState(["proposal"]),
    ...mapGetters(["categories", "selectedCategoryIds", "favouriteCategoryIds"]),
    minCategoriesSelected() {
      return this.$route.name !== "proposal-categories" || this.categories.filter(e => e.selected).length >= 4;
    },
    pages() {
      return ["proposal-amount", "proposal-risk", "proposal-categories", "proposal-preferences"];
    },
    steps() {
      return this.pages.map((x, i) => ({ to: { name: x }, text: `0${i + 1}` }));
    },
    routeIndex() {
      return this.pages.indexOf(this.$route.name);
    },
    toPrev() {
      return this.routeIndex > 0 ? { name: this.pages[this.routeIndex - 1] } : "/proposal";
    },
    toNext() {
      return this.routeIndex < this.pages.length - 1 ? { name: this.pages[this.routeIndex + 1] } : "/proposal";
    }
  },
  methods: {
    ...mapMutations(["setProposalUniverse", "setProposalPowerbars"]),
    onUniverseLoaded(e) {
      this.setProposalUniverse(e.target.data);
    },
    createProposal() {
      const powerBarValues = this.$refs.powerBars.children[0].data;
      this.setProposalPowerbars(powerBarValues);
      this.$router.push({ name: "proposal-result" });
    }
  },
  mounted() {
    this.$refs.universe.load({
      filter: {
        feed: "RentaMarkets"
      },
      position: {
        horizontal: 50
      },
      palette: {
        length: this.categories.length
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.proposal {
  height: 100%;
}
.universe {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.wizard {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: $margin-top;
  margin-left: $margin-left;
  width: 40%;
  height: calc(100vh - #{$margin-top});
}
.wizard-container {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
}
.wizard-steps {
  display: flex;
  align-items: flex-end;
  position: absolute;
  top: 5px;
  right: 0;
  z-index: 1;
}
.step {
  @include font-highlight-m;
  color: $dark-2;
  padding: 0 5px;
  &:hover {
    color: #fff;
  }
  &.router-link-exact-active {
    color: #fff;
    + .step-line {
      width: 24px;
    }
  }
}
.step-line {
  background-color: #fff;
  display: block;
  width: 0;
  height: 1px;
  margin: 0 5px;
  transition: width 0.25s ease-out;
}
.text-white {
  color: #fff;
}
.wizard-footer {
  padding: 20px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.power-bars {
  margin: 50px;
}
.buttons {
  display: flex;
  > * {
    margin-left: 10px;
  }
}
</style>
