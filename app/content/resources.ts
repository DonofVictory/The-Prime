export type Verse = { text: string; ref: string };

export type PrayerGuide = {
  slug: string;
  title: string;
  /** Short line used in the Resources index and search */
  summary: string;
  intro: string;
  points: string[];
  scriptures: Verse[];
  closing: string;
  tags: string[];
};

export const prayerGuides: PrayerGuide[] = [
  {
    slug: "relocation",
    title: "4 Prayer Points When You Are Trusting God for Relocation",
    summary: "Moving to a new city or country.",
    intro:
      "Moving to a new city or country can feel exciting and scary at once. Here are four ways to bring it to God.",
    points: [
      "Ask for clear direction and peace about the move.",
      "Pray for open doors: housing, work and the right people.",
      "Ask for protection and provision along the way.",
      "Thank God ahead of time for the new season.",
    ],
    scriptures: [
      {
        text: "Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee:",
        ref: "Genesis 12:1",
      },
      {
        text: "The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.",
        ref: "Psalm 121:8",
      },
    ],
    closing: "God goes before you. You are not moving into the unknown; you are moving into His plan.",
    tags: ["relocation", "moving", "travel", "japa", "abroad", "new city", "visa"],
  },
  {
    slug: "finances",
    title: "Prayer Points for Financial Breakthrough",
    summary: "Money pressure, provision and wisdom.",
    intro: "Money pressure is real. Bring it to God honestly, and pray with faith and wisdom.",
    points: [
      "Thank God that He is your provider.",
      "Ask for wisdom to manage what you already have.",
      "Pray for new doors, opportunities and fair pay.",
      "Ask God to free you from fear and financial pressure.",
      "Pray for a generous heart, even in a tight season.",
    ],
    scriptures: [
      {
        text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
        ref: "Philippians 4:19",
      },
      {
        text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        ref: "Matthew 6:33",
      },
    ],
    closing: "God cares about your needs. Pray, work diligently and trust Him with the timing.",
    tags: ["finances", "money", "debt", "provision", "breakthrough", "rent", "bills"],
  },
  {
    slug: "job",
    title: "Scriptures to Pray While You Are Waiting for a Job",
    summary: "Staying hopeful between applications.",
    intro: "Waiting is hard. Use these prayers and verses to stay hopeful while you wait.",
    points: [
      "Ask God to open the right door at the right time.",
      "Pray for favour with employers and decision makers.",
      "Ask for patience and a steady heart while you wait.",
      "Pray for wisdom to use this season well.",
      "Thank God that your worth is not defined by your job title.",
    ],
    scriptures: [
      {
        text: "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.",
        ref: "Psalm 37:5",
      },
      { text: "Commit thy works unto the LORD, and thy thoughts shall be established.", ref: "Proverbs 16:3" },
    ],
    closing: "This season is not wasted. God is preparing you while you wait.",
    tags: ["job", "work", "career", "unemployed", "waiting", "interview", "nysc", "graduate"],
  },
  {
    slug: "family",
    title: "Prayer Points for Your Family",
    summary: "Peace, healing and provision at home.",
    intro: "Family can be our greatest joy and our heaviest burden. Pray for yours today.",
    points: [
      "Pray for peace in your home.",
      "Ask God for healing and reconciliation where relationships are strained.",
      "Pray for the protection and salvation of every family member.",
      "Ask for provision for your family's needs.",
      "Pray for patience, love and wisdom in how you treat them.",
    ],
    scriptures: [
      {
        text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
        ref: "Philippians 4:6-7",
      },
      { text: "Casting all your care upon him; for he careth for you.", ref: "1 Peter 5:7" },
    ],
    closing: "God loves your family even more than you do. Keep praying.",
    tags: ["family", "parents", "home", "siblings", "reconciliation"],
  },
  {
    slug: "direction",
    title: "When You Need God's Direction",
    summary: "Big decisions and what to do next.",
    intro: "Big decisions are easier when you invite God into them. Pray through these.",
    points: [
      "Ask God to make His will clear.",
      "Pray for peace in the right choice and unease in the wrong one.",
      "Ask for wise counsel from godly people.",
      "Pray for courage to obey once He has shown you.",
      "Surrender the outcome to Him.",
    ],
    scriptures: [
      {
        text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
        ref: "Proverbs 3:5-6",
      },
      {
        text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.",
        ref: "Psalm 32:8",
      },
    ],
    closing: "God would rather guide you than see you guess. Ask, listen and take the next step.",
    tags: ["direction", "decision", "guidance", "choice", "purpose", "confused"],
  },
];

export const support = {
  title: "When life feels heavy",
  intro:
    "You are not weak for struggling. Here are a few truths to hold on to, and a way to reach a real person when you need one.",
  scriptures: [
    {
      text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
      ref: "Psalm 34:18",
    },
    { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
    { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
    {
      text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
      ref: "2 Timothy 1:7",
    },
  ] as Verse[],
  prayer:
    "Father, I am tired and I do not have the words. Come close. Hold what I cannot. Send me the right people, and help me take one small step today. Amen.",
  tags: ["anxiety", "depression", "grief", "sad", "overwhelmed", "lonely", "tired", "heavy", "mental health", "fear"],
};

export type Video = { title: string; summary: string; youtubeId?: string };
export type TeachingTopic = {
  slug: string;
  title: string;
  summary: string;
  series: string;
  videos: Video[];
  tags: string[];
};

export const teaching: TeachingTopic[] = [
  {
    slug: "faith-and-real-life",
    title: "Faith and Real Life",
    summary: "Practical spirituality and everyday decisions.",
    series: "Faith in the Everyday",
    videos: [
      { title: "Praying When It Is Hard", summary: "What to do when prayers feel unanswered." },
      { title: "Hearing God's Voice", summary: "How God speaks and how to listen." },
      { title: "Making Decisions God's Way", summary: "A practical guide to guidance." },
      { title: "Doubt Is Not the Enemy", summary: "Wrestling honestly with questions." },
    ],
    tags: ["prayer", "doubt", "decision", "hearing god", "faith"],
  },
  {
    slug: "career-and-hustle",
    title: "Career and Hustle",
    summary: "Building a godly career in today's culture.",
    series: "Work, Wealth and Worship",
    videos: [
      { title: "Calling vs. Career", summary: "Finding purpose in what you do." },
      { title: "The Waiting Season", summary: "Staying faithful between graduation and breakthrough." },
      { title: "Building with Integrity", summary: "Excellence without compromise." },
      { title: "Money Habits", summary: "Managing, saving and giving wisely." },
    ],
    tags: ["career", "job", "work", "money", "business", "hustle", "graduate"],
  },
  {
    slug: "relationships",
    title: "Relationships, Dating and Marriage",
    summary: "Candid conversations on love, boundaries and commitment.",
    series: "Understanding Godly Relationships",
    videos: [
      { title: "Boundaries", summary: "Protecting your heart and others'." },
      { title: "Dating", summary: "Dating with purpose and peace." },
      { title: "Sex and Purity", summary: "Honest talk, without shame." },
      { title: "Marriage", summary: "Preparing for a lifelong covenant." },
    ],
    tags: ["relationships", "dating", "marriage", "love", "boundaries", "purity", "sex"],
  },
  {
    slug: "mental-health",
    title: "Mental Health and Faith",
    summary: "Anxiety, depression, therapy and faith, discussed openly.",
    series: "Whole",
    videos: [
      { title: "Anxiety", summary: "When your mind will not slow down." },
      { title: "Depression", summary: "Hope in the dark." },
      { title: "Faith and Therapy", summary: "Why both can work together." },
      { title: "Rest", summary: "Learning to stop without guilt." },
    ],
    tags: ["anxiety", "depression", "therapy", "rest", "mental health", "burnout"],
  },
  {
    slug: "purpose-and-identity",
    title: "Purpose and Identity",
    summary: "Who you are and why you are here.",
    series: "Who Am I?",
    videos: [
      { title: "Identity in Christ", summary: "Who God says you are." },
      { title: "Finding Your Purpose", summary: "Calling, gifts and direction." },
      { title: "Self-Worth", summary: "Freedom from comparison." },
      { title: "Culture and Influence", summary: "Living bold in a loud world." },
    ],
    tags: ["purpose", "identity", "self-worth", "comparison", "calling", "culture"],
  },
];

export const resourceSections = [
  {
    title: "Prayer points and scriptures",
    summary: "Pray through relocation, finances, career, family and direction.",
    href: "/resources/prayer-points",
  },
  {
    title: "Support and encouragement",
    summary: "Biblical comfort for hard seasons, plus a way to talk to someone.",
    href: "/resources/support",
  },
  {
    title: "Teaching videos",
    summary: "Honest teaching on faith, career, relationships, mental health and purpose.",
    href: "/resources/teaching",
  },
  { title: "Daily devotional", summary: "A short reading and prayer, every day.", href: "/resources/devotional" },
  { title: "Daily affirmations", summary: "One line of truth to carry through your day.", href: "/resources/affirmations" },
  { title: "Archive", summary: "Sermons, series, worship nights, podcasts and events.", href: "/resources/archive" },
  { title: "Downloads", summary: "Reading plans, prayer guides and study tools.", href: "/resources/downloads" },
];

export const archive = [
  { title: "Sermons", summary: "Full messages from our services" },
  { title: "Teaching series", summary: "Multi-week series, in order" },
  { title: "Worship nights", summary: "Moments from our worship gatherings" },
  { title: "The PRIME Words podcast", summary: "Raw conversations where real faith meets real life" },
  { title: "Special events", summary: "Highlights and recaps" },
  { title: "Conferences", summary: "Talks and sessions" },
  { title: "Past devotionals", summary: "Revisit earlier readings", href: "/resources/devotional/1" },
];

export const downloads = [
  { title: "Bible reading plans", summary: "Simple plans to help you read the Bible consistently", file: null as string | null },
  {
    title: "Quiet-time template",
    summary: "A one-page guide for time with God (read, reflect, respond, pray)",
    file: null as string | null,
  },
  { title: "Prayer guides", summary: "Structured prayers for different seasons", file: null as string | null },
  {
    title: "Discipleship worksheets",
    summary: "Questions and exercises for personal or group study",
    file: null as string | null,
  },
  { title: "Study guides", summary: "Companion guides for our teaching series", file: null as string | null },
  { title: "Event materials", summary: "Flyers and programmes from past events", file: null as string | null },
];
