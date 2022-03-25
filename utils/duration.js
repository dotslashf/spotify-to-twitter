export default function duration(ms) {
  return `${Math.floor(ms / 1000 / 60)}:${Math.floor((ms / 1000) % 60)}`;
}
