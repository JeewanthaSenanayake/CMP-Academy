<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card v-for="(data, n) in classData" :key="n" class="my-8" elevation="10">
            <v-card-title>{{ data.className }}</v-card-title>
            <v-card-subtitle class="text-left">{{ data.subTopic }}</v-card-subtitle>
            <v-card-text>
              <div class="text-left">
                <v-btn v-if="data.isFree == 1" :class="!$vuetify.breakpoint.xs ? 'ml-2 mb-2 white--text' : 'mb-2 white--text'"
                  color="blue " small @click="openZoomLink(data.zoom)">Join class</v-btn>
                <v-chip v-else-if="data.paymentDone == 0" class="ma-2" color="red" outlined pill>
                  Please pay the class fees</v-chip>
                  <v-chip v-else-if="data.paymentDone == 1" class="ma-2" color="orange" outlined pill>
                    Pending for review
                  </v-chip>
                  <v-chip v-else-if="data.paymentDone == 3" class="ma-2" color="error" outlined pill>
                    Class fees payment rejected. Please contact admin
                  </v-chip>
                <v-btn v-else
                  :class="!$vuetify.breakpoint.xs ? 'ml-2 mb-2 white--text' : 'mb-2 white--text'"
                  color="blue" small @click="openZoomLink(data.zoom)">Join class</v-btn>
              </div>
              <div v-if="data.tutes.length > 0" class="text-left">
                <v-row v-for="(tutesData, m) in data.tutes" :key="m"
                  :class="!$vuetify.breakpoint.xs ? 'blue lighten-5 my-1 mx-2' : 'white my-1 mr-3'">
                  <v-col cols="9" md="10" sm="10">
                    <h4>
                      {{ tutesData.name }}</h4>
                  </v-col>
                  <v-col cols="1" md="2" sm="2" class="text-right">
                    <v-btn :disabled="(data.paymentDone != 2) && data.isFree == 0" class="white--text" x-small color="green"
                      @click="downloadPDF(tutesData.link)">Download <v-icon right dark>
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
import axios from '@/services/axiosConfig';
export default {
  data() {
    return {
      userData: JSON.parse(sessionStorage.getItem('userData')),
      classData: [
      ]
    }
  },
  methods: {
    downloadPDF(pdfUrl) {
      window.open(pdfUrl, '_blank');

    },
    openZoomLink(zoomLink) {
      window.open(zoomLink, "_blank");
    },
    async getAllClasses(){
      await axios.get(`/cmp/api/v1/class/registeredClassData?classType=${sessionStorage.getItem('sub_id')}&studentId=${this.userData.userId}`)
      .then((res)=>{
        this.classData = res.data.message;
      }).catch((err)=>{
        console.log(err);
      })
    }

  },
  created(){
    this.getAllClasses();
  }
}

</script>