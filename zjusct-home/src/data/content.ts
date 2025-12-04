export interface SocialLinks {
  email: string;
  twitter: string;
  github: string;
}

export interface HomeData {
  title: string;
  role: string;
  bio: string;
  advisors: string[];
  interests: string[];
  social: SocialLinks;
}

export interface Accomplishment {
  date: string;
  title: string;
}

export interface ProjectLink {
  name: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  links: ProjectLink[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  date: string;
  publication: string;
  abstract: string;
  doi?: string;
}

export interface SiteData {
  home: HomeData;
  accomplishments: Accomplishment[];
  projects: Project[];
  publications: Publication[];
}

export const DEFAULT_SITE_DATA: SiteData = {
  home: {
    title: "",
    role: "",
    bio: "",
    advisors: [],
    interests: [],
    social: {
      email: "",
      twitter: "",
      github: ""
    }
  },
  accomplishments: [],
  projects: [],
  publications: []
};
