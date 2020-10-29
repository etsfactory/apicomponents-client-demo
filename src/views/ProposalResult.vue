<template>
  <div>
    <div v-if="proposing" class="spinner-container">
      <app-spinner class="spinner" />
      <h3 class="spinner-title">calculando tu inversión</h3>
    </div>
    <cr-component ref="proposal" name="proposal" @change="onProposalChanged" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import AppSpinner from "@/components/AppSpinner";
export default {
  components: {
    AppSpinner
  },
  data: () => ({
    proposing: true
  }),
  computed: {
    ...mapState(["proposal"]),
    ...mapGetters(["selectedCategoryIds", "favouriteCategoryIds"]),
    fees() {
      const amountInvested = this.proposal.amount;
      const risk = this.proposal.risk;
      const threshold = 500000;
      const underThreshold = [0.008, 0.008, 0.009, 0.009, 0.009, 0.0105, 0.0105];
      const overThreshold = [0.0065, 0.0065, 0.0075, 0.0075, 0.0075, 0.009, 0.009];
      return {
        success: 0,
        other: 0,
        management: amountInvested < threshold ? underThreshold[risk - 1] : overThreshold[risk - 1]
      };
    }
  },
  mounted() {
    this.loadComponents();
  },
  methods: {
    ...mapMutations(["setProposalId"]),
    loadComponents() {
      const configuration = {
        configurationType: "mt16_rm",
        universeType: "rm_european_fund",
        timeHorizon: this.proposal.timeHorizon,
        riskLevel: this.proposal.risk,
        categories: this.selectedCategoryIds,
        preferences: {
          return: this.proposal.preferences.profitability,
          risk: this.proposal.preferences.risk,
          popularity: this.proposal.preferences.popularity,
          fees: this.proposal.preferences.cost
        },
        operativeType: "weights"
      };
      if (this.favouriteCategoryIds.length > 0) {
        configuration.favourites = this.favouriteCategoryIds;
      }
      const assetsAmounts = [{ symbolId: 146057, amount: this.proposal.amount }];
      const powerBars = {
        profitability: this.proposal.powerBars.profitability / 80,
        cost: this.proposal.powerBars.cost / 80,
        risk: this.proposal.powerBars.risk / 80,
        diversification: this.proposal.powerBars.diversification / 80
      };
      this.$refs.proposal.load({
        configuration,
        assetsAmounts,
        fees: this.fees,
        powerBars
      });
    },
    onProposalChanged(e) {
      this.proposing = false;
      this.setProposalId(e.target.data.proposalId);
    }
  }
};
</script>

<style lang="scss" scoped>
.spinner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.spinner {
  max-width: 150px;
}
.spinner-title {
  @include font-highlight-l;
  margin-top: 40px;
}
</style>
