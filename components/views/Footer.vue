<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Logo from "@/assets/images/Logo.png";
import Twitter from "@/assets/icons/social-media/Twitter.svg";
import Linkedin from "@/assets/icons/social-media/Linkedin.svg";
import Facebook from "@/assets/icons/social-media/Facebook.svg";
import GitHub from "@/assets/icons/social-media/GitHub.svg";
import Like from "@/assets/icons/social-media/Like.svg";
import Dribble from "@/assets/icons/social-media/Dribble.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}
interface Social {
  name: string;
  icon: unknown;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Biz haqimizda", href: "#about" },
  { label: "Hamkorlik", href: "#partners" },
  { label: "Blog", href: "#blog" },
  { label: "Maxfiylik siyosati", href: "#privacy" },
  { label: "Shartlar", href: "#terms" }
];

const socials: Social[] = [
  { name: "X (Twitter)", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "GitHub", icon: GitHub, href: "#" },
  { name: "Like", icon: Like, href: "#" },
  { name: "Dribbble", icon: Dribble, href: "#" }
];

const currentYear = new Date().getFullYear();

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const footerRef = ref<HTMLElement | null>(null);
const visible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) visible.value = true;
    },
    { threshold: 0.08 }
  );
  if (footerRef.value) observer.observe(footerRef.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <footer
    class="site-footer"
    ref="footerRef"
    :class="{ 'is-visible': visible }"
  >
    <div class="footer-inner">
      <!-- ── Top row ── -->
      <div class="footer-top">
        <!-- Brand block -->
        <div class="brand-block">
          <a href="#" aria-label="UCT Finance Group — bosh sahifa">
            <img :src="Logo" alt="UCT Finance Group" class="brand-logo" />
          </a>
          <p class="brand-text font-manrope">
            <strong>UCT Finance Group</strong> — professional moliyaviy va
            buxgalteriya xizmatlari ko'rsatuvchi kompaniya. Biz biznesingizni
            raqamlar orqali boshqaramiz.
          </p>
        </div>

        <!-- Nav links -->
        <nav class="footer-nav" aria-label="Footer navigatsiyasi">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="footer-link font-manrope"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <!-- ── Divider ── -->
      <div class="footer-divider" aria-hidden="true" />

      <!-- ── Bottom row ── -->
      <div class="footer-bottom">
        <p class="copyright font-manrope">
          © {{ currentYear }} UCT Finance Group. All rights reserved.
        </p>

        <div class="socials" role="list">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.href"
            class="social-link"
            :aria-label="social.name"
            role="listitem"
          >
            <component :is="social.icon" class="social-icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ── Footer shell ────────────────────────────────────────── */
.site-footer {
  margin-top: 72px;
  background: #e8e8ec;

  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;
}

.site-footer.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Inner ───────────────────────────────────────────────── */
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 40px;
}

/* ── Top row ─────────────────────────────────────────────── */
.footer-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

/* ── Brand ───────────────────────────────────────────────── */
.brand-block {
  max-width: 540px;
}

.brand-logo {
  width: 124px;
  height: auto;
  display: block;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.brand-logo:hover {
  opacity: 0.85;
  transform: scale(1.03);
}

.brand-text {
  margin: 28px 0 0;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: #535862;
}

.brand-text strong {
  font-weight: 700;
  color: #2a2d35;
}

/* ── Nav ─────────────────────────────────────────────────── */
.footer-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 32px;
  justify-content: flex-end;
  padding-top: 8px;
}

.footer-link {
  position: relative;
  color: #535862;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  transition: color 0.22s ease;
}

.footer-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1.5px;
  border-radius: 99px;
  background: #2da86a;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.footer-link:hover {
  color: #2da86a;
}

.footer-link:hover::after {
  transform: scaleX(1);
}

/* ── Divider ─────────────────────────────────────────────── */
.footer-divider {
  margin-top: 48px;
  height: 1px;
  background: #d0d2d8;
  border-radius: 99px;
  transform-origin: left;

  /* Animate width on reveal */
  transform: scaleX(0);
  transition: transform 0.7s 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-visible .footer-divider {
  transform: scaleX(1);
}

/* ── Bottom row ──────────────────────────────────────────── */
.footer-bottom {
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
}

.copyright {
  margin: 0;
  color: #777d89;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
}

/* ── Socials ─────────────────────────────────────────────── */
.socials {
  display: flex;
  align-items: center;
  gap: 18px;
}

.social-link {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  color: #a0a5ae;
  text-decoration: none;
  transition:
    color 0.22s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.social-link:hover {
  color: #2da86a;
  transform: translateY(-3px) scale(1.15);
}

.social-icon {
  width: 100%;
  height: 100%;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1024px) {
  .footer-top {
    flex-direction: column;
    gap: 28px;
  }
  .footer-nav {
    padding-top: 0;
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .site-footer {
    margin-top: 40px;
  }
  .footer-inner {
    padding: 40px 16px 28px;
  }
  .brand-logo {
    width: 100px;
  }
  .brand-text {
    margin-top: 16px;
    font-size: 14px;
  }
  .footer-link {
    font-size: 14px;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .copyright {
    font-size: 13px;
  }
  .socials {
    gap: 14px;
  }
}
</style>
