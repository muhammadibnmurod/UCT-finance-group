<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import MainImage from "@/assets/images/MainImage.png";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HeroSlide {
  name: string;
  title: string[];
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  gradient: string; // full background gradient per slide
  overlay: string; // radial accent overlay per slide
}

// ─── Slide Data ───────────────────────────────────────────────────────────────
const slides: HeroSlide[] = [
  {
    name: "model",
    title: [
      "Moliyani tartibga soling.",
      "Foydani oshiring.",
      "Biznesni boshqaring."
    ],
    description:
      "Biz biznesingizning moliyaviy modelini quramiz, pul oqimini nazorat qilamiz va strategik qarorlar uchun aniq raqamlar beramiz.",
    primaryBtn: "Bepul konsultatsiya",
    secondaryBtn: "Tijoriy taklif olish",
    gradient:
      "linear-gradient(96deg, #204407 0%, #0f6a70 41%, #1d8278 67%, #6fa83e 100%)",
    overlay:
      "radial-gradient(42% 68% at 84% 47%, rgba(147,226,92,0.32) 0%, transparent 74%)"
  },
  {
    name: "profit",
    title: ["Daromadingizni", "ikki baravarga", "oshiring."],
    description:
      "Moliyaviy tahlil va prognozlash orqali biznesingiz foydasini maksimal darajaga ko'taramiz.",
    primaryBtn: "Tahlilni boshlash",
    secondaryBtn: "Ko'proq ma'lumot",
    gradient:
      "linear-gradient(96deg, #0a3d1f 0%, #146b3a 40%, #2a9058 67%, #4fc87a 100%)",
    overlay:
      "radial-gradient(42% 68% at 84% 47%, rgba(92,200,147,0.38) 0%, transparent 74%)"
  },
  {
    name: "manage",
    title: ["Biznesingizni", "professional", "boshqaring."],
    description:
      "Strategik rejalashtirish va moliyaviy nazorat tizimi orqali biznesingizni yangi bosqichga olib chiqamiz.",
    primaryBtn: "Strategiya tuzish",
    secondaryBtn: "Namuna ko'rish",
    gradient:
      "linear-gradient(96deg, #062840 0%, #0d5068 41%, #1a7a8a 67%, #3aabb5 100%)",
    overlay:
      "radial-gradient(42% 68% at 84% 47%, rgba(110,200,255,0.28) 0%, transparent 74%)"
  }
];

// ─── State ────────────────────────────────────────────────────────────────────
const current = ref(0);
const isTransitioning = ref(false);
const contentKey = ref(0); // forces re-mount of animated content

const currentSlide = computed(() => slides[current.value]);

// Progress bar (fills over INTERVAL ms, resets on change)
const progress = ref(0);
const INTERVAL = 5000;
const TICK = 50;
let progressTimer: ReturnType<typeof setInterval> | null = null;
let slideTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimers() {
  if (progressTimer) clearInterval(progressTimer);
  if (slideTimer) clearTimeout(slideTimer);
}

function goTo(index: number) {
  if (index === current.value) return;
  isTransitioning.value = true;
  setTimeout(() => {
    current.value = index;
    contentKey.value++;
    isTransitioning.value = false;
  }, 380);
}

function next() {
  goTo((current.value + 1) % slides.length);
}

function startCycle() {
  clearTimers();
  progress.value = 0;

  progressTimer = setInterval(() => {
    progress.value += (TICK / INTERVAL) * 100;
    if (progress.value >= 100) progress.value = 100;
  }, TICK);

  slideTimer = setTimeout(() => {
    next();
    startCycle();
  }, INTERVAL);
}

onMounted(startCycle);
onUnmounted(clearTimers);

// Manual dot click — restart cycle from that slide
function selectSlide(i: number) {
  clearTimers();
  goTo(i);
  setTimeout(startCycle, 380);
}
</script>

<template>
  <section class="main-hero">
    <!-- ── Card ── -->
    <div
      class="hero-card"
      :class="{ 'is-transitioning': isTransitioning }"
      :style="{ background: currentSlide.gradient }"
    >
      <!-- Overlay (accent glow, shifts per slide) -->
      <div
        class="hero-bg-overlay"
        :style="{
          background: `radial-gradient(52% 80% at 12% 50%, rgba(0,0,0,0.5) 0%, transparent 70%), ${currentSlide.overlay}`
        }"
        aria-hidden="true"
      />

      <!-- Floating dots -->
      <div class="hero-dots" aria-hidden="true">
        <span v-for="n in 6" :key="n" class="hero-dot" :class="`dot-${n}`" />
      </div>

      <!-- Animated content -->
      <div class="hero-content" :key="contentKey">
        <div class="hero-text-block">
          <h1 class="hero-title font-syne">
            <span
              v-for="(line, i) in currentSlide.title"
              :key="line"
              class="hero-title-line"
              :style="{ animationDelay: `${i * 70}ms` }"
              >{{ line }}<br
            /></span>
          </h1>

          <p class="hero-description font-manrope">
            {{ currentSlide.description }}
          </p>
        </div>

        <div class="hero-actions">
          <button class="hero-btn hero-btn-primary font-manrope">
            {{ currentSlide.primaryBtn }}
          </button>
          <button class="hero-btn hero-btn-secondary font-manrope">
            {{ currentSlide.secondaryBtn }}
          </button>
        </div>

        <!-- ── Slide indicators (bottom-left, inside content) ── -->
        <div
          class="hero-indicators"
          role="tablist"
          aria-label="Slayd navigatsiyasi"
        >
          <button
            v-for="(slide, i) in slides"
            :key="slide.name"
            role="tab"
            :aria-selected="current === i"
            :aria-label="`Slayd ${i + 1}`"
            class="indicator-btn"
            :class="{ 'is-active': current === i }"
            @click="selectSlide(i)"
          >
            <span class="indicator-track">
              <span
                class="indicator-fill"
                :style="current === i ? { width: `${progress}%` } : {}"
              />
            </span>
          </button>
        </div>
      </div>

      <!-- Hero image -->
      <img
        :src="MainImage"
        alt="Biznes maslahatchi"
        class="hero-image"
        :class="{ 'image-transition': isTransitioning }"
      />
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.main-hero {
  margin-top: 26px;
}

/* ── Card ────────────────────────────────────────────────── */
.hero-card {
  position: relative;
  height: 560px;
  overflow: hidden;
  border-radius: 28px;
  padding: 52px 0 48px 52px;
  transition:
    background 0.8s ease,
    box-shadow 0.4s ease;
}

.hero-card:hover {
  box-shadow: 0 32px 80px rgba(15, 106, 112, 0.3);
}

.hero-card.is-transitioning {
  pointer-events: none;
}

/* ── Background overlay ──────────────────────────────────── */
.hero-bg-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 0.8s ease;
}

/* ── Floating dots ───────────────────────────────────────── */
.hero-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  animation: floatDot 8s ease-in-out infinite;
}

.dot-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}
.dot-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  left: 15%;
  animation-delay: 1.2s;
}
.dot-3 {
  width: 90px;
  height: 90px;
  top: 20%;
  left: 40%;
  animation-delay: 2.4s;
  animation-duration: 10s;
}
.dot-4 {
  width: 40px;
  height: 40px;
  top: 75%;
  left: 55%;
  animation-delay: 0.8s;
}
.dot-5 {
  width: 160px;
  height: 160px;
  top: -20%;
  left: 65%;
  animation-delay: 1.8s;
  animation-duration: 12s;
}
.dot-6 {
  width: 50px;
  height: 50px;
  top: 50%;
  left: 80%;
  animation-delay: 3s;
}

@keyframes floatDot {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-18px) scale(1.05);
  }
}

/* ── Content ─────────────────────────────────────────────── */
.hero-content {
  position: relative;
  z-index: 2;
  height: auto;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: contentIn 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes contentIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-text-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 974px;
}

/* ── Typography ──────────────────────────────────────────── */
.hero-title {
  margin: 0;
  color: white;
  font-size: 38px;
  font-weight: 800;
  line-height: 1.75;
  letter-spacing: -0.025em;
}

.hero-title-line {
  display: inline-block;
  opacity: 0;
  animation: lineIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes lineIn {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-description {
  margin: 0;
  max-width: 560px;
  color: #f2f2f7;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.55;
  opacity: 0;
  animation: contentIn 0.45s 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ── Buttons ─────────────────────────────────────────────── */
.hero-actions {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  opacity: 0;
  animation: contentIn 0.45s 0.32s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  border: none;
  border-radius: 14px;
  padding: 0 26px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.hero-btn:active {
  transform: scale(0.96) !important;
}

.hero-btn-primary {
  background: #fff;
  color: #2cb36c;
}
.hero-btn-primary:hover {
  background: #f5f5f5;
  color: #24985b;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.25);
}

.hero-btn-secondary {
  background: rgba(42, 129, 102, 0.75);
  color: #fff;
}
.hero-btn-secondary:hover {
  background: rgba(35, 113, 89, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(35, 113, 89, 0.35);
}

/* ── Slide indicators ────────────────────────────────────── */
.hero-indicators {
  display: flex;
  gap: 8px;
  margin-top: 36px;
  opacity: 0;
  animation: contentIn 0.45s 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.indicator-btn {
  background: none;
  border: none;
  padding: 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.indicator-track {
  display: block;
  width: 48px;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  overflow: hidden;
  transition: background 0.3s ease;
}

.indicator-btn.is-active .indicator-track {
  background: rgba(255, 255, 255, 0.35);
}

.indicator-btn:hover:not(.is-active) .indicator-track {
  background: rgba(255, 255, 255, 0.45);
}

.indicator-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: #ffffff;
  width: 0%;
  transition: width 50ms linear;
}

/* Inactive dots — full white bar (already visited or future) */
.indicator-btn:not(.is-active) .indicator-fill {
  width: 0% !important;
  transition: none;
}

/* ── Hero Image ──────────────────────────────────────────── */
.hero-image {
  position: absolute;
  right: -60px;
  bottom: -120px;
  z-index: 2;
  width: 901px;
  height: 702px;
  object-fit: contain;
  object-position: right bottom;
  pointer-events: none;
  transition:
    opacity 0.38s ease,
    transform 0.38s ease;
}

.hero-image.image-transition {
  opacity: 0.4;
  transform: translateX(12px) scale(0.97);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1200px) {
  .hero-card {
    padding: 40px 0 40px 30px;
    min-height: 380px;
  }
  .hero-title {
    font-size: 30px;
  }
  .hero-description {
    font-size: 15px;
  }
  .hero-btn {
    height: 42px;
    font-size: 14px;
  }
}

@media (max-width: 1024px) {
  .hero-image {
    display: none;
  }
}

@media (max-width: 900px) {
  .hero-card {
    border-radius: 20px;
    padding: 32px 20px 32px;
    min-height: auto;
  }
  .hero-content {
    max-width: 100%;
  }
  .hero-title {
    font-size: 28px;
    line-height: 1.6;
  }
  .hero-description {
    font-size: 14px;
  }
  .hero-image {
    display: none;
  }
  .hero-actions {
    flex-direction: column;
  }
  .hero-btn {
    width: 100%;
    font-size: 15px;
  }
  .hero-dot {
    display: none;
  }
}
</style>
