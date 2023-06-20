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
              <v-btn  color="orange lighten-1" small @click="openZoomLink(data.zoom)">Join class</v-btn>
            </div>
              <div v-if="data.tutes.length > 0" class="text-left">
                <v-row v-for="(tutesData,m) in data.tutes" :key="m" :class="!$vuetify.breakpoint.xs?'blue lighten-5 my-1':'white my-1' ">
                  <v-col cols="9" md="10" sm="10">
                    <h4>
                    {{ tutesData.name }}</h4>
                  </v-col>
                  <v-col cols="1" md="2" sm="2" class="text-right">
                     <v-btn class="" x-small color="primary" @click="downloadPDF(tutesData.link)">Download</v-btn>
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
        {
          "isFree": 0,
          "topic": "Combined Maths 2023 (A/L)",
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
        {
          "isFree": 0,
          "topic": "Combined Maths 2023 (A/L)",
          "subTopic": "Differentiation",
          "tutes": [],
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