import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useT } from "@/lib/lang-context";

export const Route = createFileRoute("/requisites")({
  head: () => ({
    meta: [
      { title: "Реквизиты ТОО «NLS Kazakhstan» — банковские реквизиты, БИН" },
      {
        name: "description",
        content:
          "Полные реквизиты ТОО «NLS KAZAKHSTAN»: юридический адрес, БИН 081040014026, банковские счета в Bereke Bank, Halyk Bank, Kaspi Bank.",
      },
      { property: "og:title", content: "Реквизиты NLS Kazakhstan" },
      {
        property: "og:description",
        content: "Юридический адрес, БИН, контакты и банковские реквизиты ТОО «NLS Kazakhstan».",
      },
    ],
  }),
  component: RequisitesPage,
});

function RequisitesPage() {
  const t = useT();
  return (
    <SiteLayout>
      <section className="requisites-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">{t("Документы", "Құжаттар")}</span>
            <h1>{t("Реквизиты ТОО «NLS Kazakhstan»", "«NLS Kazakhstan» ЖШС деректемелері")}</h1>
            <p>
              {t(
                "Используйте эти реквизиты для оплаты и заключения договоров.",
                "Төлем мен шарт жасасу үшін осы деректемелерді пайдаланыңыз."
              )}
            </p>
          </div>

          <div className="requisites-card">
            <table className="requisites-table">
              <tbody>
                <tr>
                  <th>{t("Наименование", "Атауы")}</th>
                  <td>ТОО «NLS KAZAKHSTAN»</td>
                </tr>
                <tr>
                  <th>{t("Директор", "Директор")}</th>
                  <td>Васильев Антон Андреевич</td>
                </tr>
                <tr>
                  <th>{t("Юридический адрес", "Заңды мекенжайы")}</th>
                  <td>
                    Республика Казахстан, 050000,<br />
                    г. Алматы, Бостандыкский район, проспект Аль-Фараби д.95, оф.115
                  </td>
                </tr>
                <tr>
                  <th>{t("Адрес для счетов и почты", "Шот пен пошта мекенжайы")}</th>
                  <td>
                    Республика Казахстан, 050000,<br />
                    г. Алматы, Бостандыкский район, проспект Аль-Фараби д.95, оф.115
                  </td>
                </tr>
                <tr>
                  <th>{t("Телефон", "Телефон")}</th>
                  <td>
                    <a href="tel:+77273397777">+7 (727) 339 77 77</a>
                  </td>
                </tr>
                <tr>
                  <th>E-mail</th>
                  <td>
                    <a href="mailto:sales@nls.kz">sales@nls.kz</a>
                  </td>
                </tr>
                <tr>
                  <th>{t("По вопросам оплаты", "Төлем мәселелері бойынша")}</th>
                  <td>
                    <a href="tel:+77273397777">+7 727 339 77 77</a>
                  </td>
                </tr>
                <tr>
                  <th>{t("Техническая поддержка", "Техникалық қолдау")}</th>
                  <td>
                    <a href="tel:+77273397777">+7 (727) 339 77 77</a>
                    <br />
                    <a href="mailto:support@nls.kz">support@nls.kz</a>
                  </td>
                </tr>
                <tr>
                  <th>{t("По договору", "Шарт бойынша")}</th>
                  <td>
                    <a href="tel:+77273397777">+7 727 339 77 77</a>
                  </td>
                </tr>
                <tr>
                  <th>БИН/ИИН</th>
                  <td>081040014026</td>
                </tr>
                <tr>
                  <th>{t("Свидетельство о постановке на учёт по НДС", "ҚҚС бойынша есепке қою туралы куәлік")}</th>
                  <td>Серия 60001 №0069022 от 06.09.2012</td>
                </tr>
              </tbody>
            </table>

            <h2 className="requisites-banks-title">{t("Банковские реквизиты", "Банктік деректемелер")}</h2>

            <div className="requisites-banks">
              <div className="requisites-bank">
                <h3>АО «Bereke Bank»</h3>
                <p><b>БИК:</b> BRKEKZKA</p>
                <p><b>КБе:</b> 17</p>
                <p><b>IBAN (ИИК):</b></p>
                <ul>
                  <li>KZ95914398914BC24092 / KZT</li>
                  <li>KZ88914002203RU000T2 / RUB</li>
                </ul>
              </div>

              <div className="requisites-bank">
                <h3>АО «Народный Банк Казахстана»</h3>
                <p><b>БИК:</b> HSBKKZKX</p>
                <p>г. Алматы</p>
                <p><b>IBAN (ИИК):</b></p>
                <ul>
                  <li>KZ906018771001005821 / KZT</li>
                  <li>KZ15601A861000626541 / EUR</li>
                  <li>KZ51601A861003228791 / RUB</li>
                  <li>KZ59601A861003228841 / USD</li>
                </ul>
              </div>

              <div className="requisites-bank">
                <h3>АО «Kaspi Bank»</h3>
                <p><b>БИК:</b> CASPKZKA</p>
                <p><b>IBAN (ИИК):</b></p>
                <ul>
                  <li>KZ46722S000008835229 / KZT</li>
                  <li>KZ58722S000016124854 / RUB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
