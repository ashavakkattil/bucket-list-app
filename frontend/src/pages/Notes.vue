<template>
  <q-page>
    <main-header :pageTitle="title" :tabColour="tabColour" />
    <div>Notes page</div>
  </q-page>
</template>
<script>
import MainHeader from "../components/MainHeader";
export default {
  components: { MainHeader },
  data() {
    return {
      title: "Notes",
      tabColour: 'accent'
    };
  }
};
</script>
