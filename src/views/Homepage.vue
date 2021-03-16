<template>
  <div class="homebox">
    <div class="header">
      <Header :title="title"/>
    </div>
    <div class="editBlog">
      <div class="themebox">
      <el-form ref="form" label-width="80px">
        <el-form-item label="title:">
          <el-input v-model="theme"></el-input>
        </el-form-item>
         <el-form-item label="context:">
          <el-input type="textarea" v-model="context"></el-input>
        </el-form-item>
      </el-form>
      <div class="submitbtn">
        <el-button type="primary" :disabled='disabled' @click="addblog">addBLog</el-button>
      </div>
      </div>
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
  name:'Homepage',
  data(){
    return{
      title:this.$route.path.split('/')[this.$route.path.split('/').length-1],
      theme:'',
      context:'',
      disabled:true
    }
  },
  computed:{
    listenContext(){
      let {theme,context} = this;
      return {theme,context}
    }
  },
  watch:{
    listenContext(newer,elder){
     newer.theme !=''&&newer.context!=''? this.disabled = false: this.disabled = true;
      if(newer.theme.length>=45 || newer.context.length>=255) {
        alert('超过字符限制！');
        this.theme='',
        this.context=''
      }
    }
  },
  
  components:{
    Tabbar,
    Header
  },
  created(){
  //  console.log(this.listenContext)
  },
  methods:{
   addblog(){
     this.axios({
      method:'post',
      url:'/api/addblog',
      params:{
        theme:this.theme,
        context:this.context
       },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
     }).then(data=>{
       if(data) {
         this.theme='',
         this.context=''
         this.$router.push('/bloglist')
       }
     })
   }
  }
}
</script>
<style lang="stylus" scoped>
.themebox
  width 60%
  min-width 20rem
  margin 2rem auto
.editBlog 
  width: 100vw
  position: absolute
  top: 3rem
.contextbox
  width 35%
  height 20rem
  margin 3rem auto
  box-shadow .4rem .3rem 20px black
  textarea
    width 100%;
.submitbtn
  width 100%
  margin 0 auto
  button 
    width 100% 
</style>