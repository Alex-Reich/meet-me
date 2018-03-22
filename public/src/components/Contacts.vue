<template>
  <!-- Need to get Save (edit Contact), Cancel, and Add Contacts working -->
  <div class="manageContacts">
    <navbar></navbar>
    <div class="container">
      <h2>Manage Contacts
        <i class="fa fa-plus" @click="show = true"></i>
      </h2>
      <div v-if="show == true">
        <form @submit.prevent="createContact()">
          <div class="form-group">
            <input v-model="newContact.name" type="text" class="form-control" placeholder="Name!">
            <input v-model="newContact.address" type="text" class="form-control" placeholder="Address!">
            <input v-model="newContact.email" type="email" class="form-control" placeholder="Email!">
            <button type="submit" class="btn btn-success">create that shit</button>
          </div>
        </form>
      </div>
      <div class="list-group">
        <div class="list-group-item" v-for="contact in contacts">
          <contact :contact="contact"></contact>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import Contact from './Contact.vue'
  import Navbar from './Navbar'
  export default {
    name: 'Contacts',
    components: {
      Navbar,
      Contact
    },
    data() {
      return {
        show: false,
        newContact: {}
      }
    },
    mounted() {
      this.$store.dispatch('getContacts');
    },
    computed: {
      contacts() {
        return this.$store.state.contacts
      }
    },
    methods: {
      createContact() {
        this.$store.dispatch('createContact', this.newContact)
      }
    }
  }

</script>
<style scoped>
  .grid-header {
    font-weight: bold;
    border-bottom: solid 2px black;
  }

  .grid-content {
    font-size: 10pt;
  }

  .draw-border {
    border-bottom: solid 2px black;
  }

  .updated-contact.form-control {
    width: 90%
  }

</style>
