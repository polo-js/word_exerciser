export default function Page() {
	return (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Документы в международных закупках
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          При работе с иностранными поставщиками документы помогают зафиксировать условия сделки, подтвердить отгрузку и
          упростить проверку поставки. Ниже — основные документы, их назначение и что в них важно проверять.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Invoice — инвойс</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Packing List — пэкинг лист</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">B/L — билл оф лэйдинг</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">AWB — эйр вэйбилл</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">COO — сёртификейт оф ориджин</span>
        </div>
      </div>

      {/* Коммерческие документы */}
      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Коммерческие документы</h2>
            <p className="mt-1 text-sm text-slate-600">Счета, условия сделки и сопроводительные документы от поставщика.</p>
          </div>
          <span className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700">
            Commercial
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DocCard
            title="Proforma Invoice"
            pronounce="проформа инвойс"
            short="Предварительный счёт до оплаты/производства."
            checks={[
              "Товар/количество/цены и валюта",
              "Условия оплаты (prepayment, net 30 и т.д.)",
              "Incoterms + место (например, FCA Shanghai)",
              "Срок готовности/поставки",
            ]}
          />

          <DocCard
            title="Commercial Invoice"
            pronounce="коммёршал инвойс"
            short="Финальный счёт по отгрузке: стоимость и данные сторон."
            checks={[
              "Реквизиты продавца/покупателя",
              "Номер/дата, ссылка на PO/контракт",
              "Сумма/валюта/условия оплаты",
              "Incoterms + место — совпадает с PO",
            ]}
          />

          <DocCard
            title="Packing List"
            pronounce="пэкинг лист"
            short="Упаковочный лист: что и как упаковано."
            checks={[
              "Количество мест (packages)",
              "Вес нетто/брутто",
              "Объём/габариты (если есть)",
              "Маркировка коробок/паллет",
            ]}
          />

          <DocCard
            title="Purchase Order (PO)"
            pronounce="пёрчес ордер / пи-оу"
            short="Заказ на поставку: что покупаем и на каких условиях."
            checks={[
              "Позиции/количество/цены",
              "Сроки поставки/готовности",
              "Условия оплаты",
              "Incoterms + место",
            ]}
          />

          <DocCard
            title="Contract / Agreement"
            pronounce="контракт / эгримент"
            short="Договор: юридические условия и ответственность."
            checks={[
              "Предмет договора/спецификация",
              "Сроки и ответственность/штрафы",
              "Условия оплаты и поставки",
              "Гарантии и порядок претензий",
            ]}
          />

          <DocCard
            title="Certificate of Origin (COO)"
            pronounce="сёртификейт оф ориджин"
            short="Сертификат происхождения товара (страна происхождения)."
            checks={[
              "Страна происхождения указана корректно",
              "Описание товара совпадает с invoice",
              "Подписи/печати/дата",
              "Номера документов (если указаны) корректны",
            ]}
          />
        </div>
      </section>

      {/* Транспортные документы */}
      <section className="mt-10">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Транспортные документы</h2>
            <p className="mt-1 text-sm text-slate-600">
              Документы перевозчика/экспедитора, подтверждающие перевозку и маршрут.
            </p>
          </div>
          <span className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700">
            Transport
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DocCard
            title="Bill of Lading (B/L)"
            pronounce="билл оф лэйдинг"
            short="Морская накладная: подтверждает отгрузку и условия перевозки морем."
            checks={[
              "Shipper/Consignee (отправитель/получатель)",
              "Порт отгрузки и порт назначения",
              "Описание груза, кол-во мест, вес",
              "Номера контейнеров/пломб (если есть)",
            ]}
          />

          <DocCard
            title="Air Waybill (AWB)"
            pronounce="эйр вэйбилл"
            short="Авиа накладная: транспортный документ для авиаперевозки."
            checks={[
              "Аэропорты отправки/назначения",
              "Вес/объём, количество мест",
              "Отправитель/получатель",
              "Номер AWB для трекинга",
            ]}
          />

          <DocCard
            title="CMR"
            pronounce="си-эм-ар"
            short="Международная автотранспортная накладная (часто Европа)."
            checks={[
              "Пункт отправки и пункт доставки",
              "Описание груза, кол-во мест, вес",
              "Данные перевозчика",
              "Подписи сторон",
            ]}
          />
        </div>
      </section>

      {/* Таможня / сопутствующие */}
      <section className="mt-10">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Таможня и сопутствующие</h2>
            <p className="mt-1 text-sm text-slate-600">
              Нужны не всегда: зависят от страны, категории товара и требований логистики/брокера.
            </p>
          </div>
          <span className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700">
            Customs
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DocCard
            title="Insurance Certificate"
            pronounce="иншуренс сёртификейт"
            short="Подтверждает страхование груза (если требуется/включено)."
            checks={[
              "Страховая сумма и валюта",
              "Условия покрытия (coverage)",
              "Период действия",
              "Маршрут/данные груза",
            ]}
          />

          <DocCard
            title="Inspection / Quality Certificate"
            pronounce="инспекшн / кволити сёртификейт"
            short="Подтверждает проверку/качество (по требованию клиента или регулятора)."
            checks={[
              "Кто выдал (орган/лаборатория)",
              "Что именно проверено",
              "Номер/дата документа",
              "Соответствие партии/серийным номерам (если есть)",
            ]}
          />

          <DocCard
            title="SDS (Safety Data Sheet)"
            pronounce="эс-ди-эс"
            short="Паспорт безопасности (актуально для химии/материалов)."
            checks={[
              "Актуальная версия SDS",
              "Язык/страна назначения",
              "Класс опасности/маркировка",
              "Соответствие товару/артикулу",
            ]}
          />

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Коротко про таможенные документы</div>
            <p className="mt-2 text-sm text-slate-600">
              В некоторых случаях дополнительно требуются экспортная/импортная декларации и другие формы. Их список обычно
              уточняют у логистики или таможенного брокера под конкретный товар и страну.
            </p>
          </div>
        </div>
      </section>

      {/* Ошибки */}
      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Типичные ошибки</h2>
        <ul className="mt-3 space-y-2 text-slate-700">
          <li>• Incoterms и место в PO и Invoice различаются.</li>
          <li>• Вес/количество мест не совпадают между Invoice и Packing List.</li>
          <li>• Ошибки в данных consignee/адресах доставки.</li>
          <li>• Нет ссылки на PO/контракт в инвойсе — сложнее сверять оплату.</li>
        </ul>
      </section>
    </div>
  </div>
);

type DocCardProps = {
  title: string;
  pronounce: string;
  short: string;
  checks: string[];
};

/* Ниже — просто разметка карточки (без логики) */
function DocCard({ title, pronounce, short, checks }: DocCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-500">
            Произношение: <span className="font-medium">{pronounce}</span>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Doc</span>
      </div>

      <p className="mt-3 text-slate-700">{short}</p>

      <div className="mt-4 rounded-xl bg-slate-50 p-4">
        <div className="text-sm font-semibold text-slate-900">Что проверить</div>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {checks.map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}



}
