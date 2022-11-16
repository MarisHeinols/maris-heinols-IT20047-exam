<template>
    <div id="album-view">
        <div class="wrapper-header">
            <h1>ALBUMS</h1>
            <div class="settings">
                <button id="btn-grid" @click="grid=!grid,list=false" v-bind:class="{active: grid}"><IconGrid/></button>
                <button id="btn-list"  @click="list=!list,grid=false" v-bind:class="{active: list}"><IconList/></button>
            </div>
        </div>
        <ul id="list-albums" v-bind:class="{grid: grid}">
            <li class="album" v-for="(value, index) in album_list" 
            @click="selectAlbum(value)" 
            v-bind:class="{active: player.getNowPlayingAlbumID==selectedAlbum.id?true:false}">
                <img id="img-album" :src="value.images[0].url" />
                <div class="album-info">
                    <h4 id="txt-album-name">{{value.name}}</h4>
                    <p id="txt-album-artists">{{getArtists(value.artists)}}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{value.artists.release_date}}</p>
                        <p id="txt-album-tracks">{{songs.reduce((acc, cur) => cur.album.id === value.id ? ++acc : acc, 0)}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import IconGrid from '../components/icons/IconGrid.vue'
    import IconList from '../components/icons/IconList.vue'
    import songs from '../data/songs'
    import { player } from '../stores/player'
    export default {
    name: 'App',
    data() {
        return{
            songs,
            player,
            grid:false,
            list:false,
            selectedAlbum:{}
        }
    },
    methods:{
        selectAlbum(album){
            this.selectedAlbum = album
        },
        getArtists(artists){
            let artistsCombo = ""
            artists.forEach(artist => {
                artistsCombo += artist.name + " "
            });
            return artistsCombo
        },
    },
    components:{
        IconGrid,
        IconList
    },
    computed:{
        album_list(){
            let albums = []
            songs.forEach(song => {
                if (!albums.some(e => e.id === song.album.id)) {
                    albums.push(song.album)
                }
            });
            return albums
        }
    }
    }
</script>
