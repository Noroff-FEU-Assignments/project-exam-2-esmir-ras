import { Menu } from 'components/profiles';
import { AuthContext } from 'context/AuthContext';
import Link from 'next/link';
import Image, { SafeNumber } from 'next/image';
import { ReactNode, useContext, useState } from 'react';
import Copyright from '@mui/icons-material/Copyright';
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery
import { classNames } from '../../utils/classNames';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  children?: ReactNode;
}

export function Layout({ children }: Props) {
  const { logout, user } = useContext(AuthContext);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
          className={classNames(
            'w-12/12 mx-auto flex items-center justify-between gap-4 bg-indigo-300 rounded-lg sticky top-2 z-10',
            isMobile && 'flex-col p-4'
          )}
          style={{
            top: '0',
            borderRadius: '0',
            background:
              'linear-gradient(to right, #BD4D75, #6861DE)',
            color: '#fff',
            boxShadow:
              'linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1)) 0px 0px 20px',
          }}
        >
          {isMobile ? (
            // Show mobile menu button
            <div className="flex items-center justify-between w-full">
              <Image src="/Socialgram-2.png" alt="Logo" height={70} width={200}/>

              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
              <MenuIcon />
            </IconButton>
            </div>
          ) : (
            // Show full navigation menu for desktop
            <nav className="px-4" style={{ margin: '0 auto' }}>
              <ul className="flex items-center gap-4 list-none p-0 m-0 text-xs sm:text-base">
                <li className="p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer">
                  <Link href="/home" className="no-underline text-inherit">
                    Home
                  </Link>
                </li>
                <li className="p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer">
                  <Link href="/about" className="no-underline text-inherit">
                    About
                  </Link>
                </li>
                <li
                  className="rounded-lg transition-all duration-200 ease-out cursor-pointer"
                  style={{ margin: '0 2rem' }}
                >
                  <Image src="/Socialgram-2.png" alt="Logo" height={70} width={200} />
                </li>
                <li className="p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer">
                  <Link
                    href="/profiles"
                    className="no-underline text-inherit"
                  >
                    Explore profiles
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          {isMobile && isMobileMenuOpen && (
            <nav className="px-4" style={{ margin: '0 auto' }}>
              <ul className="flex flex-col items-center gap-4 list-none p-0 m-0 text-xs sm:text-base">
                <li className="p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer">
                  <Link href="/home" passHref>
                    <span className="no-underline text-inherit" style={{color:'#fff'}}>Home</span>
                  </Link>
                </li>
                <li className="p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer">
                  <Link href="/about" passHref>
                    <span className="no-underline text-inherit" style={{color:'#fff'}}>About</span>
                  </Link>
                </li>
                <li className="p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer">
                  <Link href="/profiles" passHref>
                    <span className="no-underline text-inherit" style={{color:'#fff'}}>Explore profiles</span>
                  </Link>
                </li>
                <li className="p-2 rounded-lg transition-all duration-200 ease-out cursor-pointer" style={{color:'#fff'}} onClick={logout}>
                  Logout
                </li>
              </ul>
            </nav>
            )}
      </header>
      <div className="w-11/12 max-w-5xl mx-auto lg:grid grid-cols-12 gap-8 pt-16" style={{width:'100%', maxWidth:'65%', paddingTop:'0'}}>
        <div className="col-span-4 relative mb-8 lg:mb-0" style={{top:'1rem'}}>
          <div className="sticky top-20" style={{top:'6rem'}}>{user && <Menu {...user} />}</div>
        </div>
        <div className="col-span-8 col-start-5 flex flex-col items-stretch gap-8 pb-16 mobile-width" style={{paddingTop:'1rem', width:'40vw'}}>
          {children}
        </div>
      </div>
      <footer className="w-12/12 mx-auto flex items-center justify-between gap-4 bg-indigo-300 p-2 mt-4 rounded-lg fixed bottom-2 left-1/2 -translate-x-1/2" style={{width: '100%', bottom:'0', borderRadius:'0', background:'linear-gradient(to right, rgb(189, 77, 117), rgb(104, 97, 222))', color:'#fff'}}>
        <p className="flex gap-2 justify-center items-center w-full">
          <Copyright /> All rights reserved. Esmir Rastoder{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
