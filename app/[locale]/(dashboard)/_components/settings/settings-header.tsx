import React from 'react';

const SettingsHeader = () => {
  return (
    <div className='mb-5 pb-5 border-b'>
      <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl'>
        Settings
      </h1>
      <p className='text-muted-foreground leading-7 mt-1'>
        Manage your profile and driver contract.
      </p>
    </div>
  );
};

export default SettingsHeader;
