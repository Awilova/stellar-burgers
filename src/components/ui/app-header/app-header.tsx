import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';
import clix from 'clsx';

type NavLinkProps = {
  isTransitioning: boolean;
  isActive: boolean;
  isPending: boolean;
};

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const setActive = ({ isActive }: NavLinkProps) =>
    clix({
      [styles.link]: true,
      [styles.link_active]: isActive
    });

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' className={setActive}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='/feed' className={setActive}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <NavLink to='/' className={setActive}>
          <div className={styles.logo}>
            <Logo className='' />
          </div>
        </NavLink>
        <div className={styles.link_position_last}>
          <NavLink to={userName ? 'profile' : 'login'} className={setActive}>
            {({ isActive }) => (
              <>
                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  {userName || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
