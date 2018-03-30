<template>
  <div class="direction">
    <navbar class="marg-bot"></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-8">
          <div class="map-friend" id="direction-map"></div>
        </div>
        <div class="col-12 col-sm-4">
          <button class="btn btn-success btn-block" :href="identifyDevice()">Open in Google Maps</button>

          <div class="directionpanel" id="directions-panel"></div>
        </div>
        <!-- <div>
          <div v-if="show == false">
            <div v-if="geoShow == true">
              <label for="your-geo-location">Your GPS Location
                <i class="far fa-edit pointer edit-button" @click="geoShowToggle()"></i>
              </label>
              <h6 id="your-geo-location">{{this.originAddress}}</h6>
            </div>

          </div> -->
        <!-- <div v-if="show == true">
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
          </div> -->
        <!-- </div> -->
      </div>
    </div>

  </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  export default {
    name: 'Direction',
    data() {
      return {
        directionMap: {},
        device: ''
      }
    },
    mounted() {
      this.setDirectionMap();
    },
    methods: {
      setDirectionMap() {
        var start = this.$route.params.origin
        var end = this.$route.params.waypoint
        console.log('START/END', start, end)
        const map = document.getElementById('direction-map') // SEt MAP TO id="map" FROM ABOVE DIV
        const option = {
          zoom: 8,
          minZoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        this.directionMap = new google.maps.Map(map, option); // CREATES NEW MAP
        this.calcRoute(start, end)
      },
      calcRoute(start, end) {
        var scope = this;
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer()
        var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        }
        directionsService.route(request, function (result, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(result)
            directionsDisplay.setMap(scope.directionMap)
            directionsDisplay.setPanel(document.getElementById('directions-panel'))
          }
        })
      },
      identifyDevice() {
          var out = ''
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/windows phone/i.test(userAgent)) {

        }
        if (/android/i.test(userAgent)) {

        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          out = "comgooglemaps://?saddr=" + this.$route.params.origin + "&daddr=" + this.$route.params.waypoint +
            "&directionsmode=driving"
        }
        return out
      }
    },
    components: {
      Navbar
    }
  }

</script>

<style scoped>
  #direction-map {
    height: 87vh;
    width: 100%;
    border-radius: 10px;
    border: .1rem solid #dddddd;
    position: fixed;
  }

  #directions-panel {
    width: 100%;
    border-radius: 10px;
    border: .1rem solid #dddddd;
  }

  .marg-bot {
    margin-bottom: 1rem
  }

</style>
