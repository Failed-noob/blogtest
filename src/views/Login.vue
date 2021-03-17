<template>
  <div class="login"> 
    <div class="filter"></div>
   <transition-group name="fade">
    <div class="bck" key="bck" v-show="show">
      <h3 class="title">Personal Blog</h3>
      <div class="form">
        <label for="">
          <span>username:</span>
          <input ref="username" type="text" v-model="userName" placeholder="请输入您的用户名">
        </label>                                             
        <label for="">
          <span>password:</span>
          <input type="password" v-model="pad">
          <span></span>
        </label>
        <el-button v-show='show' 
        ref="logBtn" 
        :disabled='btnStatus' 
        @click="toHome()"
        :loading = 'loadStatus'
        >登录 / 注册</el-button>
        <!-- <p class="register">点我<span>注册</span></p> -->
      </div>
    <div class="isRegister" v-show="isRegitster">The username is already exists!</div>
    <div class="loginOK" v-show="loginOK">login successfully!</div>
    </div>
   </transition-group>
   <transition-group 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter='afEnter'
    @before-leave='bleave'
    @leave='leave'
    @after-leave='afleave'
   >
   <div class="tips" v-if='btnStatus' v-show='show'  key="tips">  
      <p>username 只能是数字和字母且长度不能超过八位</p>
      <p>password 最少六位，最多十二位。</p>
    </div>
   </transition-group>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name:"Login",
  data(){
    return{
      userName:'',
      pad:'',
      show:false,
      reg:/[\w]{1,8}$/img,
      btnStatus:true,
      isRegitster:false,
      loginOK:false,
      loadStatus:false
    }
  },
  computed:{
    listenInfo(){
      /* 这里利用了es6的属性,属性名和属性值相同时可省略和结构赋值 同时监听input中的两个值*/ 
      let {userName,pad} = this;
      return  {userName,pad}
    },
    stateValue(){
      return this.$store.state.token;
    },
    ...mapMutations(['changeLoginStatus'])
  },
  watch:{
    listenInfo(val){
      let self = this;
      if(val.userName !=''&&val.pad !=''){
        if(val.userName.match(this.reg) != null && val.userName.length<=8 && val.pad.length<=12 && val.pad.length>=6){
          this.btnStatus = false;
          window.onkeydown = function(e){
              // console.log(e)
            if(e.key=='Enter'){
              self.axios({
                method:"post",
                url:'/api/users',
                params:{
                  uname:self.userName,
                  pad:self.pad
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              }).then(data=>{
               if(data.data.isRegister){
                 console.log(data.data.isRegister)
                  self.userName = ''
                  self.pad= ''
                  self.isRegitster =true;
                  setTimeout(()=>{self.isRegitster = false},2000)
               }else {
                 if(data.data.loginOK){
                    self.loginOK = data.data.loginOK;
                    sessionStorage.loginToken = '1';
                    self.loadStatus = true;
                    self.$router.push('/')
                 }
               }
              })
              
            }
          }
        }else{
          this.btnStatus = true
        }
      }else {
        this.btnStatus = true;
      }
    }
  },
  created(){
  
  },
  mounted(){
    this.show = true;
    // console.log(localStorage.getItem('loginToken'))
    // console.log(this.listenInfo)
  
  },
  methods:{
   toHome(){
    // this.$router.push({name:"homepage"}) /* 当路由命名后可以用这种办法来进行路由跳转 */
    this.axios({
      method:"post",
      url:'/api/users',
      params:{
        uname:this.userName,
        pad:this.pad
      },
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(data=>{
      // console.log(data.data)
      this.isRegitster = data.data.isRegister;
      if(this.isRegitster) {
        this.userName = ''
        this.pad= ''
        setTimeout(()=>{this.isRegitster = false},2000)
      } else {
        this.loginOK = data.data.loginOK;
        sessionStorage.loginToken = '1';
        localStorage.setItem('username',this.userName)
        this.loadStatus = true;
        this.$router.push('/')
       
      }
    })
    
   },
   beforeEnter: function (el) {
      el.style.opacity = 0
      // el.style.transformOrigin = 'left'
      el.style.transform= 'translateX(30px)'
    },
    enter: function (el, done) {
     //使用setTimeout函数 或者加上el.offsetWidth. 这样过渡效果才会执行
      setTimeout(()=>{
        el.style.opacity =.4;
        el.style.transform= 'translateX(10px)'
        el.style.transition="all 1s ease";
      done()
      },20)
      
    },
    afEnter(el){
      el.style.opacity =1;
    },
    bleave(el){
      console.log(el)
      el.style.opacity = 1
    },
    leave:function(el,done){
      // el.offsetWidth
     
      el.style.opacity = .5;
      el.style.transform ='translateX(-30px)';
      el.style.transition='all 1s ease';
     setTimeout(done,1000)
  
    },
    afleave(el){
      el.style.opacity=0
    }
  }
}
</script>
<style lang="stylus" scoped>
  .isRegister
    width 20em
    border 1px solid red
    border-radius .5rem
    margin 2rem auto
    padding .4rem 0
    color red
    font-family Lobster
    font-weight blod
    text-shadow 1px 2px pink
    text-align center
  .loginOK
    width 20em
    border 1px solid green
    border-radius .5rem
    margin 2rem auto
    padding .4rem 0
    color green
    font-family Lobster
    font-weight blod
    text-shadow 1px 2px pink
    text-align center
  .fade-enter,.fade-leave-to 
    opacity: 0
    transform translateY(30px)
  .fade-enter-active,.fade-leave-avtive 
    transition: all .3s
  .filter
    width 100vw
    height 100vh
    background rgba(10,20,10,.3)
    filter blur(200px)
    position absolute
    z-index 0
  .login 
    width 100vw
    height 100vh
    position relative
    overflow hidden
    background url(../assets/dusk.jpg) no-repeat
    background-size 100vw 100vh
  .title
    width 20rem
    color:pink
    font-size 2rem
    font-family Lobster,sans-serif
    text-shadow 1px 3px pink
    margin 3.2rem auto 2rem
    text-align center
  .tips
    width 20rem
    font-size 14px
    color #eee
    font-weight bold
    margin 5rem auto
    p
      line-height 2rem
  .form
    width 30%
    min-width 18rem
    padding .3rem .4rem
    margin 2rem auto
    background linear-gradient(to right bottom,rgba(10,200,200,.4),rgba(0,0,100,.5))
    border-radius .3rem
    position: relative; 
    z-index 3
    label
      display block
      width 100%
      margin 2rem 0
      display inline-flexbox
      flex-flow wrap row 
      justify-content space-between
      span
        display inline-block
        line-height 32px
        width 25%
        color #ccc 
        font-family Lobster,sans-serif
        text-indent 5px
      input 
        width 71%
        height 2rem
        outline none
        border none
        padding .3rem 2%
        border-radius .5rem
    button
      width 100%
      height 2rem
      line-height 2rem
      font-size 1.2rem
      padding 0
      outline none
      border-radius .5rem

</style>