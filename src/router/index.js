import Vue from "vue";
import VueRouter from "vue-router";
import Page404 from "../views/Page404.vue";
import Home from "../views/Home.vue";
import Assessment from "../views/Assessment.vue";
import AssessmentResult from "../views/AssessmentResult.vue";
import Proposal from "../views/Proposal.vue";
import ProposalAmount from "../views/ProposalAmount.vue";
import ProposalRisk from "../views/ProposalRisk.vue";
import ProposalCategories from "../views/ProposalCategories.vue";
import ProposalPreferences from "../views/ProposalPreferences.vue";
import ProposalResult from "../views/ProposalResult.vue";
import ProposalSummary from "../views/ProposalSummary.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: Page404
  },
  {
    path: "/",
    component: Home
  },
  {
    path: "/assessment",
    name: "assessment",
    component: Assessment
  },
  {
    path: "/assessment/result",
    name: "assessment-result",
    component: AssessmentResult
  },
  {
    path: "/proposal",
    name: "proposal",
    component: Proposal,
    redirect: {
      name: "proposal-amount"
    },
    children: [
      {
        path: "amount",
        name: "proposal-amount",
        component: ProposalAmount
      },
      {
        path: "risk",
        name: "proposal-risk",
        component: ProposalRisk
      },
      {
        path: "categories",
        name: "proposal-categories",
        component: ProposalCategories
      },
      {
        path: "preferences",
        name: "proposal-preferences",
        component: ProposalPreferences
      }
    ]
  },
  {
    path: "/proposal/summary",
    name: "proposal-summary",
    component: ProposalSummary
  },
  {
    path: "/proposal/result",
    name: "proposal-result",
    component: ProposalResult
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
