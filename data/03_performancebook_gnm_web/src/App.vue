<template>
    <div id="app" :class="$browser.name">
        <Header v-if="$route.name != 'Home'" />
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
         <Footer v-if="$route.name != 'Home'" />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
    components: {
        Header,
        Footer,
    },
    created() {
        this.sessionCheck();
    },
    updated() {
        this.sessionCheck();
        $('html,body').animate({'scrollTop':0},10);
        //$('html,body').scrollTop(0);.
        
    },
    methods : {
        //비로그인시 로그인페이지로
        sessionCheck(){
            if(!sessionStorage.getItem('login')){
                this.$router.push('/').catch(err => {});;
            }
        }
    }
    
}
    
</script>
