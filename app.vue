<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import Header from "~/components/layout/Header.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
</script>

<template>
  <ElConfigProvider>
    <div class="fixed top-4 left-0 right-0 z-50 px-4">
      <div class="mx-auto max-w-[1220px]">
        <Header />
      </div>
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>
