import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Overview = () => {
  return (
    <>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 py-2'>
        {/* Total revenue */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <span className='text-2xl'>💲</span>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>45,231.89 SEK</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        {/* Total profits */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Profits</CardTitle>
            <span className='text-2xl'>💸</span>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>45,231.89 SEK</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        {/* Total expenses */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Expenses
            </CardTitle>
            <span className='text-2xl'>🧾</span>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>45,231.89 SEK</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        {/* Average revenue */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg. Revenue</CardTitle>
            <span className='text-2xl'>🚕</span>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>45,231.89 SEK</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Overview;
