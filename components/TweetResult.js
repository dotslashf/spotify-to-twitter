import { useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import parseNowPlaying from '../utils/parseNowPlaying';

export default function TweetResult() {
  const { data } = useSWR(`/api/currentlyPlaying/`, fetcher);
  const [tweet, setTweet] = useState('');

  useEffect(() => {
    if (data) {
      const { fullText } = parseNowPlaying(data);
      setTweet(fullText);
    }
  }, [data]);

  return (
    <div className="card card-compact p-3 bg-secondary shadow-md w-full text-accent">
      <div className="card-body">
        <h2 className="card-title font-bold">Tweeting:</h2>
        {!data && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {data && <p className="mt-2 whitespace-pre font-semibold">{tweet}</p>}
      </div>
    </div>
  );
}
