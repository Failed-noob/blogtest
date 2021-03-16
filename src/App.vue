<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
 created(){
  if(document.getElementsByClassName('change')[0]) {
    console.log(true)
  }
 }
}
</script>

<style lang="stylus">
 :root {
   --theme-color: pink
 }
 .change {
   background: rgb(10,20,30) !important;
   width:100px !important;
   height:100px !important;
   line-height: 10px !important;
   margin: 10rem auto !important;
   border-radius: .5rem !important;
 }
</style>
