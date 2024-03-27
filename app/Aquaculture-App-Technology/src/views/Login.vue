<template>
  <div class="login-box">
    <!-- <img src="../public/assets/img/avatar.svg" class="logo" /> -->
    <h2>Sign in to Monitoring Tambak Udang</h2>
    <button>
      <img src="../public/assets/img/google.png" />
      Sign in with Google
    </button>
    <button>
      <img src="../public/assets/img/apple.png" />
      Sign in with Apple
    </button>
    <hr />
    <span>Or</span>
    <form id="loginForm">
      <input type="email" name="email" id="email" placeholder="Email or username" required />
      <input type="password" name="password" id="password" placeholder="Password" required />
      <button type="submit" id="btn">Sign in</button>
    </form>
    <button>Forgot password?</button>
    <p>Dont't have an account? <a href="/register">Sign up</a></p>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style></style>
