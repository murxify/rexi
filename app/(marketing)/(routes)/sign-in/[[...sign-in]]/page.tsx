import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex justify-center py-14 sm:pt-48 lg:pt-56'>
      <SignIn redirectUrl='/dashboard' />
    </div>
  );
}
