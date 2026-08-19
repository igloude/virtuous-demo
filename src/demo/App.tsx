import { useEffect, useState } from "react";
import { Button, Form, Input, Link, Textarea, applyTheme, getStoredTheme, type Theme } from "../index";

export function App() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue> | null>(null);
  const [emailError, setEmailError] = useState<string>();

  useEffect(() => applyTheme(theme), [theme]);

  return (
    <main className="demo">
      <header className="demo__header">
        <div>
          <h1 style={{ margin: 0 }}>Virtuous Demo DS</h1>
          <p className="demo__muted" style={{ margin: 0 }}>Tokens · Button · Input · Textarea · Link · Form</p>
        </div>
        <div className="demo__row" role="group" aria-label="Theme">
          {(["light", "system", "dark"] as Theme[]).map((t) => (
            <Button key={t} size="sm" variant={theme === t ? "primary" : "secondary"} onClick={() => setTheme(t)}>
              {t}
            </Button>
          ))}
        </div>
      </header>

      <section className="demo__section">
        <h2>Button</h2>
        <div className="demo__row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="demo__section">
        <h2>Link</h2>
        <p>
          Read the <Link href="#docs">documentation</Link>, or visit{" "}
          <Link href="https://example.com" external>an external site</Link>. Here is a{" "}
          <Link href="#subtle" subtle>subtle link</Link>.
        </p>
      </section>

      <section className="demo__section">
        <h2>Form</h2>
        <div className="demo__card">
          <Form
            onSubmit={(values) => {
              const email = String(values.email ?? "");
              if (!email.includes("@")) {
                setEmailError("Enter a valid email address.");
                setSubmitted(null);
                return;
              }
              setEmailError(undefined);
              setSubmitted(values);
            }}
            actions={
              <>
                <Button type="reset" variant="secondary" onClick={() => setSubmitted(null)}>Reset</Button>
                <Button type="submit">Send</Button>
              </>
            }
          >
            <Input name="name" label="Name" placeholder="Ada Lovelace" required />
            <Input name="email" label="Email" type="email" hint="We'll never share it." error={emailError} required />
            <Textarea name="message" label="Message" placeholder="Say hello…" />
          </Form>
          {submitted && (
            <pre className="demo__muted" style={{ marginTop: "var(--space-4)" }}>{JSON.stringify(submitted, null, 2)}</pre>
          )}
        </div>
      </section>
    </main>
  );
}
