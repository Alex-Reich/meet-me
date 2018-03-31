<template>
  <div class="direction">
    <navbar class="marg-bot"></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-8">
          <div class="map-friend" id="direction-map"></div>
        </div>
        <div class="col-12 col-sm-4">
          <a :href="this.directions" target="_blank">
            <button class="btn teal btn-block marg-bot">Open in Google Maps</button>
          </a>
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
        directions: "https://www.google.com/maps/dir/" + this.$route.params.origin + "/" + this.$route.params.waypoint
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

  a {
    text-decoration: none;
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