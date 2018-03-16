<template>
    <div class="results">
        <h5 class="">{{result.name}}</h5>
        <h6 class="mb-2 text-muted">{{result.vicinity}}</h6>
        <div>
            <p>{{result.rating}}
                <span class="stars" :id="result.id"></span>
            </p>
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
            }
        },
        mounted() {
            this.getStar(this.result)
        },
        methods: {
            getStar(result) {
                console.log('RESULT', result)
                var starElem = document.getElementById(result.id)
                var template = ''
                if (!result.rating) {
                    return starElem.innerHTML = 'No Ratings'
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
    p {
        margin-bottom: 0;
        color: orangered;

    }

    .flexor {
        display: flex;
        justify-content: space-between;
    }

    .stars {
        /* position: absolute;
        top: 0;
        left: 0; */
    }

    /* .bg-stars {
        color: #eaeaea;
        position: absolute;
        z-index: -10;
        top: 0;
        left: 0;

    } */
</style>