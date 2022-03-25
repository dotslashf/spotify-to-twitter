import { signIn, signOut, useSession } from 'next-auth/react';
import NowPlaying from '../components/NowPlaying';
import useAuth from '../utils/twitterAuth';

export default function Home() {
  const { data: session } = useSession();
  const { login, logout, twitterUser } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      {!session && (
        <div>
          <p>Youre not signin</p>
          <button
            onClick={e => {
              e.preventDefault();
              signIn();
            }}
          >
            Signin
          </button>
        </div>
      )}
      {session && (
        <div className="flex flex-col space-y-4">
          <div className="stats shadow text-primary">
            <div className="stat bg-spotify text-primary">
              <div className="stat-figure">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
                  <path d="M9 15c1.5 -1 4 -1 5 .5" />
                  <path d="M7 9c2 -1 6 -2 10 .5" />
                </svg>
              </div>
              <div className="stat-title font-semibold ">Spotify</div>
              <div className="stat-value">{session.token.name}</div>
            </div>
            <div className="stat bg-twitter text-twitter-dark">
              <div className="stat-figure">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                </svg>
              </div>
              <div className="stat-title font-semibold ">Twitter</div>
              <div className="stat-value">
                {!twitterUser && (
                  <button
                    className="btn"
                    onClick={e => {
                      e.preventDefault();
                      login();
                    }}
                  >
                    Sign in
                  </button>
                )}
                {twitterUser && <span>{twitterUser}</span>}
              </div>
            </div>
          </div>
          <NowPlaying />
          <div className="flex w-full space-x-2">
            <button
              className="btn btn-ghost bg-spotify hover:bg-secondary/80 text-primary gap-2 grow"
              onClick={e => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
                <path d="M9 15c1.5 -1 4 -1 5 .5" />
                <path d="M7 9c2 -1 6 -2 10 .5" />
              </svg>
            </button>
            <button
              className="btn gap-2 btn-ghost bg-twitter hover:bg-twitter-dark text-base-100 grow"
              onClick={e => {
                e.preventDefault();
                logout();
              }}
            >
              Sign Out
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
