<template>
    <div id="main-header" class="active">
        <div class="wrapper-logo">
            <img src="@/assets/logo.svg"/>
            <h2>KRAKEN.FM</h2>
        </div>
        <div class="wrapper-profile">
            <div class="section-user">
                <span class="avatar"></span>
                <h3 id="txt-full-name">{{auth.user.name}} {{auth.user.surname}}</h3>
            </div>
            <button id="btn-logout" @click="logout()">LOGOUT</button>
        </div>
    </div>
</template>
<script>
import { auth } from '../stores/auth'

export default {
    name:"Header",
    data(){
        return{
            auth,
        };
    },
    methods:{
        logout(){
            auth.logout()
        }
    }
}
</script>
