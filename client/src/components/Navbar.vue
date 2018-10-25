<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Vuedio</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- use .active on .nav-item if you want to highlight current link -->
          <li class="nav-item">
            <button class="btn btn-info">
              Trending
            </button>
          </li>
          <li class="nav-item">
            <button class="btn btn-info">
              Liked Videos <span class="badge badge-info">13</span>
            </button>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <div v-if= "token === '' || token === null" class="nav-item">
            <label for="exampleInputEmail1">Email</label>
            <input v-model="loginemail" type="email" placeholder="Enter email">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="loginpassword" type="password" placeholder="Password">
            <button class="btn btn-success" v-on:click="loginUser()">Login</button>
          </div>
          <div v-if= "token !== '' && token !== null" class="nav-item">
            <button class="btn btn-danger" v-on:click="logoutUser()">Logout</button>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      loginemail: '',
      loginpassword: ''
    }
  },
  methods: {
    loginUser () {
      let loginobj = {
        email: this.loginemail,
        password: this.loginpassword
      }
      this.$store.dispatch('loginobj', loginobj)
      this.loginemail = ''
      this.loginpassword = ''
    },
    logoutUser () {
      this.$store.dispatch('logoutobj')
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    error () {
      return this.$store.state.error
    }
  }
}
</script>

<style>

</style>
