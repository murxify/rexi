import Image from 'next/image';

import Logo from '@/components/logo';
import HeaderButtons from '@/components/header-buttons';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='grid lg:grid-cols-2 h-screen'>
      {/* Left section */}
      <section className='hidden lg:block relative'>
        <div className='p-5 flex justify-between items-center absolute top-0 inset-x-0 z-50'>
          <Logo />
          <div>
            <HeaderButtons />
          </div>
        </div>
        <div className='absolute inset-0'>
          <Image
            src='/taxi.jpg'
            fill
            alt='Yellow taxi toy'
            className='object-cover rounded-r-3xl shadow-2xl'
          />
        </div>
      </section>
      {/* Right section */}
      <section className='relative'>
        <div className='p-5 lg:hidden flex justify-between items-center absolute top-0 inset-x-0 z-50'>
          <Logo />
          <div>
            <HeaderButtons />
          </div>
        </div>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
