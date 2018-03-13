<template>
    <div class="meet-friend">
        <!-- <iframe width="600" height="450" frameborder="0" style="border:0" v-bind:src="mapSrc" allowfullscreen>
        </iframe> -->
        <div class="map-friend" id="map"></div>
        <div class="form">
            <form @submit.prevent="calcRoute(trip)">
                <div class="form-group">
                    <label for="your-location">Your Location</label>
                    <input v-model="trip.origin" type="text" class="form-control" id="your-location" placeholder="Your Address">
                </div>
                <!-- <div class="form-group">
                    <label for="contacts-location">Your Contacts Location</label>
                    <input v-model="trip.destination" type="text" class="form-control" id="contacts-location" placeholder="Contact Address">
                </div> -->
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MeetFriend',
        data() {
            return {
                trip: {
                    origin: '',
                    destination: '',
                    travelMode: 'DRIVING'
                },
                map: {},
                service: '',
                markerCoordinats: []
            }
        },
        mounted() {
            this.initMap()
        },
        watch: {
            latitude: function(value) {
                console.log("WATCHER VALUE", value)
                this.initMap()
            }
        },
        methods: {
            calcRoute() {
                this.trip.origin = this.trip.origin.split(' ').join('+')
                this.trip.destination = this.trip.destination.split(' ').join('+')
                // const element = document.getElementById('map')
                // const options = {
                //     zoom: 14,
                //     center: new google.maps.LatLng(this.origin)
                // }
                // this.map = new google.maps.Map(element, options)
                // const element = document.getElementById('map')
                // this.$store.dispatch('calcRoute', this.trip)
                // this.trip.origin = ""
                // this.trip.destination = ""
                this.$store.dispatch('calcRoute', this.trip);
            },
            initMap() {
                const element = document.getElementById('map')
                const options = {
                    zoom: 14,
                    center: new google.maps.LatLng(this.latitude, this.longitude)//possibly this.lat...
                }
                this.map = new google.maps.Map(element, options)
            },
            // getPlace() {
            //     geocoder.geocode({ 'placeId': place.place_id }, function (results, status) {
            //         if (status !== 'OK') {
            //             window.alert('Geocoder failed due to: ' + status);
            //             return;
            //         }
            //         map.setZoom(11);
            //         map.setCenter(results[0].geometry.location);
            //         // Set the position of the marker using the place ID and location.
            //         marker.setPlace({
            //             placeId: place.place_id,
            //             location: results[0].geometry.location
            //         });
            //         marker.setVisible(true);
            //     })
            // }
        },
        computed: {
            latitude() {
                return this.$store.state.options.lat
            },
            longitude() {
                return this.$store.state.options.lng
            }
        }
    }
</script>
<style scoped>
    #map {
        height: 600px;
        width: 450px;
    }
</style>