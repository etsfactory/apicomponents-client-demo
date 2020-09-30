<template>
  <section class="assessment">
    <section class="universe">
      <cr-component ref="universe" name="universe" />
    </section>
    <section class="configuration">
      <app-header title="Introduce tu cartera de Fondos" />
      <div class="form">
        <div class="inputs">
          <div class="separator" />
          <div class="search-wrapper">
            <app-input ref="searchInput" v-model="search" label="Nombre o ISIN del fondo" />
            <div class="search-results">
              <cr-component v-if="selected.name !== search" ref="search" name="search" @change="onSymbolSelected" />
            </div>
          </div>
          <app-input ref="amountInput" class="input-amount" type="currency" v-model="amount" label="Cantidad invertida" />
        </div>
        <app-button class="button-add" text="Añadir fondo" size="small" :disabled="!addFundValidator" @click="addSymbol" />
      </div>
      <cr-component v-if="portfolio.length" class="portfolio" ref="portfolioTable" name="portfolio-table" @change="updatePortfolio" />
      <app-square v-else class="no-symbols-selected">
        <app-icon icon="warning" class="warning-icon" />
        <span class="warning-message">Aún no tienes ningún fondo seleccionado.</span>
      </app-square>
      <div v-if="portfolio.length" class="buttons">
        <app-button text="Borrar cartera" @click="clearPortfolio" />
        <app-button text="Realizar diagnóstico" to="/assessment/result" />
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import debounce from "lodash.debounce";
import AppHeader from "@/components/AppHeader";
import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";
import AppSquare from "@/components/AppSquare";
export default {
  components: {
    AppHeader,
    AppInput,
    AppButton,
    AppSquare
  },
  data: () => ({
    search: "",
    amount: 0,
    selected: {}
  }),
  computed: {
    ...mapState(["assessment"]),
    portfolio() {
      return this.assessment.portfolio;
    },
    addFundValidator() {
      return Object.keys(this.selected).length > 0 && this.amount > 0;
    }
  },
  watch: {
    search() {
      if (this.selected.name !== this.search) {
        this.debounceSearch(this.search);
      }
    }
  },
  methods: {
    ...mapMutations(["setAssessmentId", "setAssessmentPortfolio"]),
    loadResults(query) {
      this.$refs.search.load({ filter: this.assessment.filter, query });
    },
    onSymbolSelected(e) {
      this.selected = e.detail;
      this.search = e.detail.name;
      this.$refs.amountInput.focus();
    },
    loadSymbolsPortfolio() {
      this.$refs.portfolioTable.load({ assetsAmounts: this.portfolio, editable: true });
    },
    addSymbol() {
      const symbol = this.portfolio.find(x => x.symbolId === this.selected.symbolId);
      if (symbol) {
        const newPortfolio = this.portfolio.map(x => {
          if (x.symbolId === symbol.symbolId) {
            symbol.amount = this.amount;
            return symbol;
          }
        });
        this.setAssessmentPortfolio(newPortfolio);
      } else {
        const newSymbol = { symbolId: this.selected.symbolId, amount: this.amount };
        const newPortfolio = this.portfolio;
        newPortfolio.push(newSymbol);
        this.setAssessmentPortfolio(newPortfolio);
      }
      this.$nextTick(function() {
        this.loadSymbolsPortfolio();
      });
      this.search = "";
      this.amount = 0;
      this.$refs.searchInput.focus();
    },
    updatePortfolio(e) {
      this.setAssessmentPortfolio(e.detail.assetsAmounts);
    },
    clearPortfolio() {
      this.setAssessmentPortfolio([]);
      this.$refs.searchInput.focus();
    }
  },
  created() {
    this.debounceSearch = debounce(this.loadResults, 300);
  },
  mounted() {
    this.$refs.universe.load({
      filter: this.assessment.filter,
      position: { horizontal: 50 }
    });
    this.$refs.searchInput.focus();
    if (this.portfolio.length) this.loadSymbolsPortfolio();
  }
};
</script>

<style lang="scss" scoped>
.universe {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.assessment {
  height: 100%;
}
.configuration {
  position: relative;
  padding-top: $content-padding;
  padding-left: $content-padding;
  width: 45%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.form {
  display: flex;
  flex-direction: column;
}
.inputs {
  position: relative;
  display: flex;
  justify-content: space-around;
  padding: 47px 0;
  border-bottom: 1px solid $white-opacity;
  .separator {
    position: absolute;
    height: 100%;
    width: 1px;
    left: 50%;
    top: 0;
    background-color: $white-opacity;
  }
}
.search-wrapper {
  width: 50%;
  margin: 0 16px;
  max-width: 400px;
  position: relative;
}
.input-amount {
  width: 50%;
  margin: 0 16px;
  max-width: auto !important;
}
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 600px;
  overflow-y: auto;
  z-index: 2;
  margin-top: 8px;
}
.button-add {
  margin-top: 24px;
  align-self: flex-end;
}
.no-symbols-selected {
  min-height: 540px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 38px;
  .warning-message {
    margin-top: 30px;
  }
}
.portfolio {
  margin-top: 40px;
  padding-right: 10px;
  overflow-y: auto;
  flex-grow: 1;
}
.buttons {
  margin: 40px 0;
  display: flex;
  justify-content: flex-end;
  > * {
    margin-left: 10px;
  }
}
</style>
