<template>
  <q-page>
    <main-header :pageTitle="title" :tabColour="tabColour" />
    <div>Welcome to login page</div>
  </q-page>
</template>
<script>
import MainHeader from "../components/MainHeader";
export default {
  components: { MainHeader },
  data() {
    return {
      title: "Login Page",
      tabColour: "secondary"
    };
  }
};
</script>
