import React from 'react';

const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className='grid items-center navbar'>
      <ul className='flex self-center w-full gpa-3 navbar__links align-center'>
        {children}
      </ul>
    </nav>
  );
};

export default NavBar;
