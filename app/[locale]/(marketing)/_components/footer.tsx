import { getI18n } from '@/locales/server';
import { Coffee } from 'lucide-react';

const Footer = async () => {
  const t = await getI18n();

  return (
    <footer className='text-sm flex flex-col items-center py-4 space-y-1 text-muted-foreground'>
      <p>{t('footer.copy', { year: new Date().getFullYear() })}</p>
      <p className='flex items-center'>
        {t('footer.author', {
          emoji: <Coffee className='inline w-4 h-4 mx-1' />,
        })}
      </p>
    </footer>
  );
};

export default Footer;
