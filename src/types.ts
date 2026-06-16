/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemArchitecture {
  nodes: string[];
  flowDescription: string;
  dbSchema: string[];
  keyChallenges: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  chips: string[];
  tags?: string[];
  blueprintTitle: string;
  blueprintText: string;
  detailedDoc: string;
  sysArchitecture: SystemArchitecture;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  projects: Project[];
}

export interface TimelineMilestone {
  id: string;
  company: string;
  period: string;
  title: string;
  skills: string[];
  bullets: string[];
}
