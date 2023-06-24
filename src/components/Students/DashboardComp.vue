<template>
  <v-app>
    <v-container fluid >
      <v-row>

        <v-col>
          <v-card v-for="(data, n) in classData" :key="n" class="my-8" elevation="10">
            <v-card-title>{{ data.topic }}</v-card-title>
            <v-card-subtitle class="text-left">{{ data.subTopic }}</v-card-subtitle>
            <v-card-text>
              <div class="text-left">
              <v-btn v-if="data.isFree==1" :class="!$vuetify.breakpoint.xs?'ml-2 mb-2 white--text':'mb-2 white--text'" color="blue " small @click="openZoomLink(data.zoom)">Join class</v-btn>
              <v-btn v-else :disabled="data.paymentDone==1 || data.paymentDone==0" :class="!$vuetify.breakpoint.xs?'ml-2 mb-2 white--text':'mb-2 white--text'" :color="data.paymentDone==0?'orange lighten-1':data.paymentDone==1?'orange lighten-1':'blue'" small @click="openZoomLink(data.zoom)">{{ data.paymentDone==0?"enroll class":data.paymentDone==1?"pending":"Join class" }}</v-btn>
            </div>
              <div v-if="data.tutes.length > 0" class="text-left">
                <v-row v-for="(tutesData,m) in data.tutes" :key="m" :class="!$vuetify.breakpoint.xs?'blue lighten-5 my-1 mx-2':'white my-1 mr-3' ">
                  <v-col cols="9" md="10" sm="10">
                     <h4>
                    {{ tutesData.name }}</h4>
                  </v-col>
                  <v-col cols="1" md="2" sm="2" class="text-right">
                     <v-btn :disabled="(data.paymentDone==0 || data.paymentDone==1)&& data.isFree !=1" class="white--text" x-small color="green" @click="downloadPDF(tutesData.link)">Download <v-icon
        right
        dark
      >
      mdi-download
      </v-icon> </v-btn>
                  </v-col>
                </v-row>
              </div>
              
            </v-card-text>
          </v-card>
          
        </v-col>
      </v-row>
      
    </v-container>
    <!-- <AlertMsg v-if="alertEnable" :alertData="alertData"/> -->

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      classData: [
        { "classId":1,
          "isFree": 1,
          "paymentDone":0,
          "topic": "Combined Maths 2023 (A/L) - 1",
          "subTopic": "Differentiation",
          "tutes": [
            {
              "name": "Differentiation Tute 1",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            },
            {
              "name": "Differentiation Tute 2",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            }
          ],
          "zoom":"https://us04web.zoom.us/j/71918014924?pwd=8g9saFpaNsZAqlnBWUKrAxmiEG6NRL.1"
        },
        {"classId":2,
          "isFree": 0,
          "paymentDone":0,
          "topic": "Combined Maths 2023 (A/L) - 2",
          "subTopic": "Differentiation",
          "tutes": [
            {
              "name": "Differentiation Tute 1",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            },
            {
              "name": "Differentiation Tute 2",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            }
          ],
          "zoom":"https://us04web.zoom.us/j/71918014924?pwd=8g9saFpaNsZAqlnBWUKrAxmiEG6NRL.1"
        },
        {"classId":3,
          "isFree": 0,
          "paymentDone":1,
          "topic": "Combined Maths 2023 (A/L) - 3",
          "subTopic": "Differentiation",
          "tutes": [
            {
              "name": "Differentiation Tute 1",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            },
            {
              "name": "Differentiation Tute 2",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            }
          ],
          "zoom":"https://us04web.zoom.us/j/71918014924?pwd=8g9saFpaNsZAqlnBWUKrAxmiEG6NRL.1"
        },
        {"classId":4,
          "isFree": 0,
          "paymentDone":2,
          "topic": "Combined Maths 2023 (A/L) - 4",
          "subTopic": "Differentiation",
          "tutes": [
            {
              "name": "Differentiation Tute 1",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            },
            {
              "name": "Differentiation Tute 2",
              "link": "https://firebasestorage.googleapis.com/v0/b/cmp--academy.appspot.com/o/Tutes%2Flesson8.pdf?alt=media&token=97b1a155-80f9-49d6-be26-dcb837c8f105"
            }
          ],
          "zoom":"https://us04web.zoom.us/j/71918014924?pwd=8g9saFpaNsZAqlnBWUKrAxmiEG6NRL.1"
        }
      ]
    }
  },
  methods: {
    downloadPDF(pdfUrl) {
      window.open(pdfUrl, '_blank');

    },
    openZoomLink(zoomLink) {
      window.open(zoomLink, "_blank");
    }

  }
}

</script>