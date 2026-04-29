import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import { RecaptchaNotice } from "@/components/nls/RecaptchaNotice";
import { submitLead } from "@/lib/submitLead";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^7?/, "");
  const m = digits.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  if (!m) return "+7";
  const [, a, b, c, d] = m;
  return "+7 " + (a || "") + (b ? " " + b : "") + (c ? "-" + c : "") + (d ? "-" + d : "");
}

/**
 * Форма отклика на вакансию. Уходит в HR-чат Telegram, после успеха —
 * редирект на /thank-you?type=hr (страница покажет другой текст).
 */
export function HrApplyForm() {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ lastName: "", firstName: "", phone: "", position: "" });

  const onChange = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "phone") v = formatPhone(v);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || submitting) return;
    setSubmitting(true);
    try {
      await submitLead({
        formName: "HR — отклик на вакансию",
        action: "hr_apply",
        target: "hr",
        fields: {
          "Фамилия": form.lastName,
          "Имя": form.firstName,
          "Телефон": form.phone,
          "Должность": form.position,
        },
      });
      navigate({ to: "/thank-you", search: { type: "hr" } });
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="hr-apply-form" onSubmit={onSubmit}>
      <div className="hr-form-row">
        <div className="hr-form-field">
          <label htmlFor="hr-lastname">Фамилия</label>
          <input
            id="hr-lastname"
            type="text"
            value={form.lastName}
            onChange={onChange("lastName")}
            placeholder="Иванов"
            required
          />
        </div>
        <div className="hr-form-field">
          <label htmlFor="hr-firstname">Имя</label>
          <input
            id="hr-firstname"
            type="text"
            value={form.firstName}
            onChange={onChange("firstName")}
            placeholder="Иван"
            required
          />
        </div>
      </div>
      <div className="hr-form-field">
        <label htmlFor="hr-phone">Телефон</label>
        <input
          id="hr-phone"
          type="tel"
          value={form.phone}
          onChange={onChange("phone")}
          placeholder="+7 700 000-00-00"
          required
        />
      </div>
      <div className="hr-form-field">
        <label htmlFor="hr-position">Должность, на которую претендуете</label>
        <input
          id="hr-position"
          type="text"
          value={form.position}
          onChange={onChange("position")}
          placeholder="Например, сетевой инженер"
          required
        />
      </div>

      <ConsentCheckbox id="hr-consent" checked={consent} onChange={setConsent} />

      <button type="submit" className="btn btn-primary btn-block" disabled={!consent || submitting}>
        {submitting ? "Отправка…" : "Отправить заявку"}
        <Send size={16} />
      </button>
      <RecaptchaNotice />
    </form>
  );
}
