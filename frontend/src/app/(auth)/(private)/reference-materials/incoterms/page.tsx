export default function Page() {
	return (
  <div className="bg-slate-50">
    <div className="mx-auto max-w-[1200px] px-4 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">Incoterms (базисы поставки)</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Incoterms — это международные правила, которые помогают сторонам заранее договориться,{" "}
        <span className="font-medium text-slate-900">кто за что отвечает</span> при поставке товара: кто оплачивает
        перевозку и оформление, и <span className="font-medium text-slate-900">в какой точке переходят риски</span>{" "}
        (повреждение/утрата).
      </p>

      {/* Важно */}
      <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Что именно регулируют Incoterms</h2>
        <ul className="mt-3 space-y-2 text-slate-700">
          <li>• распределение расходов на перевозку (доставка, погрузка/разгрузка и т.д.);</li>
          <li>• обязанности по таможенному оформлению (экспорт/импорт — зависит от термина);</li>
          <li>• момент перехода рисков от продавца к покупателю.</li>
        </ul>
        <p className="mt-3 text-sm text-slate-500">
          Incoterms не определяют цену, способ оплаты и переход права собственности — это фиксируется в договоре.
        </p>
      </div>

      {/* Группы */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Группы Incoterms (упрощённо)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">E — минимум обязанностей продавца</div>
            <p className="mt-2 text-slate-600">
              Продавец предоставляет товар, а дальше почти всё организует покупатель (пример: EXW).
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">F — основную перевозку оплачивает покупатель</div>
            <p className="mt-2 text-slate-600">
              Продавец передаёт товар перевозчику/в порту, дальше — зона ответственности покупателя (FCA, FOB и др.).
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">C — перевозку оплачивает продавец, но риск может перейти раньше</div>
            <p className="mt-2 text-slate-600">
              Важный момент: продавец оплачивает фрахт/страхование, но риски могут перейти уже в точке отгрузки (например, CIF).
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">D — максимум обязанностей продавца</div>
            <p className="mt-2 text-slate-600">
              Продавец доставляет в место назначения; иногда включает импортные пошлины (DAP, DDP).
            </p>
          </div>
        </div>
      </div>

      {/* Все термины Incoterms 2020 */}
<div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-slate-900">Термины Incoterms 2020 (все)</h2>
  <p className="mt-2 text-slate-600">
    Ниже — полный список базисов поставки. Для удобства добавлено произношение для русскоязычной аудитории.
  </p>

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    {/* E */}
    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">EXW</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">E</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">экс воркс</span></div>
      <p className="mt-2 text-slate-600">
        Продавец предоставляет товар у себя. Почти вся логистика и оформление обычно на покупателе.
      </p>
    </div>

    {/* F */}
    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">FCA</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">F</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">эф-си-эй</span></div>
      <p className="mt-2 text-slate-600">
        Продавец передаёт товар перевозчику в указанном месте (часто включает экспортное оформление).
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">FAS</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">F</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">эф-эй-эс</span></div>
      <p className="mt-2 text-slate-600">
        Морская поставка: продавец доставляет товар к борту судна в порту отгрузки.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">FOB</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">F</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">эф-о-би</span></div>
      <p className="mt-2 text-slate-600">
        Морская поставка: ответственность продавца до погрузки на судно в порту отправления.
      </p>
    </div>

    {/* C */}
    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">CPT</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">C</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">си-пи-ти</span></div>
      <p className="mt-2 text-slate-600">
        Продавец оплачивает перевозку до указанного пункта, но риск может перейти раньше — при передаче перевозчику.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">CIP</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">C</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">си-ай-пи</span></div>
      <p className="mt-2 text-slate-600">
        Как CPT, но продавец дополнительно обеспечивает страхование (по правилам — с повышенными требованиями).
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">CFR</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">C</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">си-эф-ар</span></div>
      <p className="mt-2 text-slate-600">
        Морская поставка: продавец оплачивает фрахт до порта назначения, но риск переходит в порту отгрузки.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">CIF</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">C</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">си-ай-эф</span></div>
      <p className="mt-2 text-slate-600">
        Как CFR, но продавец дополнительно оплачивает страхование (обычно минимальное). Риск всё равно переходит в порту отгрузки.
      </p>
    </div>

    {/* D */}
    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">DAP</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">D</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">ди-эй-пи</span></div>
      <p className="mt-2 text-slate-600">
        Продавец доставляет до указанного места назначения (обычно без импортных пошлин). Импорт — на покупателе.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">DPU</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">D</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">ди-пи-ю</span></div>
      <p className="mt-2 text-slate-600">
        Продавец доставляет и разгружает товар в указанном месте. Импортные пошлины обычно на покупателе.
      </p>
    </div>

    <div className="rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-slate-900">DDP</div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">D</span>
      </div>
      <div className="mt-1 text-sm text-slate-500">Произношение: <span className="font-medium">ди-ди-пи</span></div>
      <p className="mt-2 text-slate-600">
        Максимум обязанностей продавца: доставка до места назначения с импортным оформлением и пошлинами (если применимо).
      </p>
    </div>
  </div>

  <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
    <span className="font-semibold">Важно:</span> “кто платит перевозку” и “когда переходит риск” — не одно и то же.
    Особенно это заметно в группе <span className="font-semibold">C</span>.
  </div>
</div>


      {/* Как выбирать */}
      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Как выбрать базис поставки</h2>
        <ul className="mt-3 space-y-2 text-slate-700">
          <li>• Если покупатель хочет контролировать логистику — смотрят в сторону группы F (часто FCA).</li>
          <li>• Если продавец готов организовать перевозку — подходят варианты группы C или D.</li>
          <li>• Если нужен “максимальный сервис” от продавца — выбирают DAP/DDP (с оговорками по импорту).</li>
        </ul>
      </div>
    </div>
  </div>
);

}
