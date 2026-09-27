export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  level: string;
  iconName: string;
  category: 'ai' | 'development' | 'data' | 'digital';
  categoryLabel: string;
  color: string;
  popular?: boolean;
  mode: string;
  fee: string;
  feePKR: number;
  theoryPercentage: number;
  practicalPercentage: number;
  skillsList: string[];
  realProjects: string[];
  syllabus: {
    week: string;
    title: string;
    topics: string[];
  }[];
  prerequisites: string;
  certification: string;
}

export interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  studentRole: string;
  course: string;
  category: 'ai' | 'web' | 'data' | 'automation' | 'mobile';
  summary: string;
  techStack: string[];
  demoType: 'chatbot' | 'voice' | 'web' | 'dashboard' | 'workflow' | 'mobile';
  previewDetails: {
    highlight: string;
    features: string[];
    metrics?: string;
  };
}

export interface LearningPathway {
  id: string;
  title: string;
  grade: string;
  subtitle: string;
  duration: string;
  gradient: string;
  textColor: string;
  borderColor: string;
  icon: string;
  description: string;
  keySkills: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string[];
}

export interface Review {
  id: string;
  studentName: string;
  course: string;
  rating: number;
  comment: string;
  avatarBg: string;
  city: string;
}

export interface CertificateRecord {
  id: string;
  studentName: string;
  fatherName?: string;
  courseTitle: string;
  completionDate: string;
  grade: string;
  issueDate: string;
  instructor: string;
  status: 'verified' | 'expired' | 'revoked';
  qrCodeUrl?: string;
}

export interface EnrolledCourseItem {
  courseId: string;
  courseTitle: string;
  instructor: string;
  duration: string;
  progressPercent: number;
  status: 'Active' | 'Completed';
  enrolledDate: string;
  timing: string;
  mode: string;
}

export interface LectureItem {
  id: string;
  weekNumber: number;
  weekLabel: string;
  title: string;
  duration: string;
  status: 'Completed' | 'Current' | 'Locked';
  videoUrl?: string;
  notesTitle?: string;
  resourcesAvailable?: boolean;
  completedAt?: string;
}

export interface ClassScheduleItem {
  id: string;
  day: string;
  date: string;
  time: string;
  topic: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  instructor: string;
  joinLink: string;
}

export interface AssignmentItem {
  id: string;
  title: string;
  topic?: string;
  dueDate: string;
  instructions?: string;
  status: 'Pending' | 'Submitted' | 'Late' | 'Checked';
  submission?: {
    submittedAt: string;
    githubLink?: string;
    projectLink?: string;
    comments?: string;
    fileName?: string;
    score?: string;
    feedback?: string;
  };
}

export interface PracticalProjectItem {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  githubUrl?: string;
  liveDemoUrl?: string;
  videoDemoUrl?: string;
}

export interface AttendanceHistoryItem {
  date: string;
  day: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Late';
  topic: string;
}

export interface FeeHistoryItem {
  id: string;
  date: string;
  amount: number;
  method: string;
  tid: string;
  status: 'Paid' | 'Pending';
}

export interface PortalNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assignment' | 'class' | 'fee' | 'certificate' | 'announcement';
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'normal' | 'high';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  type: 'pdf' | 'zip' | 'link' | 'code';
  size?: string;
  downloadUrl?: string;
}

export interface PortalStudent {
  studentId: string;
  name: string;
  fatherName: string;
  email: string;
  whatsapp: string;
  phone: string;
  city: string;
  education: string;
  avatar: string;
  role: 'student' | 'admin';
  enrolledCourse: string;
  enrolledCourses: EnrolledCourseItem[];
  progressPercent: number;
  attendancePercent: number;
  feeStatus: 'Paid' | 'Pending' | 'Installment Due';
  attendance: {
    present: number;
    absent: number;
    leave: number;
    late: number;
    totalSessions: number;
    percentage: number;
    history: AttendanceHistoryItem[];
  };
  feeRecord: {
    totalFee: number;
    paidAmount: number;
    remainingAmount: number;
    status: 'Paid' | 'Pending' | 'Installment Due';
    history: FeeHistoryItem[];
  };
  lectures: LectureItem[];
  schedule: ClassScheduleItem[];
  assignments: AssignmentItem[];
  projects: PracticalProjectItem[];
  certificates: {
    id: string;
    title: string;
    issueDate: string;
    credentialId: string;
    grade: string;
  }[];
  notifications: PortalNotificationItem[];
  announcements: AnnouncementItem[];
  resources: ResourceItem[];
  nextClass: string;
  nextClassLink: string;
  recentRecordings?: {
    id: string;
    title: string;
    date: string;
    duration: string;
    instructor: string;
  }[];
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    action: string;
  };
}

export type AdminRole = 'super-admin' | 'admin' | 'instructor' | 'accountant' | 'admission-officer';

export interface AdmissionApplication {
  id: string;
  fullName: string;
  fatherName: string;
  whatsapp: string;
  email: string;
  city: string;
  education: string;
  course: string;
  mode: string;
  timing: string;
  referralSource?: string;
  appliedDate: string;
  status: 'New' | 'Contacted' | 'Interview' | 'Enrolled' | 'Rejected';
  notes?: string;
}

export interface InstructorProfile {
  id: string;
  name: string;
  title: string;
  qualification: string;
  bio: string;
  expertise: string[];
  assignedCourses: string[];
  phone: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  avatar?: string;
}

export interface ScheduledClassSession {
  id: string;
  courseTitle: string;
  topic: string;
  instructorName: string;
  date: string;
  day: string;
  time: string;
  classroom: string;
  zoomMeetLink: string;
  mode: 'Physical' | 'Online Live' | 'Hybrid';
  status: 'Scheduled' | 'Live Now' | 'Completed' | 'Cancelled';
}

export interface AutomationLog {
  id: string;
  event: string;
  source: string;
  destination: string;
  details: string;
  timestamp: string;
  status: 'Success' | 'Processing' | 'Failed';
}
