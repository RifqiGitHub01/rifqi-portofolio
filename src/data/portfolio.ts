/**
 * Central portfolio content.
 * Every piece of editable personal content lives in this file.
 * See instructureDev.md for the maintenance guide.
 */

/** Replace this exact string with a real YouTube URL to activate an embed. */
export const YOUTUBE_PLACEHOLDER = "paste_youtube_url_here";

/** Single flat image folder. No subfolders by design. */
export const ASSET_FOLDER = "/assets";

export function assetPath(fileName: string): string {
  return `${ASSET_FOLDER}/${fileName}`;
}

export type CertificateAspect = "7:5" | "16:9";
export type VideoOrientation = "horizontal" | "vertical";

export interface NavSection {
  id: string;
  label: string;
  /** Shown as a quick-access item in the mobile bar instead of the hamburger menu. */
  mobileQuickAccess: boolean;
}

export const navSections: NavSection[] = [
  { id: "about", label: "About Me", mobileQuickAccess: true },
  { id: "projects", label: "Projects", mobileQuickAccess: false },
  { id: "experience", label: "Experience", mobileQuickAccess: true },
  { id: "educations", label: "Educations", mobileQuickAccess: false },
  { id: "certifications", label: "Certifications", mobileQuickAccess: false },
  { id: "skills", label: "Skills", mobileQuickAccess: true },
  { id: "contact", label: "Contact Me", mobileQuickAccess: false },
  { id: "qi-ai", label: "Qi AI", mobileQuickAccess: true },
];

export const profile = {
  name: "Muhammad Rifqi Asy'ari",
  role: "Freelance Multimedia Professional",
  photo: "QiPhoto.PNG",
  photoAlt: "Portrait photo of Qi",
  logo: "Logo_Qi.png",
  logoAlt: "Qi personal logo",
};

export const aboutParagraphs: string[] = [
  "Saya adalah profesional multimedia freelance dengan latar belakang pendidikan Informatika dan kompetensi utama di bidang multimedia digital kreatif. Berpengalaman dalam produksi live event, video editing, dan pengelolaan kebutuhan visual acara menggunakan berbagai perangkat lunak multimedia.",
  "Selain itu, saya memiliki ketertarikan pada teknologi, khususnya pengembangan AI, analisis data, dan software development. Saat ini mengembangkan AI Agent menggunakan Python dan Langflow, serta memiliki dasar pengembangan web dengan HTML, CSS, JavaScript, dan PHP. Adaptif dalam lingkungan kerja kreatif maupun teknis dan berkomitmen untuk terus mengembangkan kompetensi.",
];

export interface Project {
  id: string;
  year: string;
  month: string;
  title: string;
  certificate: { file: string; aspect: CertificateAspect } | null;
  images: string[];
  youtubeUrl: string | null;
  videoOrientation: VideoOrientation | null;
  /** Shown under the relevant media block. Only used when the brief supplies a reason. */
  note?: string;
}

export const projects: Project[] = [
  {
    id: "ai-agents-developer",
    year: "2026",
    month: "Agustus",
    title: "AI Agents Developer",
    certificate: { file: "SertiAgentic.png", aspect: "7:5" },
    images: [],
    youtubeUrl: "https://youtube.com/shorts/CMkfbTwK8lg",
    videoOrientation: "vertical",
    note: "No photo documentation was captured during development; only the final video is available.",
  },
  {
    id: "pemateri-operator-multimedia",
    year: "2026",
    month: "Juni",
    title: "Pemateri/Narasumber Pelatihan Operator Multimedia",
    certificate: { file: "SertiNarsum.png", aspect: "16:9" },
    images: ["DocOP1.jpg", "DocOP2.jpg", "DocOP3.jpg", "DocOP4.jpg"],
    youtubeUrl: "https://youtube.com/shorts/ydGLAL-YnCg",
    videoOrientation: "vertical",
  },
  {
    id: "digital-video-editor-dcc",
    year: "2026",
    month: "April",
    title: "Digital Video Editor – Digital Creative Center",
    certificate: { file: "SertiDCC.png", aspect: "7:5" },
    images: ["DocDVE1.jpeg", "DocDVE2.jpeg", "DocDVE3.PNG"],
    youtubeUrl: "https://youtu.be/yV2SU9hOWvk",
    videoOrientation: "horizontal",
    note: "Catatan: periode kontrak yang benar adalah 15 Juni 2023 – 17 Mei 2025. Sertifikat diterbitkan oleh Digital Creative Center.",
  },
  {
    id: "crew-hima-bahasa-inggris",
    year: "2025",
    month: "Desember",
    title: "Crew Operator Multimedia – Himpunan Mahasiswa Bahasa Inggris UBSI",
    certificate: null,
    images: ["DocFF1.JPEG", "DocFF2.JPEG", "DocFF3.JPEG", "DocFF4.JPEG", "DocFF5.JPEG", "DocFF6.JPEG"],
    youtubeUrl: null,
    videoOrientation: null,
    note: "Sertifikat tidak tersedia dari panitia hingga hampir satu tahun setelah kegiatan. Video dokumentasi juga tidak tersedia karena fokus pekerjaan berada pada jobdesk operator.",
  },
  {
    id: "crew-himama-fair",
    year: "2025",
    month: "November",
    title: "Crew Operator Multimedia & Video Editor – Himpunan Mahasiswa Manajemen UBSI",
    certificate: { file: "SertiHimamaFair.png", aspect: "7:5" },
    images: ["DocMF1.PNG"],
    youtubeUrl: "https://youtu.be/n1TdHmSYnG0",
    videoOrientation: "horizontal",
  },
  {
    id: "crew-kspm",
    year: "2025",
    month: "November",
    title: "Crew Operator Multimedia – Kelompok Studi Pasar Modal UBSI",
    certificate: { file: "SertiKSPM.png", aspect: "7:5" },
    images: ["DocKSPM1.JPG", "DocKSPM2.JPG", "DocKSPM3.JPG", "DocKSPM4.JPG", "DocKSPM5.JPG"],
    youtubeUrl: "https://youtu.be/qcH_xz-l_ew",
    videoOrientation: "horizontal",
  },
  {
    id: "crew-teras-inspirasi-dbj",
    year: "2025",
    month: "Agustus",
    title: "Crew Operator Multimedia – Teras Inspirasi X Distrik Berisik Jakarta",
    certificate: { file: "SertiDBJ.png", aspect: "7:5" },
    images: [],
    youtubeUrl: null,
    videoOrientation: null,
    note: "Tidak tersedia dokumentasi foto maupun output video karena pekerjaan ini merupakan jobdesk ringan dan tidak ada dokumentasi pribadi yang tersedia.",
  },
  {
    id: "revitalisasi-masjid-kramat-98",
    year: "2024",
    month: "Maret",
    title: "Revitalisasi Masjid UBSI Kramat 98",
    certificate: null,
    images: ["DocRevMas1.jpeg", "DocRevMas2.jpeg", "DocRevMas3.jpeg", "DocRevMas4.jpeg"],
    youtubeUrl: null,
    videoOrientation: null,
    note: "Project ini dilakukan secara sukarela atas nama UKM Kerohanian Islam UBSI. Tidak tersedia sertifikat, dan footage video yang tersedia hanya dokumentasi sebelum revitalisasi. Untuk itulah saya belum dapat menampilkannya ke web.",
  },
  {
    id: "hut-ubsi-36",
    year: "2024",
    month: "Februari",
    title: "HUT UBSI KE-36",
    certificate: null,
    images: ["DocHUT1.jpeg", "DocHUT2.jpeg", "DocHUT3.jpeg", "DocHUT4.jpeg"],
    youtubeUrl: "https://youtu.be/zgnRZsqll2M",
    videoOrientation: "horizontal",
  },
  {
    id: "artivator-coffee",
    year: "2024",
    month: "Januari",
    title: "ARTiVATOR COFFEE - Ridho Client",
    certificate: null,
    images: ["DocART1.jpeg", "DocART2.jpeg", "DocART3.jpeg", "DocART4.png", "DocART5.jpeg", "DocART6.jpeg", "DocART7.jpeg", "DocART8.jpeg"],
    youtubeUrl: "https://youtu.be/t9XtUDZBwcY",
    videoOrientation: "vertical",
  },
];

export interface Experience {
  id: string;
  year: string;
  period: string;
  title: string;
  /** Small supporting line, e.g. a YouTube channel handle. */
  channel?: string;
  certificate: { file: string; aspect: CertificateAspect } | null;
  images: string[];
  youtubeUrl: string | null;
  videoOrientation: VideoOrientation | null;
}

export const experiences: Experience[] = [
  {
    id: "kemenkeu-ri",
    year: "2025",
    period: "September–December 2025",
    title: "Magang Dokumentasi Sistem – Kementerian Keuangan RI",
    certificate: { file: "SertiKeu.png", aspect: "7:5" },
    images: ["DocKeu1.JPG", "DocKeu2.jpeg", "DocKeu3.jpeg", "DocKeu4.JPG", "DocKeu5.jpg", "DocKeu6.PNG", "DocKeu7.jpg"],
    youtubeUrl: "https://youtube.com/shorts/bXTH5Du_mb8",
    videoOrientation: "vertical",
  },
  {
    id: "teras-inspirasi",
    year: "2025",
    period: "January–June 2025",
    title: "Crew Operator Multimedia – Teras Inspirasi",
    channel: "PodcastTerasInspirasi",
    certificate: null,
    images: ["DocTerIns1.jpg", "DocTerIns2.jpg", "DocTerIns3.jpg"],
    youtubeUrl: "https://youtube.com/shorts/a93UYzEplfM",
    videoOrientation: "vertical",
  },
  {
    id: "guru-tik-smpn97",
    year: "2024",
    period: "September–December 2024",
    title: "Guru TIK – SMP Negeri 97 Jakarta",
    certificate: { file: "SertiKM8.png", aspect: "7:5" },
    images: ["DocKM8.jpg", "DocKM.jpeg"],
    youtubeUrl: "https://youtu.be/GKu0-I9qu-4",
    videoOrientation: "horizontal",
  },
  {
    id: "guru-trauma-healing",
    year: "2023",
    period: "January–February 2023",
    title: "Guru Trauma Healing – SDN Talaga 1 Cianjur",
    certificate: { file: "SertiExplr.png", aspect: "7:5" },
    images: ["DocExplr1.JPEG", "DocExplr2.jpg", "DocExplr3.jpg"],
    youtubeUrl: "https://youtu.be/lXohedRJ2c4",
    videoOrientation: "horizontal",
  },
];

export interface CampusActivity {
  role: string;
  period: string;
}

export interface Education {
  id: string;
  institution: string;
  program: string;
  period: string;
  /** Label plus value, e.g. { label: "IPK", value: "3.88" }. */
  achievement: { label: string; value: string } | null;
  activities: CampusActivity[];
}

export const educations: Education[] = [
  {
    id: "ubsi",
    institution: "UNIVERSITAS BINA SARANA INFORMATIKA",
    program: "Program Studi Informatika",
    period: "September 2022 – August 2026",
    achievement: { label: "IPK", value: "3.88" },
    activities: [
      { role: "Video Editor Kampus Kramat 98", period: "June 2023 – May 2025" },
      { role: "Wakil Ketua Umum UKM Kerohanian Islam", period: "January – December 2024" },
      { role: "Ketua Departemen Informasi dan Komunikasi Rohis", period: "January – December 2023" },
    ],
  },
  {
    id: "man2-jakarta",
    institution: "MAN 2 JAKARTA",
    program: "Jurusan Ilmu Pengetahuan Sosial (IPS)",
    period: "July 2019 – May 2022",
    achievement: { label: "Final average", value: "88.26" },
    activities: [],
  },
];

export interface Certification {
  id: string;
  title: string;
  issued: string;
  expired: string;
  expiredState: boolean;
  images: [string, string];
}

export const certificationsIntro =
  "Rifqi has obtained three competency certifications aligned with national BNSP standards.";

export const certifications: Certification[] = [
  {
    id: "analisis-program",
    title: "Sertifikat Kompetensi Analisis Program",
    issued: "15 September 2025",
    expired: "15 September 2028",
    expiredState: false,
    images: ["SertiAnaProg1.png", "SertiAnaProg2.png"],
  },
  {
    id: "desainer-multimedia-madya",
    title: "Sertifikat Kompetensi Desainer Multimedia Madya",
    issued: "23 June 2025",
    expired: "23 June 2028",
    expiredState: false,
    images: ["SertiMultimed1.png", "SertiMultimed2.png"],
  },
  {
    id: "junior-web-developer",
    title: "Sertifikat Kompetensi Junior Web Developer",
    issued: "16 May 2023",
    expired: "16 May 2026",
    expiredState: true,
    images: ["SertiJWD1.png", "SertiJWD2.png"],
  },
];

export interface SoftSkill {
  name: string;
  /** Conceptual graphic that supports the meaning of the skill. */
  icon: "communication" | "leadership" | "analysis" | "creative" | "reflection";
}

export const softSkills: SoftSkill[] = [
  { name: "Komunikatif", icon: "communication" },
  { name: "Leadership", icon: "leadership" },
  { name: "Analysis", icon: "analysis" },
  { name: "Kreatif", icon: "creative" },
  { name: "Evaluasi Diri", icon: "reflection" },
];

export interface HardSkill {
  name: string;
  /** Developer-supplied logo file inside the single public/assets folder. */
  logo: string;
  /** Text tile shown only while the logo file has not been placed yet. */
  monogram: string;
}

export const hardSkills: HardSkill[] = [
  { name: "Python", logo: "logoPython.png", monogram: "Py" },
  { name: "Visual Studio Code", logo: "logoVSCode.png", monogram: "VS" },
  { name: "Adobe Premiere Pro", logo: "logoPR.png", monogram: "Pr" },
  { name: "Adobe After Effects", logo: "logoAE.png", monogram: "Ae" },
  { name: "Open Broadcaster Software", logo: "logoOBS.png", monogram: "OBS" },
  { name: "vMix", logo: "logovMix.png", monogram: "vMix" },
];

export interface ContactLink {
  id: string;
  label: string;
  href: string;
  icon: "whatsapp" | "instagram" | "linkedin" | "globe";
  external: boolean;
}

export const contacts: ContactLink[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/6289668500021",
    icon: "whatsapp",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/mrifqi_asyari",
    icon: "instagram",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/mrifqi01",
    icon: "linkedin",
    external: true,
  },
  {
    id: "website",
    label: "Website",
    href: "https://rental-qi-media.vercel.app",
    icon: "globe",
    external: true,
  },
];

export const qiAi = {
  title: "Qi AI",
  status: "COMING SOON",
  description:
    "Qi AI is a future feature intended to help visitors ask questions about Qi and this portfolio. It is not active yet.",
};

export const footerText = "@copyright 2026";
