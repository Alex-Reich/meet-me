<template>
    <div class="meet-friend">
        <!-- <iframe width="600" height="450" frameborder="0" style="border:0" v-bind:src="mapSrc" allowfullscreen>
        </iframe> -->
        <mapFriend :origin="this.trip.origin" :destination="this.trip.destination"></mapFriend>
        <div class="form">
            <form @submit.prevent="calcRoute(trip)">
                <div class="form-group">
                    <label for="your-location">Your Location</label>
                    <input v-model="trip.origin" type="text" class="form-control" id="your-location" placeholder="Your Address">
                </div>
                <div class="form-group">
                    <label for="contacts-location">Your Contacts Location</label>
                    <input v-model="trip.destination" type="text" class="form-control" id="contacts-location" placeholder="Contact Address">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
    import mapFriend from "./MapFriend"
    export default {
        name: 'MeetFriend',
        data() {
            return {
                trip: {
                    origin: '',
                    destination: '',
                    travelMode: 'DRIVING'
                }
            }
        },
        methods: {
            calcRoute() {
                debugger
                this.trip.origin = this.trip.origin.split(' ').join('+')
                this.trip.destination = this.trip.destination.split(' ').join('+')
                this.$store.dispatch('calcRoute', this.trip)
                this.trip.origin = ""
                this.trip.destination = ""
            }
        },
        computed: {
            // mapSrc() {
            //     return this.$store.state.map
            // }
        },
        components: {
            mapFriend
        }
    }
</script>
<style scoped>

</style>