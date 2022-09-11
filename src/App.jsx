import logo from "./logo.svg";
import "./AppStyle.css";
import React from "react";
import AppComp from "./components/AppComp";
import { marked } from "marked";
import main_icon from "./main_icon.png";

const App = () => {
  const [response, setResponse] = React.useState({});
  React.useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/revanced-apks/revanced-apks/release/release.json"
    )
      .then((res) => res.json())
      .then((json) => {
        setResponse(json);
      });
  }, []);
  return (
    <div className="App flex flex-col items-center justify-center">
      <header className="border-b-2 w-full pb-4 border-dotted">
        <h3 className="text-3xl font-extrabold text-red-400">
         ReVanced Apps
        </h3>
      </header>
      <div className="px-2 py-4 w-auto h-100">
        <div className="flex flex-col md:flex-row ">
          <div className="flex flex-col space-y-2 md:pl-3">
            <h1 className="text-2xl text-gray-200 font-extrabold underline pb-3">
              Release
            </h1>
            <h2 className="text-gray-100 text-lg">
              Date:{" "}
              <span className="font-bold">
                {response.published_at &&
                  new Date(response.published_at).toDateString()}
              </span>
            </h2>
            <div className="border p-4 rounded-3xl bg-gray-900 border-gray-400 shadow-md shadow-sky-500">
              {response.body ? (
                <p
                  className="text-gray-300 marked font-bold max-w-xl text-xs md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(
                      response.body.slice(13).replaceAll("\n", "<br />")
                    ),
                  }}
                ></p>
              ) : (
                <p className="text-gray-300 font-bold">Loading...</p>
              )}
            </div>
            <p className="text-gray-300">
              Use{" "}
              <a href="https://www.apkmirror.com/apk/team-vanced/microg-youtube-vanced/">
                microg
              </a>{" "}
              to login on youtube and music.
            </p>
          </div>
          <div className="pt-5 md:pt-0 space-y-2 md:pl-5">
            <h1 className="text-2xl text-gray-200 font-extrabold underline">
              Downloads
            </h1>
            <div className="space-y-4">
              {response.assets ? (
                response.assets
                  .slice()
                  .reverse()
                  .map((asset, index) => {
                    return (
                      <AppComp
                        key={index}
                        name={asset.name}
                        download={asset.browser_download_url}
                        size={Number.parseInt(asset.size)}
                        download_count={asset.download_count}
                      />
                    );
                  })
              ) : (
                <p className="text-gray-200">Loading...</p>
              )}
            </div>
          </div>
        </div>
          <div className="flex flex-col justify-center items-center mt-6 border border-gray-400 p-4 rounded-3xl bg-gray-900">
            <a
              className="flex flex-row text-xs text-red-200 no-underline items-center"
              href="https://revanced.app/"
            >
              <img className="h-10 w-10" src={main_icon} alt="Main Logo" />
            </a>
            <p className="text-xs">
              All credits to the original developers of{" "}
              <a
                className="text-xs text-red-200 no-underline"
                href="https://revanced.app/"
              >
                ReVanced
              </a>
              .
            </p>
            <p className="pt-2 text-sm">
              This project is open source, forked from <a href="https://github.com/j-hc/revanced-magisk-module">j-hc/revanced-magisk-module</a>, check our source at{" "}
              <a
                className="text-gray-300"
                href="https://github.com/revanced-apks"
              >
                GitHub
              </a>
            </p>
            <p>Join our <a href="https://t.me/revanced_apks_web">Telegram</a> for release updates.</p>
          </div>
        </div>
    </div>
  );
};

export default App;
