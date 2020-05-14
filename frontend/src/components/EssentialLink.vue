<template>
  <q-item>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" color="accent" />
    </q-item-section>

    <q-item-section>
      <q-item-label><router-link :to="link" style="text-decoration:none">{{ title }}</router-link></q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: "#"
    },

    icon: {
      type: String,
      default: ""
    }
  }
};
</script>
