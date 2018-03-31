<template>
  <div class="home">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="full">
            <div>
              <img src="../assets/meet-me-logo.png" height="300">
            </div>
            <div>
              <h3>Don't know where to meet?</h3>
              <h3 class="pad-bot">Let us worry about that.</h3>
              <router-link to="/meet-friend">
                <button class="btn btn-block btn-outline-light">Meet a Friend</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row d-flex justify-content-center ">
        <div class="colfmt d-flex align-items-center justify-content-center m-4 col-lg-4">
            <h2>Plan a Trip</h2>
        </div>
    </div> -->
  </div>
</template>

<script>
  import Contacts from './Contacts'
  import Navbar from './Navbar'

  export default {
    name: 'Home',
    data() {
      return {
        user: {},
        createdUser: {}
      }
    },
    components: {
      // login: Login,
      contacts: Contacts,
      navbar: Navbar
    },
    methods: {
      // login() {
      //     this.$store.dispatch('login', this.user)
      //     $('#login').modal('hide')
      // },
      // createUser(createdUser) {
      //     this.$store.dispatch('createUser', this.createdUser)
      //     $('#signup').modal('hide')
      // },
      meetFriend() {
        this.$store.dispatch('meetFriend', this.user)
        $('#meetFriend').modal('hide')
      },
      manageContacts() {
        this.$store.dispatch('getContacts', this.user)
        $('#contacts').modal('hide')
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .full {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 10%;
  }

  .aligner {
    align-items: center;
  }

  .pad-bot {
    padding-bottom: 1rem;
  }

  .home {
    background-image: url("../assets/bg-meet-me.jpg");
    background-position: center top;
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
    background-color: #4682b4;
  }

  h1 {
    font-size: 36pt;
    font-family: 'Lalezar', sans-serif;
  }

  h2 {
    color: white;
  }

  .spacer {
    min-height: 75px;
  }

  .flexor {
    display: flex;
    justify-content: space-between;
  }

  router-link {
    color: white;
  }

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    .full {
      flex-direction: column;
      justify-content: space-around;
      padding: 10.5rem 0;
    }
  }

</style>
