<template>
    <div class="header">
        <div v-if="$route.name == 'detail' || this.$route.name == 'Ped'">
            <h1><router-link to="/works"><img src="@/assets/images/h1Logo_white.png" alt="GnM Performance"></router-link></h1>
            <div id="nav" class="white">
                <router-link to="/works"><img src="@/assets/images/gnb01_white.png" alt="WORKS"></router-link>
                <router-link to="/ped" exact><img src="@/assets/images/gnb02_white.png" alt="CREATIVE-PED"></router-link>
            </div>
        </div>
        <div v-else>
            <h1><router-link to="/works"><img src="@/assets/images/h1Logo.png" alt="GnM Performance"></router-link></h1>
            <div id="nav">
                <router-link to="/works"><img src="@/assets/images/gnb01.png" alt="WORKS"></router-link>
                <router-link to="/ped" exact><img src="@/assets/images/gnb02.png" alt="CREATIVE-PED"></router-link>
            </div>
        </div>
        
        
    </div>
</template>


<script>
export default {
    name: 'Header',
    props: {
        //msg: String
    },mounted() {
        
    }
}
</script>

