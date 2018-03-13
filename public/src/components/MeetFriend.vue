<template>
    <div class="meet-friend">
        <!-- <iframe width="600" height="450" frameborder="0" style="border:0" v-bind:src="mapSrc" allowfullscreen>
        </iframe> -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-8">
                    <div class="map-friend" id="map"></div>
                </div>
                <div class="col-4">
                    <div class="form">
                        <form @submit.prevent="getTrip(trip)">
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
            </div>
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
            originLatitude: function (value) {
                console.log("WATCHER VALUE", value)
                this.setMap()
            }
        },
        methods: {
            getTrip() {
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
                this.$store.dispatch('getTripOrigin', this.trip);
                this.$store.dispatch('getTripDestination', this.trip);
            },
            initMap() {
                const element = document.getElementById('map')
                const options = {
                    zoom: 8,
                    center: new google.maps.LatLng(this.originLatitude, this.originLongitude)
                }
                this.map = new google.maps.Map(element, options);
            },
            setMap() {
                var start = { lat: this.originLatitude, lng: this.originLongitude }
                var end = { lat: this.destinationLatitude, lng: this.destinationLongitude }
                const bound = new google.maps.LatLngBounds(start, end)
                const element = document.getElementById('map')
                const options = {
                    center: this.bound,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                this.map = new google.maps.Map(element, options);

                this.addMarker(start, this.map)
                this.addMarker(end, this.map)

                this.map.fitBounds(bound)
                var center = this.map.getCenter()
                this.map.setCenter({lat: center.lat(), lng: center.lng()})
                this.addMarker({lat: center.lat(), lng: center.lng()}, this.map)
                console.log("lat", center)
            },
            addMarker(location, map) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                })
            },
            // bounds(){
            //     var bound = new google.maps.LatLngBounds()
            // }
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
            originLatitude() {
                return this.$store.state.origin.lat
            },
            originLongitude() {
                return this.$store.state.origin.lng
            },
            destinationLatitude() {
                return this.$store.state.destination.lat
            },
            destinationLongitude() {
                return this.$store.state.destination.lng
            }
        }
    }
</script>
<style scoped>
    #map {
        height: 600px;
        width: 800px;
    }
</style>