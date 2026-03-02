import { Hero } from '../components/Hero';
import { ProjectGallery } from '../components/ProjectGallery';
import { PROJECTS } from '../data/projects';

export function HomePage() {
  return (
    <>
      <Hero />
      <ProjectGallery projects={PROJECTS} />
    </>
  );
}
