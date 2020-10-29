<template>
  <div>
    <div v-if="assessing" class="spinner-container">
      <app-spinner class="spinner" />
      <h3 class="spinner-title">realizando diagnóstico de tu cartera</h3>
    </div>
    <cr-component ref="assessment" name="assessment" @loaded="onAssessmentCreated" @change="assessmentChanged" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import AppSpinner from "@/components/AppSpinner";
export default {
  components: {
    AppSpinner
  },
  data: () => ({
    assessing: true
  }),
  computed: {
    ...mapState(["assessment"]),
    ...mapGetters(["assessmentTotalAmount"]),
    fees() {
      const threshold = 500000;
      return {
        portfolio: {
          management: 0.011,
          success: 0.05,
          other: "?"
        },
        proposal: {
          management: this.assessmentTotalAmount < threshold ? 0.0091 : 0.0076,
          success: 0,
          other: 0
        }
      };
    }
  },
  mounted() {
    this.$refs.assessment.load({
      assetsAmounts: this.assessment.portfolio,
      filter: this.assessment.resultFilter,
      fees: this.fees
    });
  },
  methods: {
    ...mapMutations(["setAssessmentId"]),
    onAssessmentCreated(e) {
      this.assessing = false;
      this.setAssessmentId(e.target.data.assessment.assessmentId);
    },
    assessmentChanged(e) {
      const newSymbols = e.detail;
      if (this.$refs.assessment) {
        this.assessing = true;
        this.$refs.assessment.load({
          assetsAmounts: this.assessment.portfolio,
          filter: this.assessment.resultFilter,
          fees: this.fees,
          restrictions: newSymbols
        });
      }
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
