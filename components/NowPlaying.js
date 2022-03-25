/* eslint-disable @next/next/no-img-element */
import useSWR from 'swr';
import duration from '../utils/duration';
import fetcher from '../utils/fetcher';
import { useState } from 'react';

export default function NowPlaying() {
  const { data, error } = useSWR(`/api/currentlyPlaying/`, fetcher);
  const [isUpdating, setIsUpdating] = useState(false);

  function handleSwitchUpdating() {
    setIsUpdating(!isUpdating);
  }

  return (
    <>
      {error && <div>failed to load</div>}
      {!data && <div>loading...</div>}
      {data && (
        <div className="card card-compact card-side bg-secondary shadow-md max-w-lg">
          <figure>
            <img
              className="w-36 h-36 object-center object-cover"
              src={data.item.album.images[0].url}
              alt={`${data.item.artists[0].name}-${data.item.name}`}
            />
          </figure>
          <div className="card-body text-accent justify-center">
            <h2 className="card-title">
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
              <div className="form-control" onClick={handleSwitchUpdating}>
                <label className="flex cursor-pointer items-center gap-2">
                  <span className="label-text text-base-100 font-semibold">
                    Update to twitter?
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isUpdating}
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
