import type { ComponentType } from "react";
import { AboutScene, JoinScene, RolesScene, TeamScene } from "./scenes/people";
import {
  CaseScene,
  ProjectsScene,
  ResearchScene,
  WriteupsScene,
} from "./scenes/work";
import {
  DatasetsScene,
  ResourcesScene,
  RoadmapScene,
  SearchScene,
  ToolsScene,
} from "./scenes/knowledge";
import {
  ApplyScene,
  ContactScene,
  EthicsScene,
  MatcherScene,
  MentorScene,
  PlaygroundScene,
  SecurityScene,
} from "./scenes/systems";

export type HeroVariant =
  | "about"
  | "roles"
  | "projects"
  | "writeups"
  | "resources"
  | "roadmap"
  | "team"
  | "join"
  | "ethics"
  | "contact"
  | "security"
  | "playground"
  | "apply"
  | "mentor"
  | "matcher"
  | "search"
  | "datasets"
  | "tools"
  | "case"
  | "research";

const SCENES: Record<HeroVariant, ComponentType> = {
  about: AboutScene,
  roles: RolesScene,
  projects: ProjectsScene,
  writeups: WriteupsScene,
  resources: ResourcesScene,
  roadmap: RoadmapScene,
  team: TeamScene,
  join: JoinScene,
  ethics: EthicsScene,
  contact: ContactScene,
  security: SecurityScene,
  playground: PlaygroundScene,
  apply: ApplyScene,
  mentor: MentorScene,
  matcher: MatcherScene,
  search: SearchScene,
  datasets: DatasetsScene,
  tools: ToolsScene,
  case: CaseScene,
  research: ResearchScene,
};

export function HeroArt({ variant }: { variant: HeroVariant }) {
  const SceneComponent = SCENES[variant];
  return <SceneComponent />;
}
