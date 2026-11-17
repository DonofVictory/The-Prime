import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { isDemo, post } from "../lib/api";

/**
 * Shared form behaviour.
 * States: idle -> sending -> success | error. Success only when the API confirms.
 * On error, everything the person typed stays in place.
 * Validation uses the browser's built-in rules (required, type=email, min/max)
 * with our own messages from each field's `error` prop.
 */

type Status = "idle" | "sending" | "success" | "error";
type Errors = Record<string, string>;

const FormCtx = createContext<{ errors: Errors; formId: string }>({ errors: {}, formId: "" });
const useFormErrors = () => useContext(FormCtx);

type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** The name of the field an input/change event came from. */
const fieldName = (target: EventTarget) => (target as Partial<FieldEl>).name ?? "";

function messageFor(el: FieldEl) {
  const custom = el.dataset.error;
  if (el.validity.valueMissing) return custom ?? "This field is required.";
  if (el.validity.typeMismatch && el.type === "email") return "Enter an email address like name@example.com.";
  if (el.validity.rangeUnderflow || el.validity.rangeOverflow) return custom ?? "Enter a number in the allowed range.";
  return el.validationMessage;
}

function serialize(form: HTMLFormElement) {
  const data: Record<string, unknown> = {};
  new FormData(form).forEach((value, key) => {
    if (key === "website") return;
    const v = typeof value === "string" ? value.trim() : value;
    if (key in data) {
      const prev = data[key];
      data[key] = Array.isArray(prev) ? [...prev, v] : [prev, v];
    } else data[key] = v;
  });
  return data;
}

export function Form({
  id,
  endpoint,
  submit,
  successTitle,
  successText,
  className,
  children,
  onSuccess,
}: {
  id: string;
  endpoint: string;
  submit: string;
  successTitle: string;
  successText?: string;
  className?: string;
  children: ReactNode;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "error") alertRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function clear(name: string) {
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;

    const next: Errors = {};
    let first: FieldEl | null = null;
    for (const el of Array.from(form.elements) as FieldEl[]) {
      if (!("validity" in el) || !el.name || el.name === "website" || el.disabled) continue;
      if (el.closest("[hidden]") || next[el.name]) continue;
      if (!el.checkValidity()) {
        next[el.name] = messageFor(el);
        first ??= el;
      }
    }
    setErrors(next);
    if (first) {
      first.focus();
      return;
    }

    // Honeypot: a bot filled the hidden field. Pretend it worked, send nothing.
    const isBot = Boolean((form.elements.namedItem("website") as HTMLInputElement | null)?.value);

    setStatus("sending");
    try {
      if (!isBot) await post(endpoint, serialize(form));
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  return (
    <FormCtx.Provider value={{ errors, formId: id }}>
      <form
        id={id}
        className={["form", className].filter(Boolean).join(" ")}
        noValidate
        hidden={status === "success"}
        onSubmit={handleSubmit}
        onInput={(e) => clear(fieldName(e.target))}
        onChange={(e) => clear(fieldName(e.target))}
      >
        <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef} hidden={status !== "error"}>
          <strong>That did not send.</strong> Check your internet connection and press "{submit}" again. What you typed
          is still here.
        </div>
        {children}
        <div className="hp" aria-hidden="true">
          <label>
            Leave this empty <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="form-foot">
          <button type="submit" className="btn btn-sky" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : submit}
          </button>
          {isDemo && <p className="demo-note">Demo mode: this form is not connected yet, so nothing is sent.</p>}
        </div>
      </form>
      <div className="success" tabIndex={-1} role="status" ref={successRef} hidden={status !== "success"}>
        <h3>{successTitle}</h3>
        {successText && <p>{successText}</p>}
      </div>
    </FormCtx.Provider>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "number";
  textarea?: boolean;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  min?: number;
  max?: number;
  className?: string;
};

export function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
  optional = false,
  hint,
  error,
  autoComplete,
  inputMode,
  min,
  max,
  className,
}: FieldProps) {
  const id = useId();
  const { errors } = useFormErrors();
  const message = errors[name] ?? "";
  const describedBy = [hint ? `${id}-hint` : null, `${id}-error`].filter(Boolean).join(" ");
  const common = {
    id,
    name,
    required,
    "aria-describedby": describedBy,
    "aria-invalid": message ? true : undefined,
    "data-error": error,
  };
  return (
    <div className={["field", className].filter(Boolean).join(" ")}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="optional"> (optional)</span>}
      </label>
      {hint && (
        <span className="hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {textarea ? (
        <textarea {...common} />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} inputMode={inputMode} min={min} max={max} />
      )}
      <span className="field-error" id={`${id}-error`} aria-live="polite">
        {message}
      </span>
    </div>
  );
}

/** A group of pill-shaped radio buttons. */
export function Choices({
  legend,
  name,
  options,
  required = false,
  defaultValue,
  error,
  className,
  children,
}: {
  legend: string;
  name: string;
  options: { value: string; label?: string }[];
  required?: boolean;
  defaultValue?: string;
  error?: string;
  className?: string;
  children?: ReactNode;
}) {
  const id = useId();
  const { errors } = useFormErrors();
  const message = errors[name] ?? "";
  return (
    <fieldset className={["choices", className].filter(Boolean).join(" ")}>
      <legend>{legend}</legend>
      <div className="chips">
        {options.map((o) => (
          <label className="chip" key={o.value}>
            <input
              type="radio"
              name={name}
              value={o.value}
              required={required}
              defaultChecked={o.value === defaultValue}
              aria-describedby={`${id}-error`}
              aria-invalid={message ? true : undefined}
              data-error={error}
            />
            <span>{o.label ?? o.value}</span>
          </label>
        ))}
      </div>
      {children}
      <span className="field-error" id={`${id}-error`} aria-live="polite">
        {message}
      </span>
    </fieldset>
  );
}

export function Checkbox({
  name,
  label,
  required = false,
  error,
  className,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
}) {
  const id = useId();
  const { errors } = useFormErrors();
  const message = errors[name] ?? "";
  return (
    <div className={className}>
      <label className="check">
        <input
          type="checkbox"
          name={name}
          value="yes"
          required={required}
          aria-describedby={`${id}-error`}
          aria-invalid={message ? true : undefined}
          data-error={error}
        />
        <span>{label}</span>
      </label>
      <span className="field-error" id={`${id}-error`} aria-live="polite">
        {message}
      </span>
    </div>
  );
}
