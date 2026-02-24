<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import chartUserSquare from "@/assets/icons/chart-user-square.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Reason {
  id: string;
  text: string;
  accent: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const reasons: Reason[] = [
  {
    id: "team",
    text: "Strategik fikrlaydigan moliyachilar jamoasi",
    accent: "#39B270"
  },
  {
    id: "adapt",
    text: "Qonunchilikdagi o'zgarishlarga tez moslashuv",
    accent: "#2DA8C8"
  },
  {
    id: "manager",
    text: "Har bir mijoz uchun shaxsiy menejer",
    accent: "#8B6FE8"
  },
  {
    id: "price",
    text: "Shaffof narx siyosati",
    accent: "#E8A43A"
  },
  {
    id: "privacy",
    text: "Biznes sirini to'liq himoya qilish",
    accent: "#E85A6F"
  },
  {
    id: "innovation",
    text: "Innovatsion moliyaviy yechimlar",
    accent: "#39B270"
  }
];

// Duplicate for seamless infinite loop
const track = computed(() => [...reasons, ...reasons, ...reasons]);

// ─── Pause on hover ───────────────────────────────────────────────────────────
const paused = ref(false);
</script>

<template>
  <section class="uct-why">
    <div class="mx-auto w-full max-w-[1220px] px-4">
      <!-- Header -->
      <div class="why-header">
        <h2 class="why-title font-syne">NEGA AYNAN UCT FINANCE GROUP?</h2>
        <p class="why-subtitle font-syne">
          Biz bilan ishlash – bu oddiy xizmat emas, bu uzoq muddatli moliyaviy
          hamkorlik.
        </p>
      </div>
    </div>

    <!-- Full-width ticker (outside max-width so it bleeds edge to edge) -->
    <div
      class="cards-viewport mt-8"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <!-- Fade masks -->
      <span class="fade-left" aria-hidden="true" />
      <span class="fade-right" aria-hidden="true" />

      <div class="cards-track" :class="{ 'is-paused': paused }">
        <article
          v-for="(reason, i) in track"
          :key="`${reason.id}-${i}`"
          class="reason-card"
          :style="{ '--accent': reason.accent }"
        >
          <!-- Glow -->
          <span class="card-glow" aria-hidden="true" />

          <!-- Icon -->
          <span class="reason-icon-wrap" aria-hidden="true">
            <component :is="chartUserSquare" class="reason-icon" />
            <span class="icon-ring" aria-hidden="true" />
          </span>

          <!-- Text -->
          <p class="reason-text font-syne">{{ reason.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.uct-why {
  border-radius: 28px;
  background: #fff;
  padding: 48px 0;
  overflow: hidden;
}

/* ── Header ──────────────────────────────────────────────── */
.why-header {
  text-align: center;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.why-title {
  margin: 0;
  color: #39b270;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.06;
}

.why-subtitle {
  margin: 0;
  color: #000;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.35;
}

/* ── Viewport ────────────────────────────────────────────── */
.cards-viewport {
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* Edge fade masks */
.fade-left,
.fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, #fff 0%, transparent 100%);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, #fff 0%, transparent 100%);
}

/* ── Track ───────────────────────────────────────────────── */
.cards-track {
  display: flex;
  gap: 18px;
  width: max-content;
  animation: ticker 32s linear infinite;
}

.cards-track.is-paused {
  animation-play-state: paused;
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}

/* ── Card ────────────────────────────────────────────────── */
.reason-card {
  position: relative;
  display: flex;
  min-height: 200px;
  width: 340px;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  border-radius: 30px;
  background: #f8f8f9;
  padding: 22px 20px;
  overflow: hidden;
  cursor: default;
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.reason-card:hover {
  background: #fff;
  box-shadow:
    0 14px 40px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(-4px) scale(1.015);
}

/* ── Glow ────────────────────────────────────────────────── */
.card-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: var(--accent, #39b270);
  opacity: 0;
  filter: blur(45px);
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.reason-card:hover .card-glow {
  opacity: 0.12;
}

/* ── Icon ────────────────────────────────────────────────── */
.reason-icon-wrap {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--accent, #37ae6d);
  z-index: 1;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.reason-card:hover .reason-icon-wrap {
  transform: scale(1.12) rotate(-6deg);
}

.icon-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--accent, #37ae6d);
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.reason-card:hover .icon-ring {
  opacity: 0.35;
  transform: scale(1.1);
}

.reason-icon {
  height: 24px;
  width: 24px;
  color: #fff;
}

/* ── Text ────────────────────────────────────────────────── */
.reason-text {
  position: relative;
  z-index: 1;
  margin: 0;
  color: #000;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.4px;
  transition: color 0.22s ease;
}

.reason-card:hover .reason-text {
  color: #111;
  font-weight: 600;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 768px) {
  .why-title {
    font-size: 26px;
  }
  .why-subtitle {
    font-size: 16px;
  }
  .reason-card {
    width: 280px;
    min-height: 170px;
  }
  .reason-text {
    font-size: 16px;
  }
  .fade-left,
  .fade-right {
    width: 60px;
  }
}
</style>
