<template>
    <div class="plan-trip">
        <navbar class="marg-bot"></navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-8">
                    <div class="sticky-top stick">
                        <div id="map"></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form">
                        <form @submit.prevent="getLatLng(trip)">
                            <div class="form-group">
                                <label for="your-location">Your Location</label>
                                <input v-model="trip.start" type="text" class="form-control" id="your-location" placeholder="Your Address" required>
                            </div>
                            <div class="form-group">
                                <label for="contacts-location">Your Contacts Location</label>
                                <input v-model="trip.end" type="text" class="form-control" id="contacts-location" placeholder="Contact Address" required>
                            </div>
                            <div class="form-group">
                                <label for="number-of-stops">Number of Stops</label>
                                    <select class="form-control form-control-sm" v-model="stops" id="number-of-stops">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                            </div>
                            <button type="submit" class="btn teal btn-block">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Navbar from './Navbar.vue'
    export default {
        name: "PlanTrip",
        data() {
            return {
                map: {},
                trip: {},
                stops: 0
            }
        },
        mounted() {
            this.loadMap();
        },
        methods: {
            //set up google map
            loadMap() {
                const element = document.getElementById('map')
                const options = {
                    zoom: 15,
                    center: { lat: 43.6187102, lng: -116.2146068 } // BOISE ID
                }
                this.map = new google.maps.Map(element, options);
            },
            getLatLng() {
                this.trip.start = this.trip.start.split(' ').join('+');
                this.trip.end = this.trip.end.split(' ').join('+')
                Promise.all([
                    this.$store.dispatch('getStartLatLng', this.trip),
                    this.$store.dispatch('getEndLatLng', this.trip)
                ]).then((results) => {
                    this.getMap(results[0], results[1])
                }).catch(err => {
                    console.log(err)
                })
            },
            getWayPointInfo(){

            },
            getMap(start, end) {
                var origin = { lat: start.lat, lng: start.lng }
                var destination = { lat: end.lat, lng: end.lng }
                var bounds = new google.maps.LatLngBounds()
                bounds.extend(origin);
                bounds.extend(destination)
                const element = document.getElementById('map') // SEt MAP TO id="map" FROM ABOVE DIV
                const options = {
                    zoom: Math.ceil(Math.log2($(window).width())) - 8,
                    minZoom: 1,
                    center: this.bounds,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                }
                this.map = new google.maps.Map(element, options); // CREATES NEW MAP

                this.tripMarker(origin, this.map)
                this.tripMarker(destination, this.map)

                this.map.fitBounds(bounds)
                var center = this.map.getCenter()
                this.map.setCenter({ lat: center.lat(), lng: center.lng() })
                this.findTripMidPoint(origin, destination)
                this.startEndMarker(origin, this.map)
                this.startEndMarker(destination, this.map)
            },
            findTripMidPoint(start, end) {
                var scope = this
                var directionsService = new google.maps.DirectionsService();
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                }
                directionsService.route(request, function (response, status) {
                    var numberofWaypoints = response.routes[0].overview_path.length
                    var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 2)]
                    var oneThirdPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 3)]
                    var oneFourthPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 4)]
                    var twoThirdsPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 3) * 2]
                    var threeFourthsPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 4) * 3]
                    var oneFifthPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 5)]
                    var twoFifthsPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 5) * 2]
                    var threeFifthsPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 5) * 3]
                    var fourFifthsPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 5) * 4]
                    var oneSixthPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 6)]
                    var twoSixthPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 6) * 2]
                    var fourSixthPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 6) * 4]
                    var fiveSixthPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 6) * 5]
                    if (status == google.maps.DirectionsStatus.OK) {
                        if (scope.stops == 1) {
                            scope.tripMarker({ lat: midPoint.lat(), lng: midPoint.lng() }, scope.map)
                        }
                        else if (scope.stops == 3) {
                            scope.tripMarker({ lat: oneFourthPoint.lat(), lng: oneFourthPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: midPoint.lat(), lng: midPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: threeFourthsPoint.lat(), lng: threeFourthsPoint.lng() }, scope.map)
                        } else if (scope.stops == 5) {
                            scope.tripMarker({ lat: oneSixthPoint.lat(), lng: oneSixthPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: twoSixthPoint.lat(), lng: twoSixthPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: midPoint.lat(), lng: midPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: fourSixthPoint.lat(), lng: fourSixthPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: fiveSixthPoint.lat(), lng: fiveSixthPoint.lng() }, scope.map)
                        } else if (scope.stops == 2) {
                            scope.tripMarker({ lat: oneThirdPoint.lat(), lng: oneThirdPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: twoThirdsPoint.lat(), lng: twoThirdsPoint.lng() }, scope.map)
                        } else if (scope.stops == 4) {
                            scope.tripMarker({ lat: oneFifthPoint.lat(), lng: oneFifthPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: twoFifthsPoint.lat(), lng: twoFifthsPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: threeFifthsPoint.lat(), lng: threeFifthsPoint.lng() }, scope.map)
                            scope.tripMarker({ lat: fourFifthsPoint.lat(), lng: fourFifthsPoint.lng() }, scope.map)
                        }
                    }
                })
            },
            tripMarker(location, map) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                })
                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent('<div><strong>' + place.name + '</strong></div><div><strong>'
                        + place.vicinity + '</strong></div><div><strong>' + place.rating + '</strong></div>')
                    infoWindow.open(this.map, this)
                })
            },
            startEndMarker(location, map){

            }

        },
        components: {
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
        position: fixed;
    }

    .marg-bot {
        margin-bottom: 1rem
    }

    .teal {
        background-color: #94bac4;
        color: white;
        font-size: 1.1rem;
        transition: all .3s linear;
    }
</style>