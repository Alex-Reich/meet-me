<template>
  <div class="direction">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-8">
          <div class="sticky-top stick">
            <div class="map-friend hidden" id="map"></div>
          </div>
        </div>
        <div>
          <div v-if="show == false">
            <div v-if="geoShow == true">
              <label for="your-geo-location">Your GPS Location
                <i class="far fa-edit pointer edit-button" @click="geoShowToggle()"></i>
              </label>
              <h6 id="your-geo-location">{{this.originAddress}}</h6>
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
</template>

<script>
  import Navbar from './Navbar.vue'
  export default {
    name: 'Direction',
    data() {
      return {}
    },
    mounted(){
        this.setDirectionMap();
    },
    methods: {
        setDirectionMap(origin, destination) {
                var start = this.$route.params.origin
                var end = this.$route.params.destination
                // var bounds = new google.maps.LatLngBounds()
                // bounds.extend(start);
                // bounds.extend(end)
                const element = document.getElementById('map') // SEt MAP TO id="map" FROM ABOVE DIV
                const options = {
                    zoom: Math.ceil(Math.log2($(window).width())) - 8,
                    minZoom: 1,
                    // center: this.bounds,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                }
                this.map = new google.maps.Map(element, options); // CREATES NEW MAP

                var directionsService = new google.maps.DirectionsService();
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                }

                // this.addMarker(start, this.map)
                // this.addMarker(end, this.map)

                // this.map.fitBounds(bounds)
                // var center = this.map.getCenter()
                // this.map.setCenter({ lat: center.lat(), lng: center.lng() })
                // if (!this.trip.geolocation.lat) {
                //     this.findDrivingMidPoint(start, end)
                // } else {
                //     this.findDrivingMidPoint(this.trip.geolocation, end)
                // }
            },
    },
    components: {
      Navbar
    }
  }

</script>

<style scoped>


</style>
