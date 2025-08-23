import { useState, useEffect } from "react";

type ValidationRule = (value: string) => string | null;

type FieldConfig = {
    value: string;
    rules: ValidationRule[];
};

type FormConfig<T extends string> = Record<T, FieldConfig>;

export function useFormValidation<T extends string>(config: FormConfig<T>) {
    const [values, setValues] = useState(
        Object.fromEntries(Object.keys(config).map((k) => [k, config[k as T].value])) as Record<T, string>
    );
    const [touched, setTouched] = useState(Object.fromEntries(Object.keys(config).map((k) => [k, false])) as Record<T, boolean>);
    const [errors, setErrors] = useState({} as Record<T, string | null>);
    const [isFormValid, setIsFormValid] = useState(false);

    // Run validation whenever values change
    useEffect(() => {
        const newErrors = {} as Record<T, string | null>;

        (Object.keys(config) as T[]).forEach((key) => {
            const rules = config[key].rules;
            const value = values[key];
            for (const rule of rules) {
                const error = rule(value);
                if (error) {
                    newErrors[key] = error;
                    break; // stop at first error
                }
            }
        });

        setErrors(newErrors);
        setIsFormValid(Object.values(newErrors).every((e) => !e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values,]);

    const setValue = (field: T, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const setFieldTouched = (field: T) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    return {
        values,
        setValue,
        touched,
        setFieldTouched,
        errors,
        isFormValid,
    };
}

// ----- reusable validators -----
export const required = (msg = "This field is required") => (value: string) =>
    value.trim() ? null : msg;

export const minLength = (len: number, msg?: string) => (value: string) =>
    value.trim().length >= len ? null : msg ?? `Must be at least ${len} characters`;

export const emailFormat = (msg = "Invalid email address") => (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? null : msg;