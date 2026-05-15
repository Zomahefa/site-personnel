import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import { Project } from "@/types";

interface Props {
  title: string;
  description: string;
  projects: Project[];
}

export function ProjectCategory({ title, description, projects }: Props) {
  return (
    <section className="mb-16">
      <AnimatedSection className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </AnimatedSection>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
