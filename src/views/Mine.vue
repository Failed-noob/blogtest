<template>
  <div class="mine">
    <div class="header">
      <Header :title="title"/>
    </div>
    <div class="section">
      <div class="user">
        <img src="@/assets/dusk.jpg" alt="加载中...">
        <span :title="username">{{username}}</span>
      </div>
      <transition name="slide">
       <p v-show="isAppear" class="exit" @click="exit">退出登录</p>
      </transition>
     
    </div>
    <div class="foot">
      <Tabbar />
    </div>
  </div>
</template>
<script>
import Tabbar from '@/components/tabbar.vue';
import Header from '@/components/header.vue'
export default {
  name:'Mine', 
  data(){
    return{
      title:this.$route.path.split('/')[this.$route.path.split('/').length-1],
      username:'',
      isAppear:false
    }
  },
  created(){
    console.log(localStorage.username)
    this.$nextTick(()=>{
      this.username = localStorage.username;
     
      this.isAppear = true
    })
  },
  components:{
    Tabbar,
    Header
  },
  methods:{
    exit(){
      sessionStorage.loginToken = '';
      console.log( sessionStorage.loginToken)
      this.$router.push('/login')
    }
  }

}
</script>
<style lang="stylus" scoped>
.mine{
  width: 100vw;
  height: 100vh;
}
.section {
  width: 100%;
  position: absolute;
  top: 3rem;
}
@keyframes bounce-in {
  0% {
    opacity 0
    transform translateX(10px)
    // transform: scale(0);
  }
  20%{
     background green
  }
  50% {
     transform translateX(0px)
  
  }
  60%{
      transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.slide-enter
  transform translateX(20px)
  opacity 0
.slide-enter-active
  animation bounce-in 1s ease
.user
  width 100%
  height 8rem
  background #eee
  img
    transform translate(1.5rem,1.5rem)
    width 5rem
    height 5rem
    border-radius 50%
  span
    display inline-block
    width 10rem
    height 3rem
    line-height 3rem
    font-size 2rem
    color #aaa
    transform translate(5rem,1rem)
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
.exit
  width 60vw
  height 3rem
  margin 1.2rem auto
  text-align center
  background #FC5531
  line-height 3rem
  color #eee
  border-radius .5rem
  font-size 1.2rem
</style>