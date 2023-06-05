import Layout from "@/views/Layout.vue";
import List from "@/views/List.vue";
import AddEdit from "@/views/AddEdit.vue";

export default {
  path: "/dishes",
  component: Layout,
  children: [
    { path: "/", component: List },
    { path: "/add", component: AddEdit },
    { path: "/edit/:id", component: AddEdit },
  ],
};
