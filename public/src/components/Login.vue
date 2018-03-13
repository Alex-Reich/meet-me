<template>
    <div class="login">
        <div class="container-fluid">
            <div>
                <img src="../assets/meet-me-logo.png" height="200">
                <p>
                    <strong>Please sign up or login to continue.</strong>
                </p>
                <button type="button" class="btn signUpBtn m-2" data-toggle="modal" data-target="#signUp">
                    <b>Sign Up</b>
                </button>
                <button type="button" class="btn loginBtn m-2" data-toggle="modal" data-target="#login">
                    <b>Login</b>
                </button>
            </div>
            <div>
                <!-- Sign Up Modal Start -->
                <div class="modal fade" id="signUp" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <form @submit.prevent="createUser(createdUser)">
                                <div class="modal-body">
                                    <!-- username input -->
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
                                    <button type="submit" class="btn submitBtn">
                                        <b>Create User</b>
                                    </button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                        <b>close</b>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                user: {},
                createdUser: {}
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', this.user)
                $('#login').modal('hide')
            },
            createUser() {
                this.$store.dispatch('createUser', this.createdUser)
                $('#signup').modal('hide')
            }
        }
    }
</script>
<style scoped>
    .login {
        background-image: url("../assets/bg-meet-me.jpg");
        background-position: center;
        background-size: cover;
        height: 100vh;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    p{
        color: white;
    }
</style>