<template>
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
</style>