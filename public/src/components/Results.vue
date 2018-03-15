<template>
    <div class="results">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{result.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{result.vicinity}}</h6>
                <img :src="result.icon"
                <p class="card-text" v-if="result.rating > 4 && result.rating < 4.4">
                    Rating {{result.rating}} 
                    <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>

                </p>
                <p class="card-text" v-if="result.rating >= 4.5">
                        Rating {{result.rating}}
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half"></i>

                </p>
                <p v-else>Rating {{result.rating}}</p>
                
                <p class="card-text">Phone Number {{result.formatted_phone_number}}</p>

                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Results',
        props: ['result'],
        data() {
            return {
            }
        }
    }

</script>

<style scoped>
</style>