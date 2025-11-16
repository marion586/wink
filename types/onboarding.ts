export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  photo: File | null;
}

export interface WorkspaceData {
  logo: File | null;
  companyName: string;
  description: string;
  siteUrl: string;
  address: string;
  sector: string;
}

export interface PreferencesData {
  role: string;
  teamSize: string;
  goals: string[];
}

export interface OnboardingFormData {
  profile: ProfileData;
  workspace: WorkspaceData;
  preferences: PreferencesData;
}
