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
                        <v-file-input v-model="selectedFiles" label="Upload documents" :rules="nameRules" small-chips
                            counter multiple show-size truncate-length="12"></v-file-input>
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
                        <v-btn @click="uploadFile" class="orange white--text">Set class data</v-btn>
                    </v-col>
                </v-row>
            </v-form>
            {{ data }}
        </v-container>
    </v-app>
</template>
<script>
import axios from '@/services/axiosConfig';
import firebase from '@/services/firebase';
import 'firebase/compat/storage';
export default {
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
            },
            className: [],
            selectedFiles: [],
        }
    },
    methods: {
        async uploadFile() {
            this.data.tutes = [];
            const storage = firebase.storage();
            for (const file of this.selectedFiles) {

                const storageRef = storage.ref();
                const folderRef = storageRef.child('Tutes');
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
                                console.error('Error getting download URL:', error);
                            });
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error uploading file:', error);
                    });
            }
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