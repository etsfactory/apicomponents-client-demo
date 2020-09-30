import Vue from "vue";
import VueRouter from "vue-router";
import Page404 from "../views/Page404.vue";
import Home from "../views/Home.vue";
import Assessment from "../views/Assessment.vue";
import AssessmentResult from "../views/AssessmentResult.vue";

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
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
