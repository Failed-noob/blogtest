<template>
  <div class="home">
    <transition name="fade">
     
      <router-view v-if="isRouterAlive"></router-view>
     
    </transition>
    
  </div>
</template>
<script>
import Tabbar from '@/components/tabbar.vue';
import Header from '@/components/header.vue'
export default {
  name:"Home",
  data(){
    return{
      show:false,
      title: sessionStorage.headerTitle,
      isRouterAlive: true
    }
  },
  computed:{
    getGetters(){
      return this.$store.getters.deriveState;
    }
  },
  watch:{
    title(){
      console.log('bianle')
    }
  },
  components:{
    Tabbar,
    Header
  },
  mounted(){
    this.show = true;
  },
  methods:{
     reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
     }   
  }
}
</script>
<style lang='stylus' scoped>
  .fade-enter,.fade-leave-to 
    transform scale(.6)
    opacity: 0
  .fade-enter-active,.fade-leave-avtive 
    transition: all .5s
</style>