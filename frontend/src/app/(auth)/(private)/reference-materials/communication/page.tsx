export default function Page() {
	return (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      {/* Header */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Деловая переписка: структура письма
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          В деловых письмах важна понятная структура: получателю должно быть ясно{" "}
          <span className="font-medium text-slate-900">зачем вы пишете</span>,{" "}
          <span className="font-medium text-slate-900">что нужно сделать</span> и{" "}
          <span className="font-medium text-slate-900">к какому сроку</span>.
        </p>
      </div>

      {/* Structure (Skyeng + email adaptation) */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Классическая структура письма</h2>
          <p className="mt-2 text-sm text-slate-600">
            В “формальном” письме обычно выделяют такие элементы:
          </p>
          <ol className="mt-3 space-y-2 text-slate-700">
            <li>1) Адрес отправителя</li>
            <li>2) Дата</li>
            <li>3) Адрес получателя</li>
            <li>4) Приветствие</li>
            <li>5) Вступление (цель письма)</li>
            <li>6) Основная часть (детали)</li>
            <li>7) Заключение (что дальше / вложения / просьба)</li>
            <li>8) Вежливое окончание</li>
            <li>9) Подпись</li>
          </ol>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Как это выглядит в email</h2>
          <p className="mt-2 text-sm text-slate-600">
            В email адреса и дату чаще всего не пишут вручную — но логика блоков сохраняется.
          </p>
          <ol className="mt-3 space-y-2 text-slate-700">
            <li>1) Subject (тема письма)</li>
            <li>2) Greeting (приветствие)</li>
            <li>3) Opening (вступление: зачем пишете)</li>
            <li>4) Body (основная часть: факты + детали)</li>
            <li>5) Action + Deadline (что нужно сделать и к какому сроку)</li>
            <li>6) Attachments (вложения, если есть)</li>
            <li>7) Closing + Sign-off (вежливое завершение)</li>
            <li>8) Signature (подпись)</li>
          </ol>
        </div>
      </div>

      {/* Greeting */}
      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Приветствие</h2>
        <p className="mt-2 text-slate-600">
          Лучше держать деловой тон. Если знаете фамилию — используйте Mr/Ms + фамилия. Если имени нет — нейтральное
          обращение.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Варианты приветствия</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>• Dear Mr Johnson,</li>
              <li>• Dear Ms Johnson,</li>
              <li>• Dear Hiring Manager,</li>
              <li>• To whom it may concern,</li>
              <li>• Dear team,</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Пунктуация (полезно знать)</div>
            <p className="mt-2 text-sm text-slate-700">
              В британском варианте чаще: <span className="font-medium">Dear Mr Styles,</span> (без точки после Mr и
              запятая). В американском чаще: <span className="font-medium">Dear Mr. Reynolds:</span> (точка и двоеточие).
            </p>
          </div>
        </div>
      </section>

      {/* Opening / Body / Closing */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Вступление</h3>
          <p className="mt-2 text-sm text-slate-600">
            1–2 предложения: цель письма + контекст (PO, контракт, позиция, дата).
          </p>
          <div className="mt-3 rounded-xl bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Примеры фраз</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>• Further to your last email, …</li>
              <li>• I am writing in response to …</li>
              <li>• Thank you for contacting us.</li>
              <li>• I am writing to ask whether you could …</li>
              <li>• Could you please send me …</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Основная часть</h3>
          <p className="mt-2 text-sm text-slate-600">
            Дайте детали: факты, цифры, условия. Пишите коротко — без “воды”.
          </p>
          <div className="mt-3 rounded-xl bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Удобная схема</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>• Context: что уже известно / что было согласовано</li>
              <li>• Issue/Question: что нужно уточнить</li>
              <li>• Action: что вы просите сделать</li>
              <li>• Deadline: к какому сроку</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Заключение</h3>
          <p className="mt-2 text-sm text-slate-600">
            В конце обычно: вложения, просьба о действии, предложение помощи.
          </p>
          <div className="mt-3 rounded-xl bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Примеры фраз</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>• Please find the attached …</li>
              <li>• If you require more information, please let me know.</li>
              <li>• Please do not hesitate to contact me if you need any further assistance.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Subject lines */}
      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Subject (тема письма): быстрые примеры</h2>
        <p className="mt-2 text-slate-600">
          Хорошая тема содержит “что нужно” + “по чему” (номер PO/контракта/поставки).
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <SubjectItem text="Request for Quotation (RFQ) – [Item/Project]" />
          <SubjectItem text="Follow-up: PO #[номер] – delivery date confirmation" />
          <SubjectItem text="Request for shipping documents – PO #[номер]" />
          <SubjectItem text="Updated ETA requested – PO #[номер]" />
          <SubjectItem text="Clarification required: Incoterms & delivery address – PO #[номер]" />
          <SubjectItem text="Invoice correction request – Invoice #[номер]" />
        </div>
      </section>

      {/* Вежливые просьбы и вопросы (после блока Subject) */}
<section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-slate-900">Вежливые просьбы и вопросы</h2>
  <p className="mt-2 text-slate-600">
    В деловой переписке лучше использовать <span className="font-medium text-slate-900">could / would</span> и
    вежливые конструкции вместо прямых формулировок.
  </p>

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border bg-slate-50 p-5">
      <div className="text-sm font-semibold text-slate-900">Просьба предоставить информацию</div>
      <ul className="mt-3 space-y-3 text-sm text-slate-800">
        <li>
          <div className="font-medium">Could you please provide the updated ETA?</div>
          <div className="mt-1 text-slate-600">Не могли бы вы сообщить обновлённую дату/время прибытия (ETA)?</div>
        </li>
        <li>
          <div className="font-medium">Could you please send the Commercial Invoice and Packing List?</div>
          <div className="mt-1 text-slate-600">Не могли бы вы прислать инвойс и упаковочный лист?</div>
        </li>
        <li>
          <div className="font-medium">Would you be able to share the latest quotation?</div>
          <div className="mt-1 text-slate-600">Можете ли вы предоставить актуальное коммерческое предложение?</div>
        </li>
        <li>
          <div className="font-medium">Could you confirm the lead time for this item?</div>
          <div className="mt-1 text-slate-600">Подтвердите, пожалуйста, срок производства/поставки для этой позиции.</div>
        </li>
      </ul>
    </div>

    <div className="rounded-2xl border bg-slate-50 p-5">
      <div className="text-sm font-semibold text-slate-900">Вопросы для уточнения</div>
      <ul className="mt-3 space-y-3 text-sm text-slate-800">
        <li>
          <div className="font-medium">Could you clarify whether the price includes delivery?</div>
          <div className="mt-1 text-slate-600">Уточните, пожалуйста, включает ли цена доставку?</div>
        </li>
        <li>
          <div className="font-medium">Would you mind confirming the Incoterms and delivery address?</div>
          <div className="mt-1 text-slate-600">Не могли бы вы подтвердить Incoterms и адрес доставки?</div>
        </li>
        <li>
          <div className="font-medium">Could you let us know if the goods are ready for shipment?</div>
          <div className="mt-1 text-slate-600">Сообщите, пожалуйста, готов ли товар к отгрузке.</div>
        </li>
        <li>
          <div className="font-medium">Would it be possible to split the shipment into two deliveries?</div>
          <div className="mt-1 text-slate-600">Возможно ли разделить поставку на две отгрузки?</div>
        </li>
      </ul>
    </div>
  </div>

  <div className="mt-4 grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border bg-white p-5">
      <div className="text-sm font-semibold text-slate-900">Мягкий дедлайн</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-800">
        <li>
          <span className="font-medium">Could you please respond by Friday?</span>
          <span className="text-slate-600"> — Ответьте, пожалуйста, до пятницы.</span>
        </li>
        <li>
          <span className="font-medium">I would appreciate it if you could send it by 3 PM (UTC+3).</span>
          <span className="text-slate-600"> — Буду признателен, если пришлёте до 15:00 (UTC+3).</span>
        </li>
        <li>
          <span className="font-medium">If possible, please share the update today.</span>
          <span className="text-slate-600"> — По возможности, пришлите обновление сегодня.</span>
        </li>
      </ul>
    </div>

    <div className="rounded-2xl border bg-white p-5">
      <div className="text-sm font-semibold text-slate-900">Чуть более настойчиво (вежливо)</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-800">
        <li>
          <span className="font-medium">Could you please prioritize this request?</span>
          <span className="text-slate-600"> — Пожалуйста, приоритизируйте этот запрос.</span>
        </li>
        <li>
          <span className="font-medium">We would be grateful for your prompt response.</span>
          <span className="text-slate-600"> — Будем благодарны за оперативный ответ.</span>
        </li>
        <li>
          <span className="font-medium">Please let us know as soon as possible.</span>
          <span className="text-slate-600"> — Сообщите, пожалуйста, как можно скорее.</span>
        </li>
      </ul>
    </div>
  </div>

  <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
    <span className="font-semibold">Совет:</span> избегай форм “Send me…” / “Give me…” — лучше{" "}
    <span className="font-semibold">Could you please…</span>,{" "}
    <span className="font-semibold">Would you be able to…</span>,{" "}
    <span className="font-semibold">I would appreciate it if you could…</span>.
  </div>
</section>


      {/* Email template */}
      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Шаблон письма (копируй и заполняй)</h2>

        <div className="mt-4 rounded-2xl border bg-slate-900 p-5 text-sm text-slate-50">
          <pre className="whitespace-pre-wrap leading-6">
{`Subject: Follow-up: PO #[номер] – delivery date confirmation

Dear [Name / Team],

Further to our previous communication regarding PO #[номер], I would like to confirm the current status of the order.

Could you please confirm:
1) the updated ETA / delivery date;
2) whether the Commercial Invoice and Packing List are available.

If possible, please send the documents by [date/time].

Thank you in advance.

Kind regards,
[Your Name]
[Title], [Company]
[Phone] | [Email]`}
          </pre>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">Мини-чеклист перед отправкой</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>• В теме есть PO/Invoice № или проект</li>
            <li>• В письме есть 1 чёткий запрос (action) и дедлайн</li>
            <li>• Указаны нужные вложения / просьба прислать файлы</li>
            <li>• Тон вежливый и нейтральный (без “Send me ASAP”)</li>
          </ul>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Частые ошибки</h2>
        <ul className="mt-3 space-y-2 text-slate-700">
          <li>• Нет контекста (номер PO/контракта/даты) — получатель тратит время на поиск.</li>
          <li>• Нет конкретного действия и срока (“Please update” без дедлайна).</li>
          <li>• Слишком много тем в одном письме — лучше разделить на 2 письма.</li>
          <li>• Слишком прямой тон — лучше “Could you please… / I would be grateful if…”</li>
        </ul>
      </section>
    </div>
  </div>
);

function SubjectItem({ text }: { text: string }) {
  return (
    <div className="rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800">
      {text}
    </div>
  );
    }
}