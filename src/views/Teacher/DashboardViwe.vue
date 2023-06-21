<template>
    <v-app>
        <v-main>
            <Navigation :userType="singed_user.role" :title="'Dashboard'" />
            <Dashboard />
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '@/components/NavigationBar.vue';
import Dashboard from '@/components/Teacher/DashboardComp.vue';
import router from '@/router/index'
export default {
    data() {
        return {
            singed_user: {},
        }
    },
    components: {
        Navigation,
        Dashboard
    },
    created() {
       
        //not login auto redirect loging page
        let userData = sessionStorage.getItem('userData')
        if (userData == null) {
            router.push('/')
        }else{
            this.singed_user = JSON.parse(userData)
        }
    }
}
</script>