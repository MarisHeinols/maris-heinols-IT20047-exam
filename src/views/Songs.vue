<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input id="input-search" placeholder="Search by title..." v-model="searchInput" />
            </div>
            <div class="wrapper-settings">
                <button id="btn-show-favorites" v-bind:class="{ active: show_favorites }" @click="changeFavoritesState()">Show Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id" >#</th>
                    <th id="th-title" @click="changeSortByName()" v-bind:class="{ active: sortByName }">
                        Title
                        <IconCaretUp  v-if="sortByName"/>
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th id="th-duration">
                        Duration
                        <IconCaretUp />
                    </th>
                </tr>
                
                <tr class="song" v-for="(value, index) in song_array" v-on:dblclick="selectSong(value)" v-bind:class="{ active: song_playing_now==value.id?true:false }"> 
                    <td id="td-index">
                        <IconPlay v-if="player.getNowPlayingSongId == value.id"/>
                        <span id="txt-index">{{index+1}}</span>
                    </td>
                    <td id="td-title">
                        <img :src="value.album.images[1].url" />
                        {{value.name}}
                    </td>
                    <td id="td-artist" >{{getArtists(value.artists)}}</td>
                    <td id="td-album">{{value.album.name}}</td>
                    <td id="td-duration">
                        {{value.duration_ms}}
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
            show_favorites :false,
            sortByName:false,
            click:0,
            sortKey: 'name',
            isReversed:false,
            song_array: songs,
            song_array_no_sort: songs,
            song_playing_now: ""
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
            if(this.show_favorites){
                this.song_array = auth.user.favorite_songs
                player.playlist = auth.user.favorite_songs
            }else{
                this.song_array = songs
                
                 = songs
            }
        },
        getArtists(artists){
            let artistsCombo = ""
            artists.forEach(artist => {
                artistsCombo += artist.name + " "
            });
            return artistsCombo
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
        changeSortByName(){
            this.click ++
            {this.click==2?this.reversed = true:this.reversed=false}
            this.sortByName = true
            this.song_array.sort((a,b) => {
			    var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                if(this.click==1){
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                }else if(this.click==2){
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                }else{
                    this.click = 0
                    this.sortByName = false
                }
            
		})
        }
    },

    }
</script>