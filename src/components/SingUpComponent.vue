<template>
  <v-app>
    <v-main>
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
                      <v-form ref="form1" v-model="valid">
                        <v-text-field v-model="inputData.name" label="Name" :rules="nameRules" outlined
                          required></v-text-field>
                        <v-select :items="items" v-model="inputData.yerOfAl" label="Year of A/L" :rules="yearRules"
                          outlined></v-select>
                        <v-text-field v-model="inputData.address" label="Address" :rules="addressRules" outlined
                          required></v-text-field>
                        <v-text-field v-model="inputData.whatsapp" label="WhatsApp Number" :rules="whatsappRules" outlined
                          required></v-text-field>
                        <v-text-field v-model="inputData.email" label="Email" :rules="emailRules" outlined
                          required></v-text-field>
                      </v-form>

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="mb-3 mr-2 orange white--text" width="100" style="text-transform: none;"
                        @click=" ContinueFirstStep();">
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
                      <div class="blue white--text mb-4 py-2">
                        <h3 v-if="popupVal">Registration Number : <b>{{ regiNumber }}</b></h3>
                        <h4 v-if="!popupVal">Registration Number : {{ regiNumber }}</h4>
                        <small>Please remember your registration number</small>
                      </div>
                      <v-form ref="form2" v-model="valid2">
                        <v-text-field v-model="pass" label="Password" :rules="passwordRules" outlined type="password"
                          required></v-text-field>
                        <v-text-field v-model="cpass" label="Confirm Password" :rules="cpasswordRules" outlined
                          type="password" required></v-text-field>
                      </v-form>

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn class="mb-3 mr-2 orange white--text" width="100" style="text-transform: none;"
                        @click="e6 = 1" :disabled="loading">
                        Back
                      </v-btn>

                      <v-btn class="mb-3 ml-2 blue white--text" width="100" style="text-transform: none;"
                        @click="loader = 'loading'; submit();" :loading="loading" :disabled="loading">
                        Submit
                        <template v-slot:loader>
                          <span>Loading...</span>
                        </template>
                      </v-btn>

                    </v-card-actions>
                  </v-card>
                </v-stepper-content>
              </v-stepper>
            </v-card>
          </v-col>
        </v-row>
        <AlertMsg v-if="alertEnable" :alertData="alertData" />
      </v-container>
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
      alertEnable: false,
      loading: false,
      pass: '',
      cpass: '',
      popupVal: true,
      e6: 1,
      inputData: {},
      items: [],
      regiNumber: null,
      valid: true,
      valid2: true,
      nameRules: [v => !!v || 'Field is required',
      v => /^[A-Za-z ]+$/.test(v) || 'Invalid Name'],
      yearRules: [v => !!v || "Field is required"],
      addressRules: [v => !!v || "Field is required",
      v => /^[A-Za-z0-9\s/\\.,]+$/.test(v) || 'Invalid Address'],
      whatsappRules: [v => !!v || "Field is required", v => (/^\+94\d{9}$/.test(v) || /^\d{10}$/.test(v)) || 'Invalid WhatsApp Number for Sri Lanka'],
      emailRules: [v => !!v || "Field is required", v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      passwordRules: [v => !!v || "Field is required",
      v => (v && v.length > 5) || "Password length must be longer than 5 characters"],
      cpasswordRules: [v => !!v || "Field is required", v => (v == this.pass) || 'Password not match'],
      alertData: {}
    };
  },
  components: {
    AlertMsg
  },
  methods: {
    async ContinueFirstStep() {
      if (this.$refs.form1.validate()) {

        let alYear = this.inputData.yerOfAl[0] + this.inputData.yerOfAl[1] + this.inputData.yerOfAl[2] + this.inputData.yerOfAl[3]
        await axios.get(`/cmp/api/v1/registration/getRegiNum?year=${alYear}`)
          .then(response => {
            this.regiNumber = response.data.message
            this.inputData.regiNo = response.data.message

          }).catch(error => {
            console.error(error);

          });
        this.e6 = 2
      }
    },
    async submit() {
      this.alertEnable = false
      if (this.$refs.form2.validate()) {
        if (this.regiNumber != null) {
          let email = this.inputData.email
          let password = this.cpass
          this.inputData.role = 'student'

          this.loading = true
          await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              // User account created successfully
              this.inputData.userId = userCredential.user.uid
              console.log(userCredential.user.uid);
              axios.post(`/cmp/api/v1/registration/createUser?regiNum=${this.inputData.userId}`, this.inputData)
                .then(response => {
                  console.log(response.data.message)
                  if (response.data.message == "Success") {
                    this.alertData.name = "Sing Up Successful"
                    this.alertData.color = 'green'
                    this.alertEnable = true
                    router.push('/')
                  } else {
                    this.alertData.name = "Sing Up Error"
                    this.alertData.color = 'red'
                    this.alertEnable = true
                  }
                }).catch(error => {
                  console.error(error);
                  this.alertData.name = "Sing Up Error"
                  this.alertData.color = 'red'
                  this.alertEnable = true

                });

            })
            .catch((error) => {
              // Handle registration error
              this.alertData.name = "Sing Up Error"
              this.alertData.color = 'red'
              this.alertEnable = true
              console.error(error);
            });

          this.loading = false

        }

      }
    },
    async getAlYears() {
      await axios.get('/cmp/api/v1/alyears/getAlYears')
        .then(response => {
          this.items = response.data.message.years

        }).catch(error => {
          console.error(error);

        });

    }
  },
  mounted() {
    this.getAlYears();
    setInterval(() => {
      this.popupVal = !this.popupVal; // Toggle the value of 'test' every second
    }, 1000);
  },
};
</script>
  