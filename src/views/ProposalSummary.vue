<template>
  <div class="proposal-summary">
    <app-header section="proposal" title="Tu selección" desc="Resumen de tus preferencias de inversión." />
    <div class="power-bars">
      <h5 class="title">Preferencias de inversión</h5>
      <cr-component ref="powerBars" class="power-bars" name="power-bars" />
    </div>
    <div class="action-buttons">
      <router-link to="/proposal/preferences"> <app-button text="modificar datos"/></router-link>
      <app-button :text="proposing ? 'Calculando...' : 'Calcular inversión'" :disabled="proposing" @click="createProposal" />
    </div>
    <cr-component ref="proposal" name="proposal" @loaded="onProposalCreated" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import AppButton from "@/components/AppButton";
import AppHeader from "@/components/AppHeader";
export default {
  components: {
    AppButton,
    AppHeader
  },
  data: () => ({
    proposing: false
  }),
  computed: {
    ...mapState(["proposal"]),
    ...mapGetters(["categories", "selectedCategoryIds", "favouriteCategoryIds"])
  },
  mounted() {
    this.$refs.powerBars.load({ values: this.proposal.powerBars, horizontal: true });
  },
  methods: {
    ...mapMutations(["setProposalId"]),
    createProposal() {
      this.proposing = true;
      const payload = {
        configurationType: "mt16_rm",
        universeType: "rm_european_fund",
        timeHorizon: this.proposal.timeHorizon,
        riskLevel: this.proposal.risk,
        categories: this.selectedCategoryIds,
        favourites: this.favouriteCategoryIds,
        amount: this.proposal.amount,
        preferences: {
          return: this.proposal.preferences.profitability,
          risk: this.proposal.preferences.risk,
          popularity: this.proposal.preferences.popularity,
          fees: this.proposal.preferences.cost
        }
      };
      this.$refs.proposal.load(payload);
    },
    onProposalCreated(e) {
      this.proposing = false;
      this.setProposalId(e.target.data.proposalId);
      this.$router.push({ name: "proposal-result" });
    }
  }
};
</script>

<style lang="scss" scoped>
.proposal-summary {
  padding-left: 42px;
}
.title {
  @include font-highlight-l;
  color: $ocean;
  margin-bottom: 36px;
}
.action-buttons {
  position: absolute;
  width: 100%;
  bottom: 62px;
  left: 0;
  display: flex;
  justify-content: center;
  & > * {
    margin: 0 12px;
  }
}
</style>
