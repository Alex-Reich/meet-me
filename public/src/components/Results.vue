<template>
    <div class="results">
        <h5 class="">{{result.name}}</h5>
        <div class="flexor">
            <div class="details">
                <p class="smaller"><span class="stars">{{result.rating}}</span> <span class="stars" :id="result.id"></span> | <span :id="result.place_id"></span></p>
                <p class="text-muted smaller">{{result.vicinity}}</p>
                <p class="text-muted smaller">{{result.formatted_phone_number}} - <a :href="result.website">Website</a></p> 
            </div>
            <div >
                <img class="res-image" :src="this.photoImage" height="75" width="75">
            </div>
        </div>
            <!-- <div>
                <div class="stars" :id="result.id"></div>
                <div class="bg-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div> -->
    </div>
</template>

<script>

    export default {
        name: 'Results',
        props: ['result'],
        data() {
            return {
                photoImage: ''
            }
        },
        mounted() {
            this.getStar(this.result)
            this.getPrice(this.result)
            this.getImage(this.result)
        },
        methods: {
            getImage(result){
                if(!result.photos){
                   return this.photoImage = 'http://placehold.it/75x75'
                }

                this.photoImage = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' +
                result.photos[0].photo_reference +
                '&sensor=false' +
                '&key=AIzaSyCRj2cIdsswa8ob1lrGiHco48vVlV_mW0U'

            },
            getPrice(result){
                var priceElem = document.getElementById(result.place_id)
                var template = ''
                if(!result.price_level){
                    template =  `<span style="color: #d1d1d1;">$$$$</span>`
                }
                if(result.price_level == 1){
                    template = `$<span style="color: #d1d1d1;">$$$</span>`
                } else if(result.price_level == 2){
                    template = `$$<span style="color: #d1d1d1;">$$</span>`
                } else if(result.price_level == 3){
                    template = `$$$<span style="color: #d1d1d1;">$</span>`
                } else if(result.price_level == 4){
                    template = `$$$$`
                }
                priceElem.innerHTML = template
            },
            getStar(result) {
                console.log('RESULT', result)
                var starElem = document.getElementById(result.id)
                var template = ''
                if (!result.rating) {
                   return starElem.innerHTML = `No Ratings`
                }
                for (let i = 1; i <= result.rating; i++) {
                    template += `<i class="fas fa-star"></i>`
                }
                if (result.rating % 1 > .3 && result.rating % 1 <= .8) {
                    template += `<i class="fas fa-star-half"></i>`
                }
                if (result.rating == 4.9) {
                    template += `<i class="fas fa-star"></i>`
                }
                starElem.innerHTML = template
            }
        }
    }

</script>

<style scoped>
    .smaller {
        font-size: .85rem
    }
    h5 {
        font-size: 1.05rem;
    }
    p{
        margin-bottom: 0;
        color: #6c757d;
    }
    .res-image{
        object-fit: cover
    }
    .flexor {
        display: flex;
        justify-content: space-between;
        align-items: flex-start
    }
    .stars {
        color: orangered;
    }
    .list-group-item{
        padding: .75rem
    }
</style>