<template>
  <sidebarLeft />
  <main class="main-content">
    <router-view />
  </main>
</template>

<script setup>
import sidebarLeft from '@/components/layout/SidebarLeft'
</script>
