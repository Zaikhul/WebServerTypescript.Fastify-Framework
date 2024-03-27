<script setup>
document.getElementById('registrationForm').addEventListener('submit', async function (event) {
  event.preventDefault() // Prevent form submission

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const requestBody = {
    name: name,
    email: email,
    password: password
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (response.ok) {
      alert('Registration successful!')
      // Redirect to login page or perform other actions
    } else {
      const errorData = await response.json()
      alert(`Registration failed. Error: ${errorData.message}`)
    }
  } catch (error) {
    alert('An error occurred during registration.')
    console.error(error)
  }
})
</script>

<template>
  <div class="register-box">
    <!-- <img src="../public/assets/img/avatar.svg" class="logo" /> -->
    <h2>Sign up to Monitoring Tambak Udang</h2>
    <form id="registrationForm">
      <input type="text" id="name" name="name" placeholder="Username" required />
      <input type="text" id="email" name="email" placeholder="Email" required />
      <input type="password" id="password" name="password" placeholder="Password" required />
      <!-- <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          required
        />
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone Number"
          required
        /> -->
      <button type="submit">Register</button>
    </form>

    <p>Dont't have an account? <a href="/login">Sign in</a></p>
  </div>
  <!-- <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> -->
</template>
