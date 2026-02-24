<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  initials: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "UCT Finance Group bilan ishlashni boshlaganimizdan so'ng moliyaviy tartib va nazorat kuchaydi. Qarorlar endi taxmin asosida emas, aniq raqamlar asosida qabul qilinadi.",
    author: "Habibxonov Hikmatullo",
    role: "Biznes egasi",
    initials: "HH"
  },
  {
    id: 2,
    text: "Ular bilan hamkorlik qilish biznesimizda aniqlik va barqarorlik olib keldi. Hisobotlar tushunarli va o'z vaqtida taqdim etiladi.",
    author: "Azizbek Karimov",
    role: "Direktor",
    initials: "AK"
  },
  {
    id: 3,
    text: "Moliyaviy masalalarda ishonchli va professional yondashuv. Jamoa har doim aloqada va savollarimga tez javob beradi.",
    author: "Dilshod Raximov",
    role: "Moliyaviy menejer",
    initials: "DR"
  }
];

// ─── State ────────────────────────────────────────────────────────────────────
const activeIndex = ref(0);
const isTransitioning = ref(false);
const contentKey = ref(0);
const activeTestimonial = computed(() => testimonials[activeIndex.value]);

// ─── Auto-play + progress ─────────────────────────────────────────────────────
const progress = ref(0);
const INTERVAL = 6000;
const TICK = 50;
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
  }, 340);
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
  setTimeout(startCycle, 340);
}

onMounted(startCycle);
onUnmounted(clearTimers);
</script>

<template>
  <section class="testimonials" id="clients">
    <!-- Decorative background blobs -->
    <span class="bg-blob blob-1" aria-hidden="true" />
    <span class="bg-blob blob-2" aria-hidden="true" />

    <div class="t-container">
      <!-- Header -->
      <div class="t-header">
        <h2 class="t-title font-syne">Mijozlar biz haqimizda</h2>
        <p class="t-subtitle font-syne">
          Biz bilan ishlash — bu oddiy xizmat emas, bu uzoq muddatli moliyaviy
          hamkorlik.
        </p>
      </div>

      <!-- Quote card -->
      <div class="quote-card" :class="{ 'is-transitioning': isTransitioning }">
        <!-- Big decorative quote mark -->
        <span class="quote-mark" aria-hidden="true">"</span>

        <!-- Content animates on key change -->
        <div class="quote-inner" :key="contentKey">
          <blockquote class="quote-text font-syne">
            {{ activeTestimonial.text }}
          </blockquote>

          <div class="author-row">
            <span class="author-avatar font-syne">
              {{ activeTestimonial.initials }}
            </span>
            <div class="author-info">
              <p class="author-name font-syne">
                {{ activeTestimonial.author }}
              </p>
              <p class="author-role font-manrope">
                {{ activeTestimonial.role }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress dot indicators -->
      <div
        class="dots"
        role="tablist"
        aria-label="Mijozlar fikrlari navigatsiyasi"
      >
        <button
          v-for="(t, i) in testimonials"
          :key="t.id"
          role="tab"
          :aria-selected="i === activeIndex"
          :aria-label="`${i + 1}-fikr`"
          class="dot-btn"
          :class="{ 'is-active': i === activeIndex }"
          @click="selectDot(i)"
        >
          <span class="dot-track">
            <span
              class="dot-fill"
              :style="
                i === activeIndex ? { width: `${progress}%` } : { width: '0%' }
              "
            />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.testimonials {
  position: relative;
  background: #f7f8f9;
  border-radius: 28px;
  padding: 72px 24px;
  overflow: hidden;
}

/* ── Blobs ───────────────────────────────────────────────── */
.bg-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  animation: blobDrift 14s ease-in-out infinite;
}

.blob-1 {
  width: 360px;
  height: 360px;
  background: rgba(57, 178, 112, 0.08);
  top: -100px;
  left: -80px;
}
.blob-2 {
  width: 280px;
  height: 280px;
  background: rgba(57, 178, 112, 0.06);
  bottom: -80px;
  right: -60px;
  animation-delay: 5s;
  animation-duration: 18s;
}

@keyframes blobDrift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  40% {
    transform: translate(20px, -16px) scale(1.05);
  }
  70% {
    transform: translate(-12px, 10px) scale(0.96);
  }
}

/* ── Container ───────────────────────────────────────────── */
.t-container {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

/* ── Header ──────────────────────────────────────────────── */
.t-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 44px;
}

.t-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #39b270;
}

.t-subtitle {
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  color: #000;
}

/* ── Quote card ──────────────────────────────────────────── */
.quote-card {
  position: relative;
  background: #fff;
  border-radius: 24px;
  padding: 48px 48px 40px;
  text-align: left;
  overflow: hidden;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 1px 4px rgba(0, 0, 0, 0.04);
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease,
    opacity 0.3s ease;
}

.quote-card:hover {
  box-shadow:
    0 12px 40px rgba(57, 178, 112, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.05);
  transform: translateY(-3px);
}

.quote-card.is-transitioning {
  opacity: 0.55;
  transform: scale(0.99);
  pointer-events: none;
}

/* ── Decorative quote mark ───────────────────────────────── */
.quote-mark {
  position: absolute;
  top: 8px;
  left: 28px;
  font-size: 130px;
  line-height: 1;
  color: #39b270;
  opacity: 0.07;
  font-family: Georgia, serif;
  pointer-events: none;
  user-select: none;
}

/* ── Animated content ────────────────────────────────────── */
.quote-inner {
  animation: quoteIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes quoteIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Quote text ──────────────────────────────────────────── */
.quote-text {
  margin: 0 0 32px;
  font-size: 20px;
  line-height: 1.65;
  color: #1a1a1a;
  font-weight: 400;
  font-style: normal;
}

/* ── Author ──────────────────────────────────────────────── */
.author-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.author-avatar {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #39b270, #2a8a55);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111;
}

.author-role {
  margin: 0;
  font-size: 13px;
  color: #9aa0a6;
}

/* ── Dots ────────────────────────────────────────────────── */
.dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 28px;
}

.dot-btn {
  background: none;
  border: none;
  padding: 6px 0;
  cursor: pointer;
}

.dot-track {
  display: block;
  width: 44px;
  height: 4px;
  border-radius: 999px;
  background: rgba(57, 178, 112, 0.2);
  overflow: hidden;
  transition: background 0.3s ease;
}

.dot-btn.is-active .dot-track {
  background: rgba(57, 178, 112, 0.3);
}
.dot-btn:hover:not(.is-active) .dot-track {
  background: rgba(57, 178, 112, 0.4);
}

.dot-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: #39b270;
  width: 0%;
  transition: width 50ms linear;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 900px) {
  .t-container {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 52px 16px;
    border-radius: 20px;
  }
  .t-title {
    font-size: 26px;
  }
  .t-subtitle {
    font-size: 17px;
  }
  .quote-card {
    padding: 32px 24px 28px;
  }
  .quote-text {
    font-size: 17px;
  }
  .quote-mark {
    font-size: 80px;
    top: 6px;
    left: 18px;
  }
  .dot-track {
    width: 34px;
  }
}

@media (max-width: 480px) {
  .testimonials {
    padding: 40px 12px;
    border-radius: 16px;
  }
  .t-title {
    font-size: 22px;
  }
  .t-subtitle {
    font-size: 15px;
  }
  .t-header {
    margin-bottom: 28px;
  }
  .quote-card {
    padding: 26px 16px 22px;
    border-radius: 18px;
  }
  .quote-text {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .author-avatar {
    width: 40px;
    height: 40px;
    font-size: 13px;
  }
  .author-name {
    font-size: 14px;
  }
  .dot-track {
    width: 28px;
  }
}
</style>
