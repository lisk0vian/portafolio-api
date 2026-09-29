// Shared base for bilingual content factories.
// Subclasses declare their own common/localized setters; this class owns
// the fork (locale) and merge (assemble) logic so it is written once.
export type ContentLang = 'en' | 'es';

export interface LocalizedPair<T> {
  en: T;
  es: T;
}

// Mutable scope for a single locale, forked from the factory.
// Each locale() call clones the common data, so en/es never share state.
export class LocaleScope<TCommon extends object, TLocalized extends object> {
  constructor(
    protected readonly common: Readonly<TCommon>,
    readonly lang: ContentLang,
    protected readonly patch: Partial<TLocalized> = {},
  ) {}

  protected set<K extends keyof TLocalized>(
    key: K,
    value: TLocalized[K],
  ): this {
    this.patch[key] = value;
    return this;
  }

  snapshot(): {
    common: Readonly<TCommon>;
    lang: ContentLang;
    patch: Readonly<Partial<TLocalized>>;
  } {
    return { common: this.common, lang: this.lang, patch: this.patch };
  }
}

export abstract class LocalizedFactory<
  TCommon extends object,
  TLocalized extends object,
  TBuilt,
  TScope extends LocaleScope<TCommon, TLocalized>,
> {
  private common: Partial<TCommon> = {};

  protected setCommon<K extends keyof TCommon>(
    key: K,
    value: TCommon[K],
  ): this {
    this.common[key] = value;
    return this;
  }

  protected abstract scope(
    lang: ContentLang,
    common: Readonly<TCommon>,
  ): TScope;

  // One fork per locale; set all common fields before forking.
  locale(lang: ContentLang): TScope {
    return this.scope(lang, { ...(this.common as TCommon) });
  }

  protected abstract requiredLocalized: readonly (keyof TLocalized)[];

  protected abstract merge(common: TCommon, localized: TLocalized): TBuilt;

  // Eager build of both locales; throws at startup when data is incomplete.
  assemble(en: TScope, es: TScope): LocalizedPair<TBuilt> {
    const enSnap = en.snapshot();
    const esSnap = es.snapshot();
    if (enSnap.lang !== 'en' || esSnap.lang !== 'es') {
      throw new Error('assemble expects (en, es) scopes');
    }
    for (const key of this.requiredLocalized) {
      if (enSnap.patch[key] === undefined)
        throw new Error(`missing en.${String(key)}`);
      if (esSnap.patch[key] === undefined)
        throw new Error(`missing es.${String(key)}`);
    }
    return {
      en: this.merge(enSnap.common as TCommon, enSnap.patch as TLocalized),
      es: this.merge(esSnap.common as TCommon, esSnap.patch as TLocalized),
    };
  }
}
