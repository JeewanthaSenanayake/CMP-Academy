<template>
    <v-app>
      <v-main>
        <v-container class="deep-purple lighten-4" fluid fill-height>
          <v-row  justify="center">
            <v-col  justify="center" cols="12" sm="8" md="4">
              <v-card>
                <v-card-title  class="text-center">CMP Academy</v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="login">
                    <v-text-field
                      v-model="inputData.regiNo"
                      label="Registration No"
                      outlined
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="inputData.password"
                      label="Password"
                      outlined
                      type="password"
                      required
                    ></v-text-field>
                    <v-btn type="submit" color="primary" block>Login</v-btn>
                  </v-form>
                  
                </v-card-text>
                <p class="py-3">Does not have an account?<v-btn style="text-transform: none;" text to="/sing-up" class="indigo--text"><b>Sign Up</b></v-btn></p>
              </v-card>
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
        inputData:{},
      };
    },
    methods: {

    },
  };
  </script>
  