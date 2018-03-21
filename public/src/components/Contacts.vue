<template>
    <div class="manageContacts">
        <navbar></navbar>
        <h2>Manage Contacts</h2>

    <div class="container">
        <div class="row align-items">
            <div class="col-xs-3">Name</div>
            <div class="col-xs-3">Address</div>
            <div class="col-xs-3">Email</div>
            <div class="col-xs-3">Phone</div>
        </div>
        <div class="row align-items" v-for="contact in contacts">
            <div class="col-xs-3">{{contact.name}}}</div>
            <div class="col-xs-3">{{contact.address}}}</div>
            <div class="col-xs-3">{{contact.email}}}</div>
            <div class="col-xs-3">{{contact.phone}}}</div>
        </div>

    </div>
 
        <div>
            <button type="button" class="btn btn-info btnEdit" @click="editContact(contact)">Edit Contact</button>
            <button type="button" class="btn btn-priority btnAdd" @click="addContact">Add Contact</button>
            <button type="button" class="btn btn-danger btnDelete" @click="deleteContact(contact)">Delete contact</button>
        </div>
    </div>
</template>
<script>
    import Navbar from './Navbar'
    export default {
        name: 'Contacts',
        components: {
            navbar: Navbar
        },
        data() {
            return {}
        },
        mounted() {
            this.$store.dispatch('getContacts');
        },
        computed: {
            contacts() {
                var contacts = this.$store.state.contacts
                return contacts
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
            },
            getContacts() {
                this.$store.dispatch('getContacts')
            }
        }
    }
</script>
<style scoped>

</style>