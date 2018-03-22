<!-- <template>
    <div class="map-friend" id="map">

    </div>
</template>
<script>
    export default {
        name: "MapFriend",
        props: ["origin", "destination"],
        data(){
            return {
                map: {},
                service: ''
            }
        },
        mounted(){
            this.initMap()
        },
        methods: {
            initMap(){
                const element = document.getElementById('map')
                const options = {
                    zoom: 14,
                    center: new google.maps.LatLng(51.501527, -0.1921837)
                }
                this.map = new google.maps.Map(element, options)
                console.log("this is our origin!!!", this.origin)
                console.log("this is our DESTINATION!!!", this.destination)
            }
        }
    }
</script>
<style scoped>
    #map {
        height: 600px;
        width: 450px;
    }
</style> -->

// POLYLINE

directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var numberofWaypoints = response.routes[0].overview_path.length
      var midPoint = response.routes[0].overview_path[parseInt(numberofWaypoints / 2)]
      scope.roadMidwayMarker({
        lat: midPoint.lat(),
        lng: midPoint.lng()
      }, scope.map)
    }
scope.createPolyline(response) // ADDED
        })
      },
      createPolyline(directionResults) { // vvvv ADDED
          console.log('DIRECTION RESULTS', directionResults)
        if (this.roadDirectionLine.length > 0) {
          var directLine = this.roadDirectionLine
          for (var i = 0; i < directLine.length; i++) {
            var polyline = directLine[i]
            this.deletePolyline(polyline)
          }
        }
        var line = new google.maps.Polyline({
          path: directionResults.routes[0].overview_path,
          strokeOpacity: .95,
          strokeColor: '#3c6cae',
          strokeWeight: 10,
        })
        line.setMap(this.map)
        this.roadDirectionLine.push(line);
      },
      deletePolyline(polyline){
        polyline.setMap(null)
        this.roadDirectionLine = []