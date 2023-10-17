const Footer = () => {
  return (
    <footer className='text-sm flex flex-col items-center py-4 space-y-1 text-muted-foreground'>
      <p>Copyright &copy;{new Date().getFullYear()} REXI</p>
      <p>made with &#10084; by murxify</p>
    </footer>
  );
};

export default Footer;
