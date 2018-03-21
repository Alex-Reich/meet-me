<template>
    <div>
        <nav class="navbar">
            <div class="flexor">
                <router-link :to="{name: 'Home'}">
                    <div>
                        <img class="pad-r" src="../assets/nav-logo.png" height="40px">
                    </div>
                </router-link>
            </div>
            <div v-if="!user._id">
                <div class="dropdown pointer">
                    <a class="dropdown-toggle" role="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span>
                            <i class="fas fa-sign-in-alt"></i>
                        </span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button type="button" class="dropdown-item pointer ddcss" data-toggle="modal" data-target="#signUp">
                            Sign Up
                        </button>
                        <button type="button" class="dropdown-item pointer ddcss" data-toggle="modal" data-target="#login">
                            Login
                        </button>

                    </div>
                </div>
            </div>

            <div v-else>
                <div class="dropdown pointer">
                    <a class="dropdown-toggle" role="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span>{{user.email}}
                            <i class="fas fa-user"></i>
                        </span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button type="button">
                            <router-link to="/Contacts" class="dropdown-item pointer ddcss">
                                Manage Contacts
                            </router-link>
                        </button>
                        <button @click.prevent="logout" class="dropdown-item pointer ddcss" type="button">Logout</button>
                    </div>
                </div>
            </div>

        </nav>
        <div class="modal fade" id="signUp" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <form @submit.prevent="createUser(createdUser)">
                        <div class="modal-body">
                            <div class="m-2">
                                <i class="fas mar-right fa-1x fa-user"></i>
                                <input type="text" name="username" v-model="createdUser.userName" placeholder=" Username" required>
                            </div>
                            <div class="m-2">
                                <i class="far mar-right fa-1x fa-envelope"></i>
                                <input type="email" name="userEmail" v-model="createdUser.email" placeholder="Email" required>
                            </div>
                            <div class="m-2">
                                <i class="far mar-right fa-1x fa-edit"></i>
                                <input type="password" name="password" v-model="createdUser.password" placeholder=" Password">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                <b>close</b>
                            </button>
                            <button type="submit" class="btn submitBtn">
                                <b>Create User</b>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Login Modal Start -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <form @submit.prevent="login(user)">
                        <div class="modal-body">
                            <div class="m-2">
                                <i class="far mar-right fa-1x fa-envelope"></i>
                                <input type="text" name="userEmail" v-model="user.email" placeholder=" Email" required>
                            </div>
                            <div class="m-2">
                                <i class="far mar-right fa-1x fa-edit"></i>
                                <input type="password" name="password" v-model="user.password" placeholder=" Password">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn submitBtn">
                                <b>Login</b>
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                <b>close</b>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Home from "./Home"
    export default {
        name: 'Navbar',
        data() {
            return {
                createdUser: {}
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            login() {
                this.$store.dispatch('login', this.user)
                this.$store.dispatch('authenticate')
                $('#login').modal('hide')
            },
            createUser(createdUser) {
                this.$store.dispatch('createUser', this.createdUser)
                $('#signUp').modal('hide')
                this.createdUser = {}
            },
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


<style scoped>
    #must-login {
        display: none;
    }

    a {
        color: #fff;
    }

    a:hover {
        text-decoration: none
    }

    .pointer {
        cursor: pointer;
    }

    .navbar {
        background-color: #3c6cae;
        /* background-color: #7BA6D0; */
        color: white;
    }

    .navbar h3 {
        font-family: 'Paytone One', sans-serif;
        font-weight: 800;
        font-size: 2rem;
    }

    .ddcss {
        color: black;
        background-color: white;
        font-style: normal;
    }

    .dropdown-menu {
        min-width: 0;
        padding: 1rem 0;
        margin-right: 10px;
        left: -8rem;
    }

    .dropdown-item:hover {
        background-color: #f9f9f9;
    }

    .flexor {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
    }

    .flexor h3 {
        margin-bottom: 0;
    }

    .pad-r {
        padding-right: 1rem;
    }
</style>