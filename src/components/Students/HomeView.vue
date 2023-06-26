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
                        callSelectedRoute(img.id);
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
            <v-btn class="white--text" color="orange lighten-2" @click="continueBtn"> Continue </v-btn>
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
            <v-btn class="white--text" color="orange lighten-2" @click="continueBtn"> Continue </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import router from '@/router/index'
export default {
  data() {
    return {
      clicked: false,
      model: -1,
      image: [
        {
          id: 0,
          src: "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/fiverr.jpg?alt=media&token=f1a6e333-dd26-4d14-b4ce-13981698d163",
          title: "Chemistry",
          name: "Akila Gunasekara",
        },
        {
          id: 2,
          src: "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/fiverr.jpg?alt=media&token=f1a6e333-dd26-4d14-b4ce-13981698d163",
          title: "Physics",
          name: "Ishan Karunarathna",
        },
        {
          id: 1,
          src: "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/fiverr.jpg?alt=media&token=f1a6e333-dd26-4d14-b4ce-13981698d163",
          title: "Combined Maths",
          name: "Jeewantha Senanayake",
        },
      ],

    };
  },
  methods: {
    continueBtn(){
      let id = this.image[this.model].id
      if(id == 0){
        sessionStorage.setItem('sub_id', "chemistry")
      }else if(id==1){
        sessionStorage.setItem('sub_id', "maths")
      }else if(id==2){
        sessionStorage.setItem('sub_id', "physics")
      }
      
      router.push('/dashboard')
    },
    startTimer() {
      // Update the timer every second (1000 milliseconds)
      this.timerInterval = setInterval(() => {
        this.timer++;
        this.model++;
        if(this.model>1){
          clearInterval(this.timerInterval)
        }
      }, 750);
    },

  },
  created() {
    //not login auto redirect loging page
    let userData = sessionStorage.getItem('userData')
    if(userData == null){
      router.push('/')
    }
  },
  mounted() {
    this.startTimer()
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
