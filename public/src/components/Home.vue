<template>
  <div class="home">
  

    <div class="container-fluid">
      <div>
        <div class="row d-flex justify-content-end">
            <button type="button" class="btn signUpBtn m-2" data-toggle="modal" data-target="#signUp">
                <b>Sign Up</b>
            </button>
            <button type="button" class="btn loginBtn m-2" data-toggle="modal" data-target="#login">
                <b>Login</b>
            </button>
        </div>
          <h1>Welcome to "Meet Me @..."</h1>
          <div class="row spacer"></div>
          <img src="../assets/meet-me-logo.png" height="200">
          <!-- <p>
              <strong>Please sign up or login to continue.</strong>
          </p>
          <button type="button" class="btn signUpBtn m-2" data-toggle="modal" data-target="#signUp">
              <b>Sign Up</b>
          </button>
          <button type="button" class="btn loginBtn m-2" data-toggle="modal" data-target="#login">
              <b>Login</b>
          </button> -->
      </div>
      <div class="row spacer"></div>
      <div class="row d-flex justify-content-center ">
        <div class="colfmt align-items-center justify-content-center col-lg-4 m-4">
          <h2>Meet a Friend</h2>
        </div>
        <div class="colfmt align-items-center justify-content-center m-4 col-lg-4"><h2>Plan a Trip</h2></div>
      </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home {
        background-image: url("../assets/bg-meet-me.jpg");
        background-position: center;
        background-size: cover;
        height: 100vh;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
    }
    
    .colfmt {
        border: 2px solid white;
        min-height: 20vh;
        background-color: steelblue;
    }
    
    h1 {
        font-size: 48pt;
    }
    
    .spacer {
        min-height: 100px;
    }
</style>