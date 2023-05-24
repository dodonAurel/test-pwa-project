<template>
  <header class="header">
    <nav>
      <router-link to="/">Go to Home</router-link>
      |
      <router-link to="/register">Go to register</router-link>
      |
      <router-link to="/login">Go to login</router-link>
    </nav>
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>
