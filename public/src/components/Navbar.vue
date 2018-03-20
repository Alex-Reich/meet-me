<template>
        <div>
            <nav class="navbar">
                <div class="flexor">
                        <div>
                            <img class="pad-r" src="../assets/nav-logo.png" height="40px">
                        </div>
                        <div>
                        </div>
                </div>
                <div>
                    <div class="dropdown pointer">
                        <a class="dropdown-toggle" role="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>
                                <i class="fas fa-user"></i></span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button @click.prevent="logout" class="dropdown-item pointer" type="button">logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {


            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            }
        },
        props: ['user']
    }
</script>


<style scoped>
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
    
    .dropdown-menu {
        min-width: 0;
        padding: .1rem 0;
        left: -2rem;
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