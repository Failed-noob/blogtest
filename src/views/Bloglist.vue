<template>
  <div class="bloglist">
    <div class="header">
      <Header :title="title"/>
    </div>
   
   <div class="blist"  v-cloak>
     <ul v-if="isExist">
       <li v-for="item in bloglist" :key= item.index>
        <h3>{{item.theme}}</h3>
        <section>{{item.context}}</section>
        <b>{{item.datetime}}</b>
        <a class="del" @click="deleteblog(item.id)">删除</a>
        <a class="edit" @click="rewrite(item)">重新编辑</a>
       </li>
     </ul>
     <div v-else-if="isRewrite" class="rewriteSquare">
      <el-form ref="form" label-width="80px">
        <el-form-item label="Theme:">
          <el-input  v-model="theme"></el-input>
        </el-form-item>
         <el-form-item label="Id:">
          <el-input disabled  v-model="id"></el-input>
        </el-form-item>
         <el-form-item label="Datetime:" >
          <el-input disabled v-model="datetime"></el-input>
        </el-form-item>
        <el-form-item label="Context:" >
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="context"
            >
          </el-input>
        </el-form-item>
        <el-button @click="update" :disabled ='status'>提交</el-button>
      </el-form>  
     </div>
     <p v-else>无数据...</p>
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
  name:'Bloglist',
  data(){
    return{
      title:this.$route.path.split('/')[this.$route.path.split('/').length-1],
      bloglist:null,
      isExist:false,
      isRewrite:false,
      id:'',
      theme:'',
      datetime:'',
      context:'',
      status:Boolean
    }
  },
  watch:{
    bloglist(newer){
     newer.length>0 ? this.isExist = true:this.isExist = false;
    },
    account(newer){
     if(newer.theme!=''&&newer.context!=''){
        this.status = false
     }else{
       this.$message.warning('theme和context 均不能为空');
        this.status = true
     }
    }
  },
  components:{
    Tabbar,
    Header
  },
  computed:{
    account(){
      let {theme,context} = this;
      return {theme,context} 
    }
  },
  created(){
      this.axios.get('/api/blogs').then(data=>{
      this.bloglist = data.data;;
      // console.log(this.bloglist)
    }).catch((err) => {
        console.log(err,'err');
        this.isExist = false;
    });
    console.log(this.account)    
  },
  methods: {
    deleteblog(id){
      this.axios({
          method:'get',
          url:'/api/delblog?id='+id
        }).then(data=>{
        this.bloglist = data.data
       })
      },
    rewrite(item){
      this.isExist = false;
      this.isRewrite = true;
      console.log(item,'item')
      this.theme= item.theme;
      this.id =item.id;
      this.datetime = item.datetime;
      this.context = item.context;
      console.log(this.id)
    },
    update(){
      this.axios({
        url:'/api/update',
        method:'post',
        data:{
          theme:this.theme,
          context:this.context,
          id:this.id
        }
      });
      this.$message.success('修改成功');
      this.isExist = true;
      this.isRewrite = false
      this.$parent.reload()
    }
  }
  
}
</script>
<style lang="stylus" scoped>
.blist
  width: calc(100vw + 20px)
  height calc(100vh - 6rem);
  background #eee
  position: absolute
  top: 3rem
  overflow-y scroll
[v-cloak] 
  display none
.rewriteSquare
  width 60rem
  margin 5rem auto
.blist>ul>li
    width 60%
    min-width 20rem
    margin 1rem auto
    background rgba(100,20,100,.5)
    padding 1.2rem 1.4rem
    border-radius .5rem
    position relative
    overflow-x hidden
    h3
      color #ccc
      font-size 1.6rem;
    section
      color #aaa
      margin 1.2rem auto
      text-indent 2rem
      line-height 2rem
    .del
      color red
      display inline-block
      position absolute
      right 2rem
      cursor pointer
    .edit
      display inline-block
      margin-left 10rem
      cursor pointer
</style>