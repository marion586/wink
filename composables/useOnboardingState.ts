import type { ProfileData, WorkspaceData, PreferencesData } from '~/types/onboarding';

export const useOnboardingState = () => {
  const profileData = useState<ProfileData>('onboarding-profile', () => ({
    firstName: '',
    lastName: '',
    email: '',
    photo: null,
  }));

  const workspaceData = useState<WorkspaceData>('onboarding-workspace', () => ({
    logo: null,
    companyName: '',
    description: '',
    siteUrl: '',
    address: '',
    sector: '',
  }));

  const preferencesData = useState<PreferencesData>('onboarding-preferences', () => ({
    role: '',
    teamSize: '',
    goals: [],
  }));

  const currentStep = useState<number>('onboarding-step', () => 1);

  const resetOnboarding = () => {
    profileData.value = {
      firstName: '',
      lastName: '',
      email: '',
      photo: null,
    };
    workspaceData.value = {
      logo: null,
      companyName: '',
      description: '',
      siteUrl: '',
      address: '',
      sector: '',
    };
    preferencesData.value = {
      role: '',
      teamSize: '',
      goals: [],
    };
    currentStep.value = 1;
  };

  return {
    profileData,
    workspaceData,
    preferencesData,
    currentStep,
    resetOnboarding,
  };
};
