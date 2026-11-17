export type Devotional = {
  day: number;
  title: string;
  scripture: { text: string; ref: string };
  reflection: string;
  prayer: string;
};

export const devotionals: Devotional[] = [
  {
    day: 1,
    title: "A New Morning",
    scripture: {
      text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
      ref: "Lamentations 3:22-23",
    },
    reflection:
      "Yesterday's mistakes, delays and disappointments do not get to write today's story. God's mercy resets with the sunrise. Start this day lighter, because you are being met with fresh kindness, not old judgement.",
    prayer: "Father, thank You for new mercy this morning. Help me begin again without shame.",
  },
  {
    day: 2,
    title: "Trust Over Understanding",
    scripture: {
      text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      ref: "Proverbs 3:5-6",
    },
    reflection:
      "You do not need the whole map to take the next step. Trusting God means moving forward even when the full picture is unclear. Invite Him into every decision, big or small, and let Him straighten the road.",
    prayer: "Lord, I give You what I cannot figure out. Direct my steps today.",
  },
  {
    day: 3,
    title: "Be Transformed",
    scripture: {
      text: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
      ref: "Romans 12:2",
    },
    reflection:
      "Culture will always try to shape how you think about success, love and worth. Change begins in the mind. Feed it with truth, and your choices will start to look different without you forcing them.",
    prayer: "God, renew my mind. Let Your truth shape how I think and live.",
  },
  {
    day: 4,
    title: "Hope With a Future",
    scripture: {
      text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      ref: "Jeremiah 29:11",
    },
    reflection:
      "Waiting seasons can make us feel forgotten. This verse says otherwise: God is thinking about you, and His plans are good. Your current chapter is not the whole book.",
    prayer: "Father, help me hold on to Your plans for me, even while I wait.",
  },
  {
    day: 5,
    title: "Trade Worry for Prayer",
    scripture: {
      text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      ref: "Philippians 4:6-7",
    },
    reflection:
      "Worry rehearses problems. Prayer hands them over. Name what is weighing on you, say thank you for what is already good, and let God's peace stand guard over your mind.",
    prayer: "Lord, I bring You everything I am anxious about. Replace my worry with Your peace.",
  },
  {
    day: 6,
    title: "You Are Not Alone",
    scripture: {
      text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
      ref: "Isaiah 41:10",
    },
    reflection:
      "Fear shrinks when we remember who is standing beside us. God does not only watch from a distance; He strengthens, helps and holds. Whatever you are facing today, you face it with Him.",
    prayer: "God, thank You for being with me. Strengthen me for what is ahead.",
  },
  {
    day: 7,
    title: "First Things First",
    scripture: {
      text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      ref: "Matthew 6:33",
    },
    reflection:
      "Priorities decide direction. When God comes first, everything else finds its proper place. Before you open your phone, your inbox or your to-do list, start with Him.",
    prayer: "Father, I put You first today. Order everything else around Your will.",
  },
  {
    day: 8,
    title: "Fearfully and Wonderfully Made",
    scripture: {
      text: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.",
      ref: "Psalm 139:14",
    },
    reflection:
      "You were not an accident or an afterthought. Your personality, gifts and story were crafted with care. Stop comparing and start thanking God for how He made you.",
    prayer: "Lord, help me see myself the way You see me. I praise You for how You made me.",
  },
  {
    day: 9,
    title: "Young and Qualified",
    scripture: {
      text: "Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.",
      ref: "1 Timothy 4:12",
    },
    reflection:
      "Your age is not a disqualification. God uses young people who are willing to lead by example in how they speak, love, believe and live. Do not wait for permission to be faithful.",
    prayer: "God, use me now. Help me set an example in my words and my life.",
  },
  {
    day: 10,
    title: "Strong and Courageous",
    scripture: {
      text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
      ref: "Joshua 1:9",
    },
    reflection:
      "Courage is not the absence of fear; it is moving forward because God goes with you. Wherever you walk into today, a classroom, an office, a hard conversation, you do not go alone.",
    prayer: "Father, give me courage for today. Remind me that You are with me everywhere I go.",
  },
  {
    day: 11,
    title: "A Lamp for the Path",
    scripture: { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
    reflection:
      "A lamp does not light the whole journey; it lights the next few steps. God's word gives enough direction for today. Open it, read it, and take the step it shows you.",
    prayer: "Lord, speak through Your word today. Light my next step.",
  },
  {
    day: 12,
    title: "Let Your Light Shine",
    scripture: {
      text: "Ye are the light of the world. A city that is set on an hill cannot be hid.",
      ref: "Matthew 5:14",
    },
    reflection:
      "You are not meant to blend in and hide your faith. Light is useful because it is visible. Let your kindness, honesty and joy make Jesus easy to see in your everyday spaces.",
    prayer: "God, let my life point people to You today.",
  },
  {
    day: 13,
    title: "Power, Love and a Sound Mind",
    scripture: {
      text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
      ref: "2 Timothy 1:7",
    },
    reflection:
      "Fear is not from God. What He gives is power to act, love to care, and a steady mind to think clearly. When anxiety speaks, remind yourself what you have actually been given.",
    prayer: "Father, I receive Your power, love and a sound mind. Silence fear in my life.",
  },
  {
    day: 14,
    title: "Refuge in Trouble",
    scripture: { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
    reflection:
      "When life feels loud and unstable, God is the place you can run to. He is not hard to find in hard times; He is described as very present. Run to Him first.",
    prayer: "Lord, You are my refuge. I run to You today.",
  },
  {
    day: 15,
    title: "Give Him the Weight",
    scripture: { text: "Casting all your care upon him; for he careth for you.", ref: "1 Peter 5:7" },
    reflection:
      "You were never designed to carry everything yourself. Cast means throw; do not hold it back. Hand over the burden, the decision, the person you are worried about, because He cares for you.",
    prayer: "Father, I give You my cares. Thank You for caring for me.",
  },
  {
    day: 16,
    title: "Rest for the Weary",
    scripture: {
      text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      ref: "Matthew 11:28",
    },
    reflection:
      "Busy is not the same as fruitful. Jesus invites the tired to come, not to try harder. Today, take a few quiet minutes to simply sit with Him and breathe.",
    prayer: "Jesus, I am tired. I come to You for rest.",
  },
  {
    day: 17,
    title: "He Will Guide You",
    scripture: {
      text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.",
      ref: "Psalm 32:8",
    },
    reflection:
      "God does not leave you to guess. He promises to teach and guide. Stay close enough to notice His leading, and be willing to say yes when He shows you the way.",
    prayer: "Lord, teach me the way to go. Make me sensitive to Your leading.",
  },
  {
    day: 18,
    title: "Commit Your Work",
    scripture: { text: "Commit thy works unto the LORD, and thy thoughts shall be established.", ref: "Proverbs 16:3" },
    reflection:
      "Whether it is an assignment, a business idea or a project at work, give it to God before you give it your all. Plans submitted to Him become steadier and clearer.",
    prayer: "Father, I commit my work to You. Establish my plans.",
  },
  {
    day: 19,
    title: "Work Like It Matters",
    scripture: {
      text: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men;",
      ref: "Colossians 3:23",
    },
    reflection:
      "Your effort is a form of worship. Do your tasks with excellence because your real boss is God, even when no one is watching or clapping.",
    prayer: "Lord, help me work with integrity and excellence today.",
  },
  {
    day: 20,
    title: "Working Everything for Good",
    scripture: {
      text: "And we know that all things work together for good to them that love God, to them that are the called according to his purpose.",
      ref: "Romans 8:28",
    },
    reflection:
      "This does not mean everything is good; it means God is able to weave even painful things into something good. Trust the Weaver when the threads look messy.",
    prayer: "God, I trust You to bring good out of what I do not understand.",
  },
  {
    day: 21,
    title: "Made on Purpose",
    scripture: {
      text: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.",
      ref: "Ephesians 2:10",
    },
    reflection:
      "You are God's handiwork, and He prepared good work for you before you were born. Purpose is not something you invent; it is something you walk into, one faithful step at a time.",
    prayer: "Father, show me the good works You prepared for me, and help me walk in them.",
  },
  {
    day: 22,
    title: "Better Together",
    scripture: {
      text: "Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow: but woe to him that is alone when he falleth; for he hath not another to help him up.",
      ref: "Ecclesiastes 4:9-10",
    },
    reflection:
      "Faith grows in community. Everyone stumbles; the question is whether someone is close enough to help you up. Reach out to a friend today, and be that friend for someone else.",
    prayer: "Lord, surround me with people who lift me up, and make me one who lifts others.",
  },
  {
    day: 23,
    title: "Close to the Broken-Hearted",
    scripture: {
      text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
      ref: "Psalm 34:18",
    },
    reflection:
      "If your heart is heavy today, you are not far from God. He moves toward pain, not away from it. Say honestly how you feel; He can handle it.",
    prayer: "God, my heart is heavy. Come close and heal me.",
  },
  {
    day: 24,
    title: "Chosen and Called",
    scripture: {
      text: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light:",
      ref: "1 Peter 2:9",
    },
    reflection:
      "You are chosen, not leftover. Your identity comes from God's choice, and your calling is to show others what He is like. Walk today like someone who belongs to Him.",
    prayer: "Father, thank You for choosing me. Help me live as Your own.",
  },
  {
    day: 25,
    title: "God Supplies",
    scripture: {
      text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
      ref: "Philippians 4:19",
    },
    reflection:
      "God's supply is measured by His riches, not by your bank balance. Bring your real needs to Him honestly, and trust that He knows and will provide in His way and time.",
    prayer: "Lord, You know what I need. I trust You to provide.",
  },
  {
    day: 26,
    title: "Do Not Grow Weary",
    scripture: {
      text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
      ref: "Galatians 6:9",
    },
    reflection:
      "Consistency feels slow, and the harvest is rarely immediate. Keep doing the right thing. Your seed is not wasted; the season is coming.",
    prayer: "Father, give me strength to keep going. I trust Your timing.",
  },
  {
    day: 27,
    title: "Commit Your Way",
    scripture: {
      text: "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.",
      ref: "Psalm 37:5",
    },
    reflection:
      "Committing means placing your plans in His hands and then actually leaving them there. Stop taking them back. He is able to bring it to pass.",
    prayer: "Lord, I place my way in Your hands. I trust You to bring it to pass.",
  },
  {
    day: 28,
    title: "Faith Defined",
    scripture: {
      text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      ref: "Hebrews 11:1",
    },
    reflection:
      "Faith is not pretending; it is confidence in what God has said before you can see it. Pick one promise today and choose to stand on it.",
    prayer: "God, increase my faith. Help me trust what You have promised.",
  },
  {
    day: 29,
    title: "Sharpen Each Other",
    scripture: {
      text: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
      ref: "Proverbs 27:17",
    },
    reflection:
      "The people closest to you shape who you become. Choose friendships that stretch you toward Christ, and be honest, encouraging company in return.",
    prayer: "Lord, give me friends who sharpen me, and help me sharpen them.",
  },
  {
    day: 30,
    title: "Rejoice Today",
    scripture: {
      text: "This is the day which the LORD hath made; we will rejoice and be glad in it.",
      ref: "Psalm 118:24",
    },
    reflection:
      "Joy is a choice we make in the day God gave us, not only when everything is going well. Find one thing to thank Him for right now and say it out loud.",
    prayer: "Father, I choose joy today. Thank You for this day.",
  },
  {
    day: 31,
    title: "The Lord Bless You",
    scripture: {
      text: "The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace.",
      ref: "Numbers 6:24-26",
    },
    reflection:
      "As this cycle ends, receive this blessing. May you be kept, shown favour and given peace. Tomorrow we begin again, and God will be there, too.",
    prayer: "Lord, bless me and keep me. Thank You for walking with me this month.",
  },
];

export type Affirmation = { day: number; text: string; ref: string };

export const affirmations: Affirmation[] = [
  { day: 1, text: "I am not behind. I am being prepared for what God has prepared for me.", ref: "Ephesians 2:10" },
  { day: 2, text: "God's mercy is new for me this morning.", ref: "Lamentations 3:22-23" },
  { day: 3, text: "I am chosen, loved and called by God.", ref: "1 Peter 2:9" },
  { day: 4, text: "I am fearfully and wonderfully made.", ref: "Psalm 139:14" },
  { day: 5, text: "God is with me wherever I go today.", ref: "Joshua 1:9" },
  { day: 6, text: "I have power, love and a sound mind.", ref: "2 Timothy 1:7" },
  { day: 7, text: "My peace does not depend on my circumstances.", ref: "Philippians 4:7" },
  { day: 8, text: "I am not too young to make a difference.", ref: "1 Timothy 4:12" },
  { day: 9, text: "God's favour surrounds me like a shield.", ref: "Psalm 5:12" },
  { day: 10, text: "I am the light of the world, and I shine where I am.", ref: "Matthew 5:14" },
  { day: 11, text: "God is directing my steps.", ref: "Proverbs 3:5-6" },
  { day: 12, text: "My needs are supplied by my Father.", ref: "Philippians 4:19" },
  { day: 13, text: "I am not alone. God holds me up.", ref: "Isaiah 41:10" },
  { day: 14, text: "My work has meaning because I do it for the Lord.", ref: "Colossians 3:23" },
  { day: 15, text: "I trust God's timing for my life.", ref: "Galatians 6:9" },
  { day: 16, text: "I release my worries because God cares for me.", ref: "1 Peter 5:7" },
  { day: 17, text: "My mind is being renewed every day.", ref: "Romans 12:2" },
  { day: 18, text: "I am surrounded by people who help me grow.", ref: "Proverbs 27:17" },
  { day: 19, text: "God is turning my situation around for my good.", ref: "Romans 8:28" },
  { day: 20, text: "I am more than my mistakes. I am forgiven.", ref: "Psalm 103:12" },
  { day: 21, text: "I walk in confidence, not fear.", ref: "Psalm 27:1" },
  { day: 22, text: "My future is secure in God's hands.", ref: "Jeremiah 29:11" },
  { day: 23, text: "I have enough strength for today.", ref: "Philippians 4:13" },
  { day: 24, text: "I am allowed to rest, because God is in control.", ref: "Matthew 11:28" },
  { day: 25, text: "I speak life, truth and encouragement.", ref: "Proverbs 18:21" },
  { day: 26, text: "My identity is settled in Christ.", ref: "2 Corinthians 5:17" },
  { day: 27, text: "I choose joy today.", ref: "Psalm 118:24" },
  { day: 28, text: "I am growing, even when I cannot see it.", ref: "Philippians 1:6" },
  { day: 29, text: "God's plans for me are good.", ref: "Jeremiah 29:11" },
  { day: 30, text: "I belong. I have a place in God's family.", ref: "Ephesians 2:19" },
  { day: 31, text: "I am blessed and kept by the Lord.", ref: "Numbers 6:24" },
];
