export enum FormSubmissionStatus {
    IDLE = "idle",
    SENDING = "sending",
    SUCCESS = "success",
    FAILED = "failed",
}

export interface FormState {
    status: FormSubmissionStatus;
    message?: string;
}