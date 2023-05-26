'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// utility functions
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'; // to see which user is using session useSession

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          className='object-contain'
          alt='Promptopia Logo'
          width={30}
          height={30}
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/** DESKTOP NAV*/}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile' className='rounded-full'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              ></Image>
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className='black_btn'
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>

      {/** MOBILE NAV*/}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              className='object-contain'
              alt='Promptopia Logo'
              width={30}
              height={30}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  className='mt-5 w-full black_btn'
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  {' '}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className='black_btn'
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
