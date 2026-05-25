'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  CircleCheckBig,
  ExternalLink,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MessageCircleMore,
  Phone,
  Sparkles,
  Send,
  TriangleAlert,
  MessageSquareText,
  BrainCircuit,
  Code2,
  Database,
  Layers3,
  TerminalSquare,
  Zap
} from 'lucide-react';
import { ChangeEvent, FormEvent, useId, useState } from 'react';
import { MagneticButton } from '@/components/ui/magnetic-button';

const heroContent = {
  name: 'RAJSHEKAR BADIGER',
  title: 'Full Stack Developer | AI & ML Student | Software Engineer',
  intro:
    'Computer Science undergraduate passionate about building scalable, efficient, and immersive digital experiences using modern full-stack technologies and AI-driven solutions.',
  about:
    'I am Rajshekar Badiger, a Computer Science (AI & ML) undergraduate at CMR University who enjoys turning complex ideas into elegant products. My work spans React and Next.js interfaces, Node.js and Express backends, and practical AI problem solving. I care about performance, clarity, and building systems that feel as polished as they are technically sound.',
  social: {
    github: 'https://github.com/rajshekarbadiger10',
    linkedin: 'https://www.linkedin.com/in/rajshekarbadiger10',
    leetcode: 'https://leetcode.com/u/rajshekarbadiger10/'
  }
};

const resumeUrl = 'https://drive.google.com/file/d/1ZjD9hkglpEPUKJQmoPC9dDZmZywf26Xt/view?usp=sharing';

const skills = [
  { title: 'Full Stack Development', icon: Code2, copy: 'End-to-end product engineering with React, Next.js, Node.js, and database-driven systems.' },
  { title: 'Responsive UI Design', icon: Layers3, copy: 'Cinematic interfaces that stay readable, fluid, and sharp across every screen size.' },
  { title: 'Backend APIs', icon: TerminalSquare, copy: 'RESTful services, auth flows, and server logic built for maintainability and speed.' },
  { title: 'Database Management', icon: Database, copy: 'MongoDB, PostgreSQL, and Supabase integrations designed for clean data workflows.' },
  { title: 'AI & ML Integration', icon: BrainCircuit, copy: 'Applied AI experiences from multimodal chatbots to intelligent interaction patterns.' },
  { title: 'Problem Solving', icon: Zap, copy: 'C++-driven competitive thinking and structured debugging across complex features.' },
  { title: 'System Design', icon: Sparkles, copy: 'Scalable architecture decisions balanced with shipping speed and long-term stability.' },
  { title: 'Scalable Applications', icon: MessageSquareText, copy: 'Reusable design systems and app structure that support growth without visual debt.' }
];

const timeline = [
  {
    role: 'Software Engineer Intern',
    company: 'Wyshkit',
    period: 'Nov 2025 – Jan 2026',
    bullets: [
      'Built 5+ responsive screens using React and Next.js with a polished product UI.',
      'Improved performance and responsiveness through better component structure and rendering decisions.',
      'Integrated Supabase PostgreSQL for reliable data persistence and clean workflows.',
      'Collaborated with engineering teams to align implementation details with product goals.'
    ]
  },
  {
    role: 'Student Teacher',
    company: 'Code in Place, Stanford University',
    period: 'Apr 2025 – Jun 2025',
    bullets: [
      'Selected from 66,000+ applicants for the Stanford Code in Place program.',
      'Mentored 30+ students through Python fundamentals and practical problem solving.',
      'Conducted code reviews and guided learners toward clean, readable solutions.',
      'Developed a stronger teaching mindset around clarity, empathy, and technical precision.'
    ]
  }
];

const projects = [
  {
    name: 'SA Enterprises Trading - Product Inquiry & Business Website',
    tech: ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Vercel', 'Render', 'Zoho DNS'],
    summary:
      'A responsive full-stack business website showcasing industrial and enterprise products with modern UI, optimized navigation, and direct inquiry workflows.',
    highlights: ['Product listing', 'Inquiry management', 'Responsive UI', 'Client-server integration', 'Production deployment'],
    github: 'https://github.com/rajshekarbadiger10/sa-enterprises-frontend',
    live: 'https://www.saenterprisestrading.com/',
    accent: 'from-red/35 via-white/5 to-transparent'
  },
  {
    name: 'Airbnb Property Rental Platform',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    summary:
      'A full-stack rental platform with authentication, booking flows, reviews, dashboards, and REST APIs.',
    highlights: ['Property booking', 'Authentication', 'Reviews', 'Dashboard', 'REST APIs'],
    github: 'https://github.com/rajshekarbadiger10/Airbnb-website',
    live: 'https://airbnb-demo.rajshekarbadiger.dev',
    accent: 'from-red/35 via-white/5 to-transparent'
  },
  {
    name: 'DocBot - AI Medical Chatbot',
    tech: ['Python', 'Gradio', 'Whisper', 'Meta Llama 3'],
    summary:
      'A multimodal healthcare assistant with speech-to-text, image understanding, and conversational guidance.',
    highlights: ['Voice interaction', 'Image understanding', 'Multimodal AI', 'Speech-to-text'],
    github: 'https://github.com/rajshekarbadiger10/AI-DOCTOR-VOICEBOT',
    live: 'https://huggingface.co/spaces/rajshekar10/ai-medical-assistant',
    accent: 'from-glow/35 via-white/5 to-transparent'
  }
];

const achievements = [
  'Spirit of Innovation Award',
  'FitIndia Quiz Runner-Up',
  'Oracle AI Foundations Certification',
  'Oracle MySQL Certification',
  'React JS Certification'
];

const stack = ['C++', 'JavaScript', 'Python', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Supabase'];

const socialLinks = [
  { label: 'GitHub', href: heroContent.social.github, icon: Github },
  { label: 'LinkedIn', href: heroContent.social.linkedin, icon: Linkedin },
  { label: 'LeetCode', href: heroContent.social.leetcode, icon: ExternalLink }
];

const contactEmail = 'rajshekarbadiger11@gmail.com';
const contactPhone = '+91 7620826743';
const whatsappMessage = encodeURIComponent('Hi Rajshekar, I visited your portfolio website.');
const whatsappHref = `https://wa.me/917620826743?text=${whatsappMessage}`;

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

type NotificationState =
  | {
      type: 'success' | 'error';
      message: string;
    }
  | null;

const emptyContactForm: ContactFormState = {
  name: '',
  email: '',
  message: ''
};

function validateContactForm(form: ContactFormState) {
  const errors: ContactErrors = {};

  if (!form.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

function ContactFieldError({ error, id }: { error?: string; id: string }) {
  return (
    <AnimatePresence>
      {error ? (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-xs leading-5 text-red/90"
        >
          {error}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container} className="mb-10 max-w-3xl relative section-divider">
      <div aria-hidden className="scene-sheen" />
      <motion.div variants={item} className="mb-3 text-xs uppercase tracking-[0.5em] text-red/80">
        {eyebrow}
      </motion.div>
      <motion.h2 variants={item} className="text-display text-4xl uppercase leading-none text-white md:text-6xl">
        {title}
      </motion.h2>
      <motion.p variants={item} className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
        {copy}
      </motion.p>
    </motion.div>
  );
}

const nameContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15
    }
  }
};

const firstNameVariants = {
  hidden: { opacity: 0, x: -36, y: 10, letterSpacing: '0.18em' },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    letterSpacing: '0.04em',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const lastNameVariants = {
  hidden: { opacity: 0, y: 30, letterSpacing: '0.2em' },
  show: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.04em',
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] }
  }
};

export function PortfolioPage() {
  const formId = useId();
  const [formData, setFormData] = useState<ContactFormState>(emptyContactForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationState>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof ContactFormState;

    setFormData((previous) => ({
      ...previous,
      [fieldName]: value
    }));

    setErrors((previous) => {
      if (!previous[fieldName]) {
        return previous;
      }

      const next = { ...previous };
      delete next[fieldName];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setNotification(null);
      return;
    }

    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = (await response.json().catch(() => null)) as
        | {
            message?: string;
            errors?: ContactErrors;
          }
        | null;

      if (!response.ok) {
        if (response.status === 400 && data?.errors) {
          setErrors(data.errors);
          setNotification(null);
        } else {
          setNotification({
            type: 'error',
            message: data?.message ?? 'Something went wrong. Please try again.'
          });
        }

        return;
      }

      setFormData(emptyContactForm);
      setErrors({});
      setNotification({
        type: 'success',
        message: 'Message sent successfully.'
      });
    } catch {
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg text-text">
      <div className="relative z-10">
        <section id="home" className="section-padding relative min-h-screen pt-28">
          <div className="absolute inset-0 hero-gradient opacity-70" />
          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.42em] text-white/70">
                <span className="h-2 w-2 rounded-full bg-red shadow-[0_0_18px_rgba(255,42,42,0.8)]" />
                Computer Science (AI & ML) Undergraduate
              </div>
              <div className="space-y-5">
                <div className="text-sm uppercase tracking-[0.45em] text-red/80">Hello, My Name Is</div>
                <motion.h1
                  className="text-display relative max-w-xl text-6xl uppercase leading-[0.88] text-white md:text-8xl"
                  variants={nameContainerVariants}
                  initial="hidden"
                  animate="show"
                >
                  <motion.span className="relative block overflow-hidden" variants={firstNameVariants}>
                    <span className="relative z-10 block">RAJSHEKAR</span>
                  </motion.span>
                  <motion.span className="relative mt-1 block overflow-hidden md:mt-2" variants={lastNameVariants}>
                    <span className="relative z-10 block">BADIGER</span>
                  </motion.span>
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-0 bg-[linear-gradient(120deg,transparent_34%,rgba(255,42,42,0.28)_48%,rgba(255,255,255,0.18)_50%,rgba(255,42,42,0.3)_52%,transparent_66%)] bg-[length:220%_100%] bg-no-repeat opacity-0 mix-blend-screen"
                    initial={{ x: '-55%', opacity: 0 }}
                    animate={{ x: '55%', opacity: [0, 0.65, 0] }}
                    transition={{ duration: 1.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.h1>
                <p className="max-w-xl text-lg leading-8 text-white/75 md:text-xl">{heroContent.title}</p>
                <p className="max-w-2xl text-sm leading-7 text-muted md:text-base">{heroContent.intro}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <MagneticButton tone="secondary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Projects
                </MagneticButton>
                <MagneticButton tone="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Contact Me
                </MagneticButton>
              </div>

              <div className="glass-panel flex flex-wrap gap-3 rounded-[1.75rem] p-4">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-red/40 hover:text-white"
                    >
                      <Icon size={14} />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.4rem] bg-red/10 blur-3xl" />
              <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 md:h-[680px]">
                <img src="/profile.png" alt="Rajshekar Badiger" className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.12),transparent_40%)]" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
              </div>
              <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[0.65rem] uppercase tracking-[0.42em] text-white/65 backdrop-blur-xl">
                Profile
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-padding py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              className="glass-panel card-tilt ambient-edge relative overflow-hidden rounded-[2rem] p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,42,42,0.28),transparent_38%),linear-gradient(160deg,rgba(255,255,255,0.07),transparent_42%)]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.28))]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,42,42,0.36),transparent_32%),linear-gradient(180deg,transparent,rgba(0,0,0,0.6))]" />
                <img
                  src="/profile.png"
                  alt="Rajshekar Badiger"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="backdrop-blur-sm bg-black/30 rounded-lg px-4 py-2">
                    <div className="text-display text-lg uppercase text-white">Rajshekar Badiger</div>
                  </div>
                </div>
                <motion.div
                  className="absolute right-6 top-6 h-16 w-16 rounded-full border border-red/35 bg-red/10"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionTitle
                eyebrow="About Me"
                title="Who Am I"
                copy="A full-stack developer and AI & ML undergraduate passionate about building scalable systems, immersive digital experiences, and intelligent products driven by thoughtful engineering."
              />
              <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">{heroContent.about}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/80 transition hover:border-red/40 hover:bg-red/10 hover:text-white">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton onClick={() => window.open(resumeUrl, '_blank', 'noopener,noreferrer')}>
                  View Resume
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="section-padding py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Capabilities" title="What I Do" copy="A premium bento grid of the technical strengths I bring into product work, AI-driven experiences, and full-stack execution." />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.title}
                    className="glass-panel card-tilt group relative overflow-hidden rounded-[1.7rem] p-6"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,42,42,0.16),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-red transition group-hover:scale-110 group-hover:border-red/40">
                      <Icon size={22} />
                    </div>
                    <h3 className="relative mt-8 text-xl font-semibold text-white">{skill.title}</h3>
                    <p className="relative mt-3 text-sm leading-6 text-muted">{skill.copy}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="resume" className="section-padding py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Experience" title="Timeline" copy="Selected roles that shaped my engineering perspective, communication style, and execution quality." />
            <div className="relative space-y-6 pl-6 md:pl-10">
              <div className="absolute left-0 top-2 h-full w-px bg-white/10 md:left-3" />
              {timeline.map((item, index) => (
                <motion.article
                  key={item.role}
                  className="glass-panel relative rounded-[1.7rem] p-6 md:p-8"
                  initial={{ opacity: 0, y: 38 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="timeline-glow absolute -left-[27px] top-8 h-5 w-5 rounded-full border border-red/60 bg-bg md:-left-[35px]" />
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.45em] text-red/80">{item.period}</div>
                      <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{item.role}</h3>
                      <div className="mt-2 text-sm uppercase tracking-[0.32em] text-white/55">{item.company}</div>
                    </div>
                  </div>
                  <ul className="mt-6 grid gap-3 md:grid-cols-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-muted">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-padding py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Selected Work" title="Projects" copy="Large cinematic project stories with the emphasis on interaction, polish, and technical clarity." />
            <div className="grid gap-8">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  className="glass-panel group overflow-hidden rounded-[2rem] transform-gpu will-change-transform"
                  initial={{ opacity: 0, y: 28, scale: 0.996, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.85, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.02, rotateX: 2.6 }}
                  style={{ transformOrigin: 'center center' }}
                >
                  <div className={`grid gap-0 lg:grid-cols-[1.25fr_0.75fr] bg-gradient-to-br ${project.accent}`}>
                    <div className="relative min-h-[320px] overflow-hidden p-6 md:p-8 lg:min-h-[420px] project-media">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(160deg,rgba(0,0,0,0.16),rgba(0,0,0,0.72))]" />
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_50%,transparent_80%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="relative flex h-full flex-col justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.5em] text-white/65">Project {String(index + 1).padStart(2, '0')}</div>
                          <h3 className="mt-4 max-w-2xl text-display text-4xl uppercase leading-[0.92] text-white md:text-6xl">{project.name}</h3>
                          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base">{project.summary}</p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                          {project.tech.map((item) => (
                            <span key={item} className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[0.7rem] uppercase tracking-[0.3em] text-white/85 backdrop-blur-xl">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-6 border-t border-white/10 p-6 md:p-8 lg:border-l lg:border-t-0">
                      <div>
                        <div className="text-xs uppercase tracking-[0.45em] text-red/80">Highlights</div>
                        <ul className="mt-4 space-y-3">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted">
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <a className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:border-red/40 hover:bg-red/10" href={project.github} target="_blank" rel="noreferrer">
                          <Github size={14} /> GitHub
                        </a>
                        <a className="inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_30px_rgba(255,42,42,0.22)] transition hover:shadow-[0_0_45px_rgba(255,42,42,0.34)]" href={project.live} target="_blank" rel="noreferrer">
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="achievements" className="section-padding py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Recognition" title="Achievements & Certifications" copy="A concise set of milestones that reflect initiative, competition, and technical growth." />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {achievements.map((item, index) => (
                <motion.div
                  key={item}
                  className="glass-panel rounded-[1.6rem] p-5"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-red/10 text-red">
                    <Sparkles size={20} />
                  </div>
                  <div className="text-sm font-semibold leading-6 text-white">{item}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-display max-w-2xl text-5xl uppercase leading-[0.92] text-white md:text-7xl">Let’s Build Something Amazing Together</div>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base">
                I’m open to ambitious internships, full-stack product work, AI-driven interfaces, and collaborations that value technical quality and cinematic design.
              </p>
              <div className="mt-8 grid gap-3 text-sm text-white/75">
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-red/30 hover:bg-red/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/40">
                  <span className="text-white/45 uppercase tracking-[0.28em]">Phone</span>
                  <div className="mt-1 text-white">{contactPhone}</div>
                </a>
                <a href={`mailto:${contactEmail}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-red/30 hover:bg-red/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/40">
                  <span className="text-white/45 uppercase tracking-[0.28em]">Email</span>
                  <div className="mt-1 text-white">{contactEmail}</div>
                </a>
                
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-white/45 uppercase tracking-[0.28em]">Location</span>
                  <div className="mt-1 text-white">Bengaluru, Karnataka, India</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70">
                  Reach out for internships, freelance work, product collaborations, or AI-driven engineering roles.
                </div>
              </div>
            </div>

            <motion.form
              id={`${formId}-contact-form`}
              className="glass-panel rounded-[2rem] p-6 md:p-8"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              noValidate
              aria-busy={isSubmitting}
            >
              <AnimatePresence mode="wait">
                {notification ? (
                  <motion.div
                    key={notification.type}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={`mb-5 flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm backdrop-blur-xl ${
                      notification.type === 'success'
                        ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.12)]'
                        : 'border-red/20 bg-red/10 text-white shadow-[0_0_30px_rgba(255,42,42,0.12)]'
                    }`}
                    role={notification.type === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                  >
                    <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${notification.type === 'success' ? 'bg-emerald-400/15 text-emerald-200' : 'bg-red/15 text-red'}`}>
                      {notification.type === 'success' ? <CircleCheckBig size={16} /> : <TriangleAlert size={16} />}
                    </div>
                    <div className="leading-6">{notification.message}</div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="grid gap-4">
                <div>
                  <label htmlFor={`${formId}-name`} className="mb-2 block text-xs uppercase tracking-[0.32em] text-white/45">
                    Name
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    className={`w-full rounded-2xl border bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-red/40 focus:ring-2 focus:ring-red/20 ${
                      errors.name ? 'border-red/50 shadow-[0_0_0_1px_rgba(255,42,42,0.18),0_0_24px_rgba(255,42,42,0.12)]' : 'border-white/10'
                    }`}
                    placeholder="Name"
                  />
                  <ContactFieldError id={`${formId}-name-error`} error={errors.name} />
                </div>

                <div>
                  <label htmlFor={`${formId}-email`} className="mb-2 block text-xs uppercase tracking-[0.32em] text-white/45">
                    Email
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                    className={`w-full rounded-2xl border bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-red/40 focus:ring-2 focus:ring-red/20 ${
                      errors.email ? 'border-red/50 shadow-[0_0_0_1px_rgba(255,42,42,0.18),0_0_24px_rgba(255,42,42,0.12)]' : 'border-white/10'
                    }`}
                    placeholder="Email"
                  />
                  <ContactFieldError id={`${formId}-email-error`} error={errors.email} />
                </div>

                <div>
                  <label htmlFor={`${formId}-message`} className="mb-2 block text-xs uppercase tracking-[0.32em] text-white/45">
                    Message
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                    className={`w-full rounded-2xl border bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-red/40 focus:ring-2 focus:ring-red/20 ${
                      errors.message ? 'border-red/50 shadow-[0_0_0_1px_rgba(255,42,42,0.18),0_0_24px_rgba(255,42,42,0.12)]' : 'border-white/10'
                    }`}
                    placeholder="Message"
                  />
                  <ContactFieldError id={`${formId}-message-error`} error={errors.message} />
                </div>
              </div>
              <div className="mt-5">
                <MagneticButton type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-70" disabled={isSubmitting}>
                  <span className="inline-flex items-center gap-2">
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                </MagneticButton>
              </div>
            </motion.form>
          </div>
        </section>

      </div>

      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 py-3 text-sm text-white shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-emerald-400/35 hover:bg-emerald-400/10 hover:shadow-[0_0_34px_rgba(16,185,129,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 md:bottom-8 md:right-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { duration: 0.35 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.18)]">
          <MessageCircleMore size={18} />
        </span>
        <span className="hidden sm:block">
          <span className="block text-[0.62rem] uppercase tracking-[0.35em] text-white/45">WhatsApp</span>
          <span className="block text-xs text-white/80">Quick chat</span>
        </span>
      </motion.a>

    </div>
  );
}