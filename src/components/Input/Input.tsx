import { forwardRef, useId, type InputHTMLAttributes } from "react";
import "../field.css";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label rendered above the control. */
  label: string;
  /** Supporting text shown beneath the control. */
  hint?: string;
  /** Error message; when set, the field is marked invalid. */
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id: idProp, required, className, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={["vds-field", error && "vds-field--invalid", className].filter(Boolean).join(" ")}>
      <label className="vds-field__label" htmlFor={id}>
        {label}
        {required && <span className="vds-field__required" aria-hidden="true">*</span>}
      </label>
      <input
        ref={ref}
        id={id}
        className="vds-field__control"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && <span id={hintId} className="vds-field__hint">{hint}</span>}
      {error && <span id={errorId} className="vds-field__error" role="alert">{error}</span>}
    </div>
  );
});
