<template>
  <div class="results" :class="isHoveredOn">
    <div class="flexor">
      <h5>{{result.name}}</h5>
      <i data-toggle="modal" :data-target="'#'+result.place_id" class="far email-button pointer fa-envelope"></i>
    </div>

    <div class="flexor">
      <div class="details">
        <p class="smaller">
          <span class="stars">{{result.rating}}</span>

          <span v-if="result.rating == undefined" class="stars">No Rating</span>
          <span v-if="result.rating > .3 && result.rating <= .8" class="stars">
            <i class="fas fa-star-half"></i>
          </span>
          <span v-if="result.rating > .8 && result.rating <= 1.2" class="stars">
            <i class="fas fa-star"></i>
          </span>
          <span v-if="result.rating > 1.2 && result.rating <= 1.8" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
          </span>
          <span v-if="result.rating > 1.8 && result.rating <= 2.2" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </i>
          </span>
          <span v-if="result.rating > 2.2 && result.rating <= 2.8" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
          </span>
          <span v-if="result.rating > 2.8 && result.rating <= 3.2" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </i>
          </span>
          <span v-if="result.rating > 3.2 && result.rating <= 3.8" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
          </span>
          <span v-if="result.rating > 3.8 && result.rating <= 4.2" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </i>
          </span>
          <span v-if="result.rating > 4.2 && result.rating <= 4.8" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
          </span>
          <span v-if="result.rating > 4.8 && result.rating <= 5.0" class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </i>
          </span>

          |
          <span v-if="result.price_level == undefined" style="color: #d1d1d1;"></span>
          <span v-if="result.price_level == 1">$
            <span style="color: #d1d1d1;">$$$</span>
          </span>
          <span v-if="result.price_level == 2">$$
            <span style="color: #d1d1d1;">$$</span>
          </span>
          <span v-if="result.price_level == 3">$$$
            <span style="color: #d1d1d1;">$</span>
          </span>
          <span v-if="result.price_level == 4">$$$$</span>

        </p>
        <p class="text-muted smaller">{{result.vicinity}}</p>
        <p class="text-muted smaller">{{result.formatted_phone_number}} -
          <a :href="result.website" target="_blank">Website</a>
        </p>
        <div>
          <a class="smaller" :href="getDirections()" target="_blank">Your Directions |</a>
          <a class="smaller" :href="getFriendsDirections()" target="_blank"> Friend's Directions</a>
        </div>
      </div>
      <div>
        <img class="res-image" :src="getImage(result)" height="75" width="75">
      </div>
    </div>
    <!--MODAL MODAL MODAL MODAL-->
    <div class="modal fade" :id="result.place_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Email Directions!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="sendEmail">
            <div class="modal-body">
              <div class="form-group">
                <label>Your Friends Email: </label>
                <input type="email" placeholder="jane@doe.com" v-model="email.emailAddress" class="form-control">
              </div>
              <div class="form-group">
                <label>Email Subject: </label>
                <input type="text" :placeholder="email.subject" v-model="email.subject" class="form-control">
              </div>
              <div>
                <div>
                  <label>Example Email: </label>
                  <img src="../assets/email-screen.jpg" class="img-width">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Send Email</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Results',
    props: ['result', 'isHovered', 'origin', 'destination'],
    data() {
      return {
        email: {
          subject: "Directions to MeetMe@ Location",
          message: {
            name: this.result.name,
            friendsDirections: ""
          }
        }
      }
    },
    mounted(){
      this.originAddress;
    },
    watch: {
      emailSuccess: function (value) {
        $('#' + value).modal('hide')
      }
    },
    methods: {
      getDirections() {
        var url = '//meetme-at.herokuapp.com/#/direction/'
        var resultFormattedAddress = this.result.formatted_address.split(' ').join('+')
        return url+encodeURIComponent(this.originAddress)+'/'+encodeURIComponent(resultFormattedAddress)+'/'+encodeURIComponent(this.destination)
      },
      getFriendsDirections() {
        var url = '//meetme-at.herokuapp.com/#/direction/'
        var resultFormattedAddress = this.result.formatted_address.split(' ').join('+')
        return url+encodeURIComponent(this.destination)+'/'+encodeURIComponent(resultFormattedAddress)+'/'+encodeURIComponent(this.originAddress)
      },
      getImage(result) {
        var photoImage
        if (!result.photos) {
          return photoImage = 'https://placehold.it/75x75'
        }

        photoImage = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=' +
          result.photos[0].photo_reference +
          '&sensor=false' +
          '&key=AIzaSyAKRamCx2fGfdUevOl9uYVPLce_FEv-Je4'

        return photoImage

      },
      getOriginAddress(){

      },
      sendEmail() {
        this.email.message.friendsDirections = '//meetme-at.herokuapp.com/#/direction/'+this.destination+'/'+this.result.formatted_address.split(' ').join('+')+'/'+this.originAddress
        this.$store.dispatch('sendEmail', {
          email: this.email,
          id: this.result.place_id
        })
      }
    },
    computed: {
      roadResults() {
        return this.$store.state.roadResults
      },
      isHoveredOn() {
        return this.isHovered == this.result.place_id ? 'hovered' : 'isHoveredOn'
      },
      emailSuccess() {
        return this.$store.state.emailSuccess
      },
      originAddress() {
        return this.$store.state.originAddress.split(' ').join('+')
      }
    }
  }

</script>

<style scoped>
  .email-button {
    color: #bbbbbb;
    transition: all .2s linear;
    font-size: .75rem;
  }

  .email-button:hover {
    color: #333;
  }

  .pointer {
    cursor: pointer;
  }

  .details {
    flex: 2;
    padding-right: 1rem;
  }

  .results {
    transition: all .2s linear;
    padding: .75rem 1.25rem;
  }

  .hovered {
    background-color: #d6bc9f75
  }

  .smaller {
    font-size: .85rem
  }

  h5 {
    font-size: 1.05rem;
  }

  p {
    margin-bottom: 0;
    color: #6c757d;
  }

  .res-image {
    object-fit: cover
  }

  .mar-bot {
    margin-bottom: .5rem
  }

  .flexor {
    display: flex;
    justify-content: space-between;
    align-items: flex-start
  }

  .stars {
    color: orangered;
  }

  .list-group-item {
    padding: .75rem
  }

  #email-body {
    width: 100%
  }

  .img-width {
    width: 85%;
  }

</style>
