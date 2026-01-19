import React from "react";

type Props = {
  onLayout: (dir: string) => void;
};

export default function FloatingMenu({ onLayout }: Props) {
  return (
    <ul className="menu bg-base-200 rounded-box w-56 p-2 border border-primary">
      <li>
        <a className="flex items-center gap-2">Item 1</a>
      </li>
      <li>
        <details open>
          <summary className="cursor-pointer px-2 py-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Layout
          </summary>
          <ul className="p-1">
            <li>
              <button className="btn btn-ghost w-full justify-start normal-case" onClick={() => onLayout("BT")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                Up
              </button>
            </li>
            <li>
              <button className="btn btn-ghost w-full justify-start normal-case" onClick={() => onLayout("TB")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                Down
              </button>
            </li>
            <li>
              <button className="btn btn-ghost w-full justify-start normal-case" onClick={() => onLayout("RL")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Left
              </button>
            </li>
            <li>
              <button className="btn btn-ghost w-full justify-start normal-case" onClick={() => onLayout("LR")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Right
              </button>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  );
}
