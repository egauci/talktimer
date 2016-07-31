export const millisecondsToHhmmss = ms => {
  const tsecs = Math.floor(ms / 1000);
  const hrs = Math.floor(tsecs / 3600);
  const min = Math.floor((tsecs - hrs * 3600) / 60);
  const sec = tsecs - hrs * 3600 - min * 60;
  const omin = min < 10 ? `0${min}` : String(min);
  const osec = sec < 10 ? `0${sec}` : String(sec);

  if (hrs === 0) {
    return `${omin}:${osec}`;
  }

  const ohrs = hrs < 10 ? `0${hrs}` : String(hrs);

  return `${ohrs}:${omin}:${osec}`;
};
