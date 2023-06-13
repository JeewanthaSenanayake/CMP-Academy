<template>
    <div>
        <v-snackbar v-model="showSnackbar" top rounded :class="`custom-snackbar-${alertData.color}`">
            <center> <strong>
                    <h3> {{alertData.name}}</h3>
                </strong></center>
        </v-snackbar>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showSnackbar: true
        };
    },
    props:{
        alertData:Object
    },
    methods: {
        showTimedAlert() {
            this.showSnackbar = true;
            setTimeout(() => {
                this.showSnackbar = false;
            }, 3000); // Close the alert after 3 seconds (3000 milliseconds)
        }
    },
    created() {
        this.showTimedAlert();
    }

};
</script>

<style>
.custom-snackbar-red .v-snack__wrapper {
    background-color: rgb(255, 51, 0);
    border-radius: 20px;
}
.custom-snackbar-green .v-snack__wrapper {
    background-color: rgb(5, 214, 5);
    border-radius: 20px;
}
</style>