<template>
    <div class="meet-friend">
        <navbar class="marg-bot"></navbar>
        <div v-if="loading == true">
            <div class="loading-gif">
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-8">
                    <div class="sticky-top stick">
                        <div class="map-friend hidden" id="map"></div>
                    </div>
                </div>
                <div class="col-4" v-if="loading == false">
                    <div>
                        <div v-if="show == false">
                            <div v-if="geoShow == true">
                                <label for="your-geo-location">Your GPS Location
                                    <i class="far fa-edit pointer edit-button" @click="geoShowToggle()"></i>
                                </label>
                                <h6 id="your-geo-location">{{this.originAddress}}</h6>
                            </div>
                            <div class="form">
                                <form @submit.prevent="getTrip(trip)">
                                    <div v-if="geoShow == false">
                                        <div class="form-group">
                                            <label for="your-location">Your Location</label>
                                            <input v-model="trip.origin" type="text" class="form-control" id="your-location" placeholder="Your Address">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="flexor">
                                            <div>
                                                <label for="contacts-location">Your Contacts Location </label>
                                            </div>
                                            <div v-if="user">
                                                <div class="dropdown dropleft">
                                                    <i class="fas fa-address-card pointer edit-button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <div v-if="contacts.length==0">
                                                            <a class="dropdown-item">
                                                                <router-link to="/contacts">Create a Contact</router-link>
                                                            </a>
                                                        </div>
                                                        <div v-for="contact in contacts">
                                                            <a class="dropdown-item" @click="contactsLocation(contact.address)">{{contact.name}}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <i class="far fa-address-book" @click="showModal()"></i>
                                            </div>
                                        </div>
                                        <input v-model="trip.destination" type="text" class="form-control" id="contacts-location" placeholder="Contact Address" required>
                                    </div>
                                    <button type="submit" class="btn teal btn-block">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div v-if="show == true">
                            <div v-if="geoShow == false">
                                <h4>Your Location: </h4>
                                <h6>{{this.originAddress}}</h6>
                            </div>
                            <div v-if="geoShow == true">
                                <h4>Your GPS Location
                                    <i class="far fa-edit edit-button" @click="geoShowToggle(), show = false"></i>
                                </h4>
                                <h6>{{this.originAddress}}</h6>
                            </div>
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
                            <button class="btn marg-top teal btn-block" @click="show = false, initMap()">New Search</button>
                            <div class="list-group marg-top">
                                <div v-if="this.placesResults == false">
                                    <h5>No Results Found...</h5>
                                </div>
                                <div class="list-group-item" v-for="result in roadResults">
                                    <results :origin="trip.origin" :destination="trip.destination" :isHovered="isHovered" :result="result"></results>
                                </div>
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
                loading: true,
                trip: {
                    origin: '',
                    geolocation: {},
                    destination: '',
                    travelMode: 'DRIVING'
                },
                type: '',
                map: {},
                markerCoordinats: [],
                midwayPoint: {},
                midwayMarker: [],
                radius: 4828,
                markers: [],
                show: false,
                totalResults: 10,
                isHovered: '',
                resultCircle: [],
                geoShow: false
            }
        },
        mounted() {
            this.initMap();
            this.geolocator();
            this.$store.dispatch('getContacts');
        },
        watch: {
            roadResults: function (value) {
                if (value.length > 0) {
                    this.resultMarker(value)
                }
            }
        },
        methods: {
            getTrip() {
                this.show = true
                this.trip.origin = this.trip.origin.split(' ').join('+');
                this.trip.destination = this.trip.destination.split(' ').join('+')
                Promise.all([
                    this.$store.dispatch('getTripOrigin', this.trip),
                    this.$store.dispatch('getTripDestination', this.trip)
                ]).then((results) => {
                    this.setMap(results[0], results[1])
                }).catch(err => {
                    console.log(err)
                })
            },
            initMap() { // STARTING PLACEHOLDER MAP
                const element = document.getElementById('map')
                const options = {
                    zoom: 15,
                    center: { lat: 43.6187102, lng: -116.2146068 } // BOISE ID
                }
                this.map = new google.maps.Map(element, options);
                this.$store.commit("setRoadResults", [])
            },
            //finds the location of the user
            geolocator() {
                var scope = this;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        scope.trip.geolocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                        scope.geoShow = true
                        scope.getAddress(scope.trip.geolocation.lat, scope.trip.geolocation.lng)
                    },
                        function (error) {
                            scope.loading = false;
                            scope.removeHidden()
                        })
                }
            },
            contactsLocation(address) {
                this.trip.destination = "";
                this.trip.destination = address;
            },
            //converts address to latitude and longitude
            getAddress(lat, lng) {
                var scope = this;
                var geocoder = new google.maps.Geocoder();
                var latLng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({ "latLng": latLng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            scope.$store.commit("setOriginAddress", results[0].formatted_address)
                            scope.loading = false
                            scope.removeHidden()
                        }
                    } else {
                        console.log("Geocode was not successful", status)
                    }
                })
            },
            removeHidden() {
                var element = document.getElementById("map")
                element.classList.remove("hidden")
            },
            //initiates the map with the origin, destination and midpoints
            setMap(origin, destination) {
                var start = { lat: origin.lat, lng: origin.lng }
                var end = { lat: destination.lat, lng: destination.lng }
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
                if (!this.trip.geolocation.lat) {
                    this.findDrivingMidPoint(start, end)
                } else {
                    this.findDrivingMidPoint(this.trip.geolocation, end)
                }
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
                    if (status == google.maps.DirectionsStatus.OK) {
                        var numberofWaypoints = response.routes[0].overview_path.length
                        var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 2)]
                        scope.roadMidwayMarker({ lat: midPoint.lat(), lng: midPoint.lng() }, scope.map)
                    }
                })
            },
            submitPlace() {
                this.$store.dispatch('getPlaces', { midway: this.roadMidway, category: this.type, radius: this.radius, length: this.totalResults })
                this.addCircle({ location: this.roadMidway, radius: this.radius })

            },
            addMarker(location, map) { // CREATES MARKERS
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                })
            },
            roadMidwayMarker(location, map) {
                if (this.midwayMarker.length > 0) {
                    var midMarkers = this.midwayMarker
                    for (var i = 0; i < midMarkers.length; i++) {
                        var marker = midMarkers[i]
                        this.deleteMarkers(marker)
                    }
                }
                var midMarker = new google.maps.Marker({
                    position: location,
                    map: map,
                    draggable: true
                })
                this.midwayMarker.push(midMarker)
                this.$store.commit('setRoadMidway', location)
                midMarker.addListener('dragend', this.updateLatLng)
            },
            addCircle(data) {
                if (this.resultCircle.length > 0) {
                    var resCircle = this.resultCircle
                    for (var i = 0; i < resCircle.length; i++) {
                        var circ = resCircle[i]
                        this.deleteCircle(circ)
                    }
                } else {
                    var circle = new google.maps.Circle({
                        strokeColor: '#797979',
                        strokeOpacity: 0.5,
                        strokeWeight: 2,
                        fillColor: '#797979',
                        fillOpacity: 0.35,
                        center: data.location,
                        map: this.map,
                        radius: parseInt(data.radius)
                    });
                    this.resultCircle.push(circle)
                }
            },
            updateLatLng(marker) {
                var newPosition = { lat: marker.latLng.lat(), lng: marker.latLng.lng() }
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
                        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    })
                    this.markers.push(marker)
                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.setContent('<div><strong>' + place.name + '</strong></div><div><strong>'
                            + place.vicinity + '</strong></div><div><strong>' + place.rating + '</strong></div>')
                        infoWindow.open(this.map, this)
                    })
                    google.maps.event.addListener(marker, 'mouseover', function () {
                        scope.isHovered = place.place_id
                    })
                }
            },
            resultBounds(arr) {
                var bounds = new google.maps.LatLngBounds()
                for (var i = 0; i < arr.length; i++) {
                    var place = arr[i].geometry.location
                    bounds.extend({ lat: place.lat, lng: place.lng })
                }
                this.map.fitBounds(bounds)
            },
            deleteMarkers(marker) {
                marker.setMap(null)
            },
            deleteCircle(circle) {
                circle.setMap(null)
                this.resultCircle = []
                this.addCircle({ location: this.roadMidway, radius: this.radius })
            },
            geoShowToggle() {
                this.geoShow = false
                var string = this.trip.destination.replace("+", " ")
                this.trip.destination = string
                this.$store.commit("setRoadResults", [])
            },
            showModal() {
                $('#signUp').modal('show')
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
            placesResults() {
                return this.$store.state.placesResults
            },
            contacts() {
                return this.$store.state.contacts
            },
            user() {
                return this.$store.state.user
            }

        },
        components: {
            Results,
            Navbar
        }
    }
</script>
<style scoped>
    .hidden {
        display: none;
    }

    .loading-gif {
        background-image: url("https://cdn.dribbble.com/users/747448/screenshots/2876287/littlepin_spinner.gif");
        background-position: center;
        background-size: cover;
        height: 100vh;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .stick {
        top: 6vh;
    }

    #map {
        height: 87vh;
        width: 100%;
        border-radius: 10px;
        border: .1rem solid #dddddd;
        position: fixed;
    }

    .list-group-item {
        padding: 0;
    }

    .list-group-item,
    .list-group-item:hover {
        z-index: auto;
    }

    .marg-top {
        margin-top: 1.5rem;
    }

    .marg-bot {
        margin-bottom: 1rem
    }

    .flexor {
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

    .pointer{
        cursor: pointer;
    }

    .smaller {
        font-size: .85rem!
    }

    .edit-button {
        color: #bbbbbb;
        transition: all .2s linear;
    }

    .edit-button:hover {
        color: #3c6cae;
    }
</style>