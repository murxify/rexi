import { getScopedI18n } from '@/locales/server';

const SettingsHeader = async () => {
  const t = await getScopedI18n('dashboard.settingsPage');
  return (
    <div className='mb-5 pb-5 border-b'>
      <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl'>
        {t('title')}
      </h1>
      <p className='text-muted-foreground leading-7 mt-1'>{t('description')}</p>
    </div>
  );
};

export default SettingsHeader;
