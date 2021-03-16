<template>
  <div class="tabbar">
    <router-link 
    v-for="(item,index) of iconlist" 
    :key="index" 
    :to="item.path"
    active-class="is-selected">
      <span :class="'iconfont '+'icon-'+item.name"></span>
    </router-link>
  </div>
</template>
<script>
export default {
  name:'Tabbar',
  data(){
    return {
      iconlist:[
        {name:"zhuye",path:"/homepage"},
        {name:"ego-blog",path:"/bloglist"},
        {name:"wode",path:"/mine"}
      ]
    }
  }
}
</script>
<style scoped lang="stylus">
  .tabbar
    width: 100vw
    height 3rem
    background #eee
    display inline-flex
    background var(--theme-color)
    span
      display inline-block
      width calc(100vw / 3)
      height 3rem
      line-height 3rem
      text-align center
      font-size 1.6rem
  .is-selected
    color #009eef
</style>