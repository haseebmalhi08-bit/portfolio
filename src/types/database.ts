// ==============================================================================
// 📋 TYPES: DATABASE & APPLICATION MODELS
// Har table ka type structure yahan defined hai
// ==============================================================================

export interface Profile {
  id: string;
  created_at?: string;
  updated_at?: string;
  full_name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  availability_status: string;
  is_available: boolean;
  avatar_url: string;
  cv_url: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  facebook_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  accent_color: string;
  sections_visibility: {
    hero?: boolean;
    about?: boolean;
    skills?: boolean;
    services?: boolean;
    experience?: boolean;
    education?: boolean;
    projects?: boolean;
    certificates?: boolean;
    testimonials?: boolean;
    contact?: boolean;
  };
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Soft Skills';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface Skill {
  id: string;
  created_at?: string;
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  level_label: SkillLevel;
  icon?: string;
  sort_order: number;
  is_visible: boolean;
}

export interface Service {
  id: string;
  created_at?: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_visible: boolean;
}

export interface Experience {
  id: string;
  created_at?: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  sort_order: number;
  is_visible: boolean;
}

export interface Project {
  id: string;
  created_at?: string;
  title: string;
  short_description: string;
  full_description?: string;
  tech_tags: string[];
  thumbnail_url?: string;
  gallery_urls?: string[];
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  sort_order: number;
  is_visible: boolean;
}

export interface Certificate {
  id: string;
  created_at?: string;
  title: string;
  issuer: string;
  issue_date?: string;
  file_url?: string;
  credential_url?: string;
  sort_order: number;
  is_visible: boolean;
}

export interface Testimonial {
  id: string;
  created_at?: string;
  name: string;
  role: string;
  company?: string;
  avatar_url?: string;
  content: string;
  rating: number; // 1-5
  sort_order: number;
  is_visible: boolean;
}

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
}

export interface PageView {
  id?: string;
  created_at?: string;
  path: string;
  user_agent?: string;
}
