import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
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
        <div>
          <p>Youre signin as {JSON.stringify(session)}</p>
          <button
            onClick={e => {
              e.preventDefault();
              signOut();
            }}
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
}
