export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "fullstack" | "devops" | "mobile" | "admin" | "cybersec";
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "devops" | "cybersec" | "tools";
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}
