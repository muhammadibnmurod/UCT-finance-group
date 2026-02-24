<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import chartUserSquare from "@/assets/icons/chart-user-square.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Reason {
  id: string;
  text: string;
  icon: unknown;
  accent: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const reasons: Reason[] = [
  {
    id: "team",
    text: "Strategik fikrlaydigan moliyachilar jamoasi",
    icon: chartUserSquare,
    accent: "#39B270"
  },
  {
    id: "adapt",
    text: "Qonunchilikdagi o'zgarishlarga tez moslashuv",
    icon: chartUserSquare,
    accent: "#2DA8C8"
  },
  {
    id: "innovation",
    text: "Innovatsion moliyaviy yechimlar",
    icon: chartUserSquare,
    accent: "#8B6FE8"
  },
  {
    id: "manager",
    text: "Har bir mijoz uchun shaxsiy menejer",
    icon: chartUserSquare,
    accent: "#E8A43A"
  },
  {
    id: "price",
    text: "Shaffof narx siyosati",
    icon: chartUserSquare,
    accent: "#E85A6F"
  },
  {
    id: "privacy",
    text: "Biznes sirini to'liq himoya qilish",
    icon: chartUserSquare,
    accent: "#39B270"
  }
];

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const hoveredId = ref<string | null>(null);

let observer: IntersectionObserver | null = null;
onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) visible.value = true;
    },
    { threshold: 0.15 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section class="why-uct" ref="sectionRef" :class="{ 'is-visible': visible }">
    <div class="mx-auto w-full max-w-[1220px] px-4">
      <!-- Header -->
      <div class="why-header">
        <h2 class="why-title font-syne">NEGA AYNAN UCT FINANCE GROUP?</h2>
        <p class="why-subtitle font-syne">
          Biz bilan ishlash – bu oddiy xizmat emas, bu uzoq muddatli moliyaviy
          hamkorlik.
        </p>
      </div>

      <!-- Grid -->
      <div class="reasons-grid">
        <article
          v-for="(reason, i) in reasons"
          :key="reason.id"
          class="reason-card"
          :class="{ 'is-hovered': hoveredId === reason.id }"
          :style="{ '--accent': reason.accent, '--i': i }"
          @mouseenter="hoveredId = reason.id"
          @mouseleave="hoveredId = null"
        >
          <!-- Background glow -->
          <span class="reason-glow" aria-hidden="true" />

          <!-- Number badge -->
          <span class="reason-number font-syne" aria-hidden="true">
            {{ String(i + 1).padStart(2, "0") }}
          </span>

          <!-- Icon -->
          <span class="reason-icon-wrap" aria-hidden="true">
            <component :is="reason.icon" class="reason-icon" />
            <span class="icon-pulse" />
          </span>

          <!-- Text -->
          <p class="reason-text font-syne">{{ reason.text }}</p>

          <!-- Arrow indicator -->
          <span class="reason-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.why-uct {
  border-radius: 0 0 28px 28px;
  background: #ececf1;
  padding: 48px 20px;
}

/* ── Header ──────────────────────────────────────────────── */
.why-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.why-title {
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.08;
  color: #39b270;
  letter-spacing: 0.5px;
}

.why-subtitle {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.35;
  color: #000;
}

/* ── Grid ────────────────────────────────────────────────── */
.reasons-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* ── Card ────────────────────────────────────────────────── */
.reason-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 84px;
  border-radius: 24px;
  background: #f7f7f8;
  padding: 20px 20px 20px 22px;
  overflow: hidden;
  cursor: default;

  /* Entrance */
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition:
    opacity 0.46s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 80ms),
    transform 0.46s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 80ms),
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.is-visible .reason-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.reason-card:hover {
  background: #fff;
  box-shadow:
    0 12px 36px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(-4px) scale(1.012);
}

/* ── Glow ────────────────────────────────────────────────── */
.reason-glow {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--accent, #39b270);
  opacity: 0;
  filter: blur(40px);
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.reason-card:hover .reason-glow {
  opacity: 0.12;
}

/* ── Number badge ────────────────────────────────────────── */
.reason-number {
  position: absolute;
  top: 10px;
  right: 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ccc;
  z-index: 1;
  transition: color 0.25s ease;
}

.reason-card:hover .reason-number {
  color: #39b270;
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
  background: #35ae6b;
  z-index: 1;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.reason-card:hover .reason-icon-wrap {
  transform: scale(1.14) rotate(-6deg);
}

.icon-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #35ae6b;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.reason-card:hover .icon-pulse {
  opacity: 0.3;
  transform: scale(1.12);
}

.reason-icon {
  height: 24px;
  width: 24px;
  color: #fff;
}

/* ── Text ────────────────────────────────────────────────── */
.reason-text {
  margin: 0;
  flex: 1;
  color: #000;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.4px;
  z-index: 1;
  transition: color 0.22s ease;
}

.reason-card:hover .reason-text {
  color: #111;
}

/* ── Arrow ───────────────────────────────────────────────── */
.reason-arrow {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(57, 178, 112, 0.1);
  color: #39b270;
  z-index: 1;
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.26s ease,
    transform 0.26s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.reason-arrow svg {
  width: 13px;
  height: 13px;
}

.reason-card:hover .reason-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1200px) {
  .reasons-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .reasons-grid {
    grid-template-columns: 1fr;
  }
  .reason-text {
    font-size: 18px;
  }
}
</style>
