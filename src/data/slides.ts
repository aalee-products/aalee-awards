import { Users, Briefcase, Zap, Shield, Target, Rocket, Star, Heart, Award, Gem, CheckCircle2, Database, BrainCircuit, LayoutGrid, Timer } from 'lucide-react';

export type SlideType = 'hero' | 'award' | 'grid' | 'roadmap' | 'closing' | 'phase' | 'image' | 'table' | 'list' | 'recap' | 'org';

export interface TeamMember {
  designation?: string;
  employee: string;
  role: string;
}

export interface OrgSlide {
  id: string;
  type: 'org';
  title: string;
  subtitle?: string;
  members: TeamMember[];
  watermark?: string;
}

export interface RecapItem {
  name: string;
  subtitle?: string;
  dim?: boolean;
}

export interface RecapSlide {
  id: string;
  type: 'recap';
  title: string;
  items: (string | RecapItem)[];
  watermark?: string;
}

export interface TableSlide {
  id: string;
  type: 'table';
  title: string;
  headers: string[];
  rows: string[][];
  watermark?: string;
}

export interface ListSlide {
  id: string;
  type: 'list';
  title: string;
  members: string[];
  objective: string;
  coreProducts: string[];
  sharedProducts: string[];
  watermark?: string;
}

export interface ImageSlide {
  id: string;
  type: 'image';
  title: string;
  imageUrl: string;
  watermark?: string;
}

export interface AwardSlide {
  id: string;
  type: 'award';
  title: string;
  categoryIcon: any;
  subtitle: string;
  description: string;
  quote: string;
  winner: string;
  team: string;
  department: string;
  watermark?: string;
}

export interface HeroSlide {
  id: string;
  type: 'hero';
  title: string;
  subtitle: string;
  dateLocation: string;
  tagline: string;
  url: string;
  watermark?: string;
}

export interface GridSlide {
  id: string;
  type: 'grid';
  title: string;
  items: { title: string; content: string }[];
  watermark?: string;
}

export interface RoadmapPhase {
  phase: string;
  date: string;
  description: string;
  details: {
    category?: string;
    items: string[];
  }[];
}

export interface RoadmapSlide {
  id: string;
  type: 'roadmap';
  title: string;
  phases: { title: string; date: string; description: string }[];
  watermark?: string;
}

export interface PhaseSlide {
  id: string;
  type: 'phase';
  title: string;
  date: string;
  sections: {
    title: string;
    items: string[];
  }[];
  watermark?: string;
}

export interface ClosingSlide {
  id: string;
  type: 'closing';
  content: {
    header: string;
    team: string;
    paragraph: string;
    belief: string;
    tagline: string;
    url: string;
    footer: string;
  };
  watermark?: string;
}

export type Slide = HeroSlide | AwardSlide | GridSlide | RoadmapSlide | PhaseSlide | ClosingSlide | ImageSlide | TableSlide | ListSlide | RecapSlide | OrgSlide;

export const SLIDES: Slide[] = [
  {
    id: 'welcome',
    type: 'hero',
    title: 'Aalee Meet',
    subtitle: 'Q1 2026',
    dateLocation: '',
    tagline: 'AI For Business.',
    url: 'aalee.ai'
  },
  {
    id: 'greetings',
    type: 'hero',
    title: 'Greetings & Announcement',
    subtitle: 'by Dhanasekaran',
    dateLocation: '',
    tagline: 'Aalee Awards · Q1 2026',
    url: 'aalee.ai'
  },
  {
    id: 'management-updates',
    type: 'hero',
    title: 'Operations Team\nUpdate',
    subtitle: 'by Gopika & Nithish',
    dateLocation: '',
    tagline: 'Aalee Awards · Q1 2026',
    url: 'aalee.ai'
  },
  {
    id: 'hero',
    type: 'hero',
    title: 'Aalee Awards',
    subtitle: 'Recognising the people building Aalee.',
    dateLocation: 'Chennai · Q1 2026',
    tagline: 'AI For Business.',
    url: 'aalee.ai'
  },
  {
    id: 'award-1',
    type: 'award',
    title: 'HR STEWARD AWARD',
    categoryIcon: Users,
    subtitle: 'Building the people infrastructure at Aalee',
    description: 'Behind every well-functioning team is someone who ensures the people side never breaks down. This award recognises the person who manages HR, keeps the team supported, and ensures everyone has what they need to show up and do their best work.',
    quote: '',
    winner: 'Gopika',
    team: 'Operations',
    department: 'HR'
  },
  {
    id: 'award-2',
    type: 'award',
    title: 'ADMIN CATALYST AWARD',
    categoryIcon: Briefcase,
    subtitle: 'Keeping the operational engine running',
    description: "Every company runs on a backbone of financial discipline and administrative precision. This award goes to the person who ensures Aalee's numbers, compliance, and admin groundwork are always in order — making it possible for every other team to operate without friction.",
    quote: '"The work no one sees. The work everyone depends on."',
    winner: 'Nithish',
    team: 'Operations',
    department: 'Finance & Admin'
  },
  {
    id: 'award-3',
    type: 'award',
    title: 'BACKBONE AWARD',
    categoryIcon: Shield,
    subtitle: 'The structural support of the Foundation team',
    description: 'In infrastructure, reliability is not a feature - it is the foundation. This award recognises someone whose presence ensures the platform stays stable, systems stay healthy, and the team never has to worry about what is holding everything together.',
    quote: '"Never loud. Never missing. Always exactly where needed."',
    winner: 'Thiyagarajan',
    team: 'Foundation',
    department: 'DevOps'
  },
  {
    id: 'award-4',
    type: 'award',
    title: 'IRONCLAD AWARD',
    categoryIcon: Zap,
    subtitle: 'Precision and dependability in the Foundation team',
    description: 'When a commitment is made, it is kept. When a task is owned, it is delivered. This award goes to the person who brings an unwavering standard of precision to the foundation team — the kind of reliability that lets the rest of Aalee build with total confidence.',
    quote: '"Commitments made. Commitments kept."',
    winner: 'Srisantosh',
    team: 'Foundation',
    department: 'DevOps'
  },
  {
    id: 'award-5',
    type: 'award',
    title: 'CORNERSTONE AWARD',
    categoryIcon: Gem,
    subtitle: 'Leading the foundation every Aalee product is built on',
    description: 'Every product Aalee builds rests on the foundation this leader runs. The Cornerstone Award is reserved for someone who leads with the same craft, ownership, and depth as the best product leads — except her work makes all of theirs possible.',
    quote: '"Where everything starts."',
    winner: 'Meenakshi',
    team: 'Foundation',
    department: 'DevOps Lead'
  },
  {
    id: 'award-6',
    type: 'award',
    title: 'PURSUIT AWARD',
    categoryIcon: Target,
    subtitle: 'Focus, effort, and self-driven delivery',
    description: 'This award goes to an intern who came in with a clear intent to contribute. Without needing constant guidance, they absorbed the context, asked the right questions, and delivered when it mattered. The Pursuit Award recognises someone who showed up with purpose.',
    quote: '"Got the job done."',
    winner: 'Hariharan',
    team: 'Internship Program',
    department: 'Intern'
  },
  {
    id: 'award-7',
    type: 'award',
    title: 'PROMISING AWARD',
    categoryIcon: Star,
    subtitle: 'Curiosity and early promise the team noticed',
    description: 'This award recognises an intern whose energy, curiosity, and pace of learning left a genuine impression on the team. Not just effort — but the kind of early signal that tells you this is someone worth watching closely.',
    quote: '"A journey worth watching."',
    winner: 'Sowbarnika',
    team: 'Internship Program',
    department: 'Intern'
  },
  {
    id: 'award-8',
    type: 'award',
    title: 'EMERGENCE AWARD',
    categoryIcon: Rocket,
    subtitle: 'Going beyond the brief from day one',
    description: 'Our top intern recognition goes to someone who redefined what an intern at Aalee can be. They went far beyond support tasks — took real ownership, showed initiative without being asked, and delivered output the team genuinely relied on.',
    quote: '"Sets the benchmark for what an intern at Aalee can be."',
    winner: 'Arshath',
    team: 'Internship Program',
    department: 'Intern'
  },
  {
    id: 'award-9',
    type: 'award',
    title: 'HEAD START AWARD',
    categoryIcon: Timer,
    subtitle: 'A breakthrough entry into the Aalee team',
    description: 'In couple of month, this person joined the ML team, absorbed the stack, earned the team\'s trust, and delivered real output well before the timeline demanded it. The Head Start Award celebrates someone who did not wait for permission to contribute.',
    quote: '"couple of months in, Already Trusted"',
    winner: 'Ashwini',
    team: 'AI Products',
    department: 'ML'
  },
  {
    id: 'award-10',
    type: 'award',
    title: 'ASCENT AWARD',
    categoryIcon: Rocket,
    subtitle: 'Growth that shows in the work, week after week',
    description: 'Growth is not always announced. Sometimes it is visible only in the quality of output, the ownership in decisions, and the confidence in delivery — all quietly increasing sprint by sprint. The Ascent Award goes to someone on a trajectory the whole team has noticed.',
    quote: '"The trajectory is clear."',
    winner: 'Swetha',
    team: 'AI Products',
    department: 'Software Engineering'
  },
  {
    id: 'award-11',
    type: 'award',
    title: 'RADIANT AWARD',
    categoryIcon: Heart,
    subtitle: 'Shining consistently across the products team',
    description: 'Some people bring a warmth and brightness to their work that makes the whole team better — not just in output, but in how the work feels. The Radiant Award goes to someone who shines consistently: in the quality of what she delivers, in the energy she brings, and in the way she is becoming someone the team genuinely builds around.',
    quote: '"Consistent light. Growing stronger."',
    winner: 'Anushobini',
    team: 'AI Products',
    department: 'Software Engineering'
  },
  {
    id: 'award-12',
    type: 'award',
    title: 'STAR AWARD',
    categoryIcon: Award,
    subtitle: 'Consistent standout output across the products team',
    description: "The Star Award is for the person who brings visible energy, sharp execution, and consistent performance to the team. Not occasional brilliance — sustained output that makes the team's work better every sprint. When they are on something, you know it will be done well.",
    quote: '"Consistent. Sharp. Delivering."',
    winner: 'Shreya',
    team: 'AI Products',
    department: 'Software Engineering'
  },
  {
    id: 'award-13',
    type: 'award',
    title: 'MASTERY AWARD',
    categoryIcon: BrainCircuit,
    subtitle: 'Setting the direction the team builds towards',
    description: 'Great products do not emerge from features — they emerge from mastery of direction. The Mastery Award goes to a lead who commands the product space with depth, shapes how the team thinks about what to build and why, and delivers a standard of leadership that elevates everyone working alongside her.',
    quote: '"She does not just manage product. She masters it."',
    winner: 'Keerthana',
    team: 'AI Products',
    department: 'AI Products Lead'
  },
  {
    id: 'award-14',
    type: 'award',
    title: 'EXCELLENCE AWARD',
    categoryIcon: CheckCircle2,
    subtitle: 'The standard every Aalee team member measures against',
    description: 'Excellence is a consistent choice. It shows up in how a brief is scoped, how a solution is designed, how feedback is given, and how work is delivered. The Excellence Award is the highest individual performance recognition at Aalee. This year it goes to the person whose work has defined the ceiling — and kept raising it.',
    quote: '"Every initiative she leads is sharper, better scoped, and more impactful than what came before."',
    winner: 'Brindha',
    team: 'AI Products',
    department: 'AI Products Lead'
  },
  {
    id: 'award-15',
    type: 'award',
    title: 'CHAMPION AWARD',
    categoryIcon: Shield,
    subtitle: 'The highest individual recognition at Aalee Awards 2026',
    description: 'There is one word for this person: Champion. Not because the title was assigned, but because it was earned, again and again, in every challenge, every crunch, and every moment that needed someone to step forward. When the stakes are highest, when the pressure is real, and when the team needs one person to deliver - this person does. Every. Single. Time.',
    quote: '"The one you call when it has to be done."',
    winner: 'Abdul Hajees',
    team: 'Aalee',
    department: 'Champion'
  },
  {
    id: 'q1-recap',
    type: 'hero',
    title: 'Q1 Recap',
    subtitle: '(Starter)',
    dateLocation: '',
    tagline: 'Aalee Q1 2026',
    url: 'aalee.ai'
  },
  {
    id: 'recap-systems',
    type: 'recap',
    title: 'Core Ecosystem',
    watermark: 'Q1 Recap',
    items: [
      'Auth App (SSO)',
      'Console App',
      'Aalee App',
      'CMS Engine',
      'Status & Notifications',
    ]
  },
  {
    id: 'recap-apps',
    type: 'recap',
    title: 'Applications',
    watermark: 'Q1 Recap',
    items: [
      { name: 'Assist' },
      { name: 'Reach' },
      { name: 'Taxary' },
      { name: 'Business' },
      { name: 'Aalee App', dim: true },
      { name: 'Aalee CAM', dim: true },
    ]
  },
  {
    id: 'recap-websites',
    type: 'recap',
    title: 'Websites',
    watermark: 'Q1 Recap',
    items: [
      'Aalee Website',
      'Assist Website',
      'Reach Website',
      'Taxary Website',
    ]
  },
  {
    id: 'q1-recap-models',
    type: 'recap',
    title: 'AI Models',
    watermark: 'Q1 Recap',
    items: [
      'Aalee Classify',
      'Aalee Compose',
      'Aalee Curate',
      'Aalee Embed',
      'Aalee Extract',
      'Aalee Translate',
    ]
  },
  {
    id: 'q1-recap-programs',
    type: 'recap',
    title: 'People Growth Programs',
    watermark: 'Q1 Recap',
    items: [
      'PGP Self Review',
      'PGP Mentorship and Internship',
      'PGP Aalee Awards',
    ]
  },
  {
    id: 'demo-1',
    type: 'image',
    title: 'Demo',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'demo-2',
    type: 'image',
    title: 'Demo',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'q2-transition',
    type: 'hero',
    title: 'Q2 2026 Roadmap',
    subtitle: 'Starter ➔ Growth',
    dateLocation: '',
    tagline: 'AI For Business.',
    url: 'aalee.ai'
  },
  {
    id: 'aalee-hires-q2',
    type: 'hero',
    title: 'Aalee Hires',
    subtitle: '',
    dateLocation: '',
    tagline: 'AI For Business.',
    url: 'aalee.ai'
  },
  {
    id: 'aalee-team-q2',
    type: 'hero',
    title: 'Aalee Team',
    subtitle: '',
    dateLocation: '',
    tagline: 'AI For Business.',
    url: 'aalee.ai'
  },
  {
    id: 'team-operations',
    type: 'org',
    title: 'Operations Team',
    subtitle: 'Efficiency & Support',
    members: [
      { employee: 'Gopika', role: 'HR Associate' },
      { employee: 'Nithish', role: 'Operations Associate' }
    ]
  },
  {
    id: 'team-business',
    type: 'org',
    title: 'Business Team',
    subtitle: 'GTM & Growth',
    members: [
      { designation: 'Sales Executive', employee: '-- vacant --', role: 'Team Lead' },
      { designation: 'Digital Marketing Associate', employee: '-- vacant --', role: 'Associate' },
      { designation: 'Digital Marketing Associate', employee: '-- vacant --', role: 'Associate' },
      { designation: 'Customer Support Associate', employee: '-- vacant --', role: 'Associate' }
    ]
  },
  {
    id: 'team-foundation',
    type: 'org',
    title: 'Foundation Team',
    subtitle: 'Infrastructure & Reliability',
    members: [
      { employee: 'Meenakshi', role: 'Team Lead' },
      { employee: 'Sri Santosh', role: 'Engineer' },
      { employee: 'Thiyagrajan', role: 'Engineer' }
    ]
  },
  {
    id: 'products-enhancement',
    type: 'list',
    title: 'Products: Enhancement',
    members: ['Brindha', 'Anushobini', 'Swetha', 'Sowbarnika', 'Hariharan', '-- QE --', '-- Intern --'],
    objective: 'Enhancement',
    coreProducts: ['Taxary', 'Reach', 'Business'],
    sharedProducts: ['Apps/Websites', 'Console', 'Auth']
  },
  {
    id: 'products-development',
    type: 'list',
    title: 'Products: Development',
    members: ['Keerthana', 'Abdul Hajees', 'Shreya', 'Arsath', 'Ashwini', '-- QE --', '-- Interns --'],
    objective: 'Development',
    coreProducts: ['Assist', 'BOS', 'MAAS', 'Models'],
    sharedProducts: ['Apps/Websites', 'Console', 'Auth']
  },
  {
    id: 'roadmap-operations',
    type: 'phase',
    title: 'Operations Team',
    date: 'Q2 Focus',
    sections: [
      {
        title: 'Strategic Priorities',
        items: [
          'Hiring:focus for Sales Executive, Digital Marketing Associate, Customer Support Associate',
          'streamline HR, Admin, and Finance processes'
        ]
      }
    ]
  },
  {
    id: 'roadmap-business',
    type: 'phase',
    title: 'Business Team',
    date: 'Q2 Focus',
    sections: [
      {
        title: 'Strategic Priorities',
        items: [
          'Go-to-market activation — brand, outreach, pipeline',
          'Solutions focus: Services → Finance → Marketing',
          'Full outreach through campaigns and digital marketing',
          'Activate sales initiatives for revenue generation'
        ]
      }
    ]
  },
  {
    id: 'roadmap-foundation',
    type: 'phase',
    title: 'Foundation Team',
    date: 'Q2 Focus',
    sections: [
      {
        title: 'Strategic Priorities',
        items: [
          'Infrastructure hardening for production scale',
          'Platform reliability and observability upgrades',
          'Support Console, BOS and MAAS rollout and service APIs',
          'DevOps process improvements for faster CI/CD'
        ]
      }
    ]
  },
  {
    id: 'roadmap-products',
    type: 'phase',
    title: 'Products Team',
    date: 'Q2 Focus',
    sections: [
      {
        title: 'Strategic Priorities',
        items: [
          'Enhance All Products',
          'Develop and Deliver MAAS (Model as a Service)',
          'Develop and Deliver BOS (Business Operating System)',
          'Decommission APP and CAM by replacing with Console with Advanced capabilities',
          'Assist Mobile App Release*'
        ]
      }
    ]
  },
  {
    id: 'people-growth-programs-q2',
    type: 'recap',
    title: 'People Growth Programs',
    watermark: 'Growth',
    items: [
      'PGP Self Review',
      'PGP Mentorship and Internship',
      'PGP Aalee Awards',
      'Anthropic Certification',
      'ML / AI Learning for All Engineers*'
    ]
  },
  {
    id: 'roadmap-progress',
    type: 'roadmap',
    title: 'Aalee Growth Journey',
    phases: [
      { title: 'STARTER', date: 'Q1 2026', description: '' },
      { title: 'STARTER ➔ GROWTH', date: 'Q2 2026', description: '' },
      { title: 'GROWTH', date: 'Q3 2026', description: '' }
    ]
  },
  {
    id: 'team-timelines',
    type: 'image',
    title: 'Release/Review Timelines',
    imageUrl: '/timelines/operations_timeline.png'
  },
  {
    id: 'product-timelines',
    type: 'image',
    title: 'Release/Review Timelines',
    imageUrl: '/timelines/products_timeline.png'
  },
  {
    id: 'closing',
    type: 'closing',
    content: {
      header: 'Thank you,',
      team: 'Aalee Team.',
      paragraph: 'Every line of code, every decision, every late night — it all adds up.',
      belief: 'This is what Aalee is built on.',
      tagline: 'AI For Business.',
      url: 'aalee.ai',
      footer: 'Aalee · Q2 2026'
    }
  }
];
