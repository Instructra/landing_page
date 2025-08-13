export enum FormSubmissionStatus {
    IDLE = "idle",
    SUCCESS = "success",
    FAILED = "failed",
}

export interface FormState {
    status: FormSubmissionStatus;
    message?: string;
}