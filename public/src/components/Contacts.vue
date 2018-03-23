<template>
  <!-- Need to get Save (edit Contact), Cancel, and Add Contacts working -->
  <div class="manageContacts">
    <navbar></navbar>
    <div class="container">
      <div class="flexor mar-bt">
        <h2>Manage Contacts</h2>
        <div @click="toggleShow()" class="grey-icon pointer">
          <span>Add </span>
          <i class="fa fa-plus"></i>
        </div>
      </div>

      <div v-if="show == true">
        <form class="flexor" @submit.prevent="createContact()">
          <div class="form-group pad-r">
            <input v-model="newContact.name" type="text" class="form-control" placeholder="Name!">
          </div>
          <div class="form-group long pad-r">
            <input v-model="newContact.address" type="text" class="form-control" placeholder="Address!">
          </div>
          <div class="form-group pad-r">
            <input v-model="newContact.email" type="email" class="form-control" placeholder="Email!">
          </div>
          <div class="form-group">
            <button type="submit" class="btn teal">Add</button>
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
        this.show = false;
      },
      toggleShow() {
        if (this.show == false) {
          this.show = true
        } else {
          this.show = false
        }
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

  .mar-bt{
      margin-bottom: 1rem;
  }
  .teal {
    background-color: #94bac4;
    color: white;
    font-size: 1rem;
    transition: all .3s linear;
  }

  .teal:hover {
    background-color: #96cad8;
  }

  .pad-r {
    padding-right: .5rem;
  }

  .long {
    flex-grow: 2;
  }

  .flexor {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pointer {
    cursor: pointer;
  }

  .grey-icon {
    color: #bbbbbb;
    transition: all .2s linear;
    font-size: 1rem;
  }

  .grey-icon:hover {
    color: #333;
  }

</style>
