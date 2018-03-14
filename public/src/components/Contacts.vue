<template>
<div class="manageContacts">
  <transition name="modal-fade" id="contacts">
    <div class="modal-backup">
      <div class="modal rounded" role="dialog">
<header class="modal-header">
  <h3 class="text center w-100 mt-2 font-weight-bold">Manage Contacts</h3>
</header>
      </div>
      <div class="modal-body container px5">
        <div name="section-body">
          <h5>Contact list goes here</h5>
        </div>
      </div>
      <footer class="modal-footer">
            <button type="button" class="btn btn-info btnEdit" @click="editContact(contact)">Edit Contact</button>
            <button type="button" class="btn btn-priority btnAdd" @click="addContact">Add Contact</button>
            <button type="button" class="btn btn-danger btnDelete" @click="deleteContact(contact)">Delete contact</button>
      </footer>
    </div>
  </transition>
</div>
</template>
<script>
    export default {
        name: 'Contacts',
        data() {
            return {

            }
        },
        methods: {
            editContact(contact) {
                this.$store.dispatch('editContact', contact)
            },
            addContact() {
                this.$store.dispatch('addContact')
            },
            deleteContact(contact) {
                this.$store.dispatch('deleteContact', contact)
            }
        }
    }
</script>
<style scoped>

</style>