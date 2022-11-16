import { reactive } from 'vue'
import router from '@/router/index.js'

export const auth = reactive({

    user : {
        name:"Maris",
        surname:"Heinols",
        code:"IT20047",
        favorite_songs:localStorage.favorite_songs == null ? [] : JSON.parse(localStorage.favorite_songs)
    },
    credentails: {
        email:"maris.heinols@va.lv",
        password:"123456"
    },

    is_authenticated: localStorage.is_authenticated ?? false,

    setUserData(name, surname, code) {
        this.user.name=name
        this.user.surname=surname
        this.user.code=code
    },

    authenticate(email, password) {
        if(email == this.credentails.email && password == this.credentails.password){
            localStorage.is_authenticated = true
            this.is_authenticated = true
            router.push('/')
        }
    },

    logout() {
        localStorage.clear();
        this.is_authenticated = false
        router.push('/login')
    },

    toggleFavorite(songID) {
        index = this.user.favorite_songs.findIndex(favSongId => favSongId === songID)
        {index == -1?this.user.favorite_songs.push(songID):this.user.favorite_songs.splice(x,index)}
    },

    getFavoriteSongs() {
        return this.user.favorite_songs
    }
    
})

