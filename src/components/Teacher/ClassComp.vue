<template>
    <v-app>
        <v-container>
            <v-form ref="form1" v-model="valid">
                <v-row no-gutters>
                    <v-col cols="12" md="6" :class="!$vuetify.breakpoint.xs ? 'pa-2' : ''">
                        <v-select :items="className" v-model="data.className" label="Class Name" :rules="nameRules"
                            outlined></v-select>
                    </v-col>
                    <v-col cols="12" md="6" :class="!$vuetify.breakpoint.xs ? 'pa-2' : ''">
                        <v-text-field v-model="data.subTopic" :rules="nameRules" label="Sub title" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" md="8" class="pa-1">
                        <v-text-field v-model="data.zoom" :rules="nameRules" label="Zoom link" outlined></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters>

                    <v-col cols="12" class="pa-1">
                        <v-form ref="form2" v-model="valid2">
                            <v-file-input v-model="selectedFiles" :disabled="uploadSuccessfull" label="Upload documents"
                                :rules="fileRules" small-chips counter multiple show-size
                                truncate-length="12"></v-file-input></v-form>
                    </v-col>

                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" class="text-right pt-3 pa-1">
                        <v-btn small @click="uploadFile" :loading="loading1" :disabled="upload"
                            class="blue white--text">Upload
                            <v-icon right dark>
                                mdi-cloud-upload
                            </v-icon></v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" class="pa-1">
                        <v-radio-group :rules="nameRules" v-model="data.isFree" row>
                            <v-radio label="Free Class" value="1"></v-radio>
                            <v-radio label="Paid Class" value="0"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" class="text-right pt-3 pa-1">
                        <v-btn @click="setClassData" :disabled="!upload" :loading="loading2" class="orange white--text">Set
                            class data</v-btn>
                    </v-col>
                </v-row>
            </v-form>
            {{ data }}
            <AlertMsg v-if="alertEnable" :alertData="alertData" />
        </v-container>
    </v-app>
</template>
<script>
import axios from '@/services/axiosConfig';
import firebase from '@/services/firebase';
import 'firebase/compat/storage';
import AlertMsg from '@/components/DisplayAlerts.vue'
export default {
    components: {
        AlertMsg
    },
    data() {
        return {
            upload: false,
            valid: false,
            valid2: false,
            nameRules: [v => !!v || 'Field is required'],
            fileRules: [v => v.length > 0 || 'Field is required'],
            items: [],
            loading: false,
            data: {
                "subject": (JSON.parse(sessionStorage.getItem('userData'))).subject,
                "tutes": []
            },
            className: [],
            selectedFiles: [],
            alertData: {},
            alertEnable: false,
            loading1: false,
            loading2: false,
            uploadSuccessfull: false
        }
    },
    methods: {

        async setClassData() {
            if (this.$refs.form1.validate()) {
                this.alertEnable = false;
                this.loading2 = true
                let selectedClassId
                for (const iterator of this.items) {
                    if (iterator.className == this.data.className) {
                        selectedClassId = iterator.id
                        break
                    }
                }
                await axios.put(`/cmp/api/v1/class/setClassData?classType=${this.data.subject}&classId=${selectedClassId}`, this.data)
                    .then(response => {
                        if (response.data.message == "Success") {
                            this.alertData.name = "Set Data Successful"
                            this.alertData.color = 'green'
                            this.alertEnable = true;
                            this.loading2 = false
                            this.upload = false
                            this.uploadSuccessfull = false
                            this.$refs.form1.reset()
                            this.$refs.form2.reset()
                            this.data = {
                                "subject": (JSON.parse(sessionStorage.getItem('userData'))).subject,
                                "tutes": []
                            };
                        } else {
                            this.alertData.name = "Class Create Failed"
                            this.alertData.color = 'red'
                            this.alertEnable = true;
                            this.loading2 = false
                            this.upload = false
                        }

                    }).catch(error => {
                        console.error(error);
                        this.alertData.name = "Class Create Failed"
                        this.alertData.color = 'red'
                        this.alertEnable = true;
                        this.loading2 = false
                        this.upload = false

                    });
            }
        },
        async uploadFile() {

            this.alertEnable = false;
            this.loading1 = true
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const folderRef = storageRef.child('Tutes');
            for (const file of this.selectedFiles) {

                const fileRef = folderRef.child(file.name);

                await fileRef.put(file)
                    .then(() => {
                        // File uploaded successfully
                        // Get the download URL of the uploaded file
                        fileRef
                            .getDownloadURL()
                            .then(url => {

                                this.data.tutes.push({
                                    "name": file.name,
                                    "link": url
                                });
                            })
                            .catch(error => {

                                this.alertData.name = "Files Upload Failed"
                                this.alertData.color = 'red'
                                this.alertEnable = true;
                                this.loading1 = false;
                                console.error('Error getting download URL:', error);
                                return;
                            });
                    })
                    .catch(error => {
                        // Handle error

                        this.alertData.name = "Files Upload Failed"
                        this.alertData.color = 'red'
                        this.alertEnable = true;
                        this.loading1 = false;
                        console.error('Error uploading file:', error);
                        return;
                    });
            }


            this.alertData.name = "Files Uploaded"
            this.alertData.color = 'green'
            this.alertEnable = true;
            this.loading1 = false;
            this.upload = true
            this.uploadSuccessfull = true


        },
        async getAlclass() {
            await axios.get(`/cmp/api/v1/class/getAllClass?classType=${this.data.subject}`)
                .then(response => {
                    this.items = response.data.message

                }).catch(error => {
                    console.error(error);

                });

            for (const iterator of this.items) {
                this.className.push(iterator.className);
            }
        }
    },
    created() {
        this.getAlclass();
    },

}
</script>