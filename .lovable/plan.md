## Цель

Скорректировать логику RAID в конфигураторе `src/routes/dedicated.tsx`: RAID активен/доступен только когда есть минимум **два одинаковых** совместимых диска (один и тот же вариант из `storageOptions`), а не просто два любых.

## Что меняем

### 1. Расчёт «есть ли пара одинаковых дисков»

Сейчас (строки ~319–326) используется `compatibleStorageCount >= 2` для авто‑включения и доступности RAID. Заменим на группировку совместимых строк по `index`:

- Считаем `storageGroupCounts: Map<index, number>` по строкам, прошедшим фильтр (`r.index !== null && !incompatibleStorageIds.has(r.id)`).
- `hasIdenticalPair = [...counts.values()].some(n => n >= 2)`.
- Дополнительно оставим `compatibleStorageCount` — он нужен для предупреждения «совсем нет дисков / только один диск».

### 2. Авто‑активация и доступность RAID

В `useEffect` (строки 323–326):
- `setRaid(true)` только если `hasIdenticalPair`;
- иначе `setRaid(false)`.

В чекбоксе RAID (строка ~550):
- `disabled={!hasIdenticalPair}` вместо `compatibleStorageCount < 2`.

### 3. Предупреждения

Сводим к одному корректному тексту в обоих местах:

- Существующий блок при `compatibleStorageCount === 1` (строки 514–536) — оставляем текст без изменений: «Без RAID ваши данные в опасности. Рекомендуем добавить второй диск.»
- Блок при `compatibleStorageCount >= 2 && !raid` (строки 556–578) — меняем условие на «есть диски, но нет пары одинаковых ИЛИ есть пара, но RAID выключен пользователем». Текст «Рекомендуем добавить RAID‑контроллер.» заменяем на тот же:

  «Без RAID ваши данные в опасности. Рекомендуем добавить второй диск.» / «RAID‑сыз деректеріңіз қауіпте. Екінші дискіні қосуды ұсынамыз.»

  Условие отображения второго блока:
  - `compatibleStorageCount >= 2 && !hasIdenticalPair` — есть несколько разных дисков, нет пары → показываем (текст про «добавить второй (такой же) диск» подходит).
  - `hasIdenticalPair && !raid` — пара есть, но RAID выключен → тоже показываем (текст подходит как предупреждение о рисках без RAID).

Чтобы не дублировать с первым блоком (когда `compatibleStorageCount === 1`), второй блок рендерим только при `compatibleStorageCount >= 2`.

### 4. Зависимости `useMemo`/`useEffect`

- В `useEffect` авто‑RAID зависимость меняем с `compatibleStorageCount` на `hasIdenticalPair`.
- В `calc` `useMemo` зависимости не меняются (raid уже в списке).

## Технические детали

```ts
const storageGroupCounts = useMemo(() => {
  const m = new Map<number, number>();
  storage.rows.forEach((r) => {
    if (r.index === null) return;
    if (incompatibleStorageIds.has(r.id)) return;
    m.set(r.index, (m.get(r.index) ?? 0) + 1);
  });
  return m;
}, [storage.rows, incompatibleStorageIds]);

const hasIdenticalPair = useMemo(
  () => [...storageGroupCounts.values()].some((n) => n >= 2),
  [storageGroupCounts]
);
```

Файл правок: только `src/routes/dedicated.tsx`. CSS и другие страницы не трогаем.
