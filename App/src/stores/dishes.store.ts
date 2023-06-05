import { defineStore } from "pinia";
import apiService from "@/helpers/apiWrapper";

import type { Dish } from "@/types";

type State = {
  dishes: Dish[];
  dish: Dish | null;
  loading: Boolean;
};

export const useDishesStore = defineStore("dishes", {
  state: (): State => ({
    dishes: [],
    dish: null,
    loading: false,
  }),
  actions: {
    async getAll() {
      this.loading = true;
      const res = await apiService.get("/dishes/");
      this.dishes = res.data.data;
      this.loading = false;
    },
    async getById(id: string) {
      this.loading = true;
      const res = await apiService.get(`/dishes/${id}`);
      this.dish = res.data.data;
      this.loading = false;
    },
    async create(item) {
      await apiService.put("/dishes/", item);
    },
    async update(item: Object) {
      await apiService.put("/dishes/", item);
    },
    async delete(id: string) {
      const originalDishes = [...this.dishes];
      try {
        const matchingIndex = this.dishes.findIndex(
          (dish: Dish) => dish._id === id
        );
        this.dishes.splice(matchingIndex, 1);
        await apiService.delete(`/dishes/${id}`);
      } catch {
        this.dishes = originalDishes;
      }
    },
    async clear() {
      const originalDishes = [...this.dishes];
      try {
        this.dishes = [];
        await apiService.get("/dishes/clear");
      } catch {
        this.dishes = originalDishes;
      }
    },
  },
});
