// Everything that makes this site *this person's* site lives here: name, links,
// palette, and which content sections exist. Layout and components read from it.

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Section {
  /** Content collection name; entries live in src/content/<id>/. Also the URL segment. */
  id: string;
  title: string;
  /** Label for the hero / about call-to-action links. */
  cta: string;
}

export const site = {
  name: 'Jack Jansons',
  url: 'https://jackjansons.dev',
  description:
    'Jack Jansons — software engineer at Meta. Projects and research in machine learning, optimization, and software.',

  /** Lines under the name in the home hero. */
  heroLines: ['Software Engineer at Meta', 'Computer Science and Operations Research, Cornell University'],

  sections: [
    { id: 'projects', title: 'Projects', cta: 'Explore projects' },
    { id: 'research', title: 'Research', cta: 'Explore research' },
  ] satisfies Section[],

  resume: { label: 'Resume', href: '/jack_jansons_resume.pdf' },

  socials: [
    { label: 'GitHub', href: 'https://github.com/jcj59', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/jackjansons', icon: 'linkedin' },
  ] as const,

  /**
   * Palette. `ink` is the signature color: hero, footer, and body text.
   * `accent` is the warm hover/link color.
   */
  palette: {
    ink: '#0a1e32',
    inkDeep: '#06121f',
    paper: '#ffffff',
    paperDim: '#f4f5f7',
    accent: '#9a825c',
    accentDeep: '#6e5b3e',
    accentOnInk: '#c8b08a',
    line: '#e5e7eb',
  },
};
