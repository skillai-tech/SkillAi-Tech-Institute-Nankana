import { Course, StudentProject, LearningPathway, BlogPost, Review, CertificateRecord, PortalStudent } from '../types';

export const INSTITUTE_INFO = {
  name: 'SKILLAI TECH INSTITUTE NANKANA',
  shortName: 'SkillAI',
  tagline: 'Future Skills for Future Leaders',
  heroSubtitle: 'Practical AI, Automation, Web Development & Digital Skills Training for All Age Groups',
  address: 'Y/272 Housing Colony, Nankana, Punjab, Pakistan',
  phone: '0301-4870303',
  phoneInternational: '+923014870303',
  email: 'skillaitechinstitutenns@gmail.com',
  whatsappUrl: 'https://wa.me/923014870303?text=Assalam%20o%20Alaikum%20SkillAI%20Institute%2C%20I%20want%20to%20inquire%20about%20admissions.',
  mapsUrl: 'https://maps.google.com/?q=Housing+Colony+Nankana+Sahib+Pakistan',
  founder: {
    name: 'Zeeshan Abdul Jabbar',
    role: 'CEO & Founder — SkillAI Tech Institute Nankana',
    credentials: [
      'MSc IT',
      'AI & ML Engineer',
      'AI Automation & Agent Developer',
      'Web Developer'
    ],
    quote: "With a passion for technology and education, I'm here to help you build real skills, gain practical experience and achieve your goals in the world of AI and digital technologies.",
    bio: 'Zeeshan Abdul Jabbar is a seasoned technologist, MSc IT, and AI & Machine Learning engineer. With deep expertise in autonomous Agentic workflows, full-stack architectures, and modern LLM frameworks, he established SkillAI Tech Institute Nankana to pioneer project-based tech education and prepare Pakistani youth for remote careers and freelance leadership.'
  },
  paymentDetails: {
    jazzcash: {
      accountTitle: 'Zeeshan Abdul Jabbar',
      accountNumber: '0301-4870303',
      bankName: 'Mobilink Microfinance Bank / JazzCash'
    },
    easypaisa: {
      accountTitle: 'Zeeshan Abdul Jabbar',
      accountNumber: '0301-4870303',
      bankName: 'Telenor Microfinance Bank / EasyPaisa'
    },
    bankTransfer: {
      bankName: 'Meezan Bank Limited',
      accountTitle: 'SkillAI Tech Institute / Zeeshan Abdul Jabbar',
      accountNumber: '0281-0105678942',
      iban: 'PK52MEZN0002810105678942',
      branch: 'Nankana Sahib Branch'
    }
  }
};

export const COURSES: Course[] = [
  // AI & Automation
  {
    id: 'agentic-ai-automation',
    title: 'Agentic AI & Automation',
    tagline: 'Autonomous AI Agents, Workflows & Next-Gen Automation',
    description: 'Master how to build autonomous AI agents, multi-agent frameworks, API orchestrations, and production automations that replace manual business workflows.',
    duration: '3 Months',
    level: 'Beginner → Professional',
    mode: 'Online + Physical',
    fee: 'PKR 15,000 / month',
    feePKR: 15000,
    theoryPercentage: 30,
    practicalPercentage: 70,
    iconName: 'Bot',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    color: 'from-cyan-500 to-blue-600',
    popular: true,
    prerequisites: 'Basic computer literacy & enthusiasm to learn. No prior coding experience required.',
    certification: 'Certified Agentic AI & Automation Specialist (SkillAI)',
    skillsList: [
      'Python for AI',
      'Prompt Engineering',
      'OpenAI & Gemini APIs',
      'n8n & Make Automation',
      'LangChain & LangGraph',
      'CrewAI Multi-Agents',
      'Model Context Protocol (MCP)',
      'RAG & Vector Databases',
      'AI Chatbots & Voice Bots',
      'Google Sheets Automation',
      'WhatsApp Business Automation',
      'Autonomous Web Scrapers'
    ],
    realProjects: [
      'Customer Support AI Agent',
      'WhatsApp AI Chatbot',
      'Voice AI Agent for Phone Calls',
      'RAG Knowledge Assistant for Documents',
      'Lead Generation & Qualification Agent',
      'Appointment Booking & Scheduling Agent'
    ],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Core AI, Prompt Crafting & API Integration',
        topics: [
          'Foundations of LLMs, tokens, and temperature',
          'Advanced Prompt Engineering & Chain-of-Thought',
          'Consuming OpenAI, Gemini & Anthropic APIs',
          'Function Calling and Structured JSON Outputs'
        ]
      },
      {
        week: 'Month 2',
        title: 'Building Autonomous AI Agents & Workflows',
        topics: [
          'LangChain & LangGraph agent state machines',
          'CrewAI: Coordinating multiple autonomous agents',
          'Model Context Protocol (MCP) integrations',
          'Building custom RAG search over PDF manuals'
        ]
      },
      {
        week: 'Month 3',
        title: 'Enterprise Automation, WhatsApp & Capstones',
        topics: [
          'n8n self-hosted workflows & webhooks',
          'WhatsApp Business API automated customer flows',
          'Google Sheets & CRM bidirectional synchronization',
          'Deploying production agents to cloud & Docker'
        ]
      }
    ]
  },
  {
    id: 'ai-chatbot-voice',
    title: 'AI Chatbot & Voice Agent',
    tagline: 'Conversational Systems, Voiceflow & Real-time Telephony',
    description: 'Create conversational chatbots and human-like voice agents for customer care, lead qualification, and clinic bookings.',
    duration: '2 Months',
    level: 'Beginner → Intermediate',
    mode: 'Online + Physical',
    fee: 'PKR 10,000 / month',
    feePKR: 10000,
    theoryPercentage: 20,
    practicalPercentage: 80,
    iconName: 'Mic',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    color: 'from-purple-500 to-indigo-600',
    popular: true,
    prerequisites: 'Basic computer understanding.',
    certification: 'Certified Conversational AI Developer',
    skillsList: ['Voiceflow', 'Botpress', 'ElevenLabs', 'Bland AI', 'Twilio API', 'WhatsApp Bot', 'OpenAI Realtime API'],
    realProjects: ['Urdu/English WhatsApp Assistant', 'Dental Clinic Phone Booking Bot', 'E-Commerce Order Status Bot'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Flow-Based Chatbots & Knowledge Retrieval',
        topics: ['Visual bot design with Voiceflow', 'Knowledge bases & context extraction', 'WhatsApp cloud integration', 'Live human agent handover']
      },
      {
        week: 'Month 2',
        title: 'Voice AI, Low-Latency Telephony & Bland AI',
        topics: ['Speech-to-text and ultra-low latency TTS', 'Connecting Twilio phone numbers', 'Cold call and incoming hotline voice agents', 'Call recording & sentiment analytics']
      }
    ]
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    tagline: 'The Foundation of AI, Data & Automation',
    description: 'Master Python from basics to advanced with real-world algorithms, web scrapers, task automations, and backend logic.',
    duration: '3 Months',
    level: 'Beginner → Intermediate',
    mode: 'Online + Physical',
    fee: 'PKR 9,000 / month',
    feePKR: 9000,
    theoryPercentage: 25,
    practicalPercentage: 75,
    iconName: 'Terminal',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    color: 'from-amber-400 to-yellow-600',
    popular: false,
    prerequisites: 'None. Absolute beginner friendly.',
    certification: 'Professional Python Specialist Certification',
    skillsList: ['Python Syntax', 'OOP', 'Data Structures', 'BeautifulSoup', 'Selenium', 'Requests API', 'SQLite'],
    realProjects: ['Automated PDF & Excel Reporting Tool', 'OLX/Daraz Price Scraper', 'Desktop Automation GUI'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Python Syntax & Logic Building',
        topics: ['Data types, loops, conditionals, functions', 'OOP: Classes, inheritance, encapsulation', 'File handling, error trapping & debugging', 'Algorithmic problem solving']
      },
      {
        week: 'Month 2',
        title: 'Automation & Web Data Harvesting',
        topics: ['Automating file management and emails', 'Web scraping with BeautifulSoup & Selenium', 'Parsing JSON REST APIs', 'Storing data in SQLite/PostgreSQL']
      },
      {
        week: 'Month 3',
        title: 'Applied Python & AI Libraries',
        topics: ['NumPy and Pandas basics', 'Building desktop apps with CustomTkinter', 'Intro to FastAPI microservices', 'Final Capstone Project']
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    tagline: 'Predictive Modeling & Statistical AI',
    description: 'Build predictive machine learning models using Scikit-Learn, Pandas, regression, classification, and neural network algorithms.',
    duration: '3 Months',
    level: 'Intermediate → Advanced',
    mode: 'Online + Physical',
    fee: 'PKR 14,000 / month',
    feePKR: 14000,
    theoryPercentage: 35,
    practicalPercentage: 65,
    iconName: 'Cpu',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    color: 'from-cyan-400 to-indigo-500',
    popular: false,
    prerequisites: 'Basic Python knowledge recommended.',
    certification: 'Certified Machine Learning Practitioner',
    skillsList: ['Scikit-Learn', 'Pandas', 'NumPy', 'Supervised Learning', 'Unsupervised Clustering', 'Model Tuning'],
    realProjects: ['Real Estate Price Predictor', 'Customer Churn Classification Model', 'Fraud Detection System'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Data Preparation & Exploratory Analysis',
        topics: ['Feature engineering and scaling', 'Data cleaning with Pandas', 'Matplotlib and Seaborn statistical plots', 'Hypothesis testing']
      },
      {
        week: 'Month 2',
        title: 'Supervised & Unsupervised Algorithms',
        topics: ['Linear & Logistic Regression', 'Decision Trees and Random Forests', 'K-Means clustering and PCA', 'Cross-validation and hyperparameter tuning']
      },
      {
        week: 'Month 3',
        title: 'Model Deployment & APIs',
        topics: ['Saving models with Joblib/Pickle', 'Wrapping ML models in FastAPI endpoints', 'Deploying ML services to cloud', 'Capstone ML presentation']
      }
    ]
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning & Neural Networks',
    tagline: 'Computer Vision & Natural Language Processing',
    description: 'Dive deep into neural networks, PyTorch, Convolutional Neural Networks (CNNs), and Transformers for image and text recognition.',
    duration: '3 Months',
    level: 'Intermediate → Advanced',
    mode: 'Online + Physical',
    fee: 'PKR 16,000 / month',
    feePKR: 16000,
    theoryPercentage: 40,
    practicalPercentage: 60,
    iconName: 'Brain',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    color: 'from-violet-500 to-purple-700',
    popular: false,
    prerequisites: 'Python and basic Math.',
    certification: 'Certified Deep Learning Specialist',
    skillsList: ['PyTorch', 'TensorFlow', 'CNNs', 'Transfer Learning', 'Hugging Face', 'Transformers'],
    realProjects: ['Medical X-Ray Classifier', 'Custom Object Detection with YOLO', 'Sentiment Classifier with BERT'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Perceptrons & Neural Network Foundations',
        topics: ['Backpropagation and gradient descent', 'Activation functions and loss metrics', 'Building neural nets with PyTorch', 'Preventing overfitting']
      },
      {
        week: 'Month 2',
        title: 'Computer Vision & CNNs',
        topics: ['Convolution layers and Pooling', 'Transfer learning with ResNet', 'Object detection with YOLOv8', 'Data augmentation techniques']
      },
      {
        week: 'Month 3',
        title: 'NLP, Transformers & Hugging Face',
        topics: ['Embeddings and Attention mechanisms', 'Fine-tuning models on Hugging Face', 'Inference optimization', 'Full capstone project']
      }
    ]
  },

  // Development
  {
    id: 'fullstack-web',
    title: 'Full Stack Web Development',
    tagline: 'Build Scalable Web Apps with MERN Stack',
    description: 'Build modern responsive websites and enterprise applications with React, Node.js, Express, MongoDB, and Tailwind CSS.',
    duration: '6 Months',
    level: 'Beginner → Advanced',
    mode: 'Online + Physical',
    fee: 'PKR 12,000 / month',
    feePKR: 12000,
    theoryPercentage: 20,
    practicalPercentage: 80,
    iconName: 'Layers',
    category: 'development',
    categoryLabel: 'Development',
    color: 'from-blue-500 to-cyan-500',
    popular: true,
    prerequisites: 'Basic computer understanding.',
    certification: 'Full Stack MERN Developer Diploma',
    skillsList: ['HTML5 & CSS3', 'Tailwind CSS', 'JavaScript ES6+', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
    realProjects: ['Multi-Vendor E-Commerce Platform', 'Institute Management System (LMS)', 'Real-Time Chat Application'],
    syllabus: [
      {
        week: 'Month 1-2',
        title: 'Modern Frontend & Responsive UI Design',
        topics: ['Semantic HTML5, CSS Flexbox and Grid', 'Tailwind CSS for ultra-fast UI design', 'Modern JavaScript ES6+, Async/Await', 'DOM APIs & interactive widgets']
      },
      {
        week: 'Month 3-4',
        title: 'React & Component Architecture',
        topics: ['React Hooks, Router, and Context API', 'API consumption with Axios/Fetch', 'State management with Zustand', 'Building full single-page apps']
      },
      {
        week: 'Month 5-6',
        title: 'Node.js Backend, MongoDB & Cloud Deployment',
        topics: ['Express.js RESTful routing architecture', 'MongoDB Atlas schema design & Mongoose', 'Authentication with JWT and bcrypt', 'Deploying to Vercel and Render']
      }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    tagline: 'Cross-Platform iOS & Android Apps with Flutter',
    description: 'Create beautiful, native-performance iOS and Android mobile apps using Flutter, Dart, and Firebase real-time database.',
    duration: '4 Months',
    level: 'Beginner → Intermediate',
    mode: 'Online + Physical',
    fee: 'PKR 10,000 / month',
    feePKR: 10000,
    theoryPercentage: 25,
    practicalPercentage: 75,
    iconName: 'Smartphone',
    category: 'development',
    categoryLabel: 'Development',
    color: 'from-pink-500 to-rose-600',
    popular: false,
    prerequisites: 'Basic programming mindset.',
    certification: 'Certified Flutter Mobile App Engineer',
    skillsList: ['Dart Language', 'Flutter Framework', 'Provider State', 'Firebase Auth', 'Firestore', 'REST APIs', 'Google Play Deploy'],
    realProjects: ['Ride-Booking / Courier App', 'Food Delivery Tracking App', 'E-Commerce Shopping App with Cart'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Dart Syntax & Flutter Widget Tree',
        topics: ['Dart fundamentals, null safety & OOP', 'Stateless vs Stateful widgets', 'Responsive layout builder & themes', 'Navigation and form validations']
      },
      {
        week: 'Month 2',
        title: 'State Management & Offline Storage',
        topics: ['State management with Provider/Riverpod', 'Offline data persistence with Hive', 'Camera, GPS, and device permissions', 'Custom animations in Flutter']
      },
      {
        week: 'Month 3-4',
        title: 'Backend Integration & App Store Prep',
        topics: ['Firebase Auth, Firestore & Cloud Storage', 'Consuming external REST APIs', 'Push notifications with FCM', 'Compiling APKs & Play Store release']
      }
    ]
  },
  {
    id: 'mern-stack-specialization',
    title: 'MERN Stack Specialization',
    tagline: 'High-Performance Backend & Database Architecture',
    description: 'Focused intensive program on advanced MongoDB aggregates, Express middleware, React 19 server components, and Node.js microservices.',
    duration: '4 Months',
    level: 'Intermediate → Advanced',
    mode: 'Online + Physical',
    fee: 'PKR 11,000 / month',
    feePKR: 11000,
    theoryPercentage: 20,
    practicalPercentage: 80,
    iconName: 'Globe',
    category: 'development',
    categoryLabel: 'Development',
    color: 'from-emerald-500 to-teal-600',
    popular: false,
    prerequisites: 'HTML, CSS, JavaScript foundations.',
    certification: 'Advanced MERN Stack Architect Certificate',
    skillsList: ['MongoDB Aggregations', 'Express Middleware', 'React 19', 'Next.js Basics', 'Socket.io', 'Docker Basics'],
    realProjects: ['Collaborative Kanban Board', 'Real-time Auction Platform', 'SaaS Subscription Billing System'],
    syllabus: [
      {
        week: 'Month 1-2',
        title: 'Advanced React & Architecture Patterns',
        topics: ['Custom hooks and compound components', 'Optimistic UI updates', 'State machines and performance profiling', 'SSR vs CSR tradeoffs']
      },
      {
        week: 'Month 3-4',
        title: 'Enterprise Backend & WebSockets',
        topics: ['Real-time bi-directional events with Socket.io', 'Complex aggregation pipelines in MongoDB', 'Rate limiting, caching with Redis', 'Microservices vs Monoliths']
      }
    ]
  },

  // Data
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    tagline: 'Turn Raw Data into Executive Business Intelligence',
    description: 'Master Excel Power Query, SQL databases, Power BI dashboards, and data visualization to land high-paying remote analytics roles.',
    duration: '3 Months',
    level: 'Beginner → Intermediate',
    mode: 'Online + Physical',
    fee: 'PKR 9,500 / month',
    feePKR: 9500,
    theoryPercentage: 20,
    practicalPercentage: 80,
    iconName: 'BarChart3',
    category: 'data',
    categoryLabel: 'Data',
    color: 'from-emerald-400 to-teal-600',
    popular: false,
    prerequisites: 'Basic math and computer literacy.',
    certification: 'Certified Power BI & Data Analyst (SkillAI)',
    skillsList: ['Advanced Excel', 'SQL Queries', 'Power BI', 'DAX Measures', 'Data Modeling', 'Python Pandas', 'KPI Dashboards'],
    realProjects: ['Retail Sales Performance Dashboard', 'Supply Chain Inventory Tracker', 'Financial P&L Forecasting Visualizer'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Advanced Excel & Relational SQL',
        topics: ['Power Query transformations & XLOOKUP', 'Writing SQL SELECT, JOIN, GROUP BY, HAVING', 'Data cleaning, formatting and deduplication', 'Designing relational schemas']
      },
      {
        week: 'Month 2',
        title: 'Power BI & DAX Intelligence',
        topics: ['Importing diverse data sources', 'Star schema data modeling', 'Writing DAX measures and calculated columns', 'Interactive filter panels & drill-downs']
      },
      {
        week: 'Month 3',
        title: 'Python for Analytics & Executive Reporting',
        topics: ['Pandas for tabular data wrangling', 'Seaborn & Plotly visualizations', 'Executive presentation design', 'Comprehensive client capstone']
      }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science with Python',
    tagline: 'Statistical Analysis, Machine Learning & Big Data',
    description: 'Comprehensive program covering statistical inference, machine learning algorithms, Pandas, feature engineering, and data storytelling.',
    duration: '4 Months',
    level: 'Intermediate → Advanced',
    mode: 'Online + Physical',
    fee: 'PKR 14,000 / month',
    feePKR: 14000,
    theoryPercentage: 30,
    practicalPercentage: 70,
    iconName: 'Database',
    category: 'data',
    categoryLabel: 'Data',
    color: 'from-blue-600 to-indigo-700',
    popular: false,
    prerequisites: 'Python and basic statistics.',
    certification: 'Certified Professional Data Scientist',
    skillsList: ['Python', 'Pandas', 'Statsmodels', 'Scikit-Learn', 'Feature Engineering', 'Jupyter Lab', 'Streamlit'],
    realProjects: ['Loan Default Risk Predictor', 'Customer Lifetime Value Analysis', 'Healthcare Diagnostics Analysis'],
    syllabus: [
      {
        week: 'Month 1-2',
        title: 'Probability, Statistics & Exploratory Data Analysis',
        topics: ['Distributions, Central Limit Theorem, p-values', 'Advanced Pandas wrangling', 'Outlier detection and missing value imputation', 'Data storytelling']
      },
      {
        week: 'Month 3-4',
        title: 'Applied Machine Learning & Interactive Apps',
        topics: ['Classification and regression algorithms', 'Hyperparameter tuning and cross validation', 'Building data apps with Streamlit', 'Production model presentation']
      }
    ]
  },

  // Digital Skills
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing & AI',
    tagline: 'Grow Brands, Run Profitable Ads & Automate Campaigns',
    description: 'Learn modern Meta (Facebook & Instagram) ads, TikTok marketing, Google ads, copy generation with AI, and freelance client acquisition.',
    duration: '2 Months',
    level: 'Beginner → Intermediate',
    mode: 'Online + Physical',
    fee: 'PKR 8,000 / month',
    feePKR: 8000,
    theoryPercentage: 20,
    practicalPercentage: 80,
    iconName: 'Share2',
    category: 'digital',
    categoryLabel: 'Digital Skills',
    color: 'from-pink-500 to-rose-500',
    popular: false,
    prerequisites: 'Basic smartphone & internet knowledge.',
    certification: 'Certified Digital Media & Ads Strategist',
    skillsList: ['Meta Ads Manager', 'TikTok Ads', 'Canva Design', 'ChatGPT Copywriting', 'Target Audience Research', 'Fiverr/Upwork Launch'],
    realProjects: ['Live E-commerce Ad Campaign with ROAS Tracking', 'Local Brand Social Media Calendar', 'Freelancer Client Pitch Deck'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Organic Growth, Content Strategy & AI Design',
        topics: ['Brand positioning and content pillars', 'Prompt engineering for high-converting copy', 'Canva graphic & video creation', 'Instagram Reels & TikTok algorithm mastery']
      },
      {
        week: 'Month 2',
        title: 'Paid Advertising (Meta & TikTok) & Freelancing',
        topics: ['Setting up Meta Pixel & Custom Audiences', 'Running traffic, leads & sales campaigns', 'A/B testing ad creatives and copy', 'Finding international clients on Upwork/Fiverr']
      }
    ]
  },
  {
    id: 'youtube-automation',
    title: 'YouTube Automation & AI Channels',
    tagline: 'Build Faceless Channels that Generate Passive Income',
    description: 'Discover how to create profitable faceless YouTube channels using AI scriptwriting, voice generation, automated video editing, and SEO.',
    duration: '2 Months',
    level: 'Beginner → Intermediate',
    mode: 'Online + Physical',
    fee: 'PKR 8,500 / month',
    feePKR: 8500,
    theoryPercentage: 20,
    practicalPercentage: 80,
    iconName: 'Video',
    category: 'digital',
    categoryLabel: 'Digital Skills',
    color: 'from-red-500 to-orange-500',
    popular: false,
    prerequisites: 'Computer with internet connection.',
    certification: 'Certified YouTube Automation Specialist',
    skillsList: ['Niche Selection', 'ChatGPT Scripting', 'ElevenLabs Voiceover', 'CapCut Editing', 'Thumbnail Design', 'YouTube SEO'],
    realProjects: ['Complete Monetization-Ready Faceless Channel', 'Viral Short Form Content Pipeline', 'High CTR Thumbnail System'],
    syllabus: [
      {
        week: 'Month 1',
        title: 'Niche Research, Channel Setup & AI Scripts',
        topics: ['High CPM niches (Finance, Tech, History)', 'Crafting viral hooks with ChatGPT/Claude', 'Generating ultra-realistic voiceovers with ElevenLabs', 'Channel branding and SEO setup']
      },
      {
        week: 'Month 2',
        title: 'Editing Automation, Thumbnails & Monetization',
        topics: ['B-roll sourcing and CapCut automated editing', 'Designing 10%+ CTR thumbnails in Photoshop/Canva', 'YouTube analytics & upload scheduling', 'Monetization through Ads, Affiliates & Sponsorships']
      }
    ]
  },
  {
    id: 'ai-for-everyone',
    title: 'AI for Everyone & Office Productivity',
    tagline: '10x Your Productivity at Work and Study with AI',
    description: 'A 1-month crash course for students, office workers, teachers, and business owners to master modern AI tools for daily tasks.',
    duration: '1 Month',
    level: 'Absolute Beginner',
    mode: 'Online + Physical',
    fee: 'PKR 6,000 Total',
    feePKR: 6000,
    theoryPercentage: 15,
    practicalPercentage: 85,
    iconName: 'Sparkles',
    category: 'digital',
    categoryLabel: 'Digital Skills',
    color: 'from-yellow-400 to-amber-500',
    popular: false,
    prerequisites: 'None.',
    certification: 'Certificate of Competence in AI Productivity',
    skillsList: ['ChatGPT & Gemini', 'Gamma Presentations', 'Excel AI Plugins', 'Canva Magic Studio', 'Email Automation', 'Document Summarization'],
    realProjects: ['Complete Professional Business Presentation in 10 mins', 'Automated Daily Email & Report Workflow', 'Personal Study Revision Bot'],
    syllabus: [
      {
        week: 'Week 1-2',
        title: 'Daily Productivity & Document Mastery',
        topics: ['ChatGPT, Gemini, and Claude for drafting letters', 'Summarizing 50-page PDFs in seconds', 'Writing formulas in Excel with AI', 'Creating PowerPoint decks in Gamma']
      },
      {
        week: 'Week 3-4',
        title: 'Visuals, Audio & Workflow Shortcuts',
        topics: ['Generating business images with Midjourney/Ideogram', 'AI voice cloning and meeting transcription', 'Automating simple tasks with Zapier', 'Best practices for safe AI usage']
      }
    ]
  }
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'AI Chatbot',
    studentName: 'Ali Raza',
    studentRole: 'Student, Batch 3',
    course: 'AI Chatbot & Voice Agent',
    category: 'ai',
    summary: 'An intelligent customer onboarding & support bot integrated with WhatsApp and website widgets for local retail businesses.',
    techStack: ['Voiceflow', 'OpenAI API', 'WhatsApp API', 'Node.js'],
    demoType: 'chatbot',
    previewDetails: {
      highlight: 'Reduced customer support inquiry response time from 35 minutes to 3 seconds.',
      features: [
        'Automated product inventory query answering',
        '24/7 multilingual Urdu/English support',
        'Direct order confirmation and CRM sync'
      ],
      metrics: '3,200+ chats resolved autonomously'
    }
  },
  {
    id: 'proj-2',
    title: 'Voice AI Agent',
    studentName: 'Sara Khan',
    studentRole: 'Student, Batch 2',
    course: 'Agentic AI & Automation',
    category: 'ai',
    summary: 'Autonomous voice agent designed for medical clinic appointment bookings with ultra-low latency conversational capabilities.',
    techStack: ['ElevenLabs', 'Bland AI', 'Twilio', 'FastAPI'],
    demoType: 'voice',
    previewDetails: {
      highlight: 'Handles incoming telephone inquiries with natural human tone and dynamic scheduling.',
      features: [
        'Real-time doctor calendar appointment locking',
        'Interactive speech detection and barge-in handling',
        'Automated SMS appointment confirmation'
      ],
      metrics: '450+ test calls processed with 98% accuracy'
    }
  },
  {
    id: 'proj-3',
    title: 'Business Website',
    studentName: 'Ahmed Shah',
    studentRole: 'Student, Batch 4',
    course: 'Full Stack Web Development',
    category: 'web',
    summary: 'High-performance modern e-commerce storefront for an artisanal goods retailer with instant search and secure checkout.',
    techStack: ['React', 'Tailwind CSS', 'Express', 'MongoDB'],
    demoType: 'web',
    previewDetails: {
      highlight: 'Lighthouse score 98/100 with sub-second page loads and mobile-first responsive layout.',
      features: [
        'Dynamic product filter & live cart preview',
        'Admin dashboard with inventory and orders view',
        'Integrated local payment verification'
      ],
      metrics: 'Production live client project'
    }
  },
  {
    id: 'proj-4',
    title: 'Power BI Dashboard',
    studentName: 'Hamza Ali',
    studentRole: 'Student, Batch 3',
    course: 'Data Analytics',
    category: 'data',
    summary: 'Executive sales performance and financial forecasting dashboard created for a regional distribution company.',
    techStack: ['Power BI', 'SQL Server', 'DAX', 'Excel'],
    demoType: 'dashboard',
    previewDetails: {
      highlight: 'Automated 12 manual weekly spreadsheets into a single unified real-time dashboard.',
      features: [
        'Regional sales map with drill-through analytics',
        'Profit margin and inventory turnover ratios',
        'Year-over-Year revenue forecasting trends'
      ],
      metrics: 'Saved 14 hours of weekly reporting time'
    }
  },
  {
    id: 'proj-5',
    title: 'n8n Automation',
    studentName: 'Ayesha Noor',
    studentRole: 'Student, Batch 1',
    course: 'Agentic AI & Automation',
    category: 'automation',
    summary: 'Full-cycle autonomous lead generation and qualification pipeline combining web scrapers, AI summarizer, and CRM automations.',
    techStack: ['n8n', 'Gemini AI', 'Airtable', 'Telegram Bot'],
    demoType: 'workflow',
    previewDetails: {
      highlight: 'Harvests leads, filters high-intent prospects via LLM evaluation, and alerts sales reps instantly.',
      features: [
        'Automated web scraping and sentiment analysis',
        'Custom prompt evaluation for lead scoring (A/B/C)',
        'Auto-drafted personalized cold emails'
      ],
      metrics: '500+ daily leads evaluated autonomously'
    }
  },
  {
    id: 'proj-6',
    title: 'Cross-Platform Delivery App',
    studentName: 'Usman Tariq',
    studentRole: 'Student, Batch 2',
    course: 'Mobile App Development',
    category: 'mobile',
    summary: 'Flutter mobile application for local parcel delivery with real-time driver tracking and push notifications.',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
    demoType: 'mobile',
    previewDetails: {
      highlight: 'Built and deployed to Android test devices with 60 FPS buttery smooth UI.',
      features: [
        'Real-time courier geolocation live on map',
        'OTP phone verification and payment integration',
        'Order history and ratings module'
      ],
      metrics: 'Cross-platform Android & iOS compatible'
    }
  }
];

export const CERTIFICATES_DATABASE: CertificateRecord[] = [
  {
    id: 'SKILLAI-2026-00125',
    studentName: 'Muhammad Ali',
    fatherName: 'Tariq Mehmood',
    courseTitle: 'Agentic AI & Automation',
    completionDate: 'September 2026',
    issueDate: 'September 25, 2026',
    grade: 'A+ (Distinction)',
    instructor: 'Zeeshan Abdul Jabbar',
    status: 'verified'
  },
  {
    id: 'SKILLAI-2026-00126',
    studentName: 'Sara Khan',
    fatherName: 'Muhammad Khan',
    courseTitle: 'Full Stack Web Development',
    completionDate: 'August 2026',
    issueDate: 'August 28, 2026',
    grade: 'A (Excellent)',
    instructor: 'Zeeshan Abdul Jabbar',
    status: 'verified'
  },
  {
    id: 'SKILLAI-2026-00127',
    studentName: 'Hamza Ali',
    fatherName: 'Liaqat Ali',
    courseTitle: 'Python Programming',
    completionDate: 'July 2026',
    issueDate: 'July 30, 2026',
    grade: 'A+ (Distinction)',
    instructor: 'Zeeshan Abdul Jabbar',
    status: 'verified'
  },
  {
    id: 'SKILLAI-2026-00128',
    studentName: 'Ayesha Noor',
    fatherName: 'Noor Muhammad',
    courseTitle: 'AI Chatbot & Voice Agent',
    completionDate: 'August 2026',
    issueDate: 'August 15, 2026',
    grade: 'A+ (Distinction)',
    instructor: 'Zeeshan Abdul Jabbar',
    status: 'verified'
  }
];

export const DEMO_PORTAL_STUDENT: Record<string, any> = {
  name: 'Muhammad Ali',
  studentId: 'SKL-2026-042',
  email: 'student@skillai.pk',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  enrolledCourse: 'Agentic AI & Automation',
  progressPercent: 68,
  attendancePercent: 94,
  feeStatus: 'Paid',
  nextClass: 'Today at 5:00 PM (Lab 1 & Zoom)',
  nextClassLink: 'https://zoom.us/j/skillai-batch4',
  recentRecordings: [
    {
      id: 'rec-1',
      title: 'Class 18: Multi-Agent Workflows with CrewAI & LangGraph',
      date: 'Sep 25, 2026',
      duration: '1 hr 45 min',
      instructor: 'Zeeshan Abdul Jabbar'
    },
    {
      id: 'rec-2',
      title: 'Class 17: Model Context Protocol (MCP) & Local Tools',
      date: 'Sep 23, 2026',
      duration: '1 hr 30 min',
      instructor: 'Zeeshan Abdul Jabbar'
    },
    {
      id: 'rec-3',
      title: 'Class 16: Building Custom RAG Search with Vector Embeddings',
      date: 'Sep 20, 2026',
      duration: '2 hr 00 min',
      instructor: 'Zeeshan Abdul Jabbar'
    }
  ],
  assignments: [
    {
      id: 'asg-1',
      title: 'Assignment 4: WhatsApp Lead Bot with n8n Webhook',
      dueDate: 'Sep 30, 2026',
      status: 'Submitted',
      submission: {
        submittedAt: 'Sep 28, 2026',
        score: '98/100',
        feedback: 'Excellent webhook implementation.'
      }
    },
    {
      id: 'asg-2',
      title: 'Assignment 5: Autonomous Medical Appointment Booking Agent',
      dueDate: 'Oct 05, 2026',
      status: 'Submitted',
      submission: {
        submittedAt: 'Oct 01, 2026',
        score: 'Pending Review'
      }
    }
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'Certificate of Competence in Python & LLM Prompting',
      issueDate: 'August 2026',
      credentialId: 'SKILLAI-2026-00125',
      grade: 'A+ (Distinction)'
    }
  ]
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'what-is-ai',
    title: 'What is Artificial Intelligence?',
    date: 'Aug 20, 2026',
    readTime: '4 min read',
    category: 'Foundations',
    summary: 'A simple, clear guide explaining how neural networks, machine learning, and generative AI are transforming modern careers in Pakistan.',
    content: [
      'Artificial Intelligence (AI) has transitioned from research laboratories into the foundation of modern technology and global businesses.',
      'At SkillAI Tech Institute Nankana, we teach practical AI rather than mere theoretical definitions. Understanding how large language models (LLMs) and neural networks work empowers students to automate workflows, build client solutions, and launch freelance careers.',
      'Whether you are automating administrative paperwork or generating voice agents, AI literacy has become the single most valuable skill in Pakistan today.'
    ]
  },
  {
    id: 'what-is-agentic-ai',
    title: 'What is Agentic AI?',
    date: 'Aug 18, 2026',
    readTime: '5 min read',
    category: 'Trends',
    summary: 'Discover how AI is moving beyond passive chat windows into autonomous agents that can plan, reason, and execute complex goals.',
    content: [
      'While standard generative AI requires a prompt for every single step, Agentic AI introduces autonomous decision-making loops.',
      'An agent can receive a high-level goal such as: "Research the top 10 solar suppliers in Lahore, verify their prices, and compile a comparative spreadsheet," and execute every single step without human intervention.',
      'Our students at SkillAI learn how to build, test, and deploy multi-agent systems using frameworks like CrewAI, LangGraph, and Model Context Protocol (MCP).'
    ]
  },
  {
    id: 'what-is-n8n',
    title: 'What is n8n and Why is it Essential for Automations?',
    date: 'Aug 16, 2026',
    readTime: '5 min read',
    category: 'Automation',
    summary: 'Learn how self-hosted n8n workflows connect WhatsApp, Google Sheets, AI models, and CRMs without writing thousands of lines of boilerplate code.',
    content: [
      'n8n is an open-source, node-based workflow automation tool that enables seamless integration between hundreds of web services.',
      'Unlike expensive alternatives like Zapier, n8n can be hosted on your own server for near-zero cost, handling thousands of webhook executions per day.',
      'In our Agentic AI course, we train students to build end-to-end client automations with n8n, fetching leads from Facebook Ads, evaluating them with Gemini AI, and sending instant WhatsApp confirmations.'
    ]
  },
  {
    id: 'ai-automation-kya-hai',
    title: 'AI Automation Kya Hai? (Complete Urdu Guide)',
    date: 'Aug 15, 2026',
    readTime: '6 min read',
    category: 'Urdu Guide',
    summary: 'AI Automation ki bunyadi wazahat, Pakistani nojawanon ke liye career opportunities, aur freelancing ke naye raaste.',
    content: [
      'AI Automation ka matlab hai ke computer systems ko aisi salahiyat dena ke woh insani dakhlandazi ke baghair mushkil kaam anjam de sakein.',
      'Pakistani businesses aur international clients dono hi ab AI workflows chahte hain jahan emails, WhatsApp messages, aur leads automatically handle ho sakein.',
      'SkillAI Institute Nankana mein hum Urdu aur English dono mein practical tareeqe se sikhate hain taakay har student baasaani seekh kar earn kar sakay.'
    ]
  },
  {
    id: 'how-to-become-ai-engineer',
    title: 'How to become an AI Engineer?',
    date: 'Aug 12, 2026',
    readTime: '7 min read',
    category: 'Career Roadmap',
    summary: 'A step-by-step roadmap from zero coding knowledge to landing remote client work and engineering roles in artificial intelligence.',
    content: [
      'Step 1: Solidify your foundation in Python programming and problem-solving logic.',
      'Step 2: Learn modern AI SDKs and API integration (Gemini API, OpenAI API, Anthropic).',
      'Step 3: Master Retrieval-Augmented Generation (RAG) and vector databases.',
      'Step 4: Build at least 3 deployable production-grade portfolio projects.',
      'At SkillAI, we guide you through each of these milestones with 1-on-1 mentorship.'
    ]
  },
  {
    id: 'ai-careers-pakistan',
    title: 'AI Careers in Pakistan: High Demand Skills for 2026',
    date: 'Aug 10, 2026',
    readTime: '6 min read',
    category: 'Career Guide',
    summary: 'Remote freelancing, software houses in Lahore & Islamabad, and international agency contracts looking for Pakistani AI talent.',
    content: [
      'The Pakistani tech ecosystem is witnessing a historic shift towards automation and AI integration.',
      'Traditional web developers are now upgrading their skillsets with LLM API engineering, vector databases, and multi-agent workflows to command 3x higher salaries.',
      'SkillAI provides dedicated freelancing launchpads on Upwork and Fiverr so our students can start billing international clients in USD.'
    ]
  },
  {
    id: 'what-is-rag',
    title: 'What is RAG (Retrieval-Augmented Generation)?',
    date: 'Aug 05, 2026',
    readTime: '5 min read',
    category: 'Technical',
    summary: 'How to connect your private company documents and PDFs to AI models without hallucination or training from scratch.',
    content: [
      'RAG allows language models to look up relevant facts from a custom private knowledge base before answering a question.',
      'Instead of re-training a multi-billion parameter model, we convert business manuals, product catalogs, and policies into vector embeddings.',
      'Our students build real RAG assistants for local clinics, schools, and online stores.'
    ]
  },
  {
    id: 'ai-agents-vs-chatbots',
    title: 'AI Agents vs Traditional Chatbots: What is the Difference?',
    date: 'Aug 01, 2026',
    readTime: '4 min read',
    category: 'Concepts',
    summary: 'Why rule-based chatbots are dying and how autonomous agents with tool-calling are redefining digital assistance.',
    content: [
      'Traditional chatbots follow a fixed decision tree: "Press 1 for Sales, Press 2 for Support". If the user asks something unexpected, the bot fails.',
      'In contrast, modern AI Agents possess reasoning abilities, can browse the web, execute database queries, and make autonomous decisions to satisfy complex user queries.',
      'Discover why Agentic AI is the most requested skill on freelance marketplaces.'
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    studentName: 'Ahmed Raza',
    course: 'Agentic AI & Automation',
    rating: 5,
    comment: 'SkillAI ne mujhe AI automation ko practical projects ke through seekhne ka mauqa diya. Highly recommended!',
    avatarBg: 'bg-cyan-600',
    city: 'Nankana Sahib'
  },
  {
    id: 'rev-2',
    studentName: 'Sara Khan',
    course: 'Full Stack Web Development',
    rating: 5,
    comment: 'Best institute in Nankana! Teachers are supportive and the hands-on projects are amazing.',
    avatarBg: 'bg-purple-600',
    city: 'Nankana Sahib'
  },
  {
    id: 'rev-3',
    studentName: 'Hamza Ali',
    course: 'Python Programming',
    rating: 5,
    comment: "I learned Python from scratch and now I'm building my own projects. Thank you SkillAI!",
    avatarBg: 'bg-emerald-600',
    city: 'Nankana Sahib'
  },
  {
    id: 'rev-4',
    studentName: 'Fatima Zahra',
    course: 'AI Chatbot & Voice Agent',
    rating: 5,
    comment: 'The voice agents module was mind-blowing! I created a live clinic booking phone bot for a local medical center in just 4 weeks.',
    avatarBg: 'bg-rose-600',
    city: 'Nankana Sahib'
  },
  {
    id: 'rev-5',
    studentName: 'Usman Tariq',
    course: 'Data Analytics',
    rating: 5,
    comment: 'Sir Zeeshan clarifies complex concepts so simply. The Power BI and SQL portfolio helped me secure my first remote client on Upwork.',
    avatarBg: 'bg-blue-600',
    city: 'Nankana Sahib'
  }
];

export const LEARNING_PATHWAYS: LearningPathway[] = [
  {
    id: 'kids',
    title: 'Kids',
    grade: 'Class 3 – 5',
    subtitle: 'AI Kids Explorer',
    duration: '2 Months',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    icon: 'Sparkles',
    description: 'Ignite young curiosity with visual block coding, fun AI games, generative digital art, and logic building.',
    keySkills: ['Scratch Coding', 'AI Art & Story Creation', 'Logical Reasoning', 'Safe Digital Habits']
  },
  {
    id: 'teens',
    title: 'Teens',
    grade: 'Class 6 – 8',
    subtitle: 'AI Productivity & Creativity',
    duration: '2 Months',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    icon: 'Brain',
    description: 'Empower middle school students with smart AI study assistants, prompt crafting, design tools, and Python foundations.',
    keySkills: ['Prompt Engineering', 'AI Study Assistants', 'Graphic Design with AI', 'Python Basics']
  },
  {
    id: 'high-school',
    title: 'High School',
    grade: 'Class 9 – 12',
    subtitle: 'AI Automation & Agentic AI',
    duration: '2 Months',
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    icon: 'Cpu',
    description: 'Prepare students for top university programs and freelance success with hands-on AI workflow automation and coding.',
    keySkills: ['Agentic AI Workflows', 'API Integration', 'Full Chatbot Creation', 'Portfolio Building']
  },
  {
    id: 'adults',
    title: 'Adults & Professionals',
    grade: 'Graduates & Freelancers',
    subtitle: 'Full Stack, Data, Marketing & More',
    duration: '3 to 6 Months',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    icon: 'Briefcase',
    description: 'Career-focused comprehensive diplomas designed for university graduates, working professionals, and future tech entrepreneurs.',
    keySkills: ['MERN Stack', 'Power BI & SQL', 'Freelancing (Upwork/Fiverr)', 'Enterprise AI Agents']
  }
];

export const INSTITUTE_STATS = [
  { value: 500, suffix: '+', label: 'Students Trained', icon: 'Users' },
  { value: 15, suffix: '+', label: 'Courses Offered', icon: 'BookOpen' },
  { value: 8, suffix: '+', label: 'Expert Instructors', icon: 'GraduationCap' },
  { value: 95, suffix: '%', label: 'Satisfaction Rate', icon: 'Award' }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Practical Project-Based Learning',
    description: '70% practical hands-on building real apps, chatbots, and automation workflows rather than theoretical slides.',
    icon: 'Wrench'
  },
  {
    title: 'AI-Focused Curriculum',
    description: 'Updated monthly to include the latest agentic frameworks, multimodal models, n8n, and modern industry workflows.',
    icon: 'Cpu'
  },
  {
    title: 'Beginner Friendly',
    description: 'No prior coding experience required. We start with absolute basics and guide you step-by-step to advanced mastery.',
    icon: 'Smile'
  },
  {
    title: 'Online + Physical Classes',
    description: 'State-of-the-art air-conditioned lab at Y/272 Housing Colony, Nankana plus interactive live online sessions.',
    icon: 'MonitorPlay'
  },
  {
    title: 'Class Recordings & LMS',
    description: 'Lifetime access to video recordings of every lecture, homework challenges, and student portal dashboard.',
    icon: 'FileVideo'
  },
  {
    title: 'Career Support & Mentorship',
    description: 'Resume reviews, Upwork/Fiverr freelancing launchpad, LinkedIn optimization, and job placement assistance.',
    icon: 'Compass'
  }
];
