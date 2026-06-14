import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import { RecaptchaNotice } from "@/components/nls/RecaptchaNotice";
import { submitLead } from "@/lib/submitLead";
import { formatKzPhone } from "@/lib/phone-mask";
import { isPhoneSuspicious } from "@/lib/phone-validation";
import { generateOrderNumber, saveLastOrder } from "@/lib/order-number";
import { useT } from "@/lib/lang-context";
import { useCity, type CityKey } from "@/lib/city-context";

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
  /** Показать поля «Адрес» и «Город» (только для страницы /internet) */
  showAddress?: boolean;
  /** Запретить редактирование поля комментария (для заявок из конфигураторов) */
  messageReadOnly?: boolean;
  /** Доп. поля, попадающие в текст заявки (например, выбранный тариф/услуга) */
  extraFields?: Record<string, string>;
}

const CITY_NAMES_RU: Record<CityKey, string> = {
  Almaty: "Алматы",
  Astana: "Астана",
  Shymkent: "Шымкент",
  Other: "Другие города",
};

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
  showAddress = false,
  messageReadOnly = false,
  extraFields,
}: LeadFormProps) {
  const navigate = useNavigate();
  const t = useT();
  const { cityKey, city } = useCity();

  const lblCompany = companyLabel ?? t("Название компании или проекта", "Компания немесе жоба атауы");
  const lblMessage = messageLabel ?? t("Сообщение для менеджера", "Менеджер үшін хабарлама");
  const keyMessage = messageFieldKey ?? "Сообщение";
  const lblSubmit = submitLabel ?? t("Отправить заявку", "Өтінім жіберу");

  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityKey>(cityKey);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSelectedCity(cityKey);
  }, [cityKey]);

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
      const companyValue = String(fd.get("company") ?? "");
      // Ищем 12 цифр подряд только в поле «Название компании или ИИН/БИН»
      const iinMatch = companyValue.replace(/\D+/g, " ").match(/(?<!\d)(\d{12})(?!\d)/);
      const iin = iinMatch ? iinMatch[1] : undefined;

      const cityRu = showAddress ? CITY_NAMES_RU[selectedCity] : city.name.ru;

      const fields: Record<string, string> = {
        [lblCompany]: companyValue,
        [t("ФИО", "Аты-жөні")]: String(fd.get("name") ?? ""),
        [t("Телефон", "Телефон")]: phone,
        ...(showAddress
          ? {
              ["Адрес"]: String(fd.get("address") ?? ""),
              ["Город"]: CITY_NAMES_RU[selectedCity],
            }
          : {
              ["Город"]: city.name.ru,
            }),
        [keyMessage]: String(fd.get("message") ?? ""),
        ...(subject ? { [t("Тема", "Тақырып")]: subject } : {}),
      };

      const suspicious = isPhoneSuspicious(phone);
      await submitLead({ formName, action, fields, city: cityRu, iin, isSpam: suspicious });

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
        navigate({ to: suspicious ? "/spam" : "/thank-you" });
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

      {showAddress && (
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor={id("address")}>
              {t("Адрес", "Мекенжай")}{" "}
              <span style={{ color: "var(--color-text-light)", fontWeight: 400, fontSize: "0.85em" }}>
                {t("(необязательно)", "(міндетті емес)")}
              </span>
            </label>
            <input
              type="text"
              id={id("address")}
              name="address"
              className="form-control"
              placeholder={t("ул., дом, офис", "көше, үй, кеңсе")}
            />
          </div>
          <div className="form-group">
            <label htmlFor={id("city")}>{t("Город", "Қала")}</label>
            <select
              id={id("city")}
              name="city"
              className="form-control"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value as CityKey)}
            >
              <option value="Almaty">{t("Алматы", "Алматы")}</option>
              <option value="Astana">{t("Астана", "Астана")}</option>
              <option value="Shymkent">{t("Шымкент", "Шымкент")}</option>
              <option value="Other">{t("Другие города", "Басқа қалалар")}</option>
            </select>
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor={id("message")}>{lblMessage}</label>
        <textarea
          id={id("message")}
          name="message"
          className="form-control"
          rows={messageRows}
          ref={messageRef}
          defaultValue={defaultMessage}
          readOnly={messageReadOnly}
          aria-readonly={messageReadOnly}
          style={messageReadOnly ? { backgroundColor: "var(--color-bg-muted, #f5f5f5)", cursor: "not-allowed" } : undefined}
        />
        {messageReadOnly && (
          <small style={{ color: "var(--color-text-light)", fontSize: "0.8em", display: "block", marginTop: 4 }}>
            {t(
              "Состав заявки из конфигуратора зафиксирован и недоступен для изменения.",
              "Конфигуратордан жасалған өтінімнің құрамы тіркелген және өзгертуге болмайды."
            )}
          </small>
        )}
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
