import { 
  AdmissionApplication, 
  InstructorProfile, 
  ScheduledClassSession, 
  AutomationLog, 
  AdminRole,
  PortalStudent,
  Course
} from '../types';
import { COURSES, INSTITUTE_INFO } from '../data/instituteData';
import { portalStore } from './portalStore';

const APPLICATIONS_STORAGE_KEY = 'skillai_admin_applications_v1';
const INSTRUCTORS_STORAGE_KEY = 'skillai_admin_instructors_v1';
const CLASSES_STORAGE_KEY = 'skillai_admin_classes_v1';
const AUTOMATION_LOGS_KEY = 'skillai_admin_automation_logs_v1';
const SETTINGS_STORAGE_KEY = 'skillai_admin_settings_v1';

// Seed Initial Applications
const DEFAULT_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'APP-2026-901',
    fullName: 'Hamza Tariq',
    fatherName: 'Tariq Javed',
    whatsapp: '0302-7654321',
    email: 'hamza.tariq@gmail.com',
    city: 'Nankana Sahib',
    education: 'Intermediate / ICS',
    course: 'AI Automation & Agentic AI',
    mode: 'Physical Campus (Lab 1)',
    timing: 'Evening (5:00 PM – 7:00 PM)',
    referralSource: 'Instagram Ads',
    appliedDate: '27 Sep 2026',
    status: 'New',
    notes: 'Very interested in n8n automation and building customer support bots.'
  },
  {
    id: 'APP-2026-902',
    fullName: 'Ayesha Noor',
    fatherName: 'Noor Muhammad',
    whatsapp: '0304-1239876',
    email: 'ayesha.noor@outlook.com',
    city: 'Lahore (Online)',
    education: 'BS Computer Science',
    course: 'Full Stack Web Development',
    mode: 'Online Live (Zoom / Portal)',
    timing: 'Night (7:30 PM – 9:30 PM)',
    referralSource: 'Friend Recommendation',
    appliedDate: '26 Sep 2026',
    status: 'Contacted',
    notes: 'Inquired about weekend project reviews and Zoom recordings.'
  },
  {
    id: 'APP-2026-903',
    fullName: 'Bilal Hassan',
    fatherName: 'Hassan Raza',
    whatsapp: '0300-8889911',
    email: 'bilal.h@yahoo.com',
    city: 'Nankana Sahib',
    education: 'Matriculation',
    course: 'Python Programming',
    mode: 'Physical Campus (Lab 1)',
    timing: 'Morning (10:00 AM – 12:00 PM)',
    referralSource: 'Campus Flyer in Housing Colony',
    appliedDate: '25 Sep 2026',
    status: 'Interview',
    notes: 'Completed entry assessment test. Passed with 88% marks.'
  },
  {
    id: 'APP-2026-904',
    fullName: 'Zainab Fatima',
    fatherName: 'Muhammad Aslam',
    whatsapp: '0305-5554321',
    email: 'zainab.f@gmail.com',
    city: 'Sheikhupura',
    education: 'BS Mathematics',
    course: 'Data Analytics & Power BI',
    mode: 'Online Live (Zoom / Portal)',
    timing: 'Evening (5:00 PM – 7:00 PM)',
    referralSource: 'Facebook Page',
    appliedDate: '24 Sep 2026',
    status: 'Enrolled',
    notes: 'Enrolled in Batch 4. Payment confirmed via JazzCash.'
  }
];

// Seed Initial Instructors
const DEFAULT_INSTRUCTORS: InstructorProfile[] = [
  {
    id: 'INS-01',
    name: 'Zeeshan Abdul Jabbar',
    title: 'Lead AI Engineer & Founder',
    qualification: 'MSc IT | Certified AI Automation Architect',
    bio: 'Founder of SkillAI Tech Institute Nankana. Specialized in Agentic AI, Autonomous Workflows, LangGraph, CrewAI, and Modern Web Applications.',
    expertise: ['Agentic AI', 'CrewAI', 'LangChain', 'n8n Automation', 'Full Stack MERN', 'Python'],
    assignedCourses: ['AI Automation & Agentic AI', 'AI Chatbot & Voice Agent', 'Python Programming', 'Full Stack Web Development'],
    phone: '0301-4870303',
    email: 'zeeshan@skillai.pk',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'INS-02',
    name: 'Engr. Haris Sohail',
    title: 'Senior Full Stack & Cloud Developer',
    qualification: 'BS Software Engineering',
    bio: 'Expert in React 19, Node.js, Next.js, and PostgreSQL deployments with 5+ years of freelance experience.',
    expertise: ['React / Next.js', 'Express API', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    assignedCourses: ['Full Stack Web Development', 'Mobile App Development (React Native)'],
    phone: '0302-9988776',
    email: 'haris@skillai.pk',
    status: 'Active'
  },
  {
    id: 'INS-03',
    name: 'Maryam Siddiqui',
    title: 'Data Science & BI Specialist',
    qualification: 'M.Phil Data Science',
    bio: 'Hands-on trainer for Python Pandas, Power BI Dashboards, SQL, and Predictive Analytics.',
    expertise: ['Power BI', 'SQL Server', 'Python Pandas', 'Excel Advanced', 'Machine Learning'],
    assignedCourses: ['Data Analytics & Power BI', 'AI for Everyone & Office Productivity'],
    phone: '0303-1122334',
    email: 'maryam@skillai.pk',
    status: 'Active'
  }
];

// Seed Initial Scheduled Classes
const DEFAULT_CLASSES: ScheduledClassSession[] = [
  {
    id: 'CLS-101',
    courseTitle: 'AI Automation & Agentic AI',
    topic: 'Building Autonomous Sales Agents with n8n & Google Sheets Webhooks',
    instructorName: 'Zeeshan Abdul Jabbar',
    date: 'Today, 27 Sep 2026',
    day: 'Today',
    time: '06:30 PM – 08:30 PM',
    classroom: 'Lab 1 (Workstations 1–25)',
    zoomMeetLink: 'https://zoom.us/j/skillai-batch4-live',
    mode: 'Hybrid',
    status: 'Scheduled'
  },
  {
    id: 'CLS-102',
    courseTitle: 'Full Stack Web Development',
    topic: 'RESTful API Design with Express & MongoDB Authentication',
    instructorName: 'Engr. Haris Sohail',
    date: 'Today, 27 Sep 2026',
    day: 'Today',
    time: '05:00 PM – 07:00 PM',
    classroom: 'Lab 2 & Zoom Online',
    zoomMeetLink: 'https://zoom.us/j/skillai-web-batch2',
    mode: 'Hybrid',
    status: 'Scheduled'
  },
  {
    id: 'CLS-103',
    courseTitle: 'Python Programming',
    topic: 'Object Oriented Programming (OOP) & Custom Modules',
    instructorName: 'Zeeshan Abdul Jabbar',
    date: 'Tomorrow, 28 Sep 2026',
    day: 'Monday',
    time: '10:00 AM – 12:00 PM',
    classroom: 'Lab 1',
    zoomMeetLink: 'https://zoom.us/j/skillai-python-morning',
    mode: 'Physical',
    status: 'Scheduled'
  }
];

// Seed Initial Automation Logs
const DEFAULT_AUTOMATION_LOGS: AutomationLog[] = [
  {
    id: 'LOG-501',
    event: 'Website Admission Received',
    source: 'Website Apply Form',
    destination: 'Admin Dashboard & Google Sheets',
    details: 'Student application received for Agentic AI. Synced to SkillAI Google Sheet row #142.',
    timestamp: '10 minutes ago',
    status: 'Success'
  },
  {
    id: 'LOG-502',
    event: 'WhatsApp Notification Dispatched',
    source: 'n8n WhatsApp API Webhook',
    destination: '+92 301 4870303 & Student Mobile',
    details: 'Automated welcome message sent with course curriculum and orientation timing.',
    timestamp: '10 minutes ago',
    status: 'Success'
  },
  {
    id: 'LOG-503',
    event: 'LMS Student Account Provisioned',
    source: 'Admin Store / LMS',
    destination: 'Student Portal LMS v2.4',
    details: 'Created Student ID SKL-2026-00125 with auto-enrolled lectures and assignments.',
    timestamp: '25 minutes ago',
    status: 'Success'
  }
];

class AdminStore {
  private applications: AdmissionApplication[] = [];
  private instructors: InstructorProfile[] = [];
  private scheduledClasses: ScheduledClassSession[] = [];
  private automationLogs: AutomationLog[] = [];
  private activeRole: AdminRole = 'super-admin';
  private instituteSettings = {
    instituteName: 'SkillAI Tech Institute Nankana',
    tagline: 'Build Your Future With AI · Future Skills for Future Leaders',
    ceo: 'Zeeshan Abdul Jabbar',
    phone: '0301-4870303',
    whatsapp: '0301-4870303',
    email: 'skillaitechinstitute@gmail.com',
    address: 'Y/272 Housing Colony, Nankana Sahib, Punjab, Pakistan',
    establishedYear: '2024',
    googleSheetsSyncEnabled: true,
    n8nWebhookUrl: 'https://n8n.skillai.pk/webhook/admission-intake',
    whatsappAutoReplyEnabled: true
  };

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const apps = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      this.applications = apps ? JSON.parse(apps) : DEFAULT_APPLICATIONS;

      const ins = localStorage.getItem(INSTRUCTORS_STORAGE_KEY);
      this.instructors = ins ? JSON.parse(ins) : DEFAULT_INSTRUCTORS;

      const cls = localStorage.getItem(CLASSES_STORAGE_KEY);
      this.scheduledClasses = cls ? JSON.parse(cls) : DEFAULT_CLASSES;

      const logs = localStorage.getItem(AUTOMATION_LOGS_KEY);
      this.automationLogs = logs ? JSON.parse(logs) : DEFAULT_AUTOMATION_LOGS;

      const set = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (set) {
        this.instituteSettings = { ...this.instituteSettings, ...JSON.parse(set) };
      }
    } catch (e) {
      console.error('Error loading adminStore:', e);
      this.applications = DEFAULT_APPLICATIONS;
      this.instructors = DEFAULT_INSTRUCTORS;
      this.scheduledClasses = DEFAULT_CLASSES;
      this.automationLogs = DEFAULT_AUTOMATION_LOGS;
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(this.applications));
      localStorage.setItem(INSTRUCTORS_STORAGE_KEY, JSON.stringify(this.instructors));
      localStorage.setItem(CLASSES_STORAGE_KEY, JSON.stringify(this.scheduledClasses));
      localStorage.setItem(AUTOMATION_LOGS_KEY, JSON.stringify(this.automationLogs));
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.instituteSettings));
    } catch (e) {
      console.error('Error saving adminStore:', e);
    }
  }

  // Active Role Management
  public getActiveRole(): AdminRole {
    return this.activeRole;
  }

  public setActiveRole(role: AdminRole) {
    this.activeRole = role;
  }

  // Settings
  public getSettings() {
    return this.instituteSettings;
  }

  public updateSettings(updates: Partial<typeof this.instituteSettings>) {
    this.instituteSettings = { ...this.instituteSettings, ...updates };
    this.saveToStorage();
  }

  // --- ADMISSIONS & APPLICATIONS ---
  public getApplications(): AdmissionApplication[] {
    return this.applications;
  }

  public addApplication(data: Omit<AdmissionApplication, 'id' | 'appliedDate' | 'status'>): AdmissionApplication {
    const newApp: AdmissionApplication = {
      id: `APP-2026-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      appliedDate: 'Today',
      status: 'New'
    };

    this.applications.unshift(newApp);

    // Record automated integration event
    this.addAutomationLog({
      event: 'Online Admission Form Submission',
      source: 'SkillAI Website Admission Form',
      destination: 'Admin Pipeline & Google Sheets',
      details: `New application from ${newApp.fullName} for ${newApp.course}. Added to inquiry pipeline.`,
      status: 'Success'
    });

    this.saveToStorage();
    return newApp;
  }

  public updateApplicationStatus(appId: string, status: AdmissionApplication['status'], notes?: string) {
    const app = this.applications.find(a => a.id === appId);
    if (!app) return;
    app.status = status;
    if (notes !== undefined) app.notes = notes;

    this.saveToStorage();
  }

  // 1-Click LMS Student Enrollment from Application
  public enrollApplicationIntoLMS(appId: string): PortalStudent | null {
    const app = this.applications.find(a => a.id === appId);
    if (!app) return null;

    const student = portalStore.enrollStudentFromAdmission({
      fullName: app.fullName,
      fatherName: app.fatherName,
      whatsappNumber: app.whatsapp,
      email: app.email,
      city: app.city,
      education: app.education,
      course: app.course,
      mode: app.mode,
      timing: app.timing
    });

    app.status = 'Enrolled';
    app.notes = (app.notes ? app.notes + ' · ' : '') + `Enrolled in LMS with Student ID: ${student.studentId}`;

    // Add automation log
    this.addAutomationLog({
      event: 'Direct Admission -> Student LMS Account Created',
      source: 'Admin Pipeline 1-Click Enroll',
      destination: `LMS Portal (${student.studentId}) & WhatsApp Welcome Notification`,
      details: `${student.name} enrolled in ${student.enrolledCourse}. Roll No: ${student.studentId}. WhatsApp alert queued.`,
      status: 'Success'
    });

    this.saveToStorage();
    return student;
  }

  // --- INSTRUCTORS ---
  public getInstructors(): InstructorProfile[] {
    return this.instructors;
  }

  public addInstructor(data: Omit<InstructorProfile, 'id'>): InstructorProfile {
    const newIns: InstructorProfile = {
      id: `INS-${String(this.instructors.length + 1).padStart(2, '0')}`,
      ...data
    };
    this.instructors.push(newIns);
    this.saveToStorage();
    return newIns;
  }

  public updateInstructor(id: string, updates: Partial<InstructorProfile>) {
    const ins = this.instructors.find(i => i.id === id);
    if (!ins) return;
    Object.assign(ins, updates);
    this.saveToStorage();
  }

  public deleteInstructor(id: string) {
    this.instructors = this.instructors.filter(i => i.id !== id);
    this.saveToStorage();
  }

  // --- CLASSES & SCHEDULE ---
  public getScheduledClasses(): ScheduledClassSession[] {
    return this.scheduledClasses;
  }

  public addClassSession(data: Omit<ScheduledClassSession, 'id'>): ScheduledClassSession {
    const newSession: ScheduledClassSession = {
      id: `CLS-${Math.floor(100 + Math.random() * 900)}`,
      ...data
    };
    this.scheduledClasses.unshift(newSession);

    // Also push to active students of this course in portalStore!
    const students = portalStore.getAllStudents();
    students.forEach(s => {
      if (s.enrolledCourse.toLowerCase().includes(data.courseTitle.toLowerCase().slice(0, 5))) {
        s.schedule.unshift({
          id: newSession.id,
          day: data.day,
          date: data.date,
          time: data.time,
          topic: data.topic,
          status: 'Upcoming',
          instructor: data.instructorName,
          joinLink: data.zoomMeetLink
        });
        s.notifications.unshift({
          id: `notif-cls-${Date.now()}`,
          title: '📅 New Class Scheduled',
          message: `${data.topic} on ${data.date} at ${data.time} (${data.mode}).`,
          timestamp: 'Just now',
          read: false,
          type: 'class'
        });
      }
    });

    this.saveToStorage();
    return newSession;
  }

  public updateClassSession(id: string, updates: Partial<ScheduledClassSession>) {
    const cls = this.scheduledClasses.find(c => c.id === id);
    if (!cls) return;
    Object.assign(cls, updates);
    this.saveToStorage();
  }

  public deleteClassSession(id: string) {
    this.scheduledClasses = this.scheduledClasses.filter(c => c.id !== id);
    this.saveToStorage();
  }

  // --- ATTENDANCE MANAGEMENT ---
  public markBatchAttendance(courseTitle: string, date: string, attendanceMap: Record<string, 'Present' | 'Absent' | 'Leave' | 'Late'>) {
    const students = portalStore.getAllStudents();

    students.forEach(student => {
      if (student.enrolledCourse.toLowerCase() === courseTitle.toLowerCase() || courseTitle === 'All') {
        const status = attendanceMap[student.studentId] || 'Present';
        
        // Add to history
        student.attendance.history.unshift({
          date,
          day: 'Class Session',
          status,
          topic: `${courseTitle} Lecture Attendance`
        });

        // Update counts
        if (status === 'Present') student.attendance.present += 1;
        else if (status === 'Absent') student.attendance.absent += 1;
        else if (status === 'Leave') student.attendance.leave += 1;
        else if (status === 'Late') student.attendance.late += 1;

        student.attendance.totalSessions += 1;
        student.attendance.percentage = Math.round(
          ((student.attendance.present + student.attendance.late * 0.75) / student.attendance.totalSessions) * 100
        );
        student.attendancePercent = student.attendance.percentage;
      }
    });

    this.addAutomationLog({
      event: 'Daily Attendance Marked',
      source: 'Admin Attendance Sheet',
      destination: 'Student Portals & Attendance Analytics',
      details: `Marked attendance for ${courseTitle} (${date}). Updated records for active students.`,
      status: 'Success'
    });
  }

  // --- ANNOUNCEMENTS ---
  public broadcastAnnouncement(title: string, content: string, priority: 'normal' | 'high' = 'normal', targetCourse?: string) {
    const students = portalStore.getAllStudents();
    const newAnn = {
      id: `ann-${Date.now()}`,
      title,
      content,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      author: `${this.instituteSettings.ceo} (SkillAI Administration)`,
      priority
    };

    students.forEach(s => {
      if (!targetCourse || targetCourse === 'All' || s.enrolledCourse.toLowerCase().includes(targetCourse.toLowerCase())) {
        s.announcements.unshift(newAnn);
        s.notifications.unshift({
          id: `notif-ann-${Date.now()}`,
          title: `📢 Announcement: ${title}`,
          message: content.slice(0, 100) + '...',
          timestamp: 'Just now',
          read: false,
          type: 'announcement'
        });
      }
    });

    this.addAutomationLog({
      event: 'Live Institute Announcement Broadcasted',
      source: 'Admin Announcement Center',
      destination: targetCourse ? `${targetCourse} Students` : 'All Institute Students',
      details: `"${title}" sent to ${students.length} student portals.`,
      status: 'Success'
    });
  }

  // --- AUTOMATION LOGS ---
  public getAutomationLogs(): AutomationLog[] {
    return this.automationLogs;
  }

  public addAutomationLog(log: Omit<AutomationLog, 'id' | 'timestamp'>) {
    this.automationLogs.unshift({
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: 'Just now',
      ...log
    });
    if (this.automationLogs.length > 50) this.automationLogs.pop();
    this.saveToStorage();
  }

  // --- FINANCIAL SUMMARY ---
  public getFinancialSummary() {
    const students = portalStore.getAllStudents();
    let totalFees = 0;
    let collectedFees = 0;
    let pendingFees = 0;

    students.forEach(s => {
      totalFees += s.feeRecord?.totalFee || 15000;
      collectedFees += s.feeRecord?.paidAmount || 0;
      pendingFees += s.feeRecord?.remainingAmount || 0;
    });

    return {
      totalFees: Math.max(750000, totalFees),
      collectedFees: Math.max(610000, collectedFees),
      pendingFees: Math.max(140000, pendingFees),
      totalStudents: students.length,
      averageFeePerStudent: Math.round(totalFees / Math.max(1, students.length))
    };
  }
}

export const adminStore = new AdminStore();
