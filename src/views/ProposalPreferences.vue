<template>
  <app-module>
    <template #header>
      <app-header title="Indica tus preferencias" />
    </template>
    <cr-component ref="selectors" class="selectors" name="preferences" @change="setPreferences($event.detail)" />
  </app-module>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import AppModule from "@/components/AppModule";
import AppHeader from "@/components/AppHeader";
export default {
  components: {
    AppModule,
    AppHeader
  },
  computed: {
    ...mapState(["proposal"]),
    ...mapGetters(["selectedCategoryIds"])
  },
  methods: {
    ...mapMutations(["setPreferences"])
  },
  mounted() {
    this.$refs.selectors.load({ ...this.proposal.preferences, categories: this.selectedCategoryIds });
  }
};
</script>

<style lang="scss" scoped></style>
