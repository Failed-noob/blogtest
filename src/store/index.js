import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    isLogin:false,
    currentUser:null,
    personList:[{
        name:"dh",
        gender:"male",
        age:32
      },
      {
        name:"haha",
        gender:"famale",
        age:22
      },
      {
        name:"xixi",
        gender:"famale",
        age:20
      }
    ]
  },
  getters:{
    deriveState: state=>{
      return state.personList.filter(el=> el.age>20)
    }
  },
  mutations: {
    changeLoginStatus(state,user){
      if(user){
        // state.isLogin = true;
        // state.currentUser = user
        console.log(state.isLogin, state.currentUser)
      }else if(user==null){
        state.isLogin = false;
        // state.currentUser = null
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
