<template>
    <!-- Need to get Save (edit Contact), Cancel, and Add Contacts working -->
    <div class="manageContacts">
        <navbar></navbar>
        <h2><center>Manage Contacts</center></h2>
        <div class="form-group">
            <input v-if="showContactEdit" type=text class="updated-contact form-control" text="Name: " v-model="updatedContact.name">
            <input v-if="showContactEdit" type=text class="updated-contact form-control" text="Address: " v-model="updatedContact.address">
            <input v-if="showContactEdit" type=text class="updated-contact form-control" text="Email: " v-model="updatedContact.email">
            <input v-if="showContactEdit" type=text class="updated-contact form-control" text="Phone: " v-model="updatedContact.phone">
            <button v-if="showContactEdit" class="btn btn-success btn-sm py-0 mb-2" @click="editContact">Save</button>
            <button v-if="showContactEdit" class="btn btn-danger btn-sm py-0 mb-2" @click="showContactEdit = false">Cancel</button>
        </div>
        <div class="container">
            <div class="row align-items grid-header">
                <div class="col-sm-3">Name</div>
                <div class="col-sm-3">Address</div>
                <div class="col-sm-3">Email</div>
                <div class="col-sm-2">Phone</div>
                <div class="col-sm-1"></div>
            </div>
            <div class="draw-border">
                <div class="row align-items-start" v-for="contact in contacts">
                    <div class="col-sm-3">{{contact.name}}</div>
                    <div class="col-sm-3">{{contact.address}}</div>
                    <div class="col-sm-3">{{contact.email}}</div>
                    <div class="col-sm-2">{{contact.phone}}</div>
                    <div class="col-sm-1">
                        <a href="#"><i class="fas fa-pencil-alt" @click="editContact(contact);showContactEdit = true" ></i></a>
                        <i class="fas fa-trash-alt" @click="deleteContact(contact)"></i>
                    </div>
                </div>
            </div>
            <div>
                <i class="far fa-plus-square" @click="addContact">  Add a new contact</i>
            </div>
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
            return {
                showContactEdit: false,
                updatedContact: {
                    name: contact.name,
                    address: contact.address,
                    email: contact.email,
                    phone: contact.phone
                }
            }
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
                debugger
                this.showContactEdit = true
                var updatedContact = contact;
                this.$store.dispatch('editContact', contact)
                this.showContactEdit = false;
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