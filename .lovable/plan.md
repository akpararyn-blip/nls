## Проблема

В режиме `USE_INTERNAL_ROUTING = false` главная страница каждого поддомена (`iaas.nls.kz`, `cloud.nls.kz` и т.д.) должна автоматически отрисовывать компонент соответствующей услуги. Это делает `IndexPage` в `src/routes/index.tsx` через словарь `SERVICE_COMPONENTS`.

Сейчас в `SERVICE_COMPONENTS` зарегистрированы только давно существующие услуги (`/internet`, `/it-sks`, `/it`, `/colocation`, `/dedicated`, `/colocation-full`, `/vps`). Недавно добавленные `/iaas`, `/cloud`, `/object-storage`, `/cloud-storage` в этот словарь не попали.

Поэтому на `iaas.nls.kz/` `currentDomainPath` возвращает `/iaas`, но компонент не находится — и пользователь видит общую главную NLS вместо страницы IaaS. То же самое произошло бы на `cloud.nls.kz/`, `…/object-storage`-поддомене и т.д. (хотя сейчас отдельных поддоменов для них нет, `cloud.nls.kz` точно сломан).

Вторая проблема: `IaasPage` экспортируется, а `CloudPage`, `ObjectStoragePage`, `CloudStoragePage` объявлены как обычные функции внутри файла-роута и наружу не выставлены — импортировать их в `index.tsx` сейчас невозможно.

## Что меняем

1. **`src/routes/cloud.tsx`** — добавить `export` к `function CloudPage()`.
2. **`src/routes/object-storage.tsx`** — добавить `export` к `function ObjectStoragePage()`.
3. **`src/routes/cloud-storage.tsx`** — добавить `export` к `function CloudStoragePage()`.
4. **`src/routes/index.tsx`**:
   - Импортировать `IaasPage`, `CloudPage`, `ObjectStoragePage`, `CloudStoragePage`.
   - Расширить `SERVICE_COMPONENTS`:
     ```ts
     "/iaas": IaasPage,
     "/cloud": CloudPage,
     "/object-storage": ObjectStoragePage,
     "/cloud-storage": CloudStoragePage,
     ```

После этого `iaas.nls.kz/` отрисует страницу IaaS, `cloud.nls.kz/` — хаб облачных решений, а ссылки на эти услуги с других поддоменов уже корректно переписываются в `resolveLink` (этот код трогать не надо).

## Что не трогаем

- `src/config/links.ts` — там логика хоста и `/cloud`-хаба уже корректна.
- `USE_INTERNAL_ROUTING` оставляем как есть (управляется вручную перед билдом).
- Никаких изменений в форме, валидации телефона, странице `/spam`, GTM и т.д.
