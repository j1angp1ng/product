<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {loginRequest} from '@/api/user/index'
onMounted(()=>{
  loginRequest({
    username:'admin',
    password:'111111'
  })
})
</script>


