<script setup lang="ts">
// ─── Data ─────────────────────────────────────────────────────────────────────
const content = {
  title: "QAYSI SOHALAR BILAN ISHLAYMIZ?",
  text: "Biz biznesingizning moliyaviy modelini quramiz, pul oqimini nazorat qilamiz va strategik qarorlar uchun aniq raqamlar beramiz.",
  primaryBtn: "Bepul konsultatsiya",
  secondaryBtn: "Tijoriy taklif olish"
};
</script>

<template>
  <section class="sohalar-wrap">
    <div class="sohalar-card">
      <!-- Animated background blobs -->
      <span class="blob blob-1" aria-hidden="true" />
      <span class="blob blob-2" aria-hidden="true" />
      <span class="blob blob-3" aria-hidden="true" />

      <!-- Floating dots -->
      <span
        v-for="n in 6"
        :key="n"
        class="dot"
        :class="`dot-${n}`"
        aria-hidden="true"
      />

      <!-- Content -->
      <div class="sohalar-inner">
        <div class="sohalar-text-block">
          <h2 class="sohalar-title font-syne">{{ content.title }}</h2>
          <p class="sohalar-text font-manrope">{{ content.text }}</p>
        </div>

        <div class="sohalar-actions">
          <button
            type="button"
            class="sohalar-btn sohalar-btn--light font-manrope"
          >
            <span>{{ content.primaryBtn }}</span>
            <svg
              class="btn-arrow"
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
            class="sohalar-btn sohalar-btn--dark font-manrope"
          >
            {{ content.secondaryBtn }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Wrap ────────────────────────────────────────────────── */
.sohalar-wrap {
  background: #fff;
}

/* ── Card ────────────────────────────────────────────────── */
.sohalar-card {
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  padding: 36px 32px 32px;
  background: linear-gradient(
    98deg,
    #173f03 0%,
    #106a70 43%,
    #1c8077 68%,
    #6fa83f 100%
  );
  transition: box-shadow 0.35s ease;
}

.sohalar-card:hover {
  box-shadow:
    0 28px 72px rgba(16, 106, 112, 0.35),
    0 4px 16px rgba(0, 0, 0, 0.1);
}

/* ── Animated blobs ──────────────────────────────────────── */
.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(60px);
  opacity: 0.18;
  animation: blobDrift 12s ease-in-out infinite;
}

.blob-1 {
  width: 300px;
  height: 300px;
  background: #9de86a;
  top: -80px;
  right: 10%;
  animation-delay: 0s;
}
.blob-2 {
  width: 220px;
  height: 220px;
  background: #40c8b0;
  bottom: -60px;
  left: 5%;
  animation-delay: 4s;
  animation-duration: 14s;
}
.blob-3 {
  width: 180px;
  height: 180px;
  background: #6fa83f;
  top: 20%;
  right: 30%;
  animation-delay: 7s;
  animation-duration: 10s;
}

@keyframes blobDrift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -15px) scale(1.06);
  }
  66% {
    transform: translate(-10px, 12px) scale(0.95);
  }
}

/* ── Floating dots ───────────────────────────────────────── */
.dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  pointer-events: none;
  animation: floatDot 9s ease-in-out infinite;
}

.dot-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 2%;
  animation-delay: 0s;
}
.dot-2 {
  width: 44px;
  height: 44px;
  top: 60%;
  left: 20%;
  animation-delay: 1.4s;
}
.dot-3 {
  width: 100px;
  height: 100px;
  bottom: -20px;
  left: 40%;
  animation-delay: 2.8s;
  animation-duration: 11s;
}
.dot-4 {
  width: 34px;
  height: 34px;
  top: 15%;
  right: 20%;
  animation-delay: 0.7s;
}
.dot-5 {
  width: 60px;
  height: 60px;
  bottom: 10%;
  right: 8%;
  animation-delay: 3.5s;
}
.dot-6 {
  width: 50px;
  height: 50px;
  top: 40%;
  right: 40%;
  animation-delay: 2s;
  animation-duration: 13s;
}

@keyframes floatDot {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-14px) scale(1.05);
  }
}

/* ── Inner layout ────────────────────────────────────────── */
.sohalar-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.sohalar-text-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 860px;
}

/* ── Typography ──────────────────────────────────────────── */
.sohalar-title {
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.96px;
}

.sohalar-text {
  margin: 0;
  color: #f2f2f7;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}

/* ── Buttons ─────────────────────────────────────────────── */
.sohalar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.sohalar-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  border: none;
  border-radius: 14px;
  padding: 0 24px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.sohalar-btn:active {
  transform: scale(0.96) !important;
}

.sohalar-btn--light {
  background: #fff;
  color: #35ae6b;
}
.sohalar-btn--light:hover {
  background: #f5faf7;
  color: #2f9c5f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.25);
}

.sohalar-btn--dark {
  background: rgba(42, 129, 102, 0.72);
  color: #fff;
}
.sohalar-btn--dark:hover {
  background: rgba(35, 113, 89, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(35, 113, 89, 0.35);
}

.btn-arrow {
  width: 15px;
  height: 15px;
  transition: transform 0.22s ease;
  flex-shrink: 0;
}
.sohalar-btn--light:hover .btn-arrow {
  transform: translateX(3px);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 900px) {
  .sohalar-title {
    font-size: 22px;
  }
  .sohalar-text {
    font-size: 17px;
  }
  .sohalar-btn {
    font-size: 15px;
    height: 42px;
  }
  .blob {
    opacity: 0.12;
  }
}

@media (max-width: 600px) {
  .sohalar-card {
    padding: 24px 20px;
  }
  .sohalar-actions {
    flex-direction: column;
  }
  .sohalar-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
