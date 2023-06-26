<template>
    <v-app>
        <v-main>
            <Navigation :userType="singed_user.role" :title="'Classes'" />
            <ClassComp />
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import ClassComp from '@/components/Students/ClassCopm.vue';
import router from '@/router/index'
export default {
    data() {
        return {
            singed_user: {},
        }
    },
    components: {
        Navigation,
        ClassComp
    },
    created() {
       
        //not login auto redirect loging page
        let userData = sessionStorage.getItem('userData')
        if (JSON.parse(userData).role != "student") {
            router.push('/')
        }else{
            this.singed_user = JSON.parse(userData)
        }
    }
}
</script>