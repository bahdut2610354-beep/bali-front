/*
 * bali.bike: конверсии «клик по WhatsApp» и «клик по Telegram» для Google Ads
 *
 * КАК ПОДКЛЮЧИТЬ
 * 1. Подставьте свои значения в SEND_TO (см. ниже, где их взять).
 * 2. Вставьте весь файл в <script>...</script> перед </body> на ВСЕХ страницах,
 *    где есть иконки мессенджеров (проще: в общий шаблон/футер сайта).
 *    Либо подключите файлом: <script src="/messenger-conversions.js" defer></script>
 * 3. Google-тег (gtag.js / AW-...) на сайте уже должен быть установлен.
 *    Он у вас стоит: на нём работают текущие конверсии «Page load» и «Contact».
 *
 * ГДЕ ВЗЯТЬ ЗНАЧЕНИЯ ДЛЯ SEND_TO
 * Google Ads -> Цели -> Конверсии -> Создать конверсию -> Веб-сайт ->
 * «Добавить конверсию вручную» (код). Создайте ДВЕ конверсии:
 *   «Клик WhatsApp» и «Клик Telegram» (категория «Контакт»,
 *   счёт «Одна», основное действие «Да»).
 * В разделе «Фрагмент события» найдите строку вида
 *   'send_to': 'AW-123456789/AbCdEfGhIjKlMnOp'
 * и скопируйте её значение сюда.
 */
(function () {
  'use strict';

  // === НАСТРОЙКИ: ЗАМЕНИТЕ значения на свои из Google Ads ===
  var SEND_TO = {
    whatsapp: 'AW-18373201500/BhXQCILWiKodENycg71E',
    telegram: 'AW-18373201500/dF_vCIXWiKodENycg71E'
  };
  // ==========================================================

  // Ссылки на мессенджеры (wa.me, api.whatsapp.com, whatsapp://, t.me, tg://)
  var RE_WA = /^(https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)([\/?#]|$)|whatsapp:)/i;
  var RE_TG = /^(https?:\/\/(t\.me|telegram\.me)([\/?#]|$)|tg:)/i;

  // Защита от двойного срабатывания (двойной клик, click + auxclick)
  var THROTTLE_MS = 2000;
  var lastFired = { whatsapp: 0, telegram: 0 };

  function sendConversion(type) {
    var target = SEND_TO[type];

    // Не отправляем, пока не подставлены реальные значения
    if (!target || target.indexOf('XXXX') !== -1 || target.indexOf('_LABEL') !== -1) {
      if (window.console && console.warn) {
        console.warn('[messenger-conversions] Не заданы значения SEND_TO для: ' + type);
      }
      return;
    }

    var now = Date.now();
    if (now - lastFired[type] < THROTTLE_MS) return;
    lastFired[type] = now;

    // Если gtag ещё не определён, кладём событие в dataLayer
    window.dataLayer = window.dataLayer || [];
    var g = window.gtag || function () { window.dataLayer.push(arguments); };

    // transport_type: 'beacon': отправка не прервётся, даже если ссылка
    // откроется в этой же вкладке или приложении.
    g('event', 'conversion', {
      send_to: target,
      transport_type: 'beacon'
    });
  }

  function onClick(e) {
    var el = e.target;
    if (!el || !el.closest) return;

    // Иконка может быть <svg>/<img> внутри <a>: поднимаемся до ссылки
    var a = el.closest('a[href]');
    if (!a) return;

    var href = a.href || '';
    if (RE_WA.test(href)) {
      sendConversion('whatsapp');
    } else if (RE_TG.test(href)) {
      sendConversion('telegram');
    }
  }

  // capture = true: сработает раньше других обработчиков и до перехода по ссылке
  document.addEventListener('click', onClick, true);
  // Клик средней кнопкой мыши (открытие в новой вкладке)
  document.addEventListener('auxclick', function (e) {
    if (e.button === 1) onClick(e);
  }, true);
})();

/*
 * ПРОВЕРКА
 * - Откройте сайт с Google Tag Assistant (tagassistant.google.com) или в Chrome DevTools -> Network
 *   и кликните по иконке: должен уйти запрос к googleadservices.com / google.com/pagead/conversion.
 * - В Google Ads статус конверсии сменится на «Записывает конверсии» в течение нескольких часов.
 *
 * ЕСЛИ ИКОНКИ НЕ ЯВЛЯЮТСЯ ССЫЛКАМИ <a href="...">
 * (например, это <button onclick="window.open(...)">), сообщите разработчику:
 * вызов sendConversion('whatsapp') / sendConversion('telegram') нужно вставить
 * в их собственный обработчик клика.
 */
