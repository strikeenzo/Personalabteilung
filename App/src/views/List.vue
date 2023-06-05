<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { toast } from "vue3-toastify";

import { useDishesStore } from "@/stores/dishes.store";

const dishStore = useDishesStore();
const { dishes, loading } = storeToRefs(dishStore);

let selectedDishId = ref(null);
let showModal = ref(false);

dishStore.getAll();

const showDeleteModal = (dishId: string) => {
  selectedDishId.value = dishId;
  showModal.value = true;
};

const deleteDish = async () => {
  try {
    await dishStore.delete(selectedDishId.value);
    toast.success("Deleted Successfully!");
  } catch (error) {
    toast.error(error);
  }

  selectedDishId.value = null;
  showModal.value = false;
};
</script>

<template>
  <h1 class="mb-4">Dishes</h1>
  <div class="d-flex justify-content-end">
    <router-link to="/add" class="btn btn-success mb-2">Add Dish</router-link>
  </div>
  <table class="table table-striped">
    <thead>
      <tr>
        <th style="width: 5%">No</th>
        <th style="width: 15%">Name</th>
        <th style="width: 20%">Description</th>
        <th style="width: 10%">Price, $</th>
        <th style="width: 15%">Category</th>
        <th style="width: 15%">Time</th>
        <th style="width: 10%">Sold</th>
        <th style="width: 20%">Wait Time(hr)</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="dishes.length">
        <tr v-for="(dish, index) in dishes" :key="dish._id">
          <td>{{ index + 1 }}</td>
          <td>{{ dish.name }}</td>
          <td>{{ dish.description }}</td>
          <td>{{ dish.price }}</td>
          <td>{{ dish.category }}</td>
          <td>{{ dish.time }}</td>
          <td>{{ dish.isSold ? "Sold" : "For Sale" }}</td>
          <td>{{ dish.waitTime }}</td>
          <td style="white-space: nowrap">
            <router-link
              :to="`/edit/${dish._id}`"
              class="btn btn-sm btn-primary mr-1 px-3"
            >
              Edit
            </router-link>
            <button
              @click="showDeleteModal(dish._id)"
              class="btn btn-sm btn-danger btn-delete-user"
              data-toggle="modal"
              :data-target="'#deleteModal-' + dish._id"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="8" class="text-center">No data</td>
        </tr>
      </template>
      <tr v-if="loading">
        <td colspan="7" class="text-center">
          <span class="spinner-border spinner-border-lg algin-center"></span>
        </td>
      </tr>
    </tbody>
  </table>

  <div
    class="modal fade"
    role="dialog"
    :class="{ show: showModal }"
    :style="{ display: showModal ? 'block' : 'none' }"
    :aria-modal="showModal"
    id="deleteModal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Deletion</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="showModal = false"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">Are you sure you want to delete this item?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="showModal = false"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-danger" @click="deleteDish">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
