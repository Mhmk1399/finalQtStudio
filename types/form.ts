// Form field types
export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "password"
  | "select"
  | "textarea"
  | "number"
  | "date"
  | "checkbox"
  | "radio"
  | "hidden";

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOption[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  defaultValue?: string | number | boolean;
  description?: string;
  className?: string;
  readonly?: boolean;
  hidden?: boolean;
  onChange?: (fieldName: string, value: string) => void;
}

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  submitButtonText?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onChange?: (fieldName: string, value: string | number | boolean) => void;
  className?: string;
}

export interface FormData {
  [key: string]: string | number | boolean | File;
}

export interface FormState {
  data: FormData;
  errors: { [key: string]: string };
  loading: boolean;
  success: boolean;
}
