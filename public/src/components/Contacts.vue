<template>
    <div class="manageContacts">

        <!-- <div class="row">
            <h2>Manage Contacts</h2>
        </div>
        <div class="contacts">
            <ol>
                <li class="listContact mt-4" v-for="contact in contacts">
                    <span>
                        {{contact.name}}
                    </span>
                    <span>
                        <small>{{contact.address}}</small>
                    </span>
                    <span> {{contact.email}}</span>
                    <span> {{contact.phone}} </span>
                </li>
            </ol>

        </div>
        <footer class="modal-footer">
            <button type="button" class="btn btn-info btnEdit" @click="editContact(contact)">Edit Contact</button>
            <button type="button" class="btn btn-priority btnAdd" @click="addContact">Add Contact</button>
            <button type="button" class="btn btn-danger btnDelete" @click="deleteContact(contact)">Delete contact</button>
        </footer> -->
    </div>
</template>
<script>
    export default {
        name: 'Contacts',
        components: {
            // contact: Contact
        },
        data() {
            return {

            }
        },
        computed: {
            contacts() {
                var contacts = this.$store.state.contacts
                contacts.sort((contactA, contactB) => contactA.created - contactB.created)
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