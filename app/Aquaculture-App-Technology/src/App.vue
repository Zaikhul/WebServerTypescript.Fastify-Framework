<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import Navbar from './components/Navbar.vue'
import Posters from './components/Contents.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
</script>

<template>
  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">
      <a href="index.html" class="logo me-auto"
        ><img src="./assets/logo-aquaculture-pens.png" alt="" class="img-fluid" />PENS Aquaculuture
        Technology</a
      >
      <Navbar />

      <!-- <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav> -->
    </div>
    <Posters />
  </header>
  <!-- End Header -->
  <RouterView />
</template>

<style scoped></style>
