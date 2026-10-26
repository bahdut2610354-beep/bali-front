'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { endpoints, type ApiAdminSiteContentEntry, type ApiScooterDetail, type ApiNewsArticle, type Paginated } from '@/lib/endpoints';
import { mediaUrl } from '@/lib/api';
import { PAGE_SETTINGS_DEFINITIONS } from '@/lib/pageSettings';
import { seoImageKey, type SeoPageOverride } from '@/lib/seoSettings';

type ImageItem = { src: string; label: string; fallback: string };
type Target = { key: string; label: string; path: string; title: string; images: ImageItem[]; noindex?: boolean };
const input: CSSProperties = { width: '100%', boxSizing: 'border-box', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 12px', font: 'inherit', background: '#fff', color: '#111827' };
const button: CSSProperties = { border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', background: '#fff', font: 'inherit' };
const logo: ImageItem = { src: '/logo-tropical-bikes.png', label: 'Логотип сайта', fallback: 'Tropical Bikes Bali Scooter Rental' };

async function allPages<T>(load: (page: number) => Promise<Paginated<T> | T[]>): Promise<T[]> {
  const rows: T[] = [];
  for (let page = 1; ; page++) {
    const result = await load(page);
    if (Array.isArray(result)) return [...rows, ...result];
    rows.push(...result.results);
    if (!result.next) return rows;
  }
}

function imageItems(images: ImageItem[]): ImageItem[] {
  const unique = new Map<string, ImageItem>();
  for (const image of images) {
    if (image.src && !unique.has(seoImageKey(image.src))) unique.set(seoImageKey(image.src), image);
  }
  return [...unique.values()];
}

export default function AdminSeoSettings() {
  const [entries, setEntries] = useState<ApiAdminSiteContentEntry[]>([]);
  const [scooters, setScooters] = useState<ApiScooterDetail[]>([]);
  const [news, setNews] = useState<ApiNewsArticle[]>([]);
  const [selected, setSelected] = useState('home');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [drafts, setDrafts] = useState<Record<string, SeoPageOverride>>({});
  const [altDrafts, setAltDrafts] = useState<Record<string, string>>({});
  const [detailImages, setDetailImages] = useState<Record<string, ImageItem[]>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      endpoints.adminSiteContent(),
      allPages(page => endpoints.adminScooters({ page, page_size: 100 })),
      allPages(page => endpoints.adminNewsList({ page, page_size: 100 })),
    ]).then(([content, vehicles, articles]) => {
      if (cancelled) return;
      setEntries(Array.isArray(content) ? content : content.results);
      setScooters(vehicles);
      setNews(articles);
    }).catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : 'Не удалось загрузить SEO-настройки'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const targets = useMemo<Target[]>(() => {
    const pagePath = (key: string, fallback: string) => entries.find(e => e.key === `pageSettings.${key}.path` && e.language === 'all' && e.is_active)?.value || fallback;
    const commonImages = [logo, { src: '/logo1.svg', label: 'Изображение для социальных сетей', fallback: 'BALI-RENT' }];
    return [
      ...PAGE_SETTINGS_DEFINITIONS.map(page => ({
        key: page.key, label: page.label, path: pagePath(page.key, page.defaultPath),
        title: entries.find(e => e.key === `pageSettings.${page.key}.title` && e.language === 'en' && e.is_active)?.value || page.defaultTitles.en,
        noindex: ['booking', 'payment', 'login', 'register', 'profile'].includes(page.key),
        images: imageItems([...commonImages, ...entries.filter(e => e.value_type === 'image' && e.is_active).map(e => ({ src: e.media_url || e.value || '', label: e.key, fallback: '' }))]),
      })),
      ...scooters.map(scooter => ({
        key: `scooter_${scooter.id}`, label: `Скутер: ${scooter.title}`, path: `/scooter/${scooter.slug || scooter.id}`,
        title: `${scooter.title} rental in Bali · BALI-RENT`,
        images: imageItems([logo, { src: scooter.main_image ? mediaUrl(scooter.main_image) : '/placeholder-scooter.svg', label: 'Основное фото', fallback: scooter.title }, ...(scooter.gallery || []).map(img => ({ src: mediaUrl(img.image), label: `Фото ${img.id}`, fallback: img.alt_text || scooter.title }))]),
      })),
      ...news.map(article => {
        const title = article.translations?.find(t => t.language === 'en')?.title || article.title || article.slug;
        return {
          key: `news_${article.id}`, label: `Новость: ${title}`, path: `${pagePath('news', '/news')}/${article.slug}`, title: `${title} · BALI-RENT`,
          images: imageItems([logo, ...(article.image ? [{ src: mediaUrl(article.image), label: 'Обложка', fallback: title }] : []), ...(article.images || []).map(img => ({ src: mediaUrl(img.image), label: `Фото ${img.id}`, fallback: img.alt_text || title }))]),
        };
      }),
    ];
  }, [entries, scooters, news]);

  const target = targets.find(t => t.key === selected) || targets[0];
  // List endpoints may omit scooter galleries; retrieve the selected detail only.
  useEffect(() => {
    if (!selected.startsWith('scooter_') || detailImages[selected]) return;
    let cancelled = false;
    endpoints.adminScooter(selected.slice(8)).then(detail => {
      if (!cancelled) setDetailImages(current => ({ ...current, [selected]: (detail.gallery || []).map(img => ({ src: mediaUrl(img.image), label: `Фото ${img.id}`, fallback: img.alt_text || detail.title })) }));
    }).catch(e => { if (!cancelled) setError(e instanceof Error ? e.message : 'Не удалось загрузить фотографии'); });
    return () => { cancelled = true; };
  }, [selected, detailImages]);

  function entry(key: string) { return entries.find(e => e.key === key && e.language === 'all'); }
  const stored = entry(`seo.pages.${target.key}`);
  const saved = stored?.is_active ? (stored.json_value || {}) as SeoPageOverride : {};
  const draft = drafts[target.key] || saved;
  const images = imageItems([...target.images, ...(detailImages[target.key] || [])]);
  const altEntry = entry('seo.imageAlts');
  const savedAlts = (altEntry?.is_active ? altEntry.json_value || {} : {}) as Record<string, string>;
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved) || images.some(i => altDrafts[seoImageKey(i.src)] !== undefined);

  function patchDraft(field: keyof SeoPageOverride, value: string) {
    setDrafts(current => ({ ...current, [target.key]: { ...draft, [field]: value } }));
    setNotice('');
  }

  async function upsert(key: string, json_value: unknown, currentEntries: ApiAdminSiteContentEntry[]) {
    const existing = currentEntries.find(e => e.key === key && e.language === 'all');
    const payload = { key, language: 'all', value_type: 'json' as const, json_value, is_active: true };
    const updated = existing ? await endpoints.adminUpdateSiteContent(existing.id, payload) : await endpoints.adminCreateSiteContent(payload);
    setEntries(current => [...current.filter(e => e.id !== updated.id), updated]);
  }

  async function save() {
    setBusy(true); setError(''); setNotice('');
    try {
      // Merge the latest image map so edits on another page are retained.
      const response = await endpoints.adminSiteContent();
      const latest = Array.isArray(response) ? response : response.results;
      await upsert(`seo.pages.${target.key}`, { title: draft.title?.trim() || '', description: draft.description?.trim() || '' }, latest);
      const changedAlts = Object.fromEntries(images.filter(i => altDrafts[seoImageKey(i.src)] !== undefined).map(i => [seoImageKey(i.src), altDrafts[seoImageKey(i.src)].trim()]));
      if (Object.keys(changedAlts).length) {
        const existing = latest.find(e => e.key === 'seo.imageAlts' && e.language === 'all');
        await upsert('seo.imageAlts', { ...((existing?.json_value || {}) as Record<string, string>), ...changedAlts }, latest);
        setAltDrafts(current => Object.fromEntries(Object.entries(current).filter(([key]) => !(key in changedAlts))));
      }
      setDrafts(current => { const next = { ...current }; delete next[target.key]; return next; });
      setNotice('Сохранено. SEO-теги обновятся на сайте в течение минуты после следующего открытия страницы.');
    } catch (e) { setError(e instanceof Error ? e.message : 'Не удалось сохранить SEO-настройки'); }
    finally { setBusy(false); }
  }

  return (
    <section data-admin-i18n-skip="true" style={{ border: '1px solid #e5e7eb', borderRadius: 16, background: '#fff', padding: 20, marginBottom: 24, fontFamily: 'Inter, sans-serif', color: '#111827' }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 22 }}>SEO: метатеги и alt изображений</h2>
      <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6 }}>Выберите страницу, заполните поля и сохраните. Настройки общие для всех языков сайта. Пустые title и description используют стандартные значения.</p>
      {error && <p role="alert" style={{ color: '#b91c1c' }}>{error}</p>}
      {notice && <p role="status" style={{ color: '#15803d' }}>{notice}</p>}
      {loading ? <p>Загрузка страниц и изображений…</p> : <fieldset disabled={busy} style={{ border: 0, padding: 0, margin: 0, minWidth: 0, display: 'grid', gap: 16 }}>
        <label>Поиск страницы<input style={input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Название страницы, скутера или новости" /></label>
        <label>Страница<select style={input} value={selected} onChange={e => { setSelected(e.target.value); setNotice(''); }}>
          {targets.filter(t => t.key === selected || `${t.label} ${t.path}`.toLowerCase().includes(search.toLowerCase())).map(t => <option key={t.key} value={t.key}>{t.label} — {t.path}</option>)}
        </select></label>
        {target.noindex && <p style={{ margin: 0, fontSize: 13 }}>Служебная страница: индексация закрыта через noindex.</p>}
        <label>SEO title<input maxLength={255} style={input} value={draft.title || ''} onChange={e => patchDraft('title', e.target.value)} placeholder={target.title} /><small>{(draft.title || '').length} символов · обычно 30–60</small></label>
        <label>Meta description<textarea rows={3} maxLength={1000} style={input} value={draft.description || ''} onChange={e => patchDraft('description', e.target.value)} placeholder="Краткое уникальное описание этой страницы для поисковой выдачи" /><small style={{ color: (draft.description || '').length > 160 ? '#b45309' : '#6b7280' }}>{(draft.description || '').length} символов · обычно 120–160. Поисковик может сократить текст.</small></label>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: 16, overflowWrap: 'anywhere' }}>
          <small>Предпросмотр поискового сниппета</small><div style={{ color: '#15803d', marginTop: 8 }}>bali.bike{target.path}</div><div style={{ color: '#1a0dab', fontSize: 20, margin: '5px 0' }}>{draft.title || target.title}</div><div style={{ color: '#4b5563', lineHeight: 1.5 }}>{draft.description || 'Будет использовано стандартное описание страницы.'}</div>
        </div>
        <div><h3 style={{ fontSize: 16 }}>Alt изображений</h3><p style={{ fontSize: 13, color: '#6b7280' }}>Опишите, что изображено на фото. Alt одного изображения применяется во всех местах сайта. Пустое поле означает декоративное изображение (alt=""). Неизменённые поля сохраняют прежний текст.</p></div>
        {images.map(image => {
          const key = seoImageKey(image.src);
          return <label key={key} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <img src={image.src} alt="" loading="lazy" style={{ width: 88, height: 66, borderRadius: 8, objectFit: 'contain', background: '#f3f4f6' }} />
            <span style={{ flex: '1 1 220px', minWidth: 0 }}><span style={{ fontSize: 12, color: '#6b7280', overflowWrap: 'anywhere' }}>{image.label}</span><input aria-label={`Alt: ${image.label}`} maxLength={255} style={input} value={altDrafts[key] ?? savedAlts[key] ?? image.fallback} onChange={e => { setAltDrafts(current => ({ ...current, [key]: e.target.value })); setNotice(''); }} /></span>
          </label>;
        })}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" style={{ ...button, background: '#111827', color: '#fff' }} onClick={save} disabled={!dirty || busy}>{busy ? 'Сохранение…' : 'Сохранить SEO'}</button>
          <button type="button" style={button} onClick={() => { setDrafts(current => ({ ...current, [target.key]: { title: '', description: '' } })); setNotice(''); }}>Стандартные метатеги</button>
          <a href={target.path} target="_blank" rel="noopener noreferrer" style={{ color: '#374151', fontSize: 13 }}>Открыть страницу ↗</a>
          {dirty && <small>Есть несохранённые изменения</small>}
        </div>
      </fieldset>}
    </section>
  );
}
