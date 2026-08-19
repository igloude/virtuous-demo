import { forwardRef, type AnchorHTMLAttributes } from "react";
import "./Link.css";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Opens in a new tab and adds safe rel attributes. */
  external?: boolean;
  /** Show the underline only on hover instead of always. */
  subtle?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { external = false, subtle = false, className, children, ...rest },
  ref,
) {
  const classes = ["vds-link", subtle && "vds-link--subtle", className].filter(Boolean).join(" ");
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a ref={ref} className={classes} {...externalProps} {...rest}>
      {children}
      {external && <span className="vds-link__external" aria-hidden="true">↗</span>}
    </a>
  );
});
