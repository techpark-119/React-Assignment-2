import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface StepperState {
  currentStep: number;
  personalInfo: {
    name: string;
    email: string;
    studentId: string;
  };
  laptopNeeds: string[];
  scholarshipStatus: string;
}

const initialState: StepperState = {
  currentStep: 1,
  personalInfo: {
    name: '',
    email: '',
    studentId: '',
  },
  laptopNeeds: [],
  scholarshipStatus: '',
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<StepperState['personalInfo']>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateLaptopNeeds: (state, action: PayloadAction<{ brand: string; checked: boolean }>) => {
      const { brand, checked } = action.payload;
      if (checked) {
        if (!state.laptopNeeds.includes(brand)) {
          state.laptopNeeds.push(brand);
        }
      } else {
        state.laptopNeeds = state.laptopNeeds.filter(b => b !== brand);
      }
    },
    updateScholarshipStatus: (state, action: PayloadAction<string>) => {
      state.scholarshipStatus = action.payload;
    },
    resetForm: (state) => {
      state.currentStep = 1;
      state.personalInfo = { name: '', email: '', studentId: '' };
      state.laptopNeeds = [];
      state.scholarshipStatus = '';
    },
  },
});

export const { nextStep, prevStep, updatePersonalInfo, updateLaptopNeeds, updateScholarshipStatus, resetForm } = stepperSlice.actions;
export default stepperSlice.reducer;