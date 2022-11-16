import { reactive } from 'vue'

export const player = reactive({
    playlist   : [],
    now_playing: {}, // SONG OBJECT
    index: 0,
    setPlaylist(songs) {
        this.playlist = songs
    },
    setNowPlaying(song) {
        this.now_playing = song
    },
    getNowPlayingSongId() {
        return this.now_playing?.id;
    },
    getNowPlaying() {
        return this.now_playing
    },
    getNowPlayingAlbumID() {
        return this.now_playing?.album?.id ?? null;
    },
    getNowPlayingSongName() {
        return this.now_playing?.name ?? '';
    },
    getNowPlayingSongImage() {
        return this.now_playing?.album?.images[1].url ?? '';
    },
    getNowPlayingArtists() {
        return this.now_playing?.artists?.map(artist => artist.name).join(', ');
    },
    getNowPlayingSongPreview() {
        return this.now_playing?.preview_url;
    },
    getNextSong(){
        this.getSongPlayingIndex()
        try {
            return this.playlist[this.index+1]
        } catch (error) {
            return false
        }   

    },
    getPreviousSong() {
        this.getSongPlayingIndex()
        try {
            return this.playlist[this.index-1]
        } catch (error) {
            return false
        } 
    },
    resetNowPlaying() {
        this.now_playing = {};
    },
    getSongPlayingIndex(){
        this.playlist.forEach((song,index) =>{
            if(song.id == this.now_playing.id){
                this.index = index
            }
        })
    }
})