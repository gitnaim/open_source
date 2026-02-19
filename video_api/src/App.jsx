import VideoControl from "./VideoControl";
import "../src/css/App.css";

function App() {
  let data = [
    { video: "seoul.mp4" },
    { video: "forest.mp4" },
    { video: "sunset.mp4" },
  ];

  return (
    <>
      <VideoControl propsValue={data} />
    </>
  );
}

export default App;
