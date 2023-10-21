import Header from './_components/header';
import Footer from './_components/footer';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto] relative'>
      <Header />
      {/* Gradient */}
      <div
        className='absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-64'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#58bfff] to-[#675cf8] opacity-90 sm:opacity-50 dark:opacity-50 sm:dark:opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <main>{children}</main>
      {/* Gradient */}
      <div
        className='absolute inset-x-0 top-[calc(100%-22rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-54rem)]'
        aria-hidden='true'
      >
        <div
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80d5ff] to-[#b189fc] opacity-90 sm:opacity-50 dark:opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
