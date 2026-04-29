import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import { RecaptchaNotice } from "@/components/nls/RecaptchaNotice";
import { submitLead } from "@/lib/submitLead";

export interface LeadFormProps {
  /** Имя формы для Telegram (например, «Главная — заявка на IT-решение») */
  formName: string;
  /** action для reCAPTCHA v3, латиница и подчёркивания */
  action: string;
  /** Префикс id-полей, чтобы не было конфликтов на странице с несколькими формами */
  idPrefix?: string;
  /** Подпись для поля компании */
  companyLabel?: string;
  /** Подпись для поля сообщения */
  messageLabel?: string;
  /** Ключ для поля сообщения в Telegram */
  messageFieldKey?: string;
  /** Текст кнопки */
  submitLabel?: string;
  /** Высота textarea */
  messageRows?: number;
  /** Преднаполненный текст в комментарии (используется в модалке) */
  defaultMessage?: string;
  /** Дополнительная тема, которая попадёт в Telegram (для модалки) */
  subject?: string;
  /** Стиль кнопки */
  fullWidthButton?: boolean;
  /** Колбэк после успешной отправки (если не нужен редирект) */
  onSuccess?: () => void;
  /** Не делать редирект на /thank-you (по умолчанию редирект включён) */
  noRedirect?: boolean;
}

/**
 * Универсальная форма заявки. Используется на главной и страницах услуг,
 * а также внутри модального окна консультации.
 */
export function LeadForm({
  formName,
  action,
  idPrefix = "lead",
  companyLabel = "Название компании или проекта",
  messageLabel = "Сообщение для менеджера",
  messageFieldKey = "Сообщение",
  submitLabel = "Отправить заявку",
  messageRows = 4,
  defaultMessage,
  subject,
  fullWidthButton = true,
  onSuccess,
  noRedirect,
}: LeadFormProps) {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Если меняется тема (модалка с темой), обновляем textarea
  useEffect(() => {
    if (defaultMessage !== undefined && messageRef.current) {
      messageRef.current.value = defaultMessage;
    }
  }, [defaultMessage]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || submitting) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      await submitLead({
        formName,
        action,
        fields: {
          [companyLabel]: String(fd.get("company") ?? ""),
          "ФИО": String(fd.get("name") ?? ""),
          "Телефон": String(fd.get("phone") ?? ""),
          [messageFieldKey]: String(fd.get("message") ?? ""),
          ...(subject ? { Тема: subject } : {}),
        },
      });
      form.reset();
      setConsent(false);
      if (onSuccess) onSuccess();
      if (!noRedirect) {
        navigate({ to: "/thank-you" });
      }
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  const id = (suffix: string) => `${idPrefix}-${suffix}`;

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor={id("company")}>{companyLabel}</label>
        <input type="text" id={id("company")} name="company" className="form-control" required />
      </div>
      <div className="form-group">
        <label htmlFor={id("name")}>ФИО</label>
        <input type="text" id={id("name")} name="name" className="form-control" required />
      </div>
      <div className="form-group">
        <label htmlFor={id("phone")}>Телефон</label>
        <input
          type="tel"
          id={id("phone")}
          name="phone"
          className="form-control"
          placeholder="+7 7__ ___ __ __"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor={id("message")}>{messageLabel}</label>
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
        {submitting ? "Отправка…" : submitLabel}
      </button>
      <RecaptchaNotice />
    </form>
  );
}
