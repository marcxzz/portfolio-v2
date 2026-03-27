import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";
import SettingsWindow from "@/components/windows/SettingsWindow";
import StackWindow from "@/components/windows/StackWindow";
import { IconBriefcase2Filled, IconCode, IconFileFilled, IconSettingsFilled, IconUserFilled } from "@tabler/icons-react";

export const APPS = [
  {
    id: "about",
    name: "About me",
    component: AboutWindow,
    icon: IconUserFilled,
    state: "open"
  },
  {
    id: "projects",
    name: "Projects",
    component: ProjectsWindow,
    icon: IconBriefcase2Filled,
    state: "background"
  },
  {
    id: "stack",
    name: "Stack",
    component: StackWindow,
    icon: IconCode,
    state: "closed"
  },
  {
    id: "cv",
    name: "Curriculum Vitae",
    component: ResumeWindow,
    icon: IconFileFilled,
    state: "closed"
  },
  {
    id: "settings",
    name: "Settings",
    component: SettingsWindow,
    icon: IconSettingsFilled,
    state: "closed"
  },
]