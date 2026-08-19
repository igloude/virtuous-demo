import { forwardRef, type FormEvent, type FormHTMLAttributes, type ReactNode } from "react";
import "./Form.css";

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /** Called with the native event and a plain object of field name → value. */
  onSubmit?: (values: Record<string, FormDataEntryValue>, event: FormEvent<HTMLFormElement>) => void;
  /** Vertical gap between fields. */
  spacing?: "compact" | "normal" | "relaxed";
  /** Optional footer area, typically holds the action buttons. */
  actions?: ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { onSubmit, spacing = "normal", actions, className, children, ...rest },
  ref,
) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit?.(Object.fromEntries(data.entries()), event);
  };

  return (
    <form
      ref={ref}
      noValidate
      className={["vds-form", `vds-form--${spacing}`, className].filter(Boolean).join(" ")}
      onSubmit={handleSubmit}
      {...rest}
    >
      {children}
      {actions && <div className="vds-form__actions">{actions}</div>}
    </form>
  );
});
