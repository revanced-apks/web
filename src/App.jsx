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
      "https://api.github.com/repos/revanced-apks/revanced-apks/releases/latest"
    )
      .then((res) => res.json())
      .then((json) => {
        setResponse(json);
      });
  }, []);
  return (
    <div className="App flex flex-col items-center justify-center">
      <header>
        <h3 className="text-4xl text-red-400 font-extrabold pb-4">
          ReVanced APKs
        </h3>
      </header>
      <div className="border-2 rounded-xl border-red-400 px-2 py-4 w-auto h-100">
        <div className="flex flex-col md:flex-row md:divide-x md:space-x-5">
          <div className="flex flex-col space-y-2 items-center">
            <h1 className="text-2xl text-gray-200 font-extrabold underline pb-3">
              Release
            </h1>
            <h2 className="text-gray-100 text-lg">
              Date:{" "}
              <span className="font-bold">{response.published_at && new Date(response.published_at).toLocaleString()}</span>
            </h2>
            {response.body ? (
              <p
                className="text-gray-300 marked font-bold max-w-xl text-xs md:text-base"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(response.body.slice(13).replaceAll("\n","<br />")),
                }}
              ></p>
            ) : (
              <p className="text-gray-300 font-bold">Loading...</p>
            )}
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
            <div className="px-2 py-4 space-y-2">
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
                        size={Number.parseInt(asset.size / 1000000)}
                      />
                    );
                  })
              ) : (
                <p className="text-gray-200">Loading...</p>
              )}
            </div>
          </div>
        </div>
        <div className="px-2 py-4">
          <div className="flex flex-col justify-center items-center pt-5 border px-2 py-4 rounded-3xl bg-gray-900">
            <a
              className="flex flex-row text-xs text-red-200 no-underline items-center"
              href="https://revanced.app/"
            >
              <img className="h-10 w-10" src={main_icon} alt="Main Logo" />
            </a>
            <p className="flex items-center justify-center text-gray-100 text-xs">
              All credits to the original developers of&nbsp;
              <a
                className="flex flex-row text-xs text-red-200 no-underline items-center"
                href="https://revanced.app/"
              >
                ReVanced
              </a>
              .
            </p>
            <p className="text-xs text-gray-100">
              Thanks to our upstream repository{" "}
              <a href="https://github.com/j-hc/revanced-magisk-module">
                Revanced Magisk Module
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
