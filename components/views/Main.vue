<script setup lang="ts">
import { ref, computed, watch } from "vue";
import MainImage from "@/assets/images/MainImage.png";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HeroSlide {
  name: string;
  label: string;
  title: string[]; // Each line of the heading
  description: string;
  primaryBtn: string;
  secondaryBtn: string;
  accentColor: string; // Used for gradient tweaks per slide
}

// ─── Slide Data ───────────────────────────────────────────────────────────────
const slides: HeroSlide[] = [
  {
    name: "model",
    label: "Moliyaviy model",
    title: [
      "Moliyani tartibga soling.",
      "Foydani oshiring.",
      "Biznesni boshqaring."
    ],
    description:
      "Biz biznesingizning moliyaviy modelini quramiz, pul oqimini nazorat qilamiz va strategik qarorlar uchun aniq raqamlar beramiz.",
    primaryBtn: "Bepul konsultatsiya",
    secondaryBtn: "Tijoriy taklif olish",
    accentColor: "rgba(147, 226, 92, 0.32)"
  },
  {
    name: "profit",
    label: "Foyda o'sishi",
    title: ["Daromadingizni", "ikki baravarga", "oshiring."],
    description:
      "Moliyaviy tahlil va prognozlash orqali biznesingiz foydasini maksimal darajaga ko'taramiz.",
    primaryBtn: "Tahlilni boshlash",
    secondaryBtn: "Ko'proq ma'lumot",
    accentColor: "rgba(92, 200, 147, 0.35)"
  },
  {
    name: "manage",
    label: "Biznes boshqaruvi",
    title: ["Biznesingizni", "professional", "boshqaring."],
    description:
      "Strategik rejalashtirish va moliyaviy nazorat tizimi orqali biznesingizni yangi bosqichga olib chiqamiz.",
    primaryBtn: "Strategiya tuzish",
    secondaryBtn: "Namuna ko'rish",
    accentColor: "rgba(110, 180, 255, 0.22)"
  }
];

// ─── State ────────────────────────────────────────────────────────────────────
const activeTab = ref(slides[0].name);
const isTransitioning = ref(false);
const prevTab = ref(slides[0].name);

const currentSlide = computed(
  () => slides.find(s => s.name === activeTab.value) ?? slides[0]
);

// Trigger transition class on tab change
watch(activeTab, (next, prev) => {
  if (next === prev) return;
  prevTab.value = prev;
  isTransitioning.value = true;
  setTimeout(() => (isTransitioning.value = false), 420);
});

function selectTab(name: string) {
  if (name !== activeTab.value) activeTab.value = name;
}
</script>

<template>
  <section class="main-hero">
    <!-- ── Tab indicators ── -->
    <div class="hero-tabs-bar" role="tablist" :aria-label="'Hero navigation'">
      <button
        v-for="slide in slides"
        :key="slide.name"
        role="tab"
        :aria-selected="activeTab === slide.name"
        :aria-label="slide.label"
        class="hero-tab-btn"
        :class="{ 'is-active': activeTab === slide.name }"
        @click="selectTab(slide.name)"
      >
        <span class="hero-tab-line" />
        <span class="hero-tab-tooltip">{{ slide.label }}</span>
      </button>
    </div>

    <!-- ── Card ── -->
    <div
      class="hero-card"
      :class="{ 'is-transitioning': isTransitioning }"
      :style="{ '--accent': currentSlide.accentColor }"
    >
      <!-- Background overlays -->
      <div class="hero-bg-overlay" aria-hidden="true" />

      <!-- Animated content -->
      <div class="hero-content" :key="activeTab">
        <div class="hero-text-block">
          <h1 class="hero-title font-syne">
            <span
              v-for="(line, i) in currentSlide.title"
              :key="line"
              class="hero-title-line"
              :style="{ animationDelay: `${i * 70}ms` }"
            >
              {{ line }}<br />
            </span>
          </h1>

          <p class="hero-description font-manrope">
            {{ currentSlide.description }}
          </p>
        </div>

        <div class="hero-actions">
          <button class="hero-btn hero-btn-primary">
            {{ currentSlide.primaryBtn }}
          </button>
          <button class="hero-btn hero-btn-secondary">
            {{ currentSlide.secondaryBtn }}
          </button>
        </div>
      </div>

      <!-- Decorative floating dots -->
      <div class="hero-dots" aria-hidden="true">
        <span v-for="n in 6" :key="n" class="hero-dot" :class="`dot-${n}`" />
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

/* ── Tab Bar ─────────────────────────────────────────────── */
.hero-tabs-bar {
  display: flex;
  gap: 6px;
  padding: 0 52px 0;
  margin-bottom: -18px;
  position: relative;
  z-index: 2;
}

.hero-tab-btn {
  flex: 1 1 0;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  outline: none;
}

.hero-tab-line {
  display: block;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  transition:
    background 0.3s ease,
    transform 0.3s ease;
  transform-origin: left center;
}

.hero-tab-btn.is-active .hero-tab-line {
  background: #ffffff;
  transform: scaleX(1);
}

.hero-tab-btn:hover:not(.is-active) .hero-tab-line {
  background: rgba(255, 255, 255, 0.6);
}

/* Tooltip */
.hero-tab-tooltip {
  position: absolute;
  bottom: calc(100% - 22px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  font-family: "Manrope", sans-serif;
}

.hero-tab-btn:hover .hero-tab-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ── Card ────────────────────────────────────────────────── */
.hero-card {
  position: relative;
  min-height: 420px;
  overflow: hidden;
  border-radius: 28px;
  padding: 52px 0 0 52px;
  background: linear-gradient(
    96deg,
    #204407 0%,
    #0f6a70 41%,
    #1d8278 67%,
    #6fa83e 100%
  );
  transition: box-shadow 0.4s ease;
}

.hero-card:hover {
  box-shadow: 0 32px 80px rgba(15, 106, 112, 0.35);
}

.hero-card.is-transitioning {
  pointer-events: none;
}

/* ── Background Overlay ──────────────────────────────────── */
.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(52% 80% at 12% 50%, rgba(0, 0, 0, 0.5) 0%, transparent 70%),
    radial-gradient(
      42% 68% at 84% 47%,
      var(--accent, rgba(147, 226, 92, 0.32)) 0%,
      transparent 74%
    );
  pointer-events: none;
  transition: background 0.5s ease;
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
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-18px) scale(1.05);
  }
}

/* ── Content ─────────────────────────────────────────────── */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 60%;
  padding-bottom: 48px;

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
  font-size: 35px;
  font-weight: 800;
  line-height: 70px;
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
  max-width: 839px;
  color: #f2f2f7;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;

  opacity: 0;
  animation: contentIn 0.45s 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ── Buttons ─────────────────────────────────────────────── */
.hero-actions {
  margin-top: 32px;
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
  font-family: "Manrope", sans-serif;
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
  color: #2cb36c;
  background: #ffffff;
}

.hero-btn-primary:hover {
  color: #24985b;
  background: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.25);
}

.hero-btn-secondary {
  color: #ffffff;
  background: rgba(42, 129, 102, 0.75);
}

.hero-btn-secondary:hover {
  background: rgba(35, 113, 89, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(35, 113, 89, 0.35);
}

/* ── Image ───────────────────────────────────────────────── */
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
    opacity 0.35s ease,
    transform 0.35s ease;
}

.hero-image.image-transition {
  opacity: 0.5;
  transform: translateX(10px) scale(0.98);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1200px) {
  .hero-card {
    padding: 40px 0 0 30px;
    min-height: 360px;
  }
  .hero-title {
    font-size: 30px;
    line-height: 56px;
  }
  .hero-description {
    font-size: 15px;
  }
  .hero-btn {
    height: 42px;
    font-size: 14px;
  }
}

@media (max-width: 900px) {
  .hero-tabs-bar {
    padding: 0 18px;
  }

  .hero-card {
    border-radius: 20px;
    padding: 32px 20px 0;
    min-height: auto;
  }

  .hero-content {
    max-width: 100%;
    padding-bottom: 24px;
  }

  .hero-title {
    font-size: 28px;
    line-height: 48px;
  }
  .hero-description {
    font-size: 14px;
  }

  .hero-image {
    position: static;
    display: block;
    width: min(80%, 360px);
    height: auto;
    margin: 20px auto 0;
  }

  .hero-actions {
    margin-top: 20px;
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
