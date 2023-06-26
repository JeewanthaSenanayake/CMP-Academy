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
                                <v-btn v-if="isRegisted(data.regiStudents) != true"
                                    :class="!$vuetify.breakpoint.xs ? 'ml-2 mb-2 white--text' : 'mb-2 white--text'"
                                    color="orange " small @click="registerToClass(data.id)">Register the class</v-btn>
                                <v-btn v-else-if="isPaymentDone == 0"
                                    :class="!$vuetify.breakpoint.xs ? 'ml-2 mb-2 white--text' : 'mb-2 white--text'"
                                    color="blue" small @click="openZoomLink(data.zoom)">Rs.{{ data.fee }} Pay</v-btn>

                                <v-chip v-else-if="isPaymentDone == 1" class="ma-2" color="primary" outlined pill>
                                    Payment prograss
                                </v-chip>
                                <v-chip v-else-if="isPaymentDone == 2" class="ma-2" color="success" outlined pill>
                                    You successfully registered for this mounth
                                </v-chip>
                                <v-chip v-else-if="isPaymentDone == 3" class="ma-2" color="error" outlined pill>
                                    Payment rejected. Please contact admin
                                </v-chip>
                            </div>
                        </v-card-text>
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
        <AlertMsg v-if="alertEnable" :alertData="alertData" />

    </v-app>
</template>
  
<script>
import axios from '@/services/axiosConfig';
import AlertMsg from '@/components/DisplayAlerts.vue'
export default {
    components: {
        AlertMsg
    },
    data() {
        return {
            isPaymentDone: 0,   //0- not paid, 1-paid not accepted, 2-paid accepted, 3-rejected
            items: [],
            userData: JSON.parse(sessionStorage.getItem('userData')),
            alertData: {},
            alertEnable: false,
        }
    },
    methods: {
        async registerToClass(id) {
            await axios.put(`/cmp/api/v1/class/registerForClass?classType=${sessionStorage.getItem('sub_id')}&classId=${id}&studentId=${this.userData.userId}`)
                .then(async response => {
                    if (response.data.message == "Success") {
                       await this.getAlclass();
                        this.alertData.name = "Registration Successful"
                        this.alertData.color = 'green'
                        this.alertEnable = true;
                    } else {
                        this.alertData.name = "Registration Faild"
                        this.alertData.color = 'red'
                        this.alertEnable = true;
                    }
                }).catch(error => {
                    console.error(error);
                    this.alertData.name = "Registration Faild"
                        this.alertData.color = 'red'
                        this.alertEnable = true;
                });
        },
        isRegisted(registrationList) {
            for (const iterator of registrationList) {
                if (iterator == this.userData.userId) {
                    return true
                }
            }
        },

        async getAlclass() {
            await axios.get(`/cmp/api/v1/class/getAllClass?classType=${sessionStorage.getItem('sub_id')}`)
                .then(response => {
                    this.items=[]
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