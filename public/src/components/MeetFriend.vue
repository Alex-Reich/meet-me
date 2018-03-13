<template>
    <div class="meet-friend">
        <iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?key=AIzaSyAPjJdiAmmeYPIveMMq-QfCZxx7m0VezsQ&q=Boise" allowfullscreen>
        </iframe>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                trip: {
                    origin: '',
                    destination: '',
                    travelMode: 'DRIVING'
                }
            }
        },
        methods: {
            
        }
    }
</script>
<style scoped>

</style>