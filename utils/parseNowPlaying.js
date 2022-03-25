export default function parseNowPlaying(obj) {
  const artists = obj.item.artists.map(artist => artist.name).join(', ');
  const track = obj.item.name;
  const fullText = `🎵 ${track} - ${artists}`;
  return fullText.length > 50 ? `${fullText.substring(0, 45)}...` : fullText;
}
