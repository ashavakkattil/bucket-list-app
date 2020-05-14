<template>
  <div>
    <main-header :pageTitle="title" :tabColour="tabColour" />
    <q-page class="page-image">
      <div class="row">
        <div class="col text-center">
          <q-card
            flat
            :bordered="$q.screen.gt.xs ? true: false"
            class="bg-transparent login-card q-ma-auto q-pa-lg"
          >
            <q-icon name="mdi-account-circle" size="xl" color="primary"></q-icon>
            <q-card-section>
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input outlined dense placeholder="Email ID">
                  <template v-slot:prepend>
                    <q-icon name="mdi-account" />
                  </template>
                </q-input>
                <q-input outlined dense placeholder="Password">
                  <template v-slot:prepend>
                    <q-icon name="mdi-lock" />
                  </template>
                </q-input>
                <q-btn label="Login" type="submit" color="primary" outline class="login-btn q-mb-xl" />
                <div class="row">
                  <div class="col login-separator">
                    <q-separator />
                  </div>
                  <div class="col-2 text-h7 text-weight-bold text-grey-6">OR</div>
                  <div class="col login-separator">
                    <q-separator/>
                  </div>
                </div>

                <div>
                  <span>Don't have an account?</span>
                  <span class="text-primary text-weight-bold text-body1 q-ml-sm">SignUp</span>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>
<script>
import MainHeader from "../components/MainHeader";
export default {
  components: { MainHeader },
  data() {
    return {
      title: "Login Page",
      tabColour: "primary"
    };
  }
};
</script>
<style lang="scss">
.page-image {
  // background-image: url("../assets/pastel-bg.svg");
}
.login-card {
  width: 350px;
  display: inline-block;
  position: relative;
  top: 50%;
}
.login-btn {
  width: 95%;
}
.login-separator {
  align-self: center;
}
</style>
