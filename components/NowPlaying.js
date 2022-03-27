/* eslint-disable @next/next/no-img-element */
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import duration from '../utils/duration';
import { useState } from 'react';

export default function NowPlaying({ isUpdatingToTwitter }) {
  const { data, error } = useSWR(`/api/currentlyPlaying/`, fetcher);
  const [isUpdating, setIsUpdating] = useState(isUpdatingToTwitter);

  async function handleSwitchUpdating() {
    setIsUpdating(!isUpdating);
    const res = await fetch(`/api/player/`, {
      method: 'POST',
      body: JSON.stringify({ isUpdating: !isUpdating }),
    });
  }

  return (
    <>
      {error && <NowPlayingLoading />}
      {!data && <NowPlayingLoading />}
      {data && (
        <div className="card card-compact card-side bg-secondary shadow-md w-full">
          <figure>
            <img
              className="w-36 h-36 object-center object-cover"
              src={data.item.album.images[0].url}
              alt={`${data.item.artists[0].name}-${data.item.name}`}
            />
          </figure>
          <div className="card-body text-accent justify-center">
            <h2 className="card-title font-bold">
              {data.item.name} -{' '}
              {data.item.artists
                .map(artist => {
                  return artist.name;
                })
                .join(', ')}
            </h2>
            <span>
              {data.item.album.name} - {duration(data.item.duration_ms)}
            </span>
            <div className="card-actions">
              <div className="form-control">
                <label className="flex cursor-pointer items-center gap-2">
                  <span className="label-text text-accent font-semibold">
                    Update to twitter?
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isUpdating}
                    onChange={handleSwitchUpdating}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NowPlayingLoading() {
  return (
    <div className="card card-compact card-side bg-gray-300 shadow-md w-full animate-pulse">
      <figure>
        <div className="w-36 h-36 bg-gray-400"></div>
      </figure>
      <div className="card-body text-accent justify-center">
        <div className="card-title h-8 w-52 rounded-md bg-gray-400"></div>
        <span className="h-6 w-28 rounded-md bg-gray-400"></span>
        <div className="card-actions">
          <span className="h-4 w-24 rounded-md bg-gray-400"></span>
        </div>
      </div>
    </div>
  );
}
