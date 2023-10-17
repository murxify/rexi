import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex justify-center py-32 sm:py-48 lg:py-56'>
      <SignUp redirectUrl='/dashboard' />
    </div>
  );
}
