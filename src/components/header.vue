<template>
  <div class="header" ref="header">
    <span class="iconfont icon-fanhui" @click="$router.go(-1)"></span>
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
//Math.floor(Math.random() * (upper - lower)) + lower
export default {
  name:'Header',
  data(){
    return {
       color:`rgb(${Math.floor(Math.random()*(155-0)+0)},${Math.floor(Math.random()*(155-0)+0)},${Math.floor(Math.random()*(200-0)+0)})`
    }
  },
  props:{
    title:{
      type:String,
      default:'我是标题'
    }
   
  },
  mounted(){
     document.documentElement.style.setProperty('--theme-color',this.color)
  }
}
</script>
<style scoped lang="stylus">
  .header
    width 100vw
    height 3rem
    display inline-flex
    background var(--theme-color)
    position relative
    .icon-fanhui
      color #eee
      display inline-block
      height 100%
      font-weight bold
      line-height 3rem
      transform translateX(1.2rem)
    .title
      color #eee
      width 20%
      text-align center
      position absolute
      font-family Lobster,sans-serif 
      display inline-block
      font-size 1.2rem
      height 100%
      line-height 3rem
      left calc(50vw - 10%)
    .btn
      border none
      height 2rem
      line-height 2rem
      position absolute
      right 2rem
      top .5rem

       
</style>