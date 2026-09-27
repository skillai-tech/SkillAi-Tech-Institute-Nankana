import { PortalStudent, Course } from '../types';
import { COURSES } from '../data/instituteData';

const STORAGE_KEY = 'skillai_lms_students_v2';
const CURRENT_STUDENT_KEY = 'skillai_lms_current_id_v2';

// Helper to generate default lectures for a course
export function generateDefaultLectures(courseTitle: string) {
  const isAgentic = courseTitle.toLowerCase().includes('agent') || courseTitle.toLowerCase().includes('ai');
  const isWeb = courseTitle.toLowerCase().includes('web') || courseTitle.toLowerCase().includes('mern');

  if (isAgentic) {
    return [
      {
        id: 'lec-1',
        weekNumber: 1,
        weekLabel: 'Week 01',
        title: 'Introduction to Modern AI Agents & LLM Architectures',
        duration: '1 hr 45 min',
        status: 'Completed' as const,
        notesTitle: 'Week 01 AI Agent Architecture Notes.pdf',
        resourcesAvailable: true,
        completedAt: 'Sep 10, 2026'
      },
      {
        id: 'lec-2',
        weekNumber: 1,
        weekLabel: 'Week 01',
        title: 'Prompt Engineering, Temperature & System Instructions',
        duration: '2 hr 10 min',
        status: 'Completed' as const,
        notesTitle: 'Prompt Engineering Cheatsheet.pdf',
        resourcesAvailable: true,
        completedAt: 'Sep 12, 2026'
      },
      {
        id: 'lec-3',
        weekNumber: 1,
        weekLabel: 'Week 01',
        title: 'Python for AI Engineers & OpenAI/Gemini SDKs',
        duration: '1 hr 55 min',
        status: 'Completed' as const,
        notesTitle: 'Python SDK Boilerplates.zip',
        resourcesAvailable: true,
        completedAt: 'Sep 15, 2026'
      },
      {
        id: 'lec-4',
        weekNumber: 2,
        weekLabel: 'Week 02',
        title: 'Function Calling, Tools & Structured JSON Parsing',
        duration: '2 hr 05 min',
        status: 'Completed' as const,
        notesTitle: 'Function Calling Guide.pdf',
        resourcesAvailable: true,
        completedAt: 'Sep 18, 2026'
      },
      {
        id: 'lec-5',
        weekNumber: 2,
        weekLabel: 'Week 02',
        title: 'REST APIs & Webhooks Integration with Python FastAPI',
        duration: '1 hr 50 min',
        status: 'Completed' as const,
        notesTitle: 'FastAPI Microservice Template.zip',
        resourcesAvailable: true,
        completedAt: 'Sep 21, 2026'
      },
      {
        id: 'lec-6',
        weekNumber: 3,
        weekLabel: 'Week 03',
        title: 'n8n Introduction & Self-Hosted Automation Architecture',
        duration: '2 hr 20 min',
        status: 'Current' as const,
        notesTitle: 'n8n Setup & Docker Guide.pdf',
        resourcesAvailable: true
      },
      {
        id: 'lec-7',
        weekNumber: 3,
        weekLabel: 'Week 03',
        title: 'n8n Workflows: Google Sheets, Gmail & WhatsApp Webhooks',
        duration: '2 hr 15 min',
        status: 'Locked' as const,
        notesTitle: 'n8n Workflow JSON Presets.json',
        resourcesAvailable: true
      },
      {
        id: 'lec-8',
        weekNumber: 4,
        weekLabel: 'Week 04',
        title: 'CrewAI & LangGraph: Multi-Agent Autonomous Teams',
        duration: '2 hr 30 min',
        status: 'Locked' as const,
        notesTitle: 'CrewAI Team Architecture.pdf',
        resourcesAvailable: true
      },
      {
        id: 'lec-9',
        weekNumber: 4,
        weekLabel: 'Week 04',
        title: 'RAG Systems, Vector Databases & Private PDF Assistants',
        duration: '2 hr 10 min',
        status: 'Locked' as const,
        notesTitle: 'Vector RAG Implementation Guide.pdf',
        resourcesAvailable: true
      }
    ];
  }

  // Fallback web / general lectures
  return [
    {
      id: 'lec-w1',
      weekNumber: 1,
      weekLabel: 'Week 01',
      title: 'Modern HTML5, Semantic UI & Tailwind CSS Setup',
      duration: '1 hr 45 min',
      status: 'Completed' as const,
      notesTitle: 'Frontend Essentials.pdf',
      resourcesAvailable: true,
      completedAt: 'Sep 10, 2026'
    },
    {
      id: 'lec-w2',
      weekNumber: 1,
      weekLabel: 'Week 01',
      title: 'JavaScript ES6+, DOM Manipulation & Event Loop',
      duration: '2 hr 10 min',
      status: 'Completed' as const,
      notesTitle: 'JS Core Mastery.pdf',
      resourcesAvailable: true,
      completedAt: 'Sep 14, 2026'
    },
    {
      id: 'lec-w3',
      weekNumber: 2,
      weekLabel: 'Week 02',
      title: 'React Fundamentals, Components, Props & Hooks',
      duration: '2 hr 00 min',
      status: 'Current' as const,
      notesTitle: 'React 19 Components.zip',
      resourcesAvailable: true
    },
    {
      id: 'lec-w4',
      weekNumber: 3,
      weekLabel: 'Week 03',
      title: 'State Management with Zustand & API Integration',
      duration: '1 hr 55 min',
      status: 'Locked' as const,
      notesTitle: 'API Fetching Patterns.pdf',
      resourcesAvailable: true
    }
  ];
}

// Helper to generate default assignments
export function generateDefaultAssignments(courseTitle: string) {
  return [
    {
      id: 'asg-1',
      title: 'Assignment 01: Prompt Engineering & Custom System Instructions',
      topic: 'LLM Prompt Design',
      dueDate: '15 Sep 2026',
      instructions: 'Create a multi-step prompt that accepts unformatted sales emails and returns clean JSON data with customer name, phone, order intent and budget.',
      status: 'Checked' as const,
      submission: {
        submittedAt: '14 Sep 2026',
        githubLink: 'https://github.com/skillai-student/prompt-json-parser',
        projectLink: 'https://prompt-parser-demo.vercel.app',
        comments: 'Implemented few-shot prompting with strict JSON schema.',
        score: '98/100',
        feedback: 'Outstanding prompt structure with zero schema violations. Excellent work!'
      }
    },
    {
      id: 'asg-2',
      title: 'Assignment 02: REST API & OpenAI Function Calling Pipeline',
      topic: 'Tool Integration',
      dueDate: '22 Sep 2026',
      instructions: 'Build a Python script that uses OpenAI or Gemini function calling to check weather or currency exchange and returns a conversational summary.',
      status: 'Submitted' as const,
      submission: {
        submittedAt: '21 Sep 2026',
        githubLink: 'https://github.com/skillai-student/ai-tools-pipeline',
        projectLink: 'https://tools-bot.replit.app',
        comments: 'Connected open-meteo API and currency rate endpoints.',
        score: 'Pending Review',
        feedback: 'Under review by Sir Zeeshan Abdul Jabbar.'
      }
    },
    {
      id: 'asg-3',
      title: 'Assignment 03: Build an n8n AI Automation Workflow',
      topic: 'n8n & Webhooks',
      dueDate: '30 Sep 2026',
      instructions: 'Create an automation that receives a webhook form submission, evaluates the inquiry with an LLM node, and stores high-intent leads in Google Sheets while alerting a Telegram/WhatsApp channel.',
      status: 'Pending' as const
    },
    {
      id: 'asg-4',
      title: 'Assignment 04: Production RAG Knowledge Assistant for PDFs',
      topic: 'Vector Databases',
      dueDate: '08 Oct 2026',
      instructions: 'Build a RAG system that indexes a 20-page product manual and answers questions citing exact page numbers.',
      status: 'Pending' as const
    }
  ];
}

// Initial Seed Students
const DEFAULT_STUDENTS: PortalStudent[] = [
  {
    studentId: 'SKL-2026-00125',
    name: 'Zeeshan Abdul Jabbar',
    fatherName: 'Abdul Jabbar',
    email: 'zeeshan@skillai.pk',
    whatsapp: '0301-4870303',
    phone: '0301-4870303',
    city: 'Nankana Sahib',
    education: 'MSc IT / AI Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    enrolledCourse: 'Agentic AI & Automation',
    enrolledCourses: [
      {
        courseId: 'agentic-ai-automation',
        courseTitle: 'Agentic AI & Automation',
        instructor: 'Zeeshan Abdul Jabbar',
        duration: '3 Months',
        progressPercent: 68,
        status: 'Active',
        enrolledDate: '01 Sep 2026',
        timing: 'Evening (5:00 PM – 7:00 PM)',
        mode: 'Physical Campus (Lab 1)'
      },
      {
        courseId: 'python-programming',
        courseTitle: 'Python Programming',
        instructor: 'Zeeshan Abdul Jabbar',
        duration: '3 Months',
        progressPercent: 100,
        status: 'Completed',
        enrolledDate: '01 Jun 2026',
        timing: 'Evening',
        mode: 'Physical Campus'
      }
    ],
    progressPercent: 68,
    attendancePercent: 92,
    feeStatus: 'Paid',
    nextClass: 'Today at 06:30 PM (Lab 1 & Zoom)',
    nextClassLink: 'https://zoom.us/j/skillai-batch4-live',
    attendance: {
      present: 38,
      absent: 3,
      leave: 2,
      late: 1,
      totalSessions: 44,
      percentage: 92,
      history: [
        { date: '26 Sep 2026', day: 'Friday', status: 'Present', topic: 'n8n Webhook Architecture' },
        { date: '24 Sep 2026', day: 'Wednesday', status: 'Present', topic: 'LangGraph State Machines' },
        { date: '22 Sep 2026', day: 'Monday', status: 'Present', topic: 'CrewAI Autonomous Agents' },
        { date: '19 Sep 2026', day: 'Friday', status: 'Late', topic: 'RAG Vector Indexing' },
        { date: '17 Sep 2026', day: 'Wednesday', status: 'Present', topic: 'Function Calling in Python' },
        { date: '15 Sep 2026', day: 'Monday', status: 'Absent', topic: 'OpenAI Realtime API' },
        { date: '12 Sep 2026', day: 'Friday', status: 'Present', topic: 'Structured Prompt Chains' },
        { date: '10 Sep 2026', day: 'Wednesday', status: 'Present', topic: 'Python Fundamentals for AI' }
      ]
    },
    feeRecord: {
      totalFee: 15000,
      paidAmount: 10000,
      remainingAmount: 5000,
      status: 'Installment Due',
      history: [
        { id: 'pay-1', date: '02 Sep 2026', amount: 5000, method: 'JazzCash', tid: 'TID-93821094', status: 'Paid' },
        { id: 'pay-2', date: '15 Sep 2026', amount: 5000, method: 'Meezan Bank', tid: 'TID-88291044', status: 'Paid' }
      ]
    },
    lectures: generateDefaultLectures('Agentic AI & Automation'),
    schedule: [
      {
        id: 'sch-1',
        day: 'Monday',
        date: '29 Sep 2026',
        time: '6:30 PM – 8:30 PM',
        topic: 'n8n Advanced Webhook Workflows',
        status: 'Upcoming',
        instructor: 'Zeeshan Abdul Jabbar',
        joinLink: 'https://zoom.us/j/skillai-batch4-live'
      },
      {
        id: 'sch-2',
        day: 'Wednesday',
        date: '01 Oct 2026',
        time: '6:30 PM – 8:30 PM',
        topic: 'CrewAI Multi-Agent Collaboration with Local Ollama Models',
        status: 'Upcoming',
        instructor: 'Zeeshan Abdul Jabbar',
        joinLink: 'https://zoom.us/j/skillai-batch4-live'
      },
      {
        id: 'sch-3',
        day: 'Friday',
        date: '03 Oct 2026',
        time: '6:30 PM – 8:30 PM',
        topic: 'Model Context Protocol (MCP) & Google Workspace Tools',
        status: 'Upcoming',
        instructor: 'Zeeshan Abdul Jabbar',
        joinLink: 'https://zoom.us/j/skillai-batch4-live'
      }
    ],
    assignments: generateDefaultAssignments('Agentic AI & Automation'),
    projects: [
      {
        id: 'proj-1',
        title: 'Project 01: AI Customer Support Agent',
        description: 'Autonomous customer onboarding and query resolution system integrated with live website widget and WhatsApp.',
        status: 'Completed',
        githubUrl: 'https://github.com/skillai-student/customer-support-agent',
        liveDemoUrl: 'https://skillai-agent-demo.vercel.app'
      },
      {
        id: 'proj-2',
        title: 'Project 02: Voice AI Agent for Medical Appointments',
        description: 'Low-latency telephony bot using ElevenLabs and Twilio for handling clinic appointment bookings.',
        status: 'In Progress',
        githubUrl: 'https://github.com/skillai-student/medical-voice-bot'
      },
      {
        id: 'proj-3',
        title: 'Project 03: WhatsApp AI Chatbot with Google Sheets Sync',
        description: 'Bi-directional WhatsApp automation using n8n and Gemini API for inventory checking.',
        status: 'Not Started'
      }
    ],
    certificates: [
      {
        id: 'cert-1',
        title: 'Professional Python Specialist Certification',
        issueDate: 'August 2026',
        credentialId: 'SKILLAI-2026-00125',
        grade: 'A+ (Distinction)'
      }
    ],
    notifications: [
      {
        id: 'notif-1',
        title: 'New assignment uploaded',
        message: 'Assignment 03 (n8n AI Automation Workflow) is now live. Due date: 30 Sep 2026.',
        timestamp: '2 hours ago',
        read: false,
        type: 'assignment'
      },
      {
        id: 'notif-2',
        title: 'Class Reminder',
        message: "Today's physical & live class will start promptly at 6:30 PM in Lab 1.",
        timestamp: '5 hours ago',
        read: false,
        type: 'class'
      },
      {
        id: 'notif-3',
        title: 'Assignment 01 Checked',
        message: 'Sir Zeeshan graded your Prompt Engineering submission: 98/100.',
        timestamp: '2 days ago',
        read: true,
        type: 'assignment'
      },
      {
        id: 'notif-4',
        title: 'Fee Payment Received',
        message: 'Your installment of PKR 5,000 via Meezan Bank has been verified.',
        timestamp: '1 week ago',
        read: true,
        type: 'fee'
      }
    ],
    announcements: [
      {
        id: 'ann-1',
        title: '📢 Weekend Hackathon: Building Autonomous Sales Agents',
        content: 'All Agentic AI batch students are invited to the Saturday hackathon from 2:00 PM to 6:00 PM in Lab 1. Top project will receive a cash grant!',
        date: '26 Sep 2026',
        author: 'Zeeshan Abdul Jabbar (CEO & Lead Instructor)',
        priority: 'high'
      },
      {
        id: 'ann-2',
        title: '⚡ High-Speed Fiber Upgrade Completed at Campus',
        content: 'Campus workstations now feature dedicated 100 Mbps fiber internet with seamless UPS/generator backup.',
        date: '20 Sep 2026',
        author: 'SkillAI Administration',
        priority: 'normal'
      }
    ],
    resources: [
      {
        id: 'res-1',
        title: 'Week 01 AI Agent Architecture Notes.pdf',
        category: 'Lecture Notes',
        type: 'pdf',
        size: '3.4 MB',
        downloadUrl: '#'
      },
      {
        id: 'res-2',
        title: 'Prompt Engineering Master Cheatsheet.pdf',
        category: 'Cheatsheet',
        type: 'pdf',
        size: '1.8 MB',
        downloadUrl: '#'
      },
      {
        id: 'res-3',
        title: 'Python AI Boilerplate Scripts.zip',
        category: 'Code Files',
        type: 'zip',
        size: '14.2 MB',
        downloadUrl: '#'
      },
      {
        id: 'res-4',
        title: 'SkillAI Official GitHub Repository (Code & Labs)',
        category: 'Repository',
        type: 'link',
        downloadUrl: 'https://github.com/skillai-institute'
      },
      {
        id: 'res-5',
        title: 'n8n Production Workflow Templates.json',
        category: 'Workflow Presets',
        type: 'code',
        size: '850 KB',
        downloadUrl: '#'
      }
    ]
  },
  {
    studentId: 'SKL-2026-00126',
    name: 'Sara Khan',
    fatherName: 'Muhammad Khan',
    email: 'sara@skillai.pk',
    whatsapp: '0302-9876543',
    phone: '0302-9876543',
    city: 'Nankana Sahib',
    education: 'BS Computer Science',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    enrolledCourse: 'Full Stack Web Development',
    enrolledCourses: [
      {
        courseId: 'fullstack-web',
        courseTitle: 'Full Stack Web Development',
        instructor: 'Zeeshan Abdul Jabbar',
        duration: '6 Months',
        progressPercent: 82,
        status: 'Active',
        enrolledDate: '15 Jul 2026',
        timing: 'Evening (5:00 PM – 7:00 PM)',
        mode: 'Online Live via Zoom'
      }
    ],
    progressPercent: 82,
    attendancePercent: 96,
    feeStatus: 'Paid',
    nextClass: 'Tuesday at 05:00 PM (Zoom)',
    nextClassLink: 'https://zoom.us/j/skillai-web-batch2',
    attendance: {
      present: 42,
      absent: 1,
      leave: 1,
      late: 0,
      totalSessions: 44,
      percentage: 96,
      history: []
    },
    feeRecord: {
      totalFee: 12000,
      paidAmount: 12000,
      remainingAmount: 0,
      status: 'Paid',
      history: [
        { id: 'pay-s1', date: '15 Jul 2026', amount: 12000, method: 'EasyPaisa', tid: 'TID-11029384', status: 'Paid' }
      ]
    },
    lectures: generateDefaultLectures('Full Stack Web Development'),
    schedule: [],
    assignments: generateDefaultAssignments('Full Stack Web Development'),
    projects: [],
    certificates: [
      {
        id: 'cert-2',
        title: 'Full Stack Web Development (MERN)',
        issueDate: 'August 2026',
        credentialId: 'SKILLAI-2026-00126',
        grade: 'A (Excellent)'
      }
    ],
    notifications: [],
    announcements: [],
    resources: []
  }
];

class PortalStore {
  private students: PortalStudent[] = [];
  private currentStudentId: string = 'SKL-2026-00125';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.students = JSON.parse(stored);
      } else {
        this.students = DEFAULT_STUDENTS;
        this.saveToStorage();
      }

      const storedCurrentId = localStorage.getItem(CURRENT_STUDENT_KEY);
      if (storedCurrentId && this.students.some(s => s.studentId === storedCurrentId)) {
        this.currentStudentId = storedCurrentId;
      } else if (this.students.length > 0) {
        this.currentStudentId = this.students[0].studentId;
      }
    } catch (e) {
      console.error('Error loading portal store:', e);
      this.students = DEFAULT_STUDENTS;
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.students));
      localStorage.setItem(CURRENT_STUDENT_KEY, this.currentStudentId);
    } catch (e) {
      console.error('Error saving portal store:', e);
    }
  }

  public getAllStudents(): PortalStudent[] {
    return this.students;
  }

  public getCurrentStudent(): PortalStudent {
    const student = this.students.find(s => s.studentId === this.currentStudentId);
    return student || this.students[0];
  }

  public setCurrentStudentId(studentId: string): boolean {
    const found = this.students.find(s => s.studentId === studentId);
    if (found) {
      this.currentStudentId = studentId;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Login by Student ID, Email or WhatsApp
  public login(identifier: string): PortalStudent | null {
    const clean = identifier.trim().toLowerCase();
    const found = this.students.find(s =>
      s.studentId.toLowerCase() === clean ||
      s.email.toLowerCase() === clean ||
      s.whatsapp.replace(/\D/g, '') === clean.replace(/\D/g, '') ||
      s.name.toLowerCase().includes(clean)
    );

    if (found) {
      this.currentStudentId = found.studentId;
      this.saveToStorage();
      return found;
    }
    return null;
  }

  // DYNAMIC REGISTRATION: Called when a student enrolls on the website!
  public enrollStudentFromAdmission(data: {
    fullName: string;
    fatherName: string;
    whatsappNumber: string;
    email?: string;
    city: string;
    education: string;
    course: string;
    mode: string;
    timing: string;
  }): PortalStudent {
    const randomDigits = Math.floor(100 + Math.random() * 900);
    const newStudentId = `SKL-2026-00${randomDigits}`;

    const matchingCourse = COURSES.find(c => c.title === data.course) || COURSES[0];
    const totalFee = matchingCourse.feePKR || 15000;

    const newStudent: PortalStudent = {
      studentId: newStudentId,
      name: data.fullName,
      fatherName: data.fatherName,
      email: data.email || `${data.fullName.toLowerCase().replace(/\s+/g, '')}@student.skillai.pk`,
      whatsapp: data.whatsappNumber,
      phone: data.whatsappNumber,
      city: data.city,
      education: data.education,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.fullName)}&backgroundColor=0284c7,0ea5e9,38bdf8`,
      role: 'student',
      enrolledCourse: data.course,
      enrolledCourses: [
        {
          courseId: matchingCourse.id,
          courseTitle: data.course,
          instructor: 'Zeeshan Abdul Jabbar',
          duration: matchingCourse.duration,
          progressPercent: 0,
          status: 'Active',
          enrolledDate: 'Today',
          timing: data.timing,
          mode: data.mode
        }
      ],
      progressPercent: 0,
      attendancePercent: 100,
      feeStatus: 'Installment Due',
      nextClass: `First Class: ${data.timing} (${data.mode})`,
      nextClassLink: 'https://zoom.us/j/skillai-live-welcome',
      attendance: {
        present: 1,
        absent: 0,
        leave: 0,
        late: 0,
        totalSessions: 1,
        percentage: 100,
        history: [
          {
            date: 'Today',
            day: 'Orientation',
            status: 'Present',
            topic: `Orientation & Welcome to ${data.course}`
          }
        ]
      },
      feeRecord: {
        totalFee,
        paidAmount: 0,
        remainingAmount: totalFee,
        status: 'Installment Due',
        history: []
      },
      lectures: generateDefaultLectures(data.course),
      schedule: [
        {
          id: 'sch-new-1',
          day: 'Next Batch Start',
          date: '01st of Month',
          time: data.timing,
          topic: `Kickoff: ${data.course} Module 1`,
          status: 'Upcoming',
          instructor: 'Zeeshan Abdul Jabbar',
          joinLink: 'https://zoom.us/j/skillai-live-welcome'
        }
      ],
      assignments: generateDefaultAssignments(data.course),
      projects: [
        {
          id: 'proj-new-1',
          title: `Project 01: Core ${data.course} Real Project`,
          description: 'Hands-on practical implementation of first module capstone.',
          status: 'Not Started'
        }
      ],
      certificates: [],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Welcome to SkillAI!',
          message: `Congratulations ${data.fullName}! Your admission in ${data.course} has been registered. Your Student ID is ${newStudentId}.`,
          timestamp: 'Just now',
          read: false,
          type: 'announcement'
        }
      ],
      announcements: [
        {
          id: 'ann-welcome',
          title: `🎉 Welcome to ${data.course}!`,
          content: `Assalam o Alaikum ${data.fullName}! Please complete your profile and prepare your laptop for Lab/Online classes.`,
          date: 'Today',
          author: 'Zeeshan Abdul Jabbar (CEO)',
          priority: 'high'
        }
      ],
      resources: [
        {
          id: 'res-w1',
          title: `${data.course} - Curriculum Handbook & Roadmap.pdf`,
          category: 'Course Guide',
          type: 'pdf',
          size: '2.5 MB',
          downloadUrl: '#'
        },
        {
          id: 'res-w2',
          title: 'Student Code of Conduct & Lab Guidelines.pdf',
          category: 'Institute Policies',
          type: 'pdf',
          size: '1.2 MB',
          downloadUrl: '#'
        }
      ]
    };

    // Prepend new student so they appear first
    this.students.unshift(newStudent);
    this.currentStudentId = newStudentId;
    this.saveToStorage();

    return newStudent;
  }

  // Update profile
  public updateProfile(studentId: string, updates: Partial<PortalStudent>) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    Object.assign(student, updates);
    this.saveToStorage();
  }

  // Mark lecture completed & recalculate progress
  public toggleLectureCompleted(studentId: string, lectureId: string) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    const lecture = student.lectures.find(l => l.id === lectureId);
    if (!lecture) return;

    if (lecture.status === 'Completed') {
      lecture.status = 'Current';
      lecture.completedAt = undefined;
    } else {
      lecture.status = 'Completed';
      lecture.completedAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    // Recalculate progress percent
    const completedCount = student.lectures.filter(l => l.status === 'Completed').length;
    student.progressPercent = Math.round((completedCount / student.lectures.length) * 100);

    this.saveToStorage();
  }

  // Submit an assignment
  public submitAssignment(studentId: string, assignmentId: string, data: {
    githubLink?: string;
    projectLink?: string;
    comments?: string;
    fileName?: string;
  }) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    const assignment = student.assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    assignment.status = 'Submitted';
    assignment.submission = {
      submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      githubLink: data.githubLink,
      projectLink: data.projectLink,
      comments: data.comments,
      fileName: data.fileName || 'Solution-Artifact.zip',
      score: 'Pending Review',
      feedback: 'Submitted successfully. Instructor review in progress.'
    };

    // Add notification
    student.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Assignment Submitted ✓',
      message: `Your assignment "${assignment.title}" was submitted successfully.`,
      timestamp: 'Just now',
      read: false,
      type: 'assignment'
    });

    this.saveToStorage();
  }

  // Submit project
  public updateProject(studentId: string, projectId: string, updates: Partial<{
    status: 'Completed' | 'In Progress' | 'Not Started';
    githubUrl: string;
    liveDemoUrl: string;
  }>) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    const proj = student.projects.find(p => p.id === projectId);
    if (!proj) return;

    Object.assign(proj, updates);
    this.saveToStorage();
  }

  // Add new project
  public addProject(studentId: string, newProj: {
    title: string;
    description: string;
    status: 'Completed' | 'In Progress' | 'Not Started';
    githubUrl?: string;
    liveDemoUrl?: string;
  }) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    student.projects.push({
      id: `proj-${Date.now()}`,
      ...newProj
    });

    this.saveToStorage();
  }

  // Make fee payment
  public recordFeePayment(studentId: string, data: {
    amount: number;
    method: string;
    tid: string;
  }) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    student.feeRecord.paidAmount += data.amount;
    student.feeRecord.remainingAmount = Math.max(0, student.feeRecord.totalFee - student.feeRecord.paidAmount);

    if (student.feeRecord.remainingAmount <= 0) {
      student.feeRecord.status = 'Paid';
      student.feeStatus = 'Paid';
    } else {
      student.feeRecord.status = 'Installment Due';
      student.feeStatus = 'Installment Due';
    }

    student.feeRecord.history.unshift({
      id: `pay-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      amount: data.amount,
      method: data.method,
      tid: data.tid,
      status: 'Paid'
    });

    student.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Fee Payment Received ✓',
      message: `Your payment of PKR ${data.amount.toLocaleString()} via ${data.method} (TID: ${data.tid}) has been recorded. Remaining: PKR ${student.feeRecord.remainingAmount.toLocaleString()}`,
      timestamp: 'Just now',
      read: false,
      type: 'fee'
    });

    this.saveToStorage();
  }

  // Mark all notifications read
  public markAllNotificationsRead(studentId: string) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    student.notifications.forEach(n => (n.read = true));
    this.saveToStorage();
  }

  // Admin: grade assignment
  public adminGradeAssignment(studentId: string, assignmentId: string, score: string, feedback: string) {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    const asg = student.assignments.find(a => a.id === assignmentId);
    if (!asg || !asg.submission) return;

    asg.status = 'Checked';
    asg.submission.score = score;
    asg.submission.feedback = feedback;

    student.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Assignment Graded',
      message: `Sir Zeeshan graded "${asg.title}": ${score}. Feedback: ${feedback}`,
      timestamp: 'Just now',
      read: false,
      type: 'assignment'
    });

    this.saveToStorage();
  }

  // Admin: issue certificate
  public adminIssueCertificate(studentId: string, courseTitle: string, grade: string = 'A+ (Distinction)') {
    const student = this.students.find(s => s.studentId === studentId);
    if (!student) return;

    const credId = student.studentId;
    student.certificates.unshift({
      id: `cert-${Date.now()}`,
      title: courseTitle,
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      credentialId: credId,
      grade
    });

    student.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: '🎓 Certificate Ready!',
      message: `Congratulations! Your official completion certificate for "${courseTitle}" has been issued.`,
      timestamp: 'Just now',
      read: false,
      type: 'certificate'
    });

    this.saveToStorage();
  }
}

export const portalStore = new PortalStore();
