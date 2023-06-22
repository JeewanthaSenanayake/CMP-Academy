<template>
    <v-card flat>
        <v-app-bar :dark="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? true : false" :color="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs
            ? 'black'
            : userType === 'student'
                ? 'black'
                : 'black'
            " height="70px" :flat="true" class="">
            <v-row align="center" style="justify-content: space-between">

                <v-col lg="10" md="4" sm="2" cols="6">
                    <div class="app-bar-title white--text text-left ml-5"
                        v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs">
                        {{ title }}
                    </div>
                    <v-row v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs">
                        <v-app-bar-nav-icon large @click.stop="drawer = !drawer"
                            class="d-flex d-md-none"></v-app-bar-nav-icon>
                        
                           <h3 class="mt-2 ml-3"> {{ title }}</h3>
                        
                    </v-row>


                </v-col>
                <!-- <v-col class="d-flex justify-start" v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs">
                    <div class="white--text" >
                        Dashboard
                    </div>
                </v-col> -->
                <v-col lg="1" md="1" sm="1" cols="2" class="" style="border: 0px solid white">
                    <v-menu left bottom rounded="rounded">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                                <v-avatar style="border: 1px solid rgba(192, 192, 192, 1)" class="float-left" size="40">
                                    <v-img max-width="50" class="" :src="require('@/assets/fiverr.jpg')" />
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-list min-width="180" class="py-0 mt-11">
                            <v-list-item link v-for="(menu, i) in menus" :key="i" @click="clickAction(menu.action)">
                                <v-list-item-icon>
                                    <v-icon>{{ menu.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                    {{ menu.title }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
        </v-app-bar>

        <v-navigation-drawer app dark color="black" v-model="drawer"
            :permanent="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs">
            <center>
                <v-img max-width="95%" class="mb-5" :src="require('@/assets/cmp.png')" />
            </center>
            <v-list nav dark>
                <div v-for="item in userType == 'student'
                    ? studentItems
                    : teacherItems" :key="item.title">

                    <v-list-item class="mb-5" :to="item.to">

                        <v-list-item-title class="text-left side-nav-font "> <v-icon class="mr-2">{{ item.icon }}</v-icon>
                            {{
                                item.title }}
                        </v-list-item-title>

                    </v-list-item>
                </div>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>
  
<script>

const student_menu = [
    {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/dashboard"
    },
    {
        title: "Profile",
        icon: "mdi-account-outline",
        to: "/account"
    },
    {
        title: "Libray",
        icon: "mdi-clipboard-text-outline",
        to: "/reports"
    },
    {
        title: "Tutes",
        icon: "mdi-email-outline",
        to: "/homef"
    },
    {
        title: "Modle Papers",
        icon: "mdi-bell-badge-outline",
        to: "/notifications"
    }

];

const teacher_menu = [
    {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/teacher-dashboard"
    },
    {
        title: "Create Class",
        icon: "mdi-account-outline",
        to: "/teacher-class"
    },
    

];




export default {
    name: "navigation-drawer",

    props: {
        title: {
            type: String,
            default: 'Dashboard',
        },
        userType: {
            type: String,
        },
    },

    data: () => ({
        drawer: false,

        studentItems: student_menu,
        teacherItems:teacher_menu,
        menus: [
            { title: "Profile", icon: "mdi-account", action: "profile" },
            { title: "Inquiries", icon: "mdi-information-outline", action: "inquiries" },
            { title: "Logout", icon: "mdi-logout", action: "logout" },
        ],

        color: "black",

    }),

    components: {

    },

    methods: {
        clickAction(action) {
            if (action === "profile") {
                this.profile();
            } else if (action === "inquiries") {
                this.inquiries();
            } else if (action === "logout") {
                this.logout();
            }
        },

        logout() {
            this.logoutDialog = true;
            console.log("Logout...");
        },

        inquiries() {
            console.log("inquiries...");
        },

        profile() {
            console.log("profile...");
        },

    },

    updated: function () {
        console.log(this.$vuetify.breakpoint.width);
    },

};


</script>
  
<style scoped>
.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
    background-color: transparent;
}

.v-list-item--link:before {
    background-color: #191919;
    bottom: 0;
    content: "";
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    z-index: -1;
}

.theme--dark.v-list-item--active,
.theme--dark.v-list-item--active::before {
    opacity: 1;
    border-right: 5px solid #ffa800;
    background-color: #191919;
}

.side-nav-logo-font {
    font-weight: 600;
    font-size: 14px;
}

.side-nav-font {
    font-size: 14px;
    color: white;
}

.child-list-item {
    background-color: #191919;
    opacity: 0.5;
}

.app-bar-title {
    font-weight: 600;
    font-size: 32px;
}
</style>
  