<template>
  <div class="contact">
    <div class="flexor">
      <div>
        <h4>{{contact.name}}</h4>
        <h6>{{contact.address}}</h6>
        <h6>{{contact.email}}</h6>
      </div>
      <div>
        <i class="fas grey-icon pointer fa-pencil-alt" @click="toggleEdit()"></i>
        <i class="fas grey-icon pointer fa-trash-alt" @click="deleteContact(contact)"></i>
      </div>
    </div>
    <div v-if="show == true">
      <form class="flexor" @submit.prevent="editContact()">
        <div class="form-group pad-r">
          <input v-model="updateContact.name" type="text" class="form-control" :placeholder="contact.name">
        </div>
        <div class="form-group pad-r long">
          <input v-model="updateContact.address" type="text" class="form-control" :placeholder="contact.address">
        </div>
        <div class="form-group pad-r">
          <input v-model="updateContact.email" type="email" class="form-control" :placeholder="contact.email">
        </div>
        <div class="form-group">
          <button type="submit" class="btn teal">edit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Contact',
    data() {
      return {
        updateContact: {
          _id: this.contact._id
        },
        show: false
      }
    },
    props: ['contact'],
    methods: {
      editContact() {
        this.$store.dispatch('editContact', this.updateContact)
        this.show = false
      },
      deleteContact(contact) {
        this.$store.dispatch('deleteContact', contact)
      },
      toggleEdit() {
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
    font-size: .75rem;
  }

  .grey-icon:hover {
    color: #333;
  }

</style>
