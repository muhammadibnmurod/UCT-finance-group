<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Logo from "@/assets/images/Logo.png";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Biz haqimizda", href: "#about" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Narxlar", href: "#pricing" },
  { label: "Yangiliklar", href: "#news" },
  { label: "Mijozlar", href: "#clients" },
  { label: "Kontaktlar", href: "#contact" }
];

const isScrolled = ref(false);
const activeIndex = ref(0);
const mobileOpen = ref(false);

function onScroll() {
  isScrolled.value = window.scrollY > 24;
}

function scrollToSection(href: string) {
  if (!href.startsWith("#")) return;
  const target = document.querySelector(href) as HTMLElement | null;
  if (!target) return;
  const header = document.querySelector(".site-header") as HTMLElement | null;
  const offset = (header?.offsetHeight ?? 0) + 8;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}

function onNavClick(i: number, href: string) {
  activeIndex.value = i;
  mobileOpen.value = false;
  scrollToSection(href);
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-inner">
      <!-- Logo -->
      <a href="#" class="header-logo" aria-label="UCT Finance Group">
        <img :src="Logo" alt="UCT Finance Group" class="logo-img" />
      </a>

      <!-- Desktop nav -->
      <nav class="desktop-nav" aria-label="Asosiy menyu">
        <a
          v-for="(item, i) in navItems"
          :key="item.label"
          :href="item.href"
          class="nav-link font-manrope"
          :class="{ 'is-active': activeIndex === i }"
          @click.prevent="onNavClick(i, item.href)"
        >
          {{ item.label }}
          <span class="nav-indicator" aria-hidden="true" />
        </a>
      </nav>

      <!-- CTA + hamburger -->
      <div class="header-actions">
        <button
          type="button"
          class="cta-btn font-manrope"
          aria-label="Bepul konsultatsiya"
        >
          <span>Bepul konsultatsiya</span>
          <svg
            class="cta-arrow"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          class="hamburger"
          :class="{ 'is-open': mobileOpen }"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          aria-label="Menyuni ochish"
          @click="mobileOpen = !mobileOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>
    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <nav
        v-if="mobileOpen"
        id="mobile-menu"
        class="mobile-nav"
        aria-label="Mobil menyu"
      >
        <a
          v-for="(item, i) in navItems"
          :key="item.label"
          :href="item.href"
          class="mobile-link font-manrope"
          :class="{ 'is-active': activeIndex === i }"
          :style="{ animationDelay: `${i * 45}ms` }"
          @click.prevent="onNavClick(i, item.href)"
        >
          {{ item.label }}
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="css">
/* ── Header shell ────────────────────────────────────────── */
.site-header {
  --header-height: 80px;
  position: relative;
  z-index: 100;
  width: 100%;
  padding: 0;
  min-height: var(--header-height);
}

@media (max-width: 640px) {
  .site-header {
    --header-height: 68px;
  }
}

/* ── Inner bar ───────────────────────────────────────────── */
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  border-radius: 28px;
  background: rgba(237, 236, 239, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 0 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 2px 8px rgba(16, 24, 40, 0.06),
    0 0 0 0.5px rgba(255, 255, 255, 0.4) inset;
  transition:
    box-shadow 0.35s ease,
    background 0.35s ease;
}

.site-header.is-scrolled .header-inner {
  background: rgba(237, 236, 239, 0.72);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 0 0 0.5px rgba(255, 255, 255, 0.5) inset;
}

/* ── Logo ────────────────────────────────────────────────── */
.header-logo {
  flex-shrink: 0;
  display: block;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.header-logo:hover {
  opacity: 0.85;
  transform: scale(1.03);
}

.logo-img {
  height: 48px;
  width: 100px;
  object-fit: contain;
}

/* ── Desktop nav ─────────────────────────────────────────── */
.desktop-nav {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin: 0 16px;
}

@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 12px 10px 6px;
  font-size: 15px;
  font-weight: 500;
  color: #9e9ea8;
  text-decoration: none;
  border-radius: 10px;
  transition:
    color 0.22s ease,
    background 0.22s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #1bae66;
  background: rgba(27, 174, 102, 0.07);
}

.nav-link.is-active {
  color: #1bae66;
}

/* Top full-width indicator */
.nav-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 99px 99px 0 0;
  background: #1bae66;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-link.is-active .nav-indicator,
.nav-link:hover .nav-indicator {
  transform: scaleX(1);
}

/* ── Actions ─────────────────────────────────────────────── */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* ── CTA button ──────────────────────────────────────────── */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  border-radius: 14px;
  background: #2cb36c;
  padding: 13px 26px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  transition:
    background 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.cta-btn:hover {
  background: #23985b;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(44, 179, 108, 0.35);
}

.cta-btn:active {
  transform: scale(0.96);
}

.cta-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.22s ease;
  flex-shrink: 0;
}

.cta-btn:hover .cta-arrow {
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .cta-btn span {
    display: none;
  }
  .cta-btn {
    padding: 10px 14px;
  }
}

/* ── Hamburger ───────────────────────────────────────────── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  transition: background 0.2s;
}

.hamburger:hover {
  background: rgba(0, 0, 0, 0.06);
}

@media (max-width: 1024px) {
  .hamburger {
    display: flex;
  }
}

.hamburger span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: #9e9ea8;
  transform-origin: center;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    width 0.3s ease;
}

.hamburger span:nth-child(3) {
  width: 65%;
}

.hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.is-open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.is-open span:nth-child(3) {
  width: 100%;
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile nav ──────────────────────────────────────────── */
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 16px 16px;
  margin-top: 8px;
  border-radius: 20px;
  background: rgba(237, 236, 239, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.mobile-link {
  display: block;
  padding: 13px 14px;
  font-size: 17px;
  font-weight: 500;
  color: #9e9ea8;
  text-decoration: none;
  border-radius: 12px;
  transition:
    color 0.2s ease,
    background 0.2s ease;
  opacity: 0;
  animation: mobileItemIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.mobile-link:hover,
.mobile-link.is-active {
  color: #1bae66;
  background: rgba(27, 174, 102, 0.09);
}

@keyframes mobileItemIn {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ── Mobile menu transition ──────────────────────────────── */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.97);
}
</style>
