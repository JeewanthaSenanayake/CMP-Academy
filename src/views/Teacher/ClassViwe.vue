<template>
    <v-app>
        <v-main>
            <Navigation :userType="singed_user.role" :title="'Create Class'" />
            <Class />
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import Class from '@/components/Teacher/ClassComp.vue';
import router from '@/router/index'
export default {
    data() {
        return {
            singed_user: {},
        }
    },
    components: {
        Navigation,
        Class
    },
    created() {

        //not login auto redirect loging page
        let userData = sessionStorage.getItem('userData')
        if (JSON.parse(userData).role != "teacher") {
            router.push('/')
        } else {
            this.singed_user = JSON.parse(userData)
        }
    }
}
</script>