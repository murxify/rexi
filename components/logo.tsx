import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href='/'
      className='font-mono italic font-bold text-3xl tracking-tight flex items-center'
    >
      {/* REXI */}
      RE<span className='text-6xl font-serif -mx-1'>X</span>I
    </Link>
  );
};

export default Logo;
