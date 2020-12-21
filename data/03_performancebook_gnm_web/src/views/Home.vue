<template>
    <div class="homeWrap">
        <div class="bodyBack"></div>
        <div class="homeHead">
            <h1><img src="@/assets/images/h1Logo.png" alt="GnM performance"></h1>
        </div>
        <div class="loginWrap">
            <!-- {{`로그인${isAuth}`}}
            <a href="javascript:;" @click="getAuthSignOut">로그아웃하기버튼</a> -->
            <div class="in">
                <div class="tit"><img src="@/assets/images/mainTit01.png" alt="PERFORMANCE CREATIVE BOOK"></div>
                <div class="idpwWrap">
                    <form>
                        <div class="line id"><input type="text" v-model="usr_id" ref="id" maxlength="10" @keyup.enter="login" placeholder="아이디"></div>
                        <div class="line pw"><input type="password" v-model="usr_pw" ref="pw" maxlength="10" @keyup.enter="login" placeholder="비밀번호"></div>
                        <div class="btnLogin"><a href="javascript:void(0)" @click="login">로그인</a></div>
                    </form>
                </div>
            </div>
        </div>
        <div class="copyright">Copyright© 2020 지엔앰퍼포먼스. All Rights Reserved.</div>
    </div>
</template>



<script>
import '@/assets/css/home.css'
import {mapActions,mapState, mapMutations} from 'vuex'
export default {
    name: 'home',
    data : function(){
        return {
            usr_id : '',//테스트계정
            usr_pw : ''//테스트계정
        }
    },
    created() {
        if(sessionStorage.getItem('login')){
            this.$router.push('/works');
        }
    },
    computed: {
        ...mapState(['isAuth'])
    },
    methods : {
        ...mapActions(['getAuthIn']),
        ...mapMutations(['getAuthSignOut']),
        login() {
            if(!this.usr_id){
                alert('아이디를 입력 해 주세요.');
                this.$refs.id.focus();
                return false;
            }else if(!this.usr_pw){
                alert('비밀번호를 입력 해 주세요.');
                this.$refs.pw.focus();
                return false;
            }
            
            
            this.getAuthIn({
                url:`/auth/login_proc`,
                params:{
                    usr_id:this.usr_id,
                    usr_pw:this.usr_pw,
                }
            })
        }

    }
}
</script>
<style>
body{ background: none }
</style>