export interface FileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  onError?: (error: string) => void;
}

export interface FileUploadReturn {
  previewUrl: Readonly<Ref<string | null>>;
  isLoading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<string | null>>;
  handleFileUpload: (file: File) => Promise<boolean>;
  reset: () => void;
}
