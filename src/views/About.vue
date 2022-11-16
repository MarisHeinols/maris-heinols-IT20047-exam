<template>
    <div id="about-view">
        <div class="wrapper-header">
            <h1>ABOUT ME</h1>
            <div class="settings">
                <button id="btn-edit" @click="changeEditStatus()" 
                    v-bind:class="{active: formIsActive}" >{{buttonText}}</button>
                <button id="btn-save" v-if="formIsActive" @click="editUserData()">Save Form</button>
            </div>
        </div>
        <form>
            <div class="wrapper-input">
                <label>NAME</label>
                <input id="input-name" v-model="name" v-if="formIsActive"/>
                <p id="txt-name" v-if="!formIsActive">{{auth.user.name}}</p>
            </div>
            <div class="wrapper-input">
                <label>SURNAME</label>
                <input id="input-surname" v-model="surname" v-if="formIsActive"/>
                <p id="txt-surname" v-if="!formIsActive">{{auth.user.surname}}</p>
            </div>
            <div class="wrapper-input">
                <label>STUDENT CODE</label>
                <input id="input-code" v-model="studentCode" v-if="formIsActive"/>
                <p id="txt-code" v-if="!formIsActive">{{auth.user.code}}</p>
            </div>
            <div class="wrapper-songs">
                <label>FAVORITE SONGS</label>
                <ul v-if="auth.getFavoriteSongs().length > 0">
                    <li v-for="(value, index) in auth.getFavoriteSongs()">
                        <img id="img-album" :src="value.album.images[1].url" />
                        <div class="song-info">
                            <p id="txt-song" class="song-name">{{value.name}}</p>
                            <p id="txt-artist" class="song-artists">{{getArtists(value.artists)}}</p>
                        </div>
                    </li>
                </ul>
                <div id="txt-empty" class="empty" v-if="auth.getFavoriteSongs().length == 0">NO SONGS FOUND</div>
            </div>
        </form>
    </div>
</template>
<script>
import { player } from '../stores/player'
import { auth } from '../stores/auth'

export default {
    name: 'About',
    data() {
        return{
            player,
            auth,
            formIsActive:false,
            buttonText:"Edit Form",
            name:"",
            surname:"",
            studentCode:"",
            favoriteSongs:""
        }
    },
    methods:{
        changeEditStatus(){
            this.formIsActive = !this.formIsActive
            {this.formIsActive?this.buttonText = "Cancel": this.buttonText = "Edit Form"}
        },
        editUserData(){
            if(this.name ==""){
                this.name = auth.user.name
            }
            if(this.surname ==""){
                this.surname = auth.user.surname
            }
            if(this.studentCode ==""){
                this.studentCode = auth.user.code
            }
            auth.setUserData(this.name,this.surname,this.studentCode)
            this.formIsActive=false
        },
        getArtists(artists){
            let artistsCombo = ""
            artists.forEach(artist => {
                artistsCombo += artist.name + " "
            });
            return artistsCombo
        },
    }
    }
</script>