import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex justify-center py-14 sm:pt-48 lg:pt-56'>
      <SignUp redirectUrl='/dashboard' />
    </div>
  );
}
