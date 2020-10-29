<template>
  <app-module>
    <template #header>
      <app-header
        title="selecciona tu riesgo óptimo"
        desc="El nivel 1 corresponde con el perfil más conservador (Exposición a renta variable baja ~10%). El nivel 7 corresponde con el perfil más agresivo (Exposición a renta variable alta ~80%)."
      />
    </template>
    <section class="risk-wrapper">
      <cr-component ref="riskSelector" name="risk-selector" @change="riskChanged" />
      <!-- TODO: Se quitan las descripciones hasta que no estén los textos -->
      <div class="risk-explanation">
        <h3 class="risk-title">{{ selectedRisk.title }}</h3>
        <!-- <p class="risk-desc">{{ selectedRisk.description }}</p> -->
      </div>
    </section>
  </app-module>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { categoriesByRisk } from "@/logic/categories";
import AppModule from "@/components/AppModule";
import AppHeader from "@/components/AppHeader";
export default {
  components: {
    AppModule,
    AppHeader
  },
  computed: {
    ...mapState(["proposal"]),
    ...mapGetters(["selectedCategoryIds"]),
    risks() {
      return [
        {
          title: "Riesgo bajo",
          // description:
          //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          maxValue: 2
        },
        {
          title: "Riesgo medio",
          // description: "Consequat laboris ipsum exercitation in. Commodo nulla duis amet dolor ad excepteur in Lorem laboris voluptate.",
          maxValue: 6
        },
        {
          title: "Riesgo alto",
          // description: "Duis nulla eiusmod esse exercitation reprehenderit sit sint adipisicing laboris cillum aute dolor.",
          maxValue: 7
        }
      ];
    },
    selectedCategories() {
      return categoriesByRisk.find(x => this.proposal.risk === x.risk).categories;
    },
    selectedRisk() {
      return this.risks.find(x => this.proposal.risk <= x.maxValue);
    }
  },
  methods: {
    ...mapMutations(["setProposalRisk", "setSelectedCategories"]),
    riskChanged(e) {
      this.setProposalRisk(e.detail.value);
      if (!this.proposal.categoriesChanged) this.setSelectedCategories(this.selectedCategories);
    }
  },
  mounted() {
    this.$refs.riskSelector.load({ value: this.proposal.risk });
    if (!this.proposal.categoriesChanged) this.setSelectedCategories(this.selectedCategories);
  }
};
</script>

<style lang="scss" scoped>
.risk-wrapper {
  display: flex;
  align-items: center;
  padding: 100px 0 0 100px;
}
.risk-explanation {
  margin-left: 45px;
}
.risk-title {
  @include font-heading-s;
  color: $ocean;
}
.risk-desc {
  @include font-paragraph-s;
}
</style>
