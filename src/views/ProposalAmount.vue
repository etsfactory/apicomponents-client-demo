<template>
  <app-module>
    <template #header>
      <app-header title="Indícanos tu inversión" />
    </template>
    <app-input
      ref="amountInput"
      class="amount"
      :value="proposal.amount"
      type="currency"
      label="Cantidad a invertir"
      @input="onAmountChanged"
    />
    <div class="slider-wrapper">
      <h5 class="slider-title">Tiempo de inversión</h5>
      <cr-component ref="slider" name="slider" class="slider" @change="setProposalTimeHorizon($event.detail.value)" />
    </div>
    <app-info v-if="error" text="El valor tiene que ser un número válido" />
  </app-module>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppModule from "@/components/AppModule";
import AppHeader from "@/components/AppHeader";
import AppInput from "@/components/AppInput";
import AppInfo from "@/components/AppInfo";
export default {
  components: {
    AppModule,
    AppHeader,
    AppInput,
    AppInfo
  },
  data: () => ({
    error: false
  }),
  computed: {
    ...mapState(["proposal"])
  },
  methods: {
    ...mapMutations(["setProposalAmount", "setProposalTimeHorizon"]),
    onAmountChanged(e) {
      this.error = false;
      const value = Number(e);
      if (!isNaN(value)) this.setProposalAmount(value);
      else this.error = true;
    }
  },
  mounted() {
    this.$refs.amountInput.focus();
    this.$refs.slider.load({
      steps: [
        { value: 3, text: "3 años" },
        { value: 5, text: "5 años" },
        { value: 10, text: "10 años" },
        { value: 15, text: "+15 años" }
      ],
      selectedValue: this.proposal.timeHorizon,
      showLabels: true
    });
  }
};
</script>

<style lang="scss" scoped>
.slider-wrapper,
.amount {
  max-width: 600px;
  margin: 60px 0 55px;
}
.slider {
  max-width: 600px;
}
.slider-title {
  @include font-highlight-s;
  margin: 0 0 13px;
}
</style>
