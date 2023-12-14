import { ubuntuBold } from '@/fonts/ubuntu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavBarLinkProps {
  href: string;
  children: string;
}

const NavBarLink = ({ href, children: text }: NavBarLinkProps) => {
  //경로추출
  const path = usePathname();
  const isCurrentPage = path === href;
  return (
    <li>
      <Link
        className={`navbarLink__link p-1 ${
          isCurrentPage ? 'text-[var(--sky-color)]' : 'text-black'
        } text-[1.17rem] hover:text-[var(--sky-color)] transition-all duration-500 ease-out ${
          ubuntuBold.className
        }}`}
        href={href}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavBarLink;
