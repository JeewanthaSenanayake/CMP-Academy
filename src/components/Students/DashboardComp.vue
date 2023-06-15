<template>
  <v-app>
    <v-main>
      <v-container class="deep-purple lighten-4" fluid fill-height>
        <v-row>
          <v-col cols="12">
            <!-- <v-col justify="center" cols="12" sm="8" md="4"> -->
            <v-card v-for="item in template" :key="item.id" class="my-3">
              <v-card-text>
                <v-row>
                  <v-col cols="2"  >
                    <!-- <img :src="item.img" :style="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs?'width:100% height:auto; ':'width: 100%; height:auto; autoobject-fit: contain;' "> -->
                    <v-avatar style="width:100%; height:auto;">
                      <img :src="item.img">
                    </v-avatar>
                  </v-col>
                  <v-col cols="10" ></v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- <AlertMsg v-if="alertEnable" :alertData="alertData"/> -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      template: [
        {
          "teacherName": "Jeewantha Senanayake",
          'id': 1,
          "img": require('@/assets/fiverr.jpg')
        },
        {
          "teacherName": "Akila Gunasekara",
          "img": require('@/assets/fiverr.jpg'),
          "id": 2
        },
        {
          "teacherName": "Ishan Karunarathne",
          "img": require('@/assets/fiverr.jpg'),
          "id": 3
        }
      ]
    }
  }
}

</script>