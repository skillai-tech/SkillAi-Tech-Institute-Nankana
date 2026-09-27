/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoursesSection from './components/CoursesSection';
import CourseModal from './components/CourseModal';
import WhyChooseSection from './components/WhyChooseSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import PathwaysSection from './components/PathwaysSection';
import GallerySection from './components/GallerySection';
import FeesPaymentSection from './components/FeesPaymentSection';
import CertificateVerification from './components/CertificateVerification';
import InstructorSection from './components/InstructorSection';
import TestimonialsSection from './components/TestimonialsSection';
import BlogAdmissionBanner from './components/BlogAdmissionBanner';
import Footer from './components/Footer';
import AdmissionModal from './components/AdmissionModal';
import StudentPortal from './components/StudentPortal';
import AdminDashboard from './components/AdminDashboard';
import SearchModal from './components/SearchModal';
import FloatingContactBar from './components/FloatingContactBar';
import AIChatAssistant from './components/AIChatAssistant';
import { Course } from './types';
import { COURSES } from './data/instituteData';

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [preSelectedCourseTitle, setPreSelectedCourseTitle] = useState('');
  const [portalPrefillId, setPortalPrefillId] = useState<string | undefined>(undefined);

  const handleOpenApplyModal = (courseTitle: string = '') => {
    setPreSelectedCourseTitle(courseTitle);
    setIsApplyModalOpen(true);
  };

  const handleOpenStudentPortal = (studentId?: string) => {
    if (studentId) {
      setPortalPrefillId(studentId);
    }
    setIsStudentPortalOpen(true);
  };

  const handleSelectCourseById = (courseId: string) => {
    const found = COURSES.find((c) => c.id === courseId);
    if (found) {
      setSelectedCourseForModal(found);
    }
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030814] text-slate-100 relative selection:bg-cyan-500 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* 3D Particle Network Canvas */}
      <ParticleCanvas />

      {/* Main Navigation Bar */}
      <Navbar
        onOpenApplyModal={() => handleOpenApplyModal()}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        onOpenStudentPortal={() => handleOpenStudentPortal()}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onSelectCourse={handleSelectCourseById}
      />

      {/* Main Content Sections in Ideal Flow */}
      <main className="relative z-10">
        {/* 1. Home / Hero Section */}
        <Hero
          onOpenApplyModal={() => handleOpenApplyModal()}
          onExploreCourses={scrollToCourses}
        />

        {/* 2. Why Choose SkillAI Section */}
        <WhyChooseSection onLearnMore={scrollToAbout} />

        {/* 3. About SkillAI Section & Stats Counter */}
        <AboutSection onOpenApplyModal={() => handleOpenApplyModal()} />

        {/* 4. Categorized Courses Catalog */}
        <CoursesSection
          onSelectCourse={(course) => setSelectedCourseForModal(course)}
          onOpenApplyModalWithCourse={(title) => handleOpenApplyModal(title)}
        />

        {/* 5. Student Projects / Portfolio */}
        <ProjectsSection />

        {/* 6. Learning Pathways */}
        <PathwaysSection
          onOpenApplyModal={() => handleOpenApplyModal()}
          onExploreCourses={scrollToCourses}
        />

        {/* 7. Campus Life & Learning Environment Gallery */}
        <GallerySection />

        {/* 8. Easy Enrollment & Fees Payment */}
        <FeesPaymentSection onOpenApplyModal={() => handleOpenApplyModal()} />

        {/* 9. Official Certificate Verification System */}
        <CertificateVerification />

        {/* 10. Meet Your Instructor / Founder */}
        <InstructorSection />

        {/* 11. Student Reviews / Testimonials */}
        <TestimonialsSection />

        {/* 12. Blog & Admission Dual Banner */}
        <BlogAdmissionBanner onOpenApplyModal={() => handleOpenApplyModal()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenApplyModal={() => handleOpenApplyModal()}
        onOpenStudentPortal={() => handleOpenStudentPortal()}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onSelectCourse={handleSelectCourseById}
      />

      {/* Floating Quick Action Contacts (WhatsApp & Phone) */}
      <FloatingContactBar onOpenApplyModal={() => handleOpenApplyModal()} />

      {/* Floating Ask SkillAI Smart Assistant */}
      <AIChatAssistant onOpenApplyModal={handleOpenApplyModal} />

      {/* Online Admission Application Modal */}
      <AdmissionModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preSelectedCourse={preSelectedCourseTitle}
        onOpenStudentPortal={handleOpenStudentPortal}
      />

      {/* Detailed Course Syllabus & Overview Modal */}
      <CourseModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onEnroll={(title) => handleOpenApplyModal(title)}
      />

      {/* Student Portal / LMS Modal */}
      <StudentPortal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
        prefillStudentId={portalPrefillId}
        onOpenApplyModal={() => {
          setIsStudentPortalOpen(false);
          handleOpenApplyModal();
        }}
        onOpenAdminDashboard={() => {
          setIsStudentPortalOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* SkillAI Executive Admin Control Center */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onOpenStudentPortal={() => {
          setIsAdminDashboardOpen(false);
          setIsStudentPortalOpen(true);
        }}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectCourse={(course) => setSelectedCourseForModal(course)}
      />
    </div>
  );
}
