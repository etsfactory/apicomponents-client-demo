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
      },
      resultFilter: {
        symbolType: "FundClass",
        alive: true,
        countryRegistration: "ES",
        currency: ["EUR"],
        paysDividends: false
      }
    },
    proposal: {
      proposalId: null,
      universe: [],
      amount: 0,
      timeHorizon: 3,
      risk: 1,
      categoryGroups: [
        {
          name: "Renta Fija",
          categories: [
            {
              name: "Gobierno",
              ids: [145, 155, 162],
              tooltip: {
                description:
                  "Deuda pública o deuda soberana. Es una forma de obtener recursos financieros por parte del Estado o de cualquier ente público, mediante la emisión de bonos.",
                data: { return: 0.0324, volatility: 0.0282, mdd: -0.0645 }
              },
              selected: true,
              locked: true
            },
            {
              name: "Corporativo",
              ids: [122, 134, 139],
              tooltip: {
                description:
                  "Deuda que las empresas piden prestada y se consigue a través de bancos, bolsa de valores o inversores de banca privada entre otras.",
                data: { return: 0.0364, volatility: 0.0256, mdd: -0.0853 }
              }
            },
            {
              name: "Alto Rendimiento",
              ids: [186, 204, 206],
              tooltip: {
                description:
                  "Deuda emitida de forma públlica o privada con una calificación baja, por lo que tiene mayor riesgo de incumplimiento y por tanto tienen un rendimiento mayor que lo hace atractivo a los inversores.",
                data: { return: 0.0647, volatility: 0.0441, mdd: -0.2116 }
              }
            },
            {
              name: "Inflación",
              ids: [234],
              tooltip: {
                description:
                  "Bonos diseñados para proteger al inversor frente a la inflación. El rendimiento por tanto, varía según la evolución de precios.",
                data: { return: 0.0562, volatility: 0.0839, mdd: -0.1377 }
              }
            }
          ]
        },
        {
          name: "Renta Variable",
          categories: [
            {
              name: "Europa",
              ids: [8, 9, 10, 11, 63, 66, 67],
              tooltip: {
                description: "Invierte en empresas cotizadas en el mercado europeo.",
                data: { return: 0.0583, volatility: 0.1727, mdd: -0.3536 }
              }
            },
            {
              name: "Estados Unidos",
              ids: [69, 82, 86],
              tooltip: {
                description: "Invierte en empresas cotizadas en el mercado estadounidense.",
                data: { return: 0.1208, volatility: 0.1739, mdd: -0.3379 }
              }
            },
            {
              name: "Asia",
              ids: [5, 6, 7, 64],
              tooltip: {
                description: "Invierte en empresas cotizadas en el mercado asiático.",
                data: { return: 0.0307, volatility: 0.1412, mdd: -0.3032 }
              }
            },
            {
              name: "Tecnología",
              ids: [55],
              tooltip: {
                description:
                  "Invierte en empresas cuyo sector es el tecnológico. Amazon, Facebook,Microsoft, Apple son algunos ejemplos de este tipo de empresas.",
                data: { return: 0.1552, volatility: 0.1886, mdd: -0.3117 }
              }
            },
            {
              name: "Emergentes",
              ids: [14, 65],
              tooltip: {
                description:
                  "Invierte en empresas que cotizan en mercados emergentes, estas son las economías de países en pleno desarrollo. India, China, Rusia sería algún ejemplo de dichos países.",
                data: { return: 0.0459, volatility: 0.13, mdd: -0.2932 }
              }
            },
            {
              name: "Salud",
              ids: [53],
              tooltip: {
                description:
                  "Invierte en empresas cuyo sector es sanitario. Las empresas farmacéuticas o de biotecnología serían un ejemplo de este sector.",
                data: { return: 0.1047, volatility: 0.1382, mdd: -0.2626 }
              }
            },
            {
              name: "LATAM",
              ids: [15],
              tooltip: {
                description: "Invierte en empresas líderes en Latinoamérica.",
                data: { return: -0.0511, volatility: 0.2284, mdd: -0.65 }
              }
            }
          ]
        },
        {
          name: "Alternativos",
          categories: [
            {
              name: "Inmuebles",
              ids: [58],
              tooltip: {
                description: "Invierte en acciones de empresas dedicadas al sector inmobiliario.",
                data: { return: 0.065, volatility: 0.1416, mdd: -0.3773 }
              }
            }
          ]
        }
      ],
      preferences: {
        profitability: 0,
        risk: 0,
        popularity: 0,
        cost: 0
      },
      powerBars: {
        profitability: 0,
        cost: 0,
        risk: 0,
        diversificacion: 0
      },
      categoriesChanged: false
    }
  },
  getters: {
    assessmentTotalAmount: state => {
      return state.assessment.portfolio.map(x => x.amount).reduce((a, b) => a + b, 0);
    },
    categories: state => {
      return state.proposal.categoryGroups.reduce((a, b) => {
        a = a.concat(b.categories);
        return a;
      }, []);
    },
    selectedCategoryIds: state => {
      let selectedCategoryIds = [];
      state.proposal.categoryGroups.forEach(g => {
        g.categories.forEach(c => {
          if (c.selected) selectedCategoryIds = selectedCategoryIds.concat(c.ids);
        });
      });
      return selectedCategoryIds;
    },
    favouriteCategoryIds: state => {
      let favouriteCategoryIds = [];
      state.proposal.categoryGroups.forEach(g => {
        g.categories.forEach(c => {
          if (c.favourite) favouriteCategoryIds = favouriteCategoryIds.concat(c.ids);
        });
      });
      return favouriteCategoryIds;
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
    },
    setSelectedCategories(state, categoriesSelected) {
      const categoryGroups = state.proposal.categoryGroups;
      for (let i = 0; i < categoryGroups.length; i++) {
        for (let j = 0; j < categoryGroups[i].categories.length; j++) {
          if (categoriesSelected.includes(categoryGroups[i].categories[j].name))
            state.proposal.categoryGroups[i].categories[j].selected = true;
          else state.proposal.categoryGroups[i].categories[j].selected = false;
        }
      }
    },
    setProposalUniverse(state, universe) {
      state.proposal.universe = universe;
    },
    setProposalAmount(state, amount) {
      state.proposal.amount = amount;
    },
    setProposalTimeHorizon(state, timeHorizon) {
      state.proposal.timeHorizon = timeHorizon;
    },
    setProposalRisk(state, risk) {
      state.proposal.risk = risk;
    },
    setCategoryGroups(state, categoryGroups) {
      state.proposal.categoriesChanged = true;
      state.proposal.categoryGroups = categoryGroups;
    },
    setPreferences(state, preferences) {
      state.proposal.preferences = preferences;
    },
    setProposalId(state, proposalId) {
      state.proposal.proposalId = proposalId;
    },
    setProposalPowerbars(state, values) {
      state.proposal.powerBars = values;
    }
  }
});
