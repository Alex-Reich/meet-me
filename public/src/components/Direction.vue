<template>
  <div class="direction">
    <navbar class="marg-bot"></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-8">
          <div class="map-friend" id="direction-map"></div>
        </div>
        <div class="col-12 col-sm-4">
          <button class="btn btn-success btn-block" :href="this.device" @click="identifyDevice()">Open in Google Maps</button>

          <div class="directionpanel" id="directions-panel"></div>
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
          this.device = "maps://maps.google.com/maps?=saddr=" + this.$route.params.origin + "&daddr=" + this.$route.params
            .waypoint +
            "&directionsmode=driving"
        }
        if (/android/i.test(userAgent)) {
          this.device = "maps://maps.google.com/maps?=saddr=" + this.$route.params.origin + "&daddr=" + this.$route.params
            .waypoint +
            "&directionsmode=driving"
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          this.device = "maps://maps.google.com/maps?=saddr=" + this.$route.params.origin + "&daddr=" + this.$route.params
            .waypoint +
            "&directionsmode=driving"
        }
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
