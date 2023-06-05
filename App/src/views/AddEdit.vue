<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

import { useDishesStore } from "@/stores/dishes.store";

const dishesStore = useDishesStore();
const route = useRoute();
const id = route.params.id as string;

let title = "Add Dish";
let dish = null;
const { loading } = storeToRefs(dishesStore);

if (id) {
  title = "Edit User";

  ({ dish } = storeToRefs(dishesStore));
  dishesStore.getById(id);
}

const schema = Yup.object().shape({
  name: Yup.string().required("Dish Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),
  time: Yup.string().required("Time is required"),
  waitTime: Yup.number().required("Wait time is required"),
  isSold: Yup.boolean(),
});

const onSubmit = async (values) => {
  try {
    if (dish) {
      await dishesStore.update({ ...values, _id: id });
      toast.success("Updated Successfully!");
    } else {
      await dishesStore.create(values);
      toast.success("Added Successfully!");
    }
  } catch (error) {
    toast.error(error);
  }
};
</script>

<template>
  <h1 class="mb-4">{{ title }}</h1>
  <template v-if="!loading">
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="dish"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-row">
        <div class="form-group col">
          <label for="name">Name</label>
          <Field
            name="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
          />
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="description">Description</label>
          <Field
            name="description"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.description }"
          />
          <div class="invalid-feedback">{{ errors.description }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="price">Price, $</label>
          <Field
            name="price"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': errors.price }"
          />
          <div class="invalid-feedback">{{ errors.price }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="category">Category</label>
          <Field
            name="category"
            as="select"
            class="form-control"
            :class="{ 'is-invalid': errors.category }"
          >
            <option value="starter">starter</option>
            <option value="main">main</option>
            <option value="course">course</option>
            <option value="desert">dessert</option>
            <option value="beverage">beverage</option>
          </Field>
          <div class="invalid-feedback">{{ errors.category }}</div>
        </div>
        <div class="form-group col">
          <label for="time">Time</label>
          <Field
            name="time"
            as="select"
            class="form-control"
            :class="{ 'is-invalid': errors.time }"
          >
            <option value="breakfast">breakfast</option>
            <option value="dinner">dinner</option>
            <option value="lunch">lunch</option>
            <option value="weekdays">weekdays</option>
          </Field>
          <div class="invalid-feedback">{{ errors.time }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <label for="waitTime">Wait Time, hour</label>
          <Field
            name="waitTime"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': errors.waitTime }"
          />
          <div class="invalid-feedback">{{ errors.waitTime }}</div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <Field name="isSold" type="checkbox" class="mr-2" value="true" />
          <label for="isSold">Sold</label>
        </div>
      </div>
      <div class="form-group text-center">
        <button class="btn btn-primary px-4 mr-2" :disabled="isSubmitting">
          <span
            v-show="isSubmitting"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Save
        </button>
        <router-link to="/" class="btn btn-secondary px-3">
          Cancel
        </router-link>
      </div>
    </Form>
  </template>
  <template v-if="loading">
    <div class="text-center m-5">
      <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
  </template>
</template>
