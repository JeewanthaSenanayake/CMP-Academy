<template>
  <v-app>
    <v-content>
      <v-container class="deep-purple lighten-4" fluid fill-height>
        <v-row justify="center">
          <v-col justify="center" cols="12" sm="8" md="4">
            <v-card>
              <v-card-title class="text-center">CMP Academy</v-card-title>
              <v-stepper v-model="e6" vertical>
                <v-stepper-step :complete="e6 > 1" step="1">
                  Student information
                  <small>Step 1 of 2</small>
                </v-stepper-step>

                <v-stepper-content step="1">
                  <v-card color="white">
                    <v-card-text>
                      <v-form @submit.prevent="login">
                        <v-text-field v-model="inputData.name" label="Name" outlined required></v-text-field>
                        <v-select :items="items" label="Year of A/L" outlined></v-select>
                        <v-text-field v-model="inputData.address" label="Address" outlined required></v-text-field>
                        <v-text-field v-model="inputData.whatsapp" label="WhatsApp Number" outlined
                          required></v-text-field>
                        <v-text-field v-model="inputData.email" label="Email" outlined required></v-text-field>
                      </v-form>

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="mb-3 mr-2 orange white--text" width="100" style="text-transform: none;"
                        @click="e6 = 2; getAlYears();">
                        Continue
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">
                  Login details
                  <small>Step 2 of 2</small>
                </v-stepper-step>

                <v-stepper-content step="2">
                  <v-card color="white">
                    <v-card-text>
                      <v-form @submit.prevent="login">
                        <v-text-field v-model="username" label="Registration No" outlined required></v-text-field>
                        <v-text-field v-model="password" label="Password" outlined type="password"
                          required></v-text-field>
                      </v-form>

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn class="mb-3 mr-2 orange white--text" width="100" style="text-transform: none;"
                        @click="e6 = 1">
                        Back
                      </v-btn>
                      <v-btn class="mb-3 mr-2 blue white--text" width="100" style="text-transform: none;" @click="e6 = 2">
                        Submit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>
              </v-stepper>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
  
<script>
import ApiService from '@/services/ApiService';
export default {
  data() {
    return {
      e6: 1,
      inputData: {},
      items: []
    };
  },
  methods: {
    async getAlYears() {
      try {
        // this.loading = true;
        let data = await ApiService.get('/cmp/api/v1/alyears/getAlYears');
        this.items = data.years
        // this.loading = false;

      } catch (error) {
        // Handle error
      }
    }
  },
  mounted() {
    this.getAlYears()
  }
};
</script>
  