type TimeDiff = {
  sec: number;
  min: number;
  hour: number;
  date: number;
};

const getTimeDiff = (diff: number): TimeDiff => {
  const time = Math.abs(diff);
  const sec = time % 60;
  const min = Math.floor(time / 60) % 60;
  const hour = Math.floor(time / 3600) % 24;
  const date = Math.floor(time / 86400);
  return { date, hour, min, sec };
};

const profile = (
  <div>
    統合開発環境 (
    <a
      href="https://twitter.com/sadnessOjisan"
      target="_blank"
      rel="noopener noreferrer"
    >
      @sadnessOjisan
    </a>
    ) さんが
  </div>
);
const subject = "統合開発環境 (@sadnessOjisan) さんが";

const SrOnly = (props: { text: string }) => (
  <div className="sr-only" role="timer" aria-live="polite" aria-atomic="true">
    {props.text}
  </div>
);
const ShareOnTwitter = (props: { tweetText: string }) => {
  return (
    <div className="flex justify-center">
      <a
        href={`https://twitter.com/intent/tweet?hashtags=syusyoku_20210901&text=${props.tweetText}"&url=https://employment-ojisan.vercel.app/`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center flex-col"
        title="Share on Twitter"
      >
        <div
          className="h-10 w-10 bg-gray-700"
          style={{
            WebkitMask: `url(/images/twitter.svg) no-repeat center / contain`,
          }}
        />
        シェアする
      </a>
    </div>
  );
};

export default function CountDown(timeFromTarget: number) {
  const { sec, min, hour, date } = getTimeDiff(timeFromTarget);

  if (timeFromTarget >= 0 && timeFromTarget < 10) {
    const syusyokuNow = [...new Array(Math.floor((timeFromTarget + 1) ** 1.5))]
      .map((_) => "就職！")
      .join("");
    const justSyusyokuText = `${subject}${syusyokuNow}しました。`;
    return (
      <div>
        <div aria-hidden="true">
          {profile}
          <img
            src={`/images/message_syusyoku_omedetou.png`}
            className="fixed left-0 top-0 z-[-1] object-contain opacity-50 w-screen h-screen"
          />
          <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-none text-red-500">
            {syusyokuNow}
          </div>
          <div>しました。</div>
          <ShareOnTwitter tweetText={justSyusyokuText} />
        </div>
        <SrOnly text={justSyusyokuText} />
      </div>
    );
  }
  const isBefore = timeFromTarget < 0;
  const preText = `就職${isBefore ? "するまで、あと" : "してから"}`;
  const time = `${date}日${hour}時間${min}分${sec}秒`;
  const noSecTime = `${date}日${hour}時間${min}分`;
  const postText = `${isBefore ? "です" : "経ちました"}。`;
  const tweetText = `${subject}${preText}${time}${postText}`;
  const srText = `${subject}${preText}${noSecTime}${postText}`;
  const imgSrc = `/images/${
    isBefore ? "syusyoku_nayamu_neet_man.png" : "message_syusyoku_omedetou.png"
  }`;
  return (
    <div>
      <div aria-hidden="true">
        <img
          src={imgSrc}
          className="fixed left-0 top-0 z-[-1] object-contain opacity-25 w-screen h-screen"
        />
        {profile}
        <div>{preText}</div>
        <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-snug">
          {time}
        </div>
        <div>{postText}</div>
        <ShareOnTwitter tweetText={tweetText} />
      </div>
      <SrOnly text={srText} />
    </div>
  );
}
