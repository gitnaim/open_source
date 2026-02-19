// import { useEffect, useState } from "react";

// function VideoControl(props) {
//   const data = props.propsValue || [];
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     if (data.length === 0) return;

//     const video = document.getElementById("my_video");
//     const videoList = data.map((d) => d.video);

//     video.src = `/assets/video/${videoList[activeIndex]}`;
//     video.muted = true;

//     video.play().catch((e) => console.log("재생 대기 중..."));
//   }, [activeIndex, data]);

//   return (
//     <div className="container">
//       {data.map((d, i) => (
//         <button
//           key={i}
//           id={"video" + (i + 1)}
//           className={activeIndex === i ? "active" : ""}
//           onClick={() => setActiveIndex(i)}
//         >
//           {"video " + (i + 1)}
//         </button>
//       ))}
//       <video id="my_video" controls width="600"></video>
//     </div>
//   );
// }

// export default VideoControl;

// import { useEffect, useState, useRef } from "react";

// function VideoControl(props) {
//   const data = props.propsValue || [];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (data.length === 0) return;
//     const video = videoRef.current;
//     const videoList = data.map((d) => d.video);

//     video.src = `/assets/video/${videoList[activeIndex]}`;
//     video.muted = true;

//     // 새 영상 로드 시 자동 재생 및 상태 업데이트
//     video
//       .play()
//       .then(() => setIsPlaying(true))
//       .catch(() => setIsPlaying(false));
//   }, [activeIndex, data]);

//   // 재생/일시정지 토글 함수
//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="button-group">
//         {data.map((d, i) => (
//           <button
//             key={i}
//             className={activeIndex === i ? "active" : ""}
//             onClick={() => setActiveIndex(i)}
//           >
//             {"video " + (i + 1)}
//           </button>
//         ))}
//       </div>

//       <div
//         className={`video-wrapper ${isPlaying ? "playing" : "paused"}`}
//         onClick={togglePlay}
//       >
//         <video
//           ref={videoRef}
//           id="my_video"
//           width="600"
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//         ></video>

//         {/* 중앙 아이콘 오버레이 */}
//         <div className="video-overlay">
//           {isPlaying ? (
//             <div className="pause-icon">
//               ||
//             </div> /* 재생 중일 때 호버하면 보일 일시정지 아이콘 */
//           ) : (
//             <div className="play-icon">
//               ▶
//             </div> /* 정지 중일 때 항상 보일 재생 아이콘 */
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoControl;

import { useEffect, useState, useRef } from "react";

function VideoControl(props) {
  const data = props.propsValue || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false); // 아이콘 노출 여부 상태
  const videoRef = useRef(null);
  const timerRef = useRef(null); // 타이머를 저장할 Ref

  useEffect(() => {
    if (data.length === 0) return;
    const video = videoRef.current;
    const videoList = data.map((d) => d.video);

    video.src = `/assets/video/${videoList[activeIndex]}`;
    video.muted = true;

    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [activeIndex, data]);

  // 마우스 움직임 감지 함수
  const handleMouseMove = () => {
    setShowIcon(true); // 마우스를 움직이면 아이콘 보임

    // 기존에 작동하던 타이머가 있다면 취소 (움직이는 동안은 안 사라지게)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 2초(2000ms) 후에 아이콘 숨기기
    timerRef.current = setTimeout(() => {
      setShowIcon(false);
    }, 2000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    // 클릭 시에도 아이콘을 즉시 보여줌
    setShowIcon(true);
  };

  return (
    <div className="container">
      <div className="button-group">
        {data.map((d, i) => (
          <button
            key={i}
            className={activeIndex === i ? "active" : ""}
            onClick={() => setActiveIndex(i)}
          >
            {"video " + (i + 1)}
          </button>
        ))}
      </div>

      <div
        className={`video-wrapper ${isPlaying ? "playing" : "paused"}`}
        onClick={togglePlay}
        onMouseMove={handleMouseMove} // 마우스 움직임 이벤트 추가
        onMouseLeave={() => setShowIcon(false)} // 마우스가 화면 나가면 즉시 숨김
      >
        <video
          ref={videoRef}
          id="my_video"
          width="600"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        ></video>

        {/* showIcon 상태가 true거나, 영상이 정지 중일 때만 아이콘 표시 */}
        {(showIcon || !isPlaying) && (
          <div className="video-overlay">
            {isPlaying ? (
              <div className="pause-icon">||</div>
            ) : (
              <div className="play-icon">▶</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoControl;
