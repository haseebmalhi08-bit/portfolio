-- ==============================================================================
-- 🚀 COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA FOR HASEEB MALHI PORTFOLIO
-- Run this entire script in Supabase Dashboard -> SQL Editor -> Click "Run"
-- ==============================================================================

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 📌 TABLE: profile (Single row containing all main settings and bio)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL DEFAULT 'Haseeb Malhi',
  title TEXT NOT NULL DEFAULT 'Full-Stack Software Engineer & UI/UX Designer',
  tagline TEXT DEFAULT 'Building high-performance, modern web applications with clean architecture and exceptional user experiences.',
  bio TEXT DEFAULT 'I am a passionate software engineer specializing in modern React ecosystems, scalable architectures, and elegant user interfaces. With a deep commitment to performance, accessibility, and clean design, I transform complex ideas into intuitive digital products that users love.',
  location TEXT DEFAULT 'Lahore, Pakistan',
  email TEXT DEFAULT 'haseebmalhi08@gmail.com',
  phone TEXT DEFAULT '+92 300 0000000',
  whatsapp TEXT DEFAULT '+923000000000',
  availability_status TEXT DEFAULT 'Open to work', -- e.g. 'Open to work', 'Available for projects'
  is_available BOOLEAN DEFAULT true,
  avatar_url TEXT DEFAULT '',
  cv_url TEXT DEFAULT '',
  github_url TEXT DEFAULT 'https://github.com/haseebmalhi08-bit',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/in/haseebmalhi',
  twitter_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  facebook_url TEXT DEFAULT '',
  seo_title TEXT DEFAULT 'Haseeb Malhi | Full-Stack Engineer & Designer',
  seo_description TEXT DEFAULT 'Personal portfolio and engineering showcase of Haseeb Malhi - Full-Stack Developer specializing in modern web applications.',
  seo_keywords TEXT DEFAULT 'Haseeb Malhi, Full Stack Developer, React, TypeScript, Tailwind CSS, Web Developer Pakistan',
  accent_color TEXT DEFAULT '#6366F1',
  -- Section on/off toggles
  sections_visibility JSONB DEFAULT '{
    "hero": true,
    "about": true,
    "skills": true,
    "services": true,
    "experience": true,
    "education": true,
    "projects": true,
    "certificates": true,
    "testimonials": true,
    "contact": true
  }'::JSONB
);

-- ==============================================================================
-- 📌 TABLE: skills (Categorized skills with proficiency & labels)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Frontend', -- 'Frontend', 'Backend', 'Database', 'Tools', 'Soft Skills'
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  level_label TEXT NOT NULL DEFAULT 'Advanced', -- 'Beginner', 'Intermediate', 'Advanced', 'Expert'
  icon TEXT DEFAULT 'Code', -- Lucide icon name or emoji
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 📌 TABLE: services (What you offer to clients)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'Layout',
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 📌 TABLE: experiences (Work experience & education timeline)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('experience', 'education')),
  title TEXT NOT NULL, -- Job title or Degree
  organization TEXT NOT NULL, -- Company name or School / University
  location TEXT DEFAULT '',
  start_date TEXT NOT NULL, -- e.g. 'Jan 2023'
  end_date TEXT DEFAULT '', -- e.g. 'Present' or 'Dec 2024'
  is_current BOOLEAN DEFAULT false,
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 📌 TABLE: projects (Showcase projects with gallery, tags, links)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT DEFAULT '',
  tech_tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  thumbnail_url TEXT DEFAULT '',
  gallery_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  live_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 📌 TABLE: certificates (Verified awards, courses & diplomas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT DEFAULT '',
  file_url TEXT DEFAULT '', -- Image or PDF stored in Supabase Storage
  credential_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 📌 TABLE: testimonials (Client & colleague recommendations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 📌 TABLE: messages (Contact form submissions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false
);

-- ==============================================================================
-- 📌 TABLE: page_views (Privacy-friendly visitor counter)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  path TEXT NOT NULL DEFAULT '/',
  user_agent TEXT DEFAULT ''
);

-- ==============================================================================
-- 🔒 ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES (Anyone can view visible portfolio content)
DROP POLICY IF EXISTS "Public can view profile" ON public.profile;
CREATE POLICY "Public can view profile" ON public.profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view skills" ON public.skills;
CREATE POLICY "Public can view skills" ON public.skills FOR SELECT USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view services" ON public.services;
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view experiences" ON public.experiences;
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view certificates" ON public.certificates;
CREATE POLICY "Public can view certificates" ON public.certificates FOR SELECT USING (is_visible = true);

DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (is_visible = true);

-- 2. PUBLIC INSERT ONLY POLICIES (Contact Form & Page Views)
DROP POLICY IF EXISTS "Public can insert messages" ON public.messages;
CREATE POLICY "Public can insert messages" ON public.messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert page_views" ON public.page_views;
CREATE POLICY "Public can insert page_views" ON public.page_views FOR INSERT WITH CHECK (true);

-- 3. OWNER / AUTHENTICATED FULL ACCESS POLICIES (Only logged-in admin can create, update, delete)
DROP POLICY IF EXISTS "Admin full access profile" ON public.profile;
CREATE POLICY "Admin full access profile" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access skills" ON public.skills;
CREATE POLICY "Admin full access skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access services" ON public.services;
CREATE POLICY "Admin full access services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access experiences" ON public.experiences;
CREATE POLICY "Admin full access experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access projects" ON public.projects;
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access certificates" ON public.certificates;
CREATE POLICY "Admin full access certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access testimonials" ON public.testimonials;
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access messages" ON public.messages;
CREATE POLICY "Admin full access messages" ON public.messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access page_views" ON public.page_views;
CREATE POLICY "Admin full access page_views" ON public.page_views FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 📦 STORAGE BUCKET: portfolio
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies: Public can read, authenticated owner can upload/update/delete
DROP POLICY IF EXISTS "Public bucket read" ON storage.objects;
CREATE POLICY "Public bucket read" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin bucket insert" ON storage.objects;
CREATE POLICY "Admin bucket insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin bucket update" ON storage.objects;
CREATE POLICY "Admin bucket update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Admin bucket delete" ON storage.objects;
CREATE POLICY "Admin bucket delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio');

-- ==============================================================================
-- 🌱 SEED DATA FOR HASEEB MALHI
-- ==============================================================================

-- Clear existing data if re-running
DELETE FROM public.profile;
DELETE FROM public.skills;
DELETE FROM public.services;
DELETE FROM public.experiences;
DELETE FROM public.projects;
DELETE FROM public.certificates;
DELETE FROM public.testimonials;

-- Insert Profile
INSERT INTO public.profile (
  full_name, title, tagline, bio, location, email, phone, whatsapp,
  availability_status, is_available, github_url, linkedin_url
) VALUES (
  'Haseeb Malhi',
  'Full-Stack Software Engineer & UI/UX Designer',
  'Crafting responsive, clean, and fast web experiences with cutting-edge technologies.',
  'Hello! I am Haseeb Malhi, a dedicated software engineer with strong expertise in building scalable web applications. My work focuses on high performance, pixel-perfect user interfaces, and robust backend integrations. I love tackling challenging technical problems and delivering impactful solutions.',
  'Lahore, Pakistan',
  'haseebmalhi08@gmail.com',
  '+92 300 0000000',
  '+923000000000',
  'Open to work',
  true,
  'https://github.com/haseebmalhi08-bit',
  'https://linkedin.com/in/haseebmalhi'
);

-- Insert Professional Skills
INSERT INTO public.skills (name, category, level, level_label, icon, sort_order) VALUES
-- Frontend
('React.js', 'Frontend', 95, 'Expert', 'Code2', 1),
('TypeScript', 'Frontend', 90, 'Advanced', 'FileCode2', 2),
('JavaScript (ES6+)', 'Frontend', 95, 'Expert', 'FileCode', 3),
('Tailwind CSS', 'Frontend', 95, 'Expert', 'Palette', 4),
('HTML5 & CSS3', 'Frontend', 98, 'Expert', 'Globe', 5),
('Next.js', 'Frontend', 85, 'Advanced', 'Layers', 6),

-- Backend
('Node.js', 'Backend', 88, 'Advanced', 'Server', 7),
('Express.js', 'Backend', 90, 'Advanced', 'Cpu', 8),
('RESTful APIs', 'Backend', 92, 'Expert', 'Network', 9),
('Authentication & JWT', 'Backend', 85, 'Advanced', 'ShieldCheck', 10),

-- Database
('PostgreSQL', 'Database', 88, 'Advanced', 'Database', 11),
('Supabase', 'Database', 90, 'Advanced', 'Zap', 12),
('MongoDB', 'Database', 85, 'Advanced', 'HardDrive', 13),

-- Tools & DevOps
('Git & GitHub', 'Tools', 92, 'Expert', 'GitBranch', 14),
('Vite & Webpack', 'Tools', 90, 'Advanced', 'Boxes', 15),
('Postman', 'Tools', 88, 'Advanced', 'Send', 16),
('VS Code', 'Tools', 95, 'Expert', 'Terminal', 17),

-- Soft Skills
('Problem Solving', 'Soft Skills', 95, 'Expert', 'CheckCircle2', 18),
('Team Collaboration', 'Soft Skills', 92, 'Expert', 'Users', 19),
('Agile & Scrum', 'Soft Skills', 88, 'Advanced', 'Clock', 20),
('Communication', 'Soft Skills', 90, 'Advanced', 'MessageSquare', 21);

-- Insert Services
INSERT INTO public.services (title, description, icon, sort_order) VALUES
('Full-Stack Web Development', 'End-to-end development of modern web applications using React, TypeScript, Node.js, and Supabase / PostgreSQL. Fast, scalable, and responsive.', 'Code2', 1),
('UI/UX & Frontend Engineering', 'Pixel-perfect, accessible, and responsive user interfaces created with modern Tailwind CSS and React. Clean design systems and high conversion.', 'Layout', 2),
('API & Database Architecture', 'Design and implementation of secure REST APIs, relational database schemas, real-time subscriptions, and authentication flows.', 'Database', 3),
('Performance & SEO Optimization', 'Auditing and optimizing existing web apps for sub-second load times, Core Web Vitals, 90+ Lighthouse scores, and organic search ranking.', 'Zap', 4);

-- Insert Experience & Education
INSERT INTO public.experiences (type, title, organization, location, start_date, end_date, is_current, description, sort_order) VALUES
('experience', 'Senior Frontend / Full-Stack Developer', 'Tech Solutions Studio', 'Remote', '2023', 'Present', true, 'Architected and built modern single-page applications. Mentored junior engineers, established code quality standards, and integrated Supabase backend infrastructure.', 1),
('experience', 'Web Developer', 'Digital Innovations Lab', 'Lahore, Pakistan', '2021', '2023', false, 'Developed high-traffic responsive websites and client dashboards. Collaborated with UI designers and product managers to launch 15+ production projects.', 2),
('education', 'BS in Computer Science', 'University of Engineering & Technology', 'Lahore, Pakistan', '2017', '2021', false, 'Focused on Software Engineering, Data Structures, Database Systems, and Web Technologies. Graduated with academic excellence.', 3);

-- Insert Showcase Projects
INSERT INTO public.projects (title, short_description, full_description, tech_tags, live_url, github_url, is_featured, sort_order) VALUES
('Dynamic SaaS Dashboard', 'Enterprise analytics platform with real-time charts, role-based access control, and dark mode.', 'A comprehensive full-stack dashboard featuring real-time data streaming, granular role-based permissions, customizable metric cards, and responsive navigation.', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'], 'https://haseebmalhi08-bit.github.io/portfolio/', 'https://github.com/haseebmalhi08-bit/portfolio', true, 1),
('E-Commerce Web Application', 'Modern storefront with shopping cart, filterable product catalog, and secure checkout experience.', 'Complete e-commerce platform built for high performance. Features instant search, category filtering, cart management, and seamless mobile responsive checkout flows.', ARRAY['React', 'Node.js', 'Express', 'Tailwind CSS', 'REST API'], 'https://haseebmalhi08-bit.github.io/portfolio/', 'https://github.com/haseebmalhi08-bit/portfolio', true, 2),
('Cloud Task & Workflow Manager', 'Collaborative productivity tool with kanban boards, real-time updates, and drag-and-drop tasks.', 'Intuitive project management tool designed for agile teams. Supports multiple workspaces, task priorities, activity logs, and real-time synchronization across devices.', ARRAY['TypeScript', 'React', 'Supabase', 'Tailwind CSS'], 'https://haseebmalhi08-bit.github.io/portfolio/', 'https://github.com/haseebmalhi08-bit/portfolio', true, 3);

-- Insert Certificates
INSERT INTO public.certificates (title, issuer, issue_date, credential_url, sort_order) VALUES
('Meta Certified Front-End Developer', 'Meta / Coursera', '2023', 'https://coursera.org', 1),
('Advanced React & TypeScript Masterclass', 'Frontend Masters', '2023', 'https://frontendmasters.com', 2),
('PostgreSQL Database Administration & SQL', 'Udemy', '2022', 'https://udemy.com', 3);

-- Insert Testimonials
INSERT INTO public.testimonials (name, role, company, content, rating, sort_order) VALUES
('Alex Morgan', 'Product Manager', 'Apex Software', 'Haseeb is an exceptional developer who combines technical mastery with great design sensibility. He delivered our application ahead of schedule with top-notch quality.', 5, 1),
('Bilal Ahmed', 'CTO', 'InnoTech Solutions', 'Working with Haseeb was a pleasure. His attention to detail, proactive communication, and ability to craft clean, maintainable code made a massive impact on our project.', 5, 2);

