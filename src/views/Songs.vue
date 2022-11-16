<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input id="input-search" placeholder="Search by title..." v-model="searchInput" v-on:change="filterBySearch()" />
            </div>
            <div class="wrapper-settings">
                <button id="btn-show-favorites" v-bind:class="{ active: show_favorites }" @click="changeFavoritesState()">Show Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id" >#</th>
                    <th id="th-title" @click="sortByName()" v-bind:class="{ active: isSortedByName }">
                        Title
                        <IconCaretUp  v-if="isSortedByName" style="stroke: red" v-bind:class="{'flip-vertical':isReversed}"/>
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th id="th-duration" @click="sortByDuration()" v-bind:class="{ active: isSortedByDur }">
                        Duration
                        <IconCaretUp v-if="isSortedByDur" style="stroke: red" v-bind:class="{'flip-vertical':isReversed}"/>
                    </th>
                </tr>
                
                <tr class="song" v-for="(value, index) in player.playlist" v-on:dblclick="selectSong(value)" v-bind:class="{ active: player.getNowPlayingSongId()==value.id?true:false }"> 
                    <td id="td-index">
                        <IconPlay v-if="player.getNowPlayingSongId() == value.id"/>
                        <span id="txt-index">{{index+1}}</span>
                    </td>
                    <td id="td-title">
                        <img :src="value.album.images[1].url" />
                        {{value.name}}
                    </td>
                    <td id="td-artist" >{{getArtists(value.artists)}}</td>
                    <td id="td-album">{{value.album.name}}</td>
                    <td id="td-duration">
                        {{formatedTime(value.duration_ms)}}
                        <IconHeart @click="addSongToFavorites(value)" v-bind:class="{active: auth.user.favorite_songs.some(el => el.id === value.id)}"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import songs from '../data/songs'
import { player } from '../stores/player'
import { auth } from '../stores/auth'
import IconCaretUp from '../components/icons/IconCaretUp.vue'
import IconPlay from '../components/icons/IconPlay.vue'
import IconHeart from '../components/icons/IconHeart.vue'

player.setPlaylist(songs)
    export default {
    name: 'Songs',
    data() {
        return{
            player,
            auth,
            searchInput:"",
            show_favorites :localStorage.show_favorites ?? false,
            isSortedByName:false,
            isSortedByDur:false,
            clicks:0,
            isReversed:false,
        }
    },
    components: {
        IconCaretUp,
        IconPlay,
        IconHeart
    },
    methods:{
        handleScroll(event) {
            this.$refs.header.classList.value = event.target.scrollTop > 100 ? 'scrolled' : '';
        },
        changeFavoritesState(){
            this.show_favorites = !this.show_favorites
            localStorage.show_favorites=this.show_favorites
            if(this.show_favorites){
                player.setPlaylist(auth.user.favorite_songs)
            }else{
                player.setPlaylist(songs)
            }
        },
        getArtists(artists){
            let artistsCombo = ""
            artists.forEach(artist => {
                artistsCombo += artist.name + " "
            });
            return artistsCombo
        },
        formatedTime(millis) {
            var millis = parseInt(JSON.stringify(millis))
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },
        selectSong(song){
            player.setNowPlaying(song)
        },
        addSongToFavorites(song){
            if(auth.user.favorite_songs.some(el => el.id === song.id)){
                auth.user.favorite_songs.splice(auth.user.favorite_songs.indexOf(song),1)
            }else{
                auth.user.favorite_songs.push(song)
            }
        },
        filterBySearch(){
            player.setPlaylist(songs.filter(song => song.name.startsWith(this.searchInput)))
        },
        
        sortByName(){
            this.isSortedByName = true
            {this.isSortedByDur?(this.isSortedByDur=false, this.clicks=0):""}
            this.clicks ++
            {this.clicks==2?this.isReversed = true:this.isReversed=false}
            player.playlist.sort((a,b) => {
			    var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                if(this.clicks==1){
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                }else if(this.clicks==2){
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                }else{
                    this.clicks = 0
                    this.isSortedByName = false
                    player.setPlaylist(songs)
                }
            
		})
        },
        sortByDuration(){
            this.isSortedByDur = true
            {this.isSortedByName?(this.isSortedByName=false, this.clicks=0):""}
            this.clicks ++
            {this.clicks==2?this.isReversed = true:this.isReversed=false}
            player.playlist.sort((a,b) => {
			    var timeA = a.duration_ms;
                var timeB = b.duration_ms;
                if(this.clicks==1){
                    return (timeA < timeB) ? -1 : (timeA > timeB) ? 1 : 0;
                }else if(this.clicks==2){
                    return (timeA > timeB) ? -1 : (timeA < timeB) ? 1 : 0;
                }else{
                    this.clicks = 0
                    this.isSortedByDur = false
                    player.setPlaylist(songs)
                }
            
		})
        }
    },

    }
</script>