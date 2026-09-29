import AboutSection from "@/components/AboutSection";
import CertificationAccordion from "@/components/CertificationAccordion";
import ComingSoonAI from "@/components/ComingSoonAI";
import ContactLinks from "@/components/ContactLinks";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SkillBadge from "@/components/SkillBadge";
import SkillLogo from "@/components/SkillLogo";
import Timeline from "@/components/Timeline";
import {
  certifications,
  certificationsIntro,
  contacts,
  educations,
  experiences,
  hardSkills,
  projects,
  qiAi,
  softSkills,
} from "@/data/portfolio";
import {
  BadgeCheck,
  Bot,
  Briefcase,
  FolderOpen,
  GraduationCap,
  HeartHandshake,
  Send,
  Sparkles,
  Wrench,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:border focus:border-accent focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Section id="about" headingId="about-heading">
          <AboutSection />
        </Section>

        <Section id="projects" headingId="projects-heading" tone="sand">
          <SectionHeading
            headingId="projects-heading"
            eyebrow="Visual timeline"
            title="Projects"
            description="Certificates, documentation photos and output videos, grouped by year."
            icon={<FolderOpen aria-hidden="true" className="h-6 w-6" />}
          />

          <div className="mt-10">
            <Timeline
              items={projects}
              getKey={(project) => project.id}
              getYear={(project) => project.year}
              renderItem={(project) => <ProjectCard project={project} />}
            />
          </div>
        </Section>

        <Section id="experience" headingId="experience-heading">
          <SectionHeading
            headingId="experience-heading"
            eyebrow="Professional work"
            title="Experience"
            icon={<Briefcase aria-hidden="true" className="h-6 w-6" />}
          />

          <div className="mt-10">
            <Timeline
              items={experiences}
              getKey={(experience) => experience.id}
              getYear={(experience) => experience.year}
              renderItem={(experience) => <ExperienceCard experience={experience} />}
            />
          </div>
        </Section>

        <Section id="educations" headingId="educations-heading" tone="sand">
          <SectionHeading
            headingId="educations-heading"
            eyebrow="Academic journey"
            title="Educations"
            icon={<GraduationCap aria-hidden="true" className="h-6 w-6" />}
          />

          <div className="mt-10">
            <EducationTimeline educations={educations} />
          </div>
        </Section>

        <Section id="certifications" headingId="certifications-heading">
          <SectionHeading
            headingId="certifications-heading"
            eyebrow="BNSP standard"
            title="Certifications"
            description={certificationsIntro}
            icon={<BadgeCheck aria-hidden="true" className="h-6 w-6" />}
          />

          <div className="mt-10">
            <CertificationAccordion certifications={certifications} />
          </div>
        </Section>

        <Section id="skills" headingId="skills-heading" tone="sand">
          <SectionHeading
            headingId="skills-heading"
            eyebrow="Capabilities"
            title="Skills"
            icon={<Wrench aria-hidden="true" className="h-6 w-6" />}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-muted uppercase">
                <HeartHandshake aria-hidden="true" className="h-4 w-4 text-accent-deep" />
                Soft Skills
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {softSkills.map((skill, index) => (
                  <SkillBadge key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-muted uppercase">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-accent-deep" />
                Hard Skills
              </h3>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {hardSkills.map((skill, index) => (
                  <SkillLogo key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" headingId="contact-heading">
          <SectionHeading
            headingId="contact-heading"
            eyebrow="Get in touch"
            title="Contact Me"
            align="center"
            icon={<Send aria-hidden="true" className="h-6 w-6" />}
          />

          <div className="mt-10">
            <ContactLinks contacts={contacts} />
          </div>
        </Section>

        <Section id="qi-ai" headingId="qi-ai-heading" tone="sand">
          <SectionHeading
            headingId="qi-ai-heading"
            eyebrow="Future feature"
            title={qiAi.title}
            align="center"
            icon={<Bot aria-hidden="true" className="h-6 w-6" />}
          />

          <div className="mt-10">
            <ComingSoonAI
              title={qiAi.title}
              status={qiAi.status}
              description={qiAi.description}
            />
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
