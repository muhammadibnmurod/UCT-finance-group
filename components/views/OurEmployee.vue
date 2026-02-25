<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Employee_1 from "@/assets/images/employees/employee1.png";
import Employee_2 from "@/assets/images/employees/employee2.png";
import Employee_3 from "@/assets/images/employees/employee3.png";
import Employee_4 from "@/assets/images/employees/employee4.png";
import Employee_5 from "@/assets/images/employees/employee5.png";
import Employee_6 from "@/assets/images/employees/employee6.png";
import Employee_7 from "@/assets/images/employees/employee7.png";
import Employee_8 from "@/assets/images/employees/employee1.png";

import Twitter from "@/assets/icons/social-media/Twitter.svg";
import Linkedin from "@/assets/icons/social-media/Linkedin.svg";
import Dribbble from "@/assets/icons/social-media/Dribble.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Social {
  icon: unknown;
  label: string;
  href: string;
}
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: Social[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const defaultSocials: Social[] = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" }
];

const members: TeamMember[] = [
  {
    name: "Timur Asadov",
    role: "Founder & CEO",
    bio: "Moliyaviy boshqaruv va strategik rivojlanish bo'yicha 10+ yillik tajriba.",
    image: Employee_1,
    socials: defaultSocials
  },
  {
    name: "Phoenix Baker",
    role: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    image: Employee_2,
    socials: defaultSocials
  },
  {
    name: "Lana Steiner",
    role: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    image: Employee_3,
    socials: defaultSocials
  },
  {
    name: "Demi Wilkinson",
    role: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    image: Employee_4,
    socials: defaultSocials
  },
  {
    name: "Candice Wu",
    role: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    image: Employee_5,
    socials: defaultSocials
  },
  {
    name: "Natali Craig",
    role: "Product Designer",
    bio: "Founding design team at Figma. Former Pleo, Stripe, and Tile.",
    image: Employee_6,
    socials: defaultSocials
  },
  {
    name: "Drew Cano",
    role: "UX Researcher",
    bio: "Lead user research for Slack. Contractor for Netflix and Udacity.",
    image: Employee_7,
    socials: defaultSocials
  },
  {
    name: "Orlando Diggs",
    role: "Customer Success",
    bio: "Lead CX at Wealthsimple. Former PagerDuty and Scribe.",
    image: Employee_8,
    socials: defaultSocials
  }
];

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) visible.value = true;
    },
    { threshold: 0.08 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section
    class="our-employee"
    ref="sectionRef"
    :class="{ 'is-visible': visible }"
  >
    <div class="mx-auto w-full max-w-[1220px] px-4">
      <!-- Header -->
      <div class="employee-header">
        <h2 class="employee-title font-syne">Bizning jamoa</h2>
        <p class="employee-subtitle font-syne">
          Biz moliyani boshqarish, risklarni kamaytirish va biznesni o'sishga
          olib chiqish bo'yicha tajribali mutaxassislarmiz.
        </p>
      </div>

      <!-- Grid -->
      <div class="employee-grid">
        <article
          v-for="(member, i) in members"
          :key="member.name"
          class="member-card"
          :style="{ '--i': i }"
        >
          <!-- Avatar with ring on hover -->
          <div class="avatar-wrap">
            <img :src="member.image" :alt="member.name" class="member-avatar" />
            <span class="avatar-ring" aria-hidden="true" />
          </div>

          <h3 class="member-name font-syne">{{ member.name }}</h3>
          <p class="member-role font-syne">{{ member.role }}</p>
          <p class="member-bio font-syne">{{ member.bio }}</p>

          <!-- Social links -->
          <div class="member-socials">
            <a
              v-for="social in member.socials"
              :key="social.label"
              :href="social.href"
              class="social-link"
              :aria-label="social.label"
            >
              <component :is="social.icon" class="social-icon" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.our-employee {
  background: #f1f1f3;
  border-radius: 28px;
  padding: 64px 0 72px;
}

/* ── Header ──────────────────────────────────────────────── */
.employee-header {
  text-align: center;
}

.employee-title {
  margin: 0;
  color: #39b270;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.1;
}

.employee-subtitle {
  max-width: 680px;
  margin: 16px auto 0;
  color: #18181d;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
}

/* ── Grid ────────────────────────────────────────────────── */
.employee-grid {
  margin-top: 52px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

/* ── Card ────────────────────────────────────────────────── */
.member-card {
  border-radius: 24px;
  background: #ececf1;
  padding: 32px 20px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Entrance */
  opacity: 0;
  transform: translateY(28px) scale(0.97);
  transition:
    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 70ms),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 70ms),
    box-shadow 0.3s ease;
}

.is-visible .member-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.member-card:hover {
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(-5px);
}

/* ── Avatar ──────────────────────────────────────────────── */
.avatar-wrap {
  position: relative;
  display: inline-block;
}

.member-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 1;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.member-card:hover .member-avatar {
  transform: scale(1.07);
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #39b270;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  z-index: 0;
}

.member-card:hover .avatar-ring {
  opacity: 0.5;
  transform: scale(1.08);
}

/* ── Text ────────────────────────────────────────────────── */
.member-name {
  margin: 20px 0 0;
  color: #1c1c25;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.25;
}

.member-role {
  margin: 4px 0 0;
  color: #6f4ce2;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
}

.member-bio {
  margin: 12px 0 0;
  color: #5d5d68;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  flex: 1;
}

/* ── Socials ─────────────────────────────────────────────── */
.member-socials {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 14px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  color: #9aa0a6;
  opacity: 0.7;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    color 0.2s ease;
}

.social-link:hover {
  opacity: 1;
  color: #39b270;
  transform: translateY(-2px);
}

.social-icon {
  width: 100%;
  height: 100%;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1100px) {
  .employee-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .our-employee {
    padding: 44px 0 52px;
    border-radius: 20px;
  }
  .employee-title {
    font-size: 28px;
  }
  .employee-subtitle {
    font-size: 16px;
  }
  .employee-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 32px;
  }
  .member-card {
    padding: 24px 14px 18px;
  }
  .member-avatar {
    width: 70px;
    height: 70px;
  }
  .member-name {
    font-size: 15px;
  }
  .member-role {
    font-size: 12px;
  }
  .member-bio {
    font-size: 12px;
  }
}

@media (max-width: 400px) {
  .employee-grid {
    grid-template-columns: 1fr;
  }
}
</style>
