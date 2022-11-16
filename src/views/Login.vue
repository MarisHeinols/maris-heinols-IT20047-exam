<template>
    <div id="login-view">
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input id="input-email" placeholder="E-mail" 
                v-model="credentials.userName"/>
            <input id="input-password" placeholder="Password" 
                v-model="credentials.password"/>
            <button id="btn-submit" :disabled="!credentials.userName || credentials.password.length<6"
            @click="login()">LOGIN</button>
        </form>
    </div>
</template>
<script>
import { auth } from '../stores/auth'

export default {
    name:"Login",
    data(){
        return{
            credentials : {
                userName:"",
                password:"",
            },
        };
    },
    methods:{
        login(){
            auth.authenticate(this.credentials.userName,this.credentials.password)
        }
    }
}
</script>