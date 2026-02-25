<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "UCT Finance Group bilan ishlashni boshlaganimizdan so'ng moliyaviy tartib va nazorat kuchaydi. Qarorlar endi taxmin asosida emas, aniq raqamlar asosida qabul qilinadi.",
    author: "Habibxonov Hikmatullo",
    role: "Biznes egasi",
    initials: "HH",
    color: "#b7c5a8"
  },
  {
    id: 2,
    text: "Ular bilan hamkorlik qilish biznesimizda aniqlik va barqarorlik olib keldi. Hisobotlar tushunarli va o'z vaqtida taqdim etiladi.",
    author: "Azizbek Karimov",
    role: "Direktor",
    initials: "AK",
    color: "#c4a882"
  },
  {
    id: 3,
    text: "Moliyaviy masalalarda ishonchli va professional yondashuv. Jamoa har doim aloqada va savollarimga tez javob beradi.",
    author: "Dilshod Raximov",
    role: "Moliyaviy menejer",
    initials: "DR",
    color: "#8fafc4"
  },
  {
    id: 4,
    text: "Biznesimizning moliyaviy holatini tushunish osonlashdi. UCT jamoasi professionallik va ishonchlilik bilan ajralib turadi.",
    author: "Jasur Toshmatov",
    role: "Tadbirkor",
    initials: "JT",
    color: "#a8b5c4"
  },
  {
    id: 5,
    text: "Moliyaviy hisobotlar va tahlillar orqali biznesimizda sezilarli o'zgarishlar ro'y berdi. Juda minnatdormiz.",
    author: "Sarvar Umarov",
    role: "Bosh direktor",
    initials: "SU",
    color: "#c4b8a8"
  }
];

const activeIndex = ref(0);
const isTransitioning = ref(false);
const contentKey = ref(0);
const activeTestimonial = computed(() => testimonials[activeIndex.value]);

const INTERVAL = 6000;
const TICK = 50;
const progress = ref(0);
let progressTimer: ReturnType<typeof setInterval> | null = null;
let slideTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimers() {
  if (progressTimer) clearInterval(progressTimer);
  if (slideTimer) clearTimeout(slideTimer);
}

function goTo(index: number) {
  if (index === activeIndex.value || isTransitioning.value) return;
  isTransitioning.value = true;
  setTimeout(() => {
    activeIndex.value = index;
    contentKey.value++;
    isTransitioning.value = false;
  }, 300);
}

function startCycle() {
  clearTimers();
  progress.value = 0;
  progressTimer = setInterval(() => {
    progress.value = Math.min(progress.value + (TICK / INTERVAL) * 100, 100);
  }, TICK);
  slideTimer = setTimeout(() => {
    goTo((activeIndex.value + 1) % testimonials.length);
    startCycle();
  }, INTERVAL);
}

function selectDot(i: number) {
  clearTimers();
  goTo(i);
  setTimeout(startCycle, 300);
}

function prev() {
  const i = (activeIndex.value - 1 + testimonials.length) % testimonials.length;
  selectDot(i);
}

function next() {
  const i = (activeIndex.value + 1) % testimonials.length;
  selectDot(i);
}

onMounted(startCycle);
onUnmounted(clearTimers);
</script>

<template>
  <section class="testimonials" id="clients">
    <div class="t-container">
      <!-- Header -->
      <div class="t-header">
        <h2 class="t-title font-syne">Mijozlar biz haqimizda</h2>
        <p class="t-subtitle font-manrope">
          Biz bilan ishlash — bu oddiy xizmat emas, bu uzoq muddatli moliyaviy
          hamkorlik.
        </p>
      </div>

      <!-- Quote area with arrow buttons -->
      <div class="quote-area">
        <!-- Prev arrow -->
        <button class="arrow-btn" aria-label="Oldingi" @click="prev">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Quote text -->
        <div
          class="quote-body"
          :class="{ 'is-transitioning': isTransitioning }"
          :key="contentKey"
        >
          <p class="quote-text font-syne">"{{ activeTestimonial.text }}"</p>
          <p class="author-name font-manrope">{{ activeTestimonial.author }}</p>
        </div>

        <!-- Next arrow -->
        <button class="arrow-btn" aria-label="Keyingi" @click="next">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- Avatar dots navigation -->
      <div
        class="avatar-nav"
        role="tablist"
        aria-label="Mijozlar navigatsiyasi"
      >
        <button
          v-for="(t, i) in testimonials"
          :key="t.id"
          role="tab"
          :aria-selected="i === activeIndex"
          :aria-label="`${t.author}`"
          class="avatar-btn"
          :class="{ 'is-active': i === activeIndex }"
          @click="selectDot(i)"
        >
          <span
            class="avatar-circle font-syne"
            :style="{ background: t.color }"
          >
            {{ t.initials }}
          </span>
          <!-- progress ring on active -->
          <svg
            v-if="i === activeIndex"
            class="avatar-progress"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#39b270"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-dasharray="163.4"
              :stroke-dashoffset="163.4 - (163.4 * progress) / 100"
              transform="rotate(-90 28 28)"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.testimonials {
  background: #f0f2f5;
  border-radius: 28px;
  padding: 72px 24px 64px;
  overflow: hidden;
}

/* ── Container ───────────────────────────────────────────── */
.t-container {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* ── Header ──────────────────────────────────────────────── */
.t-header {
  text-align: center;
  margin-bottom: 52px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.t-title {
  margin: 0;
  font-size: 34px;
  font-weight: 700;
  color: #39b270;
}

.t-subtitle {
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1.5;
}

/* ── Quote area ──────────────────────────────────────────── */
.quote-area {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 44px;
}

/* ── Arrow buttons ───────────────────────────────────────── */
.arrow-btn {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid #d0d5dc;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.arrow-btn svg {
  width: 18px;
  height: 18px;
}

.arrow-btn:hover {
  border-color: #39b270;
  background: #39b270;
  color: #fff;
  transform: scale(1.08);
  box-shadow: 0 4px 14px rgba(57, 178, 112, 0.3);
}

.arrow-btn:active {
  transform: scale(0.95);
}

/* ── Quote body ──────────────────────────────────────────── */
.quote-body {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.quote-body.is-transitioning {
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}

.quote-text {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.7;
  color: #1a1a1a;
  font-style: normal;
}

.author-name {
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  color: #9aa0a6;
  letter-spacing: 0.3px;
}

/* ── Avatar navigation ───────────────────────────────────── */
.avatar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.avatar-btn {
  position: relative;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.avatar-btn:not(.is-active) {
  opacity: 0.55;
  transform: scale(0.82);
}

.avatar-btn.is-active {
  opacity: 1;
  transform: scale(1);
}

.avatar-btn:hover:not(.is-active) {
  opacity: 0.85;
  transform: scale(0.9);
}

.avatar-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

/* SVG progress ring */
.avatar-progress {
  position: absolute;
  inset: 0;
  width: 56px;
  height: 56px;
  z-index: 2;
  pointer-events: none;
  transition: stroke-dashoffset 50ms linear;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .testimonials {
    padding: 48px 16px 52px;
    border-radius: 20px;
  }
  .t-title {
    font-size: 26px;
  }
  .t-subtitle {
    font-size: 16px;
  }
  .quote-text {
    font-size: 17px;
  }
  .quote-area {
    gap: 12px;
  }
  .arrow-btn {
    width: 38px;
    height: 38px;
  }
  .arrow-btn svg {
    width: 15px;
    height: 15px;
  }
}

@media (max-width: 480px) {
  .testimonials {
    padding: 36px 12px 44px;
    border-radius: 16px;
  }
  .t-title {
    font-size: 22px;
  }
  .t-subtitle {
    font-size: 14px;
  }
  .quote-text {
    font-size: 15px;
    line-height: 1.65;
  }
  .t-header {
    margin-bottom: 36px;
  }
  .arrow-btn {
    width: 34px;
    height: 34px;
  }
  .avatar-btn {
    width: 48px;
    height: 48px;
  }
  .avatar-circle {
    width: 38px;
    height: 38px;
    font-size: 11px;
  }
  .avatar-progress {
    width: 48px;
    height: 48px;
  }
}
</style>
