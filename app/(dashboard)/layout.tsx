import Header from './_components/header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen grid grid-rows-[auto_1fr]'>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
