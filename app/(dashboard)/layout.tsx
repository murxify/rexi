import Header from './_components/header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className='container p-5'>{children}</main>
    </>
  );
};

export default DashboardLayout;
