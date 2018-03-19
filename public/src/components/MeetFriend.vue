<template>
    <div class="meet-friend">
        <navbar class="marg-bot"></navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-8">
                    <div class="map-friend" id="map"></div>
                </div>
                <div class="col-4">
                    <div v-if="show == false">
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
                                <button type="submit" class="btn teal btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div v-else>
                        <h4>Your Location: </h4>
                        <h6>{{this.originAddress}}</h6>
                        <h4>Your Contacts Location: </h4>
                        <h6>{{this.destinationAddress}}</h6>
                        <div class="flexor marg-top">
                            <div>
                        <form v-on:change="submitPlace()">
                            <select class="form-control form-control-sm" v-model="type">
                                <option value="" disabled>Choose Category</option>
                                <option value="coffee">Coffee Shops</option>
                                <option value="restaurant">Restaurants</option>
                                <option value="pizza">Pizza</option>
                                <option value="sandwich">Sandwich</option>
                                <option value="mexican+food">Mexican Food</option>
                                <option value="asian+food">Asian Food</option>
                                <option value="bar">Bars</option>
                                <option value="ice+cream">Ice Cream</option>
                                <option value="bakery">Bakeries</option>
                                <option value="hotel">Hotel</option>
                                <option value="park">Parks</option>
                            </select>
                        </form>
                    </div>
                        <div>
                            <form v-on:change="submitPlace()">
                                <select class="form-control form-control-sm" v-model="radius">
                                    <option value="1609">1 Mile</option>
                                    <option value="4828">3 Miles</option>
                                    <option value="8046">5 Miles</option>
                                    <option value="16093">10 Miles</option>
                                </select>
                            </form>
                        </div>
                        <div>
                            <form v-on:change="submitPlace()">
                                <select class="form-control form-control-sm" v-model="totalResults">
                                    <option value="10">10 Results</option>
                                    <option value="15">15 Results</option>
                                    <option value="20">20 Results</option>
                                </select>
                            </form>
                        </div>
                    </div>
                        <button class="btn marg-top teal btn-block" @click="show = false, trip = {}, initMap()">New Search</button>
                        <div class="list-group marg-top">
                            <div class="list-group-item" v-for="(result, index) in roadResults" v-if="index < totalResults">
                                <results :origin="trip.origin" :destination="trip.destination" :isHovered="isHovered" :result="result"></results>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Results from './Results.vue'
    import Navbar from './Navbar.vue'
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
                midwayPoint: {},
                radius: 4828,
                markers: [],
                show: false,
                totalResults: 10,
                isHovered: ''
            }
        },
        mounted() {
            this.initMap()
        },
        watch: {
            roadResults: function (value) {
                console.log("VALUE", value)
                this.resultMarker(value)
            }
        },
        methods: {
            getTrip() {
                this.show = true
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
                // this.midwayMarker({ lat: center.lat(), lng: center.lng() }, this.map)
                this.findDrivingMidPoint(start, end)

                // this.$store.commit('setMidway', { lat: center.lat(), lng: center.lng() })
                // this.midwayPoint = { lat: center.lat(), lng: center.lng() }
                // this.getDistance(start, end)
            },
            findDrivingMidPoint(start, end) {
                var scope = this
                var directionsService = new google.maps.DirectionsService();
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                }
                directionsService.route(request, function (response, status) {
                    console.log("DIRECTIONS RESPONSE", response)
                    if (status == google.maps.DirectionsStatus.OK) {
                        var numberofWaypoints = response.routes[0].overview_path.length
                        var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 2)]
                        console.log("MIDPOINT", midPoint.lat(), midPoint.lng())
                        scope.roadMidwayMarker({ lat: midPoint.lat(), lng: midPoint.lng() }, scope.map)
                    }
                })
            },
            submitPlace() {
                this.$store.dispatch('getPlaces', { midway: this.roadMidway, category: this.type, radius: this.radius })
                this.addCircle({ location: this.roadMidway, radius: this.radius })

            },
            addMarker(location, map) { // CREATES MARKERS
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                })
            },
            // midwayMarker(location, map) {
            //     var marker = new google.maps.Marker({
            //         position: location,
            //         map: map,
            //         icon: {
            //             url: '../assets/results-arrow.png'
            //         }
            //     })
            //     this.$store.commit('setMidway', location)
            // },
            roadMidwayMarker(location, map) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    draggable: true

                })
                this.$store.commit('setRoadMidway', location)
                marker.addListener('dragend', this.updateLatLng)
            },
            addCircle(location) {
                console.log('LOCATION', location)
                if (cityCircle) {

                }
                var cityCircle = new google.maps.Circle({
                    strokeColor: '#797979',
                    strokeOpacity: 0.5,
                    strokeWeight: 2,
                    fillColor: '#797979',
                    fillOpacity: 0.35,
                    center: location.location,
                    map: this.map,
                    radius: parseInt(location.radius)
                });
            },
            updateLatLng(marker) {
                debugger
                console.log('NEW POSITION:', { lat: marker.latLng.lat(), lng: marker.latLng.lng() })
                var newPosition = { lat: marker.latLng.lat(), lng: marker.latLng.lng() }
                console.log('NEW POSITION2:', newPosition)
                this.$store.commit('setRoadMidway', newPosition)
                this.submitPlace()
            },
            getDistance(start, end) {
                this.$store.dispatch('getDistance', { origin: start, destination: end })
            },
            resultMarker(arr) {
                var scope = this
                this.resultBounds(arr)
                var infoWindow = new google.maps.InfoWindow();
                if (this.markers.length > 0) {
                    var res = this.markers
                    for (var j = 0; j < res.length; j++) {
                        var marker = res[j]
                        this.deleteMarkers(marker)
                    }
                }
                for (let i = 0; i < this.totalResults; i++) {
                    const place = arr[i];
                    var marker = new google.maps.Marker({
                        position: place.geometry.location,
                        map: this.map,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    })
                    this.markers.push(marker)
                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.setContent('<div><strong>' + place.name + '</strong></div><div><strong>'
                            + place.vicinity + '</strong></div><div><strong>' + place.rating + '</strong></div>')
                        infoWindow.open(this.map, this)
                    })
                    google.maps.event.addListener(marker, 'mouseover', function () {
                        scope.isHovered = place.place_id
                        // this.isHoveredOn = place.place_id
                        // scope.highlight(place.place_id)
                        console.log('I was Hovered on', this.isHovered)
                    })
                }
                // this.resultBounds(this.markers)
            },
            // highlight(place_id){
            //     document.getElementById(place_id).classList.add('hovered')
            // },
            resultBounds(arr) {
                console.log(arr)
                var bounds = new google.maps.LatLngBounds()
                for (var i = 0; i < arr.length; i++) {
                    var place = arr[i].geometry.location
                    bounds.extend({ lat: place.lat, lng: place.lng })
                }
                this.map.fitBounds(bounds)
            },
            deleteMarkers(marker) {
                marker.setMap(null)
            }
        },
        computed: {
            midway() {
                return this.$store.state.midway
            },
            roadMidway() {
                return this.$store.state.roadMidway
            },
            roadResults() {
                return this.$store.state.roadResults
            },
            originAddress() {
                return this.$store.state.originAddress
            },
            destinationAddress() {
                return this.$store.state.destinationAddress
            },
            
        },
        components: {
            Results,
            Navbar
        }
    }
</script>
<style scoped>
    #map {
        height: 87vh;
        width: 100%;
        border-radius: 10px;
        border: .1rem solid #dddddd;
    }
    .list-group-item{
        padding: 0
    }
    .marg-top {
        margin-top: 1.5rem;
    }
    .marg-bot{
        margin-bottom: 1rem
    }
    .flexor{
        display: flex;
        justify-content: space-between;
    }
    .teal {
        background-color: #94bac4;
        color: white;
        font-size: 1.1rem;
        transition: all .3s linear;
    }
    .teal:hover {
        background-color: #96cad8;
    }
</style>