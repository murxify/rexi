import Aside from '../../../_components/settings/aside';
import SettingsHeader from '../../../_components/settings/settings-header';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SettingsHeader />
      <div className='grid sm:grid-cols-[auto_1fr] gap-6'>
        <Aside />
        <section>{children}</section>
      </div>
    </>
  );
};

export default SettingsLayout;
