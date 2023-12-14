import React from 'react';

interface NavBarLinkProps {
  href: string;
  children: string;
}

const NavBarLink = ({ href, children: text }: NavBarLinkProps) => {
  return <div>{text}</div>;
};

export default NavBarLink;
