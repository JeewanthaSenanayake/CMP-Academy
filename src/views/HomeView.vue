<template>
    <div>
    <h1>hi </h1>
    {{ JSON.parse(data) }}
</div>
</template>
    
<script>

export default {
    components: {
      
    },
    data(){
        return{
            data:sessionStorage.getItem('key')
        }
    }
}
</script>


  
  