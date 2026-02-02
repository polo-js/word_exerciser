type Phrase = {
  en: string;
  ru: string;
};

type ScenarioBlockProps = {
  number: number;
  title: string;
  whenText: string;
  goalText: string;
  phrases: Phrase[];
  example: string;
};

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1200px] px-4 py-10">
        {/* Header */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Коммуникативные ситуации</h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Типовые сценарии общения с иностранными поставщиками:{" "}
            <span className="font-medium text-slate-900">что написать</span>,{" "}
            <span className="font-medium text-slate-900">зачем</span> и{" "}
            <span className="font-medium text-slate-900">какими фразами</span>. Формат простой: ситуация → цель →
            готовые формулировки → мини-пример.
          </p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Правило:</span> одно письмо — одна задача. Если нужно и “ETA”, и
            “документы”, и “скидку” — лучше разделить на 2 письма.
          </div>
        </div>

        {/* Scenarios */}
        <div className="mt-8 space-y-6">
          <ScenarioBlock
            number={1}
            title="Запрос информации"
            whenText="Когда нужно уточнить детали: спецификацию, условия, наличие, адрес, Incoterms."
            goalText="Получить конкретный ответ на конкретный вопрос."
            phrases={[
              { en: "Could you please confirm the specifications for this item?", ru: "Подтвердите, пожалуйста, спецификацию товара." },
              { en: "Could you clarify whether the price includes delivery?", ru: "Уточните, включает ли цена доставку?" },
              { en: "Would you be able to share the datasheet?", ru: "Можете прислать техническое описание (datasheet)?" },
              { en: "Could you confirm the Incoterms and the delivery address?", ru: "Подтвердите Incoterms и адрес доставки." },
              { en: "Please let us know if this item is in stock.", ru: "Сообщите, пожалуйста, есть ли товар в наличии." },
            ]}
            example={`Subject: Clarification required – [Item] / PO #[номер]

Dear [Name],
Could you please confirm the Incoterms and the delivery address for PO #[номер]?
Also, please let us know the current lead time for this item.

Kind regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={2}
            title="Запрос цены (RFQ)"
            whenText="Когда нужно получить цену, сроки и условия поставки по позициям."
            goalText="Получить коммерческое предложение и условия (цена, MOQ, lead time, Incoterms)."
            phrases={[
              { en: "Could you please provide a quotation for the items below?", ru: "Просьба предоставить коммерческое предложение по позициям ниже." },
              { en: "Please quote your best price and lead time.", ru: "Укажите, пожалуйста, лучшую цену и срок поставки." },
              { en: "Could you confirm the MOQ and payment terms?", ru: "Подтвердите MOQ (минимальную партию) и условия оплаты." },
              { en: "Would you offer a discount for a larger volume?", ru: "Возможна ли скидка при большем объёме?" },
              { en: "Please specify the Incoterms (e.g., FCA / DAP) and the place.", ru: "Укажите Incoterms (например, FCA/DAP) и место." },
            ]}
            example={`Subject: RFQ – [Item/Project]

Dear [Name],
Could you please provide a quotation for the items below?
Please include your best price, MOQ, lead time, and Incoterms (with place).

Thank you,
[Your Name]`}
          />

          <ScenarioBlock
            number={3}
            title="Согласование условий"
            whenText="Когда обсуждаете скидку, оплату, условия поставки, сроки."
            goalText="Договориться о более выгодных условиях без резкого тона."
            phrases={[
              { en: "Would you consider a 5% discount for this order?", ru: "Рассмотрите, пожалуйста, скидку 5% по этому заказу." },
              { en: "Is there any flexibility on the price?", ru: "Есть ли возможность скорректировать цену?" },
              { en: "Could we switch to [payment terms]?", ru: "Можем ли мы перейти на такие условия оплаты?" },
              { en: "Would it be possible to shorten the lead time?", ru: "Возможно ли сократить срок поставки/производства?" },
              { en: "Please let us know what terms you can offer.", ru: "Сообщите, какие условия вы можете предложить." },
            ]}
            example={`Subject: Terms discussion – PO #[номер]

Dear [Name],
Is there any flexibility on the price for PO #[номер]?
Would you consider a discount for a larger volume?

Kind regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={4}
            title="Подтверждение заказа (PO confirmation)"
            whenText="Когда отправили PO и хотите убедиться, что поставщик принял заказ."
            goalText="Получить подтверждение PO, сроков и готовности к отгрузке."
            phrases={[
              { en: "Please confirm receipt of PO #[номер].", ru: "Подтвердите, пожалуйста, получение заказа PO #[номер]." },
              { en: "Could you confirm the confirmed delivery date?", ru: "Подтвердите согласованную дату поставки." },
              { en: "Please confirm the production start date.", ru: "Подтвердите дату начала производства." },
              { en: "Let us know if you need any additional information.", ru: "Сообщите, если нужна дополнительная информация." },
              { en: "Please confirm whether the order can be shipped as planned.", ru: "Подтвердите, можно ли отгрузить по плану." },
            ]}
            example={`Subject: PO #[номер] – confirmation requested

Dear [Name],
Please confirm receipt of PO #[номер] and the confirmed delivery date.
Let us know if you need any additional information.

Best regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={5}
            title="Сроки и ETA (обновление статуса)"
            whenText="Когда нужно узнать текущий статус и ETA по заказу/поставке."
            goalText="Получить краткий апдейт по срокам и рискам задержки."
            phrases={[
              { en: "Could you please provide an update on the order status?", ru: "Дайте, пожалуйста, обновление по статусу заказа." },
              { en: "What is the current ETA for this shipment?", ru: "Какая текущая ETA по отгрузке?" },
              { en: "Is everything on track for the planned shipment date?", ru: "Всё ли идёт по плану к дате отгрузки?" },
              { en: "Please advise if there are any delays or risks.", ru: "Сообщите, есть ли задержки или риски." },
              { en: "If delayed, please propose the earliest possible date.", ru: "Если есть задержка — предложите ближайшую возможную дату." },
            ]}
            example={`Subject: Status update requested – PO #[номер]

Dear [Name],
Could you please provide an update on the order status for PO #[номер]?
What is the current ETA, and are there any risks of delay?

Kind regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={6}
            title="Напоминание / follow-up"
            whenText="Когда ответа нет, но важно получить его без конфликта."
            goalText="Аккуратно напомнить и обозначить срок."
            phrases={[
              { en: "Just a friendly reminder regarding the email below.", ru: "Дружеское напоминание по письму ниже." },
              { en: "Following up on my previous message, could you please advise?", ru: "Возвращаюсь к своему предыдущему сообщению — подскажите, пожалуйста." },
              { en: "Could you please confirm if you received our request?", ru: "Подтвердите, пожалуйста, что вы получили наш запрос." },
              { en: "I would appreciate your response by [day/time].", ru: "Буду признателен за ответ до [день/время]." },
              { en: "Please let us know if you need any clarifications.", ru: "Сообщите, если нужно что-то уточнить." },
            ]}
            example={`Subject: Follow-up – PO #[номер]

Dear [Name],
Just a friendly reminder regarding the email below.
I would appreciate your response by [day/time].

Best regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={7}
            title="Запрос документов на отгрузку"
            whenText="Когда нужны инвойс/пэкинг лист/COO до отгрузки или для подготовки получения."
            goalText="Получить документы и проверить, что данные совпадают с PO."
            phrases={[
              { en: "Could you please send the Commercial Invoice and Packing List?", ru: "Пришлите, пожалуйста, Commercial Invoice и Packing List." },
              { en: "Please share the documents in PDF format.", ru: "Пришлите документы в PDF." },
              { en: "Could you include the PO number in the documents?", ru: "Добавьте, пожалуйста, номер PO в документы." },
              { en: "Please confirm the number of packages and gross weight.", ru: "Подтвердите количество мест и вес брутто." },
              { en: "If available, please provide the Certificate of Origin.", ru: "Если есть, пришлите Certificate of Origin." },
            ]}
            example={`Subject: Shipping documents required – PO #[номер]

Dear [Name],
Could you please send the Commercial Invoice and Packing List for PO #[номер]?
If available, please also provide the Certificate of Origin.

Kind regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={8}
            title="Проблема / рекламация (claim)"
            whenText="Когда есть недостача, повреждение, несоответствие или дефект."
            goalText="Спокойно описать проблему и запросить решение (replacement/credit note/refund)."
            phrases={[
              { en: "We have noticed an issue with the delivered goods.", ru: "Мы обнаружили проблему с поставленным товаром." },
              { en: "The quantity does not match the Packing List.", ru: "Количество не совпадает с Packing List." },
              { en: "Please find the photos attached for reference.", ru: "Во вложении фото для подтверждения." },
              { en: "Could you advise on the next steps to resolve this?", ru: "Подскажите дальнейшие шаги для решения." },
              { en: "We would appreciate a replacement / credit note.", ru: "Нам бы хотелось замену / кредит-ноту." },
            ]}
            example={`Subject: Issue reported – PO #[номер] / Delivery #[номер]

Dear [Name],
We have noticed an issue with the delivered goods (see photos attached).
Could you advise on the next steps to resolve this? We would appreciate a replacement or a credit note.

Best regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={9}
            title="Изменение заказа (change request)"
            whenText="Когда нужно изменить количество, адрес, сроки или упаковку."
            goalText="Понять, возможно ли изменение и как оно влияет на цену/сроки."
            phrases={[
              { en: "Would it be possible to amend PO #[номер]?", ru: "Возможно ли внести изменения в PO #[номер]?" },
              { en: "Could you change the quantity to [X] units?", ru: "Можете изменить количество на [X]?" },
              { en: "Please confirm the impact on price and lead time.", ru: "Подтвердите, пожалуйста, влияние на цену и сроки." },
              { en: "Could you update the delivery address to the one below?", ru: "Можете обновить адрес доставки на указанный ниже?" },
              { en: "Please confirm once the changes are accepted.", ru: "Подтвердите, пожалуйста, когда изменения будут приняты." },
            ]}
            example={`Subject: Change request – PO #[номер]

Dear [Name],
Would it be possible to amend PO #[номер] and change the quantity to [X] units?
Please confirm the impact on price and lead time.

Kind regards,
[Your Name]`}
          />

          <ScenarioBlock
            number={10}
            title="Подтверждение договорённостей (closing)"
            whenText="Когда хотите зафиксировать итоги и избежать недопонимания."
            goalText="Коротко резюмировать: что решили, кто что делает и к какому сроку."
            phrases={[
              { en: "To summarize, we agreed on the following:", ru: "Подытожим, мы договорились о следующем:" },
              { en: "Please confirm that this is correct.", ru: "Подтвердите, пожалуйста, что всё верно." },
              { en: "We will proceed with the payment once confirmed.", ru: "Мы перейдём к оплате после подтверждения." },
              { en: "Thank you for your cooperation.", ru: "Спасибо за сотрудничество." },
              { en: "Looking forward to your confirmation.", ru: "Будем ждать подтверждения." },
            ]}
            example={`Subject: Confirmation – PO #[номер]

Dear [Name],
To summarize, we agreed on the following:
- Incoterms: [FCA/DAP] [place]
- Shipment date: [date]
Please confirm that this is correct.

Kind regards,
[Your Name]`}
          />
        </div>

        {/* Tone block */}
        <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Тон письма (быстро)</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Neutral</div>
              <p className="mt-2 text-sm text-slate-700">Нейтрально, без давления.</p>
              <div className="mt-3 text-sm text-slate-800">
                <span className="font-medium">Could you please…</span>
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Polite</div>
              <p className="mt-2 text-sm text-slate-700">Максимально вежливо.</p>
              <div className="mt-3 text-sm text-slate-800">
                <span className="font-medium">I would appreciate it if you could…</span>
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Firm (вежливо, но настойчиво)</div>
              <p className="mt-2 text-sm text-slate-700">Когда важно “продавить” срок без грубости.</p>
              <div className="mt-3 text-sm text-slate-800">
                <span className="font-medium">Please respond by [time/date].</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
            <span className="font-semibold">Совет:</span> избегай “Send me ASAP”. Лучше:{" "}
            <span className="font-semibold">Could you please…</span> +{" "}
            <span className="font-semibold">by [deadline]</span>.
          </div>
        </section>
      </div>
    </div>
  );
}

function ScenarioBlock({ number, title, whenText, goalText, phrases, example }: ScenarioBlockProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            {number}
          </span>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Когда:</span> {whenText}
        </p>
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Цель:</span> {goalText}
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_420px]">
        <div className="rounded-2xl border bg-slate-50 p-5">
          <div className="text-sm font-semibold text-slate-900">Готовые фразы</div>
          <div className="mt-3 space-y-3">
            {phrases.map((p) => (
              <PhraseRow key={p.en} en={p.en} ru={p.ru} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-slate-900 p-5 text-sm text-slate-50">
          <div className="text-sm font-semibold">Мини-пример</div>
          <pre className="mt-3 whitespace-pre-wrap leading-6">{example}</pre>
        </div>
      </div>
    </section>
  );
}

function PhraseRow({ en, ru }: Phrase) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="font-medium text-slate-900">{en}</div>
      <div className="mt-1 text-sm text-slate-600">{ru}</div>
    </div>
  );
}
