import { createRouter, createWebHistory } from "vue-router";

import dishesRoutes from "./dishes.routes";
import NotFound from "@/views/NotFound.vue";

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [
    { ...dishesRoutes },
    { path: "/not-found", component: NotFound },
    { path: "/:pathMatch(.*)*", redirect: "/not-found" },
  ],
});
