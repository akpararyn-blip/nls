import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import { RecaptchaNotice } from "@/components/nls/RecaptchaNotice";
import { submitLead } from "@/lib/submitLead";
import { formatKzPhone } from "@/lib/phone-mask";
import { generateOrderNumber, saveLastOrder } from "@/lib/order-number";
import { useT } from "@/lib/lang-context";
import { isPhoneSuspicious } from "@/lib/phone-validation";

export function HrApplyForm() {
  const navigate = useNavigate();
  const t = useT();
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ lastName: "", firstName: "", phone: "", position: "" });

  const onChange = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "phone") v = formatKzPhone(v);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || submitting) return;
    setSubmitting(true);
    try {
      const fields = {
        [t("Фамилия", "Тегі")]: form.lastName,
        [t("Имя", "Аты")]: form.firstName,
        [t("Телефон", "Телефон")]: form.phone,
        [t("Должность", "Лауазым")]: form.position,
      };
      await submitLead({
        formName: "HR — отклик на вакансию",
        action: "hr_apply",
        target: "hr",
        fields,
      });

      const orderNumber = generateOrderNumber();
      saveLastOrder({
        number: orderNumber,
        formName: "HR — отклик на вакансию",
        subject: t("Отклик на вакансию", "Бос орынға өтініш"),
        fields,
        from: typeof window !== "undefined" ? window.location.pathname : "/hr",
        at: new Date().toISOString(),
      });

      navigate({ to: "/thank-you", search: { type: "hr" } });
    } catch (err) {
      console.error(err);
      alert(t("Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз.", "Өтінімді жіберу мүмкін болмады. Қайталап көріңіз."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="hr-apply-form" onSubmit={onSubmit}>
      <div className="hr-form-row">
        <div className="hr-form-field">
          <label htmlFor="hr-lastname">{t("Фамилия", "Тегі")}</label>
          <input
            id="hr-lastname"
            type="text"
            value={form.lastName}
            onChange={onChange("lastName")}
            placeholder={t("Иванов", "Иванов")}
            required
          />
        </div>
        <div className="hr-form-field">
          <label htmlFor="hr-firstname">{t("Имя", "Аты")}</label>
          <input
            id="hr-firstname"
            type="text"
            value={form.firstName}
            onChange={onChange("firstName")}
            placeholder={t("Иван", "Иван")}
            required
          />
        </div>
      </div>
      <div className="hr-form-field">
        <label htmlFor="hr-phone">{t("Телефон", "Телефон")}</label>
        <input
          id="hr-phone"
          type="tel"
          value={form.phone}
          onChange={onChange("phone")}
          placeholder="+7 700 000 00 00"
          required
        />
      </div>
      <div className="hr-form-field">
        <label htmlFor="hr-position">{t("Должность, на которую претендуете", "Үміткер болып отырған лауазым")}</label>
        <input
          id="hr-position"
          type="text"
          value={form.position}
          onChange={onChange("position")}
          placeholder={t("Например, сетевой инженер", "Мысалы, желілік инженер")}
          required
        />
      </div>

      <ConsentCheckbox id="hr-consent" checked={consent} onChange={setConsent} />

      <button type="submit" className="btn btn-primary btn-block" disabled={!consent || submitting}>
        {submitting ? t("Отправка…", "Жіберілуде…") : t("Отправить заявку", "Өтінім жіберу")}
        <Send size={16} />
      </button>
      <RecaptchaNotice />
    </form>
  );
}
