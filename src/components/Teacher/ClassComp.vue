<template>
    <v-app>
        <v-container>
            <v-row no-gutters>
                <v-col cols="12" md="6" :class="!$vuetify.breakpoint.xs ? 'pa-2' : ''">
                    <v-text-field label="Title" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="6" :class="!$vuetify.breakpoint.xs ? 'pa-2' : ''">
                    <v-text-field label="Sub title" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="8" class="pa-1">
                    <v-text-field label="Zoom link" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" class="pa-1">
                    <v-file-input label="Upload documents" small-chips counter multiple show-size
                        truncate-length="12"></v-file-input>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" class="pa-1">
                    <v-radio-group v-model="radio" row>
                        <v-radio label="Free Class" value="1"></v-radio>
                        <v-radio label="Paid Class" value="0"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" class="text-right pt-3 pa-1">
                    <v-btn class="orange white--text">create class</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {

}
</script>