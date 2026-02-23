<script setup lang="ts">
import Logo from "@/assets/images/Logo.png";

const navItems = [
  "Bosh sahifa",
  "Biz haqimizda",
  "Xizmatlar",
  "Narxlar",
  "Yangiliklar",
  "Mijozlar",
  "Kontaktlar"
];
</script>

<template>
  <header class="w-full rounded-2xl">
    <div
      class="flex items-center justify-between rounded-xl bg-[#EDECEF] px-10 py-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
    >
      <a href="#" class="shrink-0">
        <img :src="Logo" alt="UCT Finance Group" class="h-10 w-auto" />
      </a>

      <nav class="mx-6 hidden flex-1 items-center justify-center gap-6 lg:flex">
        <a
          v-for="(item, index) in navItems"
          :key="item"
          href="#"
          class="text-sm font-manrope text-[#2F2E3A] transition-colors hover:text-[#1BAE66]"
          :class="index === 0 ? 'text-[#1BAE66]' : ''"
        >
          {{ item }}
        </a>
      </nav>

      <div class="shrink-0">
        <button
          type="button"
          class="rounded-xl bg-[#2CB36C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#23985b]"
        >
          Bepul konsultatsiya
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="css"></style>
