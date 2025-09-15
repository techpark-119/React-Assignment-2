import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { updatePersonalInfo, updateLaptopNeeds, updateScholarshipStatus, nextStep, prevStep, resetForm } from '../store/stepperSlice';
import HorizontalStepper from './HorizontalStepper';
import PersonalInfo from './steps/PersonalInfo';
import LaptopNeeds from './steps/LaptopNeeds';
import Eligibility from './steps/Eligibility';
import ReviewSubmit from './steps/ReviewSubmit';

const steps = [
  { label: 'Personal Info', step: 1 },
  { label: 'Laptop Needs', step: 2 },
  { label: 'Eligibility', step: 3 },
  { label: 'Review & Submit', step: 4 },
];

const Stepper: React.FC = () => {
  const dispatch = useDispatch();
  const { currentStep, personalInfo, laptopNeeds, scholarshipStatus } = useSelector((state: RootState) => state.stepper);
  const [submitted, setSubmitted] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePersonalInfo({ [e.target.name]: e.target.value }));
  };

  const handleLaptopNeedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    dispatch(updateLaptopNeeds({ brand: value, checked }));
  };

  const handleScholarshipChange = (_field: 'scholarshipStatus', value: string) => {
    dispatch(updateScholarshipStatus(value));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      dispatch(prevStep());
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRestart = () => {
    setSubmitted(false);
    dispatch(resetForm());
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return personalInfo.name && personalInfo.email && personalInfo.studentId;
      case 2:
        return laptopNeeds.length > 0;
      case 3:
        return scholarshipStatus.trim() !== '';
      default:
        return true;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Success animation background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center">
          <div className="relative mb-8">
            <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-500 shadow-2xl">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce text-2xl">
              ✨
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-300 text-xl">
              🎉
            </div>
          </div>

          <div className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent">
              Success!
            </span>
            <span className="ml-2">🎆</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-3">
              Application Submitted Successfully
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Thank you for applying! Our team will review your scholarship
              application and contact you within
              <span className="text-emerald-400 font-semibold">
                {' '}
                5-7 business days
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-emerald-400 font-bold text-lg">✓</div>
              <div className="text-gray-300">Submitted</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-blue-400 font-bold text-lg">📧</div>
              <div className="text-gray-300">Email Sent</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Submit Another Application
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfo
            name={personalInfo.name}
            email={personalInfo.email}
            studentId={personalInfo.studentId}
            onChange={handlePersonalInfoChange}
          />
        );
      case 2:
        return (
          <LaptopNeeds
            selectedBrands={laptopNeeds}
            onChange={handleLaptopNeedsChange}
          />
        );
      case 3:
        return (
          <Eligibility
            scholarshipStatus={scholarshipStatus}
            onChange={handleScholarshipChange}
          />
        );
      case 4:
        return (
          <ReviewSubmit
            formData={{
              personalInfo,
              laptopNeeds,
              scholarshipStatus,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-8 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">💻 Laptop Scholarship</h1>
                <p className="text-white/80 text-lg">Your path to academic success starts here</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 rounded-full px-4 py-2">
              <span className="text-white font-medium">Step {currentStep} of {steps.length}</span>
            </div>
          </div>

          <div className="p-8">
            <HorizontalStepper steps={steps} activeStep={currentStep} />
            
            <div className="mt-12 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                {renderStepContent()}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="group flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              {currentStep === steps.length ? (
                <button
                  onClick={handleSubmit}
                  className="group flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <span>🚀 Submit Application</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Continue
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;