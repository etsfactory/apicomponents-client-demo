import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    assessment: {
      assessmentId: null,
      universe: [],
      portfolio: [],
      filter: {
        symbolType: "FundClass",
        alive: true,
        countryRegistration: "ES"
      }
    }
  },
  getters: {
    assessmentTotalAmount: state => {
      return state.assessment.portfolio.map(x => x.amount).reduce((a, b) => a + b, 0);
    }
  },
  mutations: {
    setAssessmentId(state, assessmentId) {
      state.assessment.assessmentId = assessmentId;
    },
    setAssessmentUniverse(state, universe) {
      state.assessment.universe = universe;
    },
    setAssessmentPortfolio(state, portfolio) {
      state.assessment.portfolio = portfolio;
    }
  }
});
