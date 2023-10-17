import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex justify-center py-32 sm:py-48 lg:py-56'>
      <SignIn redirectUrl='/dashboard' />
    </div>
  );
}
