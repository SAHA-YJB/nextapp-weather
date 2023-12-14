import Link from 'next/link';
import React from 'react';
import NavBar from '../NavBar/NavBar';
import NavBarLink from '../NavBarLink/NavBarLink';
import CitySearchBar from '../CitySearchBar/CitySearchBar';
import { ubuntuBold } from '@/fonts/ubuntu';

const Header = () => {
  return (
    <header className='flex justify-center w-full min-w-full p-4 header h-full'>
      <div className='flex flex-wrap justify-around w-4/5 h-full min-h-full gap-4 header__container'>
        <div className='flex header__left'>
          <Link className='self-center header__title w-fit h-fit' href='/'>
            <h2 className='title__text w-fit h-fit'>
              <span
                className={`title__blue text-[1.7rem] text-[var(--sky-color)] ${ubuntuBold.className}`}
              >
                날씨
              </span>
            </h2>
          </Link>
          <div className='header__split w-[1px] h1/2 bg-slate-300 self-center mx-6' />
          <NavBar>
            <NavBarLink href='/'>Home</NavBarLink>
          </NavBar>
        </div>

        <div className='self-search header__right'>
          <CitySearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
