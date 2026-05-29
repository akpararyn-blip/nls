import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import { RecaptchaNotice } from "@/components/nls/RecaptchaNotice";
import { submitLead } from "@/lib/submitLead";
import { formatKzPhone } from "@/lib/phone-mask";
import { generateOrderNumber, saveLastOrder } from "@/lib/order-number";
import { useT } from "@/lib/lang-context";

export interface LeadFormProps {
  formName: string;
  action: string;
  idPrefix?: string;
  companyLabel?: string;
  messageLabel?: string;
  messageFieldKey?: string;
  submitLabel?: string;
  messageRows?: number;
  defaultMessage?: string;
  subject?: string;
  fullWidthButton?: boolean;
  onSuccess?: () => void;
  noRedirect?: boolean;
}

export function LeadForm({
  formName,
  action,
  idPrefix = "lead",
  companyLabel,
  messageLabel,
  messageFieldKey,
  submitLabel,
  messageRows = 4,
  defaultMessage,
  subject,
  fullWidthButton = true,
  onSuccess,
  noRedirect,
}: LeadFormProps) {
  const navigate = useNavigate();
  const t = useT();

  const lblCompany = companyLabel ?? t("Название компании или проекта", "Компания немесе жоба атауы");
  const lblMessage = messageLabel ?? t("Сообщение для менеджера", "Менеджер үшін хабарлама");
  const keyMessage = messageFieldKey ?? "Сообщение";
  const lblSubmit = submitLabel ?? t("Отправить заявку", "Өтінім жіберу");

  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (defaultMessage !== undefined && messageRef.current) {
      messageRef.current.value = defaultMessage;
    }
  }, [defaultMessage]);

  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatKzPhone(e.target.value));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || submitting) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      const fields: Record<string, string> = {
        [lblCompany]: String(fd.get("company") ?? ""),
        [t("ФИО", "Аты-жөні")]: String(fd.get("name") ?? ""),
        [t("Телефон", "Телефон")]: phone,
        [keyMessage]: String(fd.get("message") ?? ""),
        ...(subject ? { [t("Тема", "Тақырып")]: subject } : {}),
      };

      await submitLead({ formName, action, fields });

      // Сохраняем заявку для страницы thank-you
      const orderNumber = generateOrderNumber();
      saveLastOrder({
        number: orderNumber,
        formName,
        subject,
        fields,
        from: typeof window !== "undefined" ? window.location.pathname : "/",
        at: new Date().toISOString(),
      });

      form.reset();
      setPhone("");
      setConsent(false);
      if (onSuccess) onSuccess();
      if (!noRedirect) {
        navigate({ to: "/thank-you" });
      }
    } catch (err) {
      console.error(err);
      alert(t("Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз.", "Өтінімді жіберу мүмкін болмады. Қайталап көріңіз."));
    } finally {
      setSubmitting(false);
    }
  };

  const id = (suffix: string) => `${idPrefix}-${suffix}`;

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor={id("company")}>{lblCompany}</label>
        <input type="text" id={id("company")} name="company" className="form-control" required />
      </div>
      <div className="form-group">
        <label htmlFor={id("name")}>{t("ФИО", "Аты-жөні")}</label>
        <input type="text" id={id("name")} name="name" className="form-control" required />
      </div>
      <div className="form-group">
        <label htmlFor={id("phone")}>{t("Телефон", "Телефон")}</label>
        <input
          type="tel"
          id={id("phone")}
          name="phone"
          className="form-control"
          placeholder="+7 700 000 00 00"
          value={phone}
          onChange={onPhoneChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor={id("message")}>{lblMessage}</label>
        <textarea
          id={id("message")}
          name="message"
          className="form-control"
          rows={messageRows}
          ref={messageRef}
          defaultValue={defaultMessage}
        />
      </div>

      <ConsentCheckbox id={id("consent")} checked={consent} onChange={setConsent} />

      <button
        type="submit"
        className="btn btn-primary"
        style={fullWidthButton ? { width: "100%", fontSize: "1.1rem" } : undefined}
        disabled={!consent || submitting}
      >
        {submitting ? t("Отправка…", "Жіберілуде…") : lblSubmit}
      </button>
      <RecaptchaNotice />
    </form>
  );
}
