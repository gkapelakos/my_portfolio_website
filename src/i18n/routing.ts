import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'el'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // Optional: Hides locale prefix for default locale if desired, but default is 'always'. We'll use default ('always') or 'as-needed'. 'always' is simpler for multi-language routers. Let's stick with default 'always' by omitting it, or keep it explicitly. Let's use 'always' for maximum consistency in paths.
});
