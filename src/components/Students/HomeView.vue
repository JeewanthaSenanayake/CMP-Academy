<template>
  <v-app>
    <v-main>
      <v-container class="deep-purple lighten-4" fluid fill-height>
        <!-- <v-row>
      <v-col
        class="mt-1"
        offset="1"
        cols="10"
        offset-sm="2"
        sm="8"
        offset-md="3"
        md="6"
        offset-lg="4"
        lg="4"
      >
        <span class="black--text" style="font-weight: 600; font-size: x-large"
          >Select your subject</span
        >
      </v-col>
    </v-row> -->
        <v-row>
          <v-col cols="12" offset-sm="0" sm="12" offset-md="1" md="10" offset-lg="1" lg="10">

            <v-item-group>

              <v-sheet class="mx-auto align-center" max-width="100%">
                <v-slide-group v-model="model" center-active class="pa-4 d-flex align-center deep-purple lighten-4">
                  <v-slide-item v-for="(img, i) in image" :key="i" v-slot:default="{ active, toggle }"
                    class="d-flex align-self-center deep-purple lighten-4" style="flex-direction: column">

                    <div>

                      <v-card :color="active ? '#21d2a3' : 'deep-purple lighten-4'"
                        style="border: 4px solid #24d483; border-radius: 13px" class="ma-2" :height="active ? 450 : 400"
                        :width="active ? 350 : 350" @click="
                          toggle();
                        callSelectedRoute(img.survey, img.id);
                        clicked = true;
                        ">

                        <v-img :src="img.src" style="height: inherit">
                          <v-row class="fill-height" align="end" justify="center">
                            <v-scale-transition>
                              <a style="text-decoration: none"><span v-if="active" class="white--text">
                                  <v-icon color="#21d2a3" size="48">mdi-checkbox-marked-circle</v-icon>
                                  <br />SELECT
                                </span></a>
                              <!-- :href="img.survey" -->
                            </v-scale-transition>
                          </v-row>
                        </v-img>
                      </v-card>
                      <div>
                        <span :class="active ? 'font-large' : 'font-small'">
                          <h1> <strong> {{ img.title }}</strong></h1>
                          <p>{{ img.name }}</p>
                        </span>
                      </div>
                    </div>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-item-group>
          </v-col>
          <v-col v-if="$vuetify.breakpoint.xs">
            <v-btn class="white--text" color="orange lighten-2" :to="directRouterPath"> Continue </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- <v-col></v-col> -->
          <!-- <v-col
        class="pt-1 pb-1"
        cols="7"
      >
        <p class="mt-2 font-plain">
          {{ discription }}
        </p>
      </v-col> -->
          <v-col v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl">
            <v-btn class="white--text" color="orange lighten-2" :to="directRouterPath"> Continue </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {

      username: this.$route.params.username,
      clicked: false,
      model: 1,
      image: [
        {
          id: 0,
          src: require("@/assets/fiverr.jpg"),
          title: "Chemistry",
          name: "Akila Gunasekara",
          survey: "/individualOptionsSurvey",
          discrip: "This category includes National Guide, Chauffer Guide, Area Guide, Site Guide, Tourist Driver, Tourist Car, Tourist Van, Tourist Bus, Bus Assistant and Safari Jeep",
        },
        {
          id: 1,
          src: require("@/assets/fiverr.jpg"),
          title: "Combined Maths",
          name: "Jeewantha Senanayake",
          survey: "/accommodationServiceSurvey",
          discrip: "This category includes Boutique Hotel, Bungalow, Rented Home, Heritage Home, Heritage Bungalow, Guest House, Boutique Villa, 1 or 2 star hotel, 3 star, 4 star, 5 star, Eco Lodge, Boutique Hotel, Heritage Hotel, Apartment Hotel, Camping Site, Tourist Hostal, Food Court, Tourist Hotel, Tourist Friendly Eating Places, Travel Agency, DESTINATION EVENT MANAGEMENT COMPANIES (DEMC), SPA and Wellness Center, Water Sport Center, Tourist Shop, Rented Apartment, Hostal Accommodation, Tourist Hotel, Home Stay Unit, Tourist Restaurant, Spice Gardens and Themed Accommodation and value added Activities",
        },
        {
          id: 2,
          src: require("@/assets/fiverr.jpg"),
          title: "Physics",
          name: "Ishan Karunarathna",
          survey: "/otherServiceOptionSurvey",
          discrip: "This category includes Sky Diving, Para Moter, Paragliding, Hot Air Balonning, Water Skiing/ Wake Boarding, Rafting/ White Water Rafting, Kite Surfing/ Wind Surfing, Snorkeling & Scuba Diving, Sport Fishing, Sailing, Rowing, Leisure Boat & Small Vessel Operation, Kite Surfing/ Wind Surfing, Jet Skiing, Houseboats, Whale & Dolphin Watching and Canoeing & Kayaking, Dragon Boating",
        },
      ],
      directRouterPath: "/accommodationServiceSurvey",
      // /otherServiceOptionSurvey
      discription: "",

    };
  },
  methods: {
    callSelectedRoute(data, id) {
      this.directRouterPath = data
      sessionStorage.setItem("welcom_id", id);

    },
    startTimer() {
      // Update the timer every second (1000 milliseconds)
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    },
    stopTimer() {
      // Stop the timer
      clearInterval(this.timerInterval);
    },

  },
  created() {
    // if (sessionStorage.getItem("welcom_id") != null) {
    //   this.model = sessionStorage.getItem("welcom_id")
    // } else {
    //   this.model = 1
    // }

  },
  mounted() {
    // Start the timer when the component is mounted
    // this.startTimer();
    
  },
};
</script>
<style>
.font-large {
  font-weight: 500;
}

.font-small {
  font-weight: 400;
}
</style>
