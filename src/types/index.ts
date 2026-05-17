export interface Category {
  slug: string;
  label: string;
  playlistUrl: string;
}

export interface VideoData {
  [category: string]: string[];
}

export interface Brand {
  name: string;
  file: string | null;
  folder: string | null;
}

export interface Promotion {
  brand: string;
  folder: string;
  logo: string | null;
  images: string[];
  videos: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  videoId?: string;
  videoSlug?: string;
}

export interface AwardsData {
  creative: AwardItem[];
  technical: AwardItem[];
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface SkillsData {
  creative: SkillGroup[];
  engineering: SkillGroup[];
  marketing: SkillGroup[];
}

export interface Creator {
  day: number;
  title: string;
  mentor: string;
  role: string;
  description: string;
  image: string | null;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface FeaturedVideo {
  videoId: string;
  title: string;
  subtitle: string;
  badge?: string;
}

export interface YTVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  url: string;
  image: string;
  twitter: string;
}
