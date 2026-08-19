import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import "../field.css";
import "./Textarea.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label rendered above the control. */
  label: string;
  /** Supporting text shown beneath the control. */
  hint?: string;
  /** Error message; when set, the field is marked invalid. */
  error?: string;
  /** Controls which directions the user may resize the control. */
  resize?: "none" | "vertical" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, resize = "vertical", id: idProp, required, rows = 4, className, ...rest },
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
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`vds-field__control vds-textarea vds-textarea--resize-${resize}`}
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
