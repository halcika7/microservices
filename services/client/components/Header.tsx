import Link from 'next/link';
import { MouseEvent, useContext } from 'react';

import { AuthContext } from '../context/auth';

interface Props {
  onSignOut: (event: MouseEvent<HTMLElement>) => Promise<void>;
}

const Header = ({ onSignOut }: Props) => {
  const user = useContext(AuthContext);
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" passHref>
        <a href="/" className="navbar-brand">
          GitTix
        </a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {user.id ? (
            <li className="nav-item">
              <button type="button" onClick={onSignOut}>
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/auth/signup">
                  <a href="/">Sign Up</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/auth/signin">
                  <a href="/">Sign In</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
