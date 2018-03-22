<template>
  <div class="contact">
    <h6>{{contact.name}}</h6>
    <h6>{{contact.address}}</h6>
    <h6>{{contact.email}}</h6>
    <div v-if="show == true">
      <form @submit.prevent="editContact()">
        <div class="form-group">
          <input v-model="updateContact.name" type="text" class="form-control" :placeholder="contact.name">
          <input v-model="updateContact.address" type="text" class="form-control" :placeholder="contact.address">
          <input v-model="updateContact.email" type="email" class="form-control" :placeholder="contact.email">
          <button type="submit" class="btn btn-success">change that shit</button>
        </div>
      </form>
    </div>
    <div>
      <i class="fas fa-pencil-alt" @click="show=true"></i>
      <i class="fas fa-trash-alt" @click="deleteContact(contact)"></i>
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
      }
    }

  }

</script>

<style>


</style>
