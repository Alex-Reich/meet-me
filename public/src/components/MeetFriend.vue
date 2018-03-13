<template>
    <div class="meet-friend">
        <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?key=AIzaSyAPjJdiAmmeYPIveMMq-QfCZxx7m0VezsQ&q=initMap" allowfullscreen>
        </iframe>
        <div class="form">
            <form @submit.prevent="getMap">
                <div class="form-group">
                  <label for="your-location">Your Location</label>
                  <input v-model="origin" type="text" class="form-control" id="your-location" placeholder="Your Address">
                </div>
                <div class="form-group">
                  <label for="contacts-location">Your Contacts Location</label>
                  <input v-model="destination" type="text" class="form-control" id="contacts-location" placeholder="Contact Address">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                trip: {
                    origin: '',
                    meetMeLocation: '',
                    destination: '',
                    travelMode: 'DRIVING'
                }
            }
        },
        methods: {
            calcRoute(){
                this.$store.dispatch('calcRoute', this.trip)
            }
        }
    }
</script>
<style scoped>

</style>