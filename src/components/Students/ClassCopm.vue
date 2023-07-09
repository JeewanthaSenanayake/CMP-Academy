<template>
    <v-app>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-card v-for="(data, n) in items" :key="n" class="my-8" elevation="10">
                        <v-card-title>{{ data.className }}</v-card-title>
                        <v-card-subtitle class="text-left">{{ data.yerOfAl }}</v-card-subtitle>
                        <v-card-text>
                            <p class="text-left">Class Fee : Rs.{{ data.fee }}</p>
                            <p class="text-left">Class time : {{ data.classDay }}</p>
                            <div class="text-left">
                                <v-btn v-if="data.isRegistered != true"
                                    :class="!$vuetify.breakpoint.xs ? 'ml-2 mb-2 white--text' : 'mb-2 white--text'"
                                    color="orange " small @click="registerToClass(data.id)">Register the class</v-btn>
                                <v-chip v-else-if="data.fee == 0" class="ma-2" color="success" outlined pill>
                                    You successfully registered for this month
                                </v-chip>
                                <v-btn v-else-if="data.isPaymentDone == 0"
                                    :class="!$vuetify.breakpoint.xs ? 'ml-2 mb-2 white--text' : 'mb-2 white--text'"
                                    color="blue" small @click="dialog = true; classId = data.id; amount=data.fee">Rs.{{ data.fee }}
                                    Pay</v-btn>

                                <v-chip v-else-if="data.isPaymentDone == 1" class="ma-2" color="orange" outlined pill>
                                    Pending for review
                                </v-chip>
                                <v-chip v-else-if="data.isPaymentDone == 2" class="ma-2" color="success" outlined pill>
                                    You successfully registered for this month
                                </v-chip>
                                <v-chip v-else-if="data.isPaymentDone == 3" class="ma-2" color="error" outlined pill>
                                    Class fees payment rejected. Please contact admin
                                </v-chip>
                            </div>
                        </v-card-text>
                    </v-card>

                </v-col>
            </v-row>
            <v-dialog v-model="dialog" persistent max-width="50%">
                <v-card class="pb-3">
                    <v-card-title>
                        Upload Payment Slip
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form2" v-model="valid2">

                            <v-file-input v-model="selectedFiles"  label="Upload Payment Slip"
                                :rules="fileRules" small-chips counter show-size truncate-length="12"
                                accept="image/*,.pdf"></v-file-input>

                            <v-row>

                                <v-col cols="11" sm="5">
                                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent
                                        width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="date" label="Picker in dialog" :rules="fileRules"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker color="green" v-model="date" type="month" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="green" @click="modal = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="green" @click="$refs.dialog.save(date)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-action>
                        <v-btn absolute top right icon x-small @click="dialog = false"> <v-icon
                                class="red--text">mdi-window-close</v-icon> </v-btn>
                        <v-btn class="green white--text" @click="uploadFile" :loading="loading1">upload</v-btn>
                    </v-card-action>

                </v-card>
            </v-dialog>
        </v-container>
        <v-snackbar v-model="massage.chip" :color="massage.color" top rounded="pill">
            <div class="text-center">{{ massage.text }}</div>
        </v-snackbar>
    </v-app>
</template>
  
<script>
import axios from '@/services/axiosConfig';
import firebase from '@/services/firebase';
import 'firebase/compat/storage';
export default {

    data() {
        return {
            // isPaymentDone: 0,   //0- not paid, 1-paid not accepted, 2-paid accepted, 3-rejected
            items: [],
            userData: JSON.parse(sessionStorage.getItem('userData')),
            alertData: {},
            alertEnable: false,
            massage: {
                chip: false,
                text: '',
                color: ''
            },
            dialog: false,
            fileRules: [v => !!v || 'Field is required'],
            selectedFiles: null,
            date: null,
            modal: false,
            slipData: {},
            classId: null,
            loading1: false,
            valid2:false,
            amount:0
        }
    },
    methods: {
        async uploadFile() {
            if (this.$refs.form2.validate()) {
                this.loading1 = true
                const storage = firebase.storage();
                const storageRef = storage.ref();
                const folderRef = storageRef.child('Payments');
                const file = this.selectedFiles
                const fileRef = folderRef.child(file.name);

                await fileRef.put(file)
                    .then(() => {
                        // File uploaded successfully
                        // Get the download URL of the uploaded file
                        fileRef
                            .getDownloadURL()
                            .then(url => {

                                this.slipData = {
                                    "name": file.name,
                                    "uid": this.userData.userId,
                                    "month": this.date,
                                    "link": url,
                                    "type": sessionStorage.getItem('sub_id'),
                                    "id": this.classId,
                                    "status": 1,
                                    "amount": this.amount
                                };
                                axios.put(`/cmp/api/v1/payment/uploadSilp?type=${sessionStorage.getItem('sub_id')}`, this.slipData)
                                    .then(async response => {
                                        if ((response.data.message == "Success")) {
                                            await this.getAlclass();
                                            this.massage.chip = true;
                                            this.massage.text = 'Slip Upload Successful';
                                            this.massage.color = 'success';
                                            this.loading1 = false;
                                            this.dialog = false
                                        } else {
                                            this.massage.chip = true;
                                            this.massage.text = 'Slip Upload Failed';
                                            this.massage.color = 'error';
                                            this.loading1 = false;
                                            this.dialog = false
                                        }
                                    })
                                    .catch(error => {
                                        this.massage.chip = true;
                                        this.massage.text = 'Slip Upload Failed';
                                        this.massage.color = 'error';
                                        this.loading1 = false;
                                        this.dialog = false
                                        console.error('Error getting download URL:', error);
                                    })


                            })
                            .catch(error => {
                                this.massage.chip = true;
                                this.massage.text = 'Slip Upload Failed';
                                this.massage.color = 'error';
                                this.loading1 = false;
                                this.dialog = false
                                console.error('Error getting download URL:', error);
                                return;
                            });
                    })
                    .catch(error => {
                        // Handle error

                        this.massage.chip = true;
                        this.massage.text = 'Slip Upload Failed';
                        this.massage.color = 'error';
                        this.loading1 = false;
                        this.dialog = false
                        console.error('Error uploading file:', error);
                        return;
                    });
            }
        },
        async registerToClass(id) {
            await axios.put(`/cmp/api/v1/class/registerForClass?classType=${sessionStorage.getItem('sub_id')}&classId=${id}&studentId=${this.userData.userId}`)
                .then(async response => {
                    if (response.data.message == "Success") {
                        await this.getAlclass();
                        this.massage.chip = true;
                        this.massage.text = 'Registration Successful';
                        this.massage.color = 'success';

                    } else {

                        this.massage.chip = true;
                        this.massage.text = 'Registration Faild';
                        this.massage.color = 'error';
                    }
                }).catch(error => {
                    console.error(error);
                    this.massage.chip = true;
                    this.massage.text = 'Registration Faild';
                    this.massage.color = 'error';
                });
        },

        async getAlclass() {
            await axios.get(`/cmp/api/v1/class/getAllClassWithPaymentStatus?classType=${sessionStorage.getItem('sub_id')}&studentId=${this.userData.userId}`)
                .then(response => {
                    this.items = []
                    for (const iterator of response.data.message) {
                        if (iterator.yerOfAl == this.userData.yerOfAl) {
                            this.items.push(iterator)
                        }
                    }

                }).catch(error => {
                    console.error(error);

                });

            // for (const iterator of this.items) {
            //     this.className.push(iterator.className);
            // }
        }

    },
    created() {
        this.getAlclass();
    },
}

</script>