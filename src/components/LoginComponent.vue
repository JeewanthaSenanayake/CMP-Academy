<template>
  <v-app>
    <v-main>
      <v-container class="deep-purple lighten-4" fluid fill-height>
        <v-row justify="center">
          <v-col justify="center" cols="12" sm="8" md="4">
            <v-card>
              <v-card-title class="text-center">CMP Academy</v-card-title>
              <v-card-text>
                <v-form ref="form1" v-model="valid">
                  <v-text-field v-model="inputData.regiNo" label="Registration No"
                    :rules="[v => !!v || 'Registration No is required']" outlined required></v-text-field>
                  <v-text-field v-model="inputData.password" label="Password" outlined type="password"
                    :rules="[v => !!v || 'Password is required']" required></v-text-field>

                </v-form>
                <v-btn :disabled="disableBtn" type="submit" color="primary" block @click="login();">Login</v-btn>
              </v-card-text>
              <p class="py-3">Does not have an account?<v-btn style="text-transform: none;" text to="/sing-up"
                  class="indigo--text"><b>Sign Up</b></v-btn></p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <AlertMsg v-if="alertEnable" :alertData="alertData"/>
    </v-main>
  </v-app>
</template>
  
<script>
import axios from '@/services/axiosConfig';
import firebase from '@/services/firebase';
import router from '@/router/index'
import AlertMsg from '@/components/DisplayAlerts.vue'

export default {
  data() {
    return {
      disableBtn : false,
      alertEnable:false,
      inputData: {},
      userData: {},
      alertData:{},
    };
  },
  components:{
    AlertMsg
  },
  methods: {
    async login() {
      this.alertEnable = false
      if (this.$refs.form1.validate()) {
        this.disableBtn = true
        await axios.get(`/cmp/api/v1/registration/getUser?regiNum=${this.inputData.regiNo}`)
          .then(response => {
            if (response.data.message != 'no user found') {
              this.userData = response.data.message.data
              firebase.auth().signInWithEmailAndPassword(this.userData.email, this.inputData.password)
                .then((userCredential) => {
                  // User logged in successfully
                  if(userCredential.user.uid == this.userData.userId){
                    sessionStorage.clear();
                    sessionStorage.setItem('userData', JSON.stringify(this.userData));
                    this.alertEnable = true
                    this.alertData.name = "Login Successful"
                    this.alertData.color = 'green'
                    router.push('/home')
                  }else{
                    this.alertEnable = true
                    this.alertData.name = "Username or Password Incorrect"
                    this.alertData.color = 'red'
                  }
                  console.log(userCredential.user.uid);
                })
                .catch((error) => {
                  // Handle login error
                  this.alertEnable = true
                  this.alertData.name = "Username or Password Incorrect"
                  this.alertData.color = 'red'
                  console.error(error);
                });
            }else{
              this.alertEnable = true
              this.alertData.name = "Username or Password Incorrect"
              this.alertData.color = 'red'
            }
          }).catch(error => {
            this.alertEnable = true
            this.alertData.name = "Username or Password Incorrect"
            this.alertData.color = 'red'
            console.error(error);
          });
          this.disableBtn = false
      }
    }
  },
};
</script>
  