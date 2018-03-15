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
                                <input v-model="trip.origin" type="text" class="form-control" id="your-location" placeholder="Your Address" required>
                            </div>
                            <div class="form-group">
                                <label for="contacts-location">Your Contacts Location</label>
                                <input v-model="trip.destination" type="text" class="form-control" id="contacts-location" placeholder="Contact Address" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <form v-on:change="submitPlace()">
                        <select class="form-control form-control-sm" v-model="type">
                            <option value="" disabled>Choose Category</option>
                            <option value="cafe">Coffee Shops</option>
                            <option value="restaurant">Restaurants</option>
                            <option value="bar">Bars</option>
                            <option value="bakery">Bakeries</option>
                            <option value="park">Parks</option>
                            <option value="bowling_alley">Bowling Alleys</option>
                        </select>
                    </form>
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
                type: '',
                map: {},
                markerCoordinats: [],
                midwayPoint: {}
            }
        },
        mounted() {
            this.initMap()
        },
        watch:{
            // results: function(value) {
            //     this.resultMarker(value)
            // },
            roadResults: function(value){
                this.resultMarker(value)
            }
        },
        methods: {
            getTrip() {
                this.trip.origin = this.trip.origin.split(' ').join('+')
                this.trip.destination = this.trip.destination.split(' ').join('+')
                Promise.all([
                    this.$store.dispatch('getTripOrigin', this.trip),
                    this.$store.dispatch('getTripDestination', this.trip)
                ]).then((results) => {
                    console.log('mapping results')
                    this.setMap(results[0], results[1])
                }).catch(err => {
                    console.log(err)
                })
                // this.trip.orgin = '';
                // this.trip.destination = '';
            },
            initMap() { // STARTING PLACEHOLDER MAP
                const element = document.getElementById('map')
                const options = {
                    zoom: 15,
                    center: { lat: 43.6187102, lng: -116.2146068 } // BOISE ID
                }
                this.map = new google.maps.Map(element, options);
            },
            setMap(origin, destination) {
                var start = { lat: origin.lat, lng: origin.lng }
                var end = { lat: destination.lat, lng: destination.lng }
                console.log('VOYAGE', start)
                var bounds = new google.maps.LatLngBounds()
                bounds.extend(start);
                bounds.extend(end)
                const element = document.getElementById('map') // SEt MAP TO id="map" FROM ABOVE DIV
                const options = {
                    zoom: Math.ceil(Math.log2($(window).width())) - 8,
                    minZoom: 1,
                    center: this.bounds,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                }
                this.map = new google.maps.Map(element, options); // CREATES NEW MAP

                this.addMarker(start, this.map)
                this.addMarker(end, this.map)

                this.map.fitBounds(bounds)
                var center = this.map.getCenter()
                this.map.setCenter({ lat: center.lat(), lng: center.lng() })
                this.midwayMarker({ lat: center.lat(), lng: center.lng() }, this.map)
                this.findDrivingMidPoint(start, end)

                // this.$store.commit('setMidway', { lat: center.lat(), lng: center.lng() })
                // this.midwayPoint = { lat: center.lat(), lng: center.lng() }
                // this.getDistance(start, end)
            },
            findDrivingMidPoint(start, end){
                var scope = this
                var directionsService = new google.maps.DirectionsService();
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                }
                directionsService.route(request, function(response, status){
                    console.log("DIRECTIONS RESPONSE", response)
                    if(status == google.maps.DirectionsStatus.OK){
                        var numberofWaypoints = response.routes[0].overview_path.length
                        var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints/2)]
                        console.log("MIDPOINT", midPoint.lat(), midPoint.lng())
                        scope.roadMidwayMarker({lat: midPoint.lat(),lng: midPoint.lng()}, scope.map)
                    }
                })
            },
            submitPlace() {
                this.$store.dispatch('getPlaces', { midway: this.midway, category: this.type })

            },
            addMarker(location, map) { // CREATES MARKERS
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                })
            },
            midwayMarker(location, map) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    draggable: true

                })
                this.$store.commit('setMidway', location)
            },
            roadMidwayMarker(location, map) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    draggable: true

                })
                debugger
                this.$store.commit('setRoadMidway', location)
            },
            getDistance(start, end) {
                this.$store.dispatch('getDistance', { orgin: start, destination: end })
            },
            resultMarker(arr){
                console.log('RESULTS ARRAY', arr)
                var infoWindow = new google.maps.InfoWindow();

                for (let i = 0; i < arr.length-10; i++) {
                    const place = arr[i];
                    
                    var marker = new google.maps.Marker({
                        position: place.geometry.location,
                        map: this.map
                    })
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent('<div><strong>' + place.name + '</strong></div><div><strong>'
                            + place.vicinity + '</strong></div><div><strong>' + place.rating + '</strong></div>')
                        infoWindow.open(this.map, this)
                    })               
                }
            }
        },
        computed: {
            midway() {
                return this.$store.state.midway
            },
            roadMidway(){
                return this.$store.state.roadMidway
            },
            results(){
                return this.$store.state.midWayResults
            },
            roadResults(){
                return this.$store.state.roadResults
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