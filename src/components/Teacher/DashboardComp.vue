<template>
    <v-app>

        <v-container fluid>
            <v-row>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-card class="ma-4">
                            <v-card-title>
                                Create Class
                            </v-card-title>
                            <v-card-text>
                                <v-form ref="form1" v-model="valid">
                                    <v-row class="pa-2">
                                        <v-text-field v-model="data.className" :rules="nameRules" label="Class Name"
                                            outlined></v-text-field>


                                        <v-select :items="items" v-model="data.yerOfAl" label="Year of A/L"
                                            :rules="nameRules" outlined></v-select>
                                        <v-text-field :class="!$vuetify.breakpoint.xs?'mr-2':'mr-0'" v-model="data.classDay" :rules="nameRules" label="Class Days"
                                            outlined></v-text-field>

                                        <v-text-field v-model="data.fee" :rules="nameRules" label="Class Fee"
                                            outlined></v-text-field>
                                        <v-btn :loading="loading" class="green white--text ml-2 "
                                            @click="createClass">Create</v-btn>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                    </v-col>
                </v-row>
            </v-row>
            <AlertMsg v-if="alertEnable" :alertData="alertData" />
        </v-container>
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
            valid: true,
            nameRules: [v => !!v || 'Field is required'],
            items: [],
            alertData: {},
            alertEnable: false,
            loading: false,
            data: {
                "subject": (JSON.parse(sessionStorage.getItem('userData'))).subject
            }

        }
    },
    methods: {
        async createClass() {
            this.loading = false;
            this.alertEnable = false;
            if (this.$refs.form1.validate()) {
                this.loading = true;
                await axios.post(`/cmp/api/v1/class/createClass?classType=${this.data.subject}`, this.data)
                    .then(response => {
                        if (response.data.message == "Success") {
                            this.alertData.name = "Class Create Successful"
                            this.alertData.color = 'green'
                            this.alertEnable = true;
                        } else {
                            this.alertData.name = "Class Create Failed"
                            this.alertData.color = 'red'
                            this.alertEnable = true;
                        }
                        // this.loading = false;
                        this.$refs.form1.reset();
                    }).catch(error => {
                        this.alertData.name = "Class Create Failed"
                        this.alertData.color = 'red'
                        this.alertEnable = true;
                        console.log(error);
                        // this.loading = false;
                    });

                this.loading = false;
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
    created() {
        this.getAlYears();

    },
}
</script>