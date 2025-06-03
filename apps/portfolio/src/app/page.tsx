'use client';

import React from 'react';

export default function Home() {
  return (
    <div className="p-6 font-mono text-xl leading-relaxed">
      <div className="flex">
        <div className="text-gray-700 dark:text-gray-300 select-none text-right mr-2">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div>

        <div className="flex-1">
          <div className="text-blue-500 dark:text-yellow-400">{'{'}</div>
          <div className="ml-10 break-all">
            <div>
              <span className="text-blue-800 dark:text-cyan-400">
                &quot;name&quot;
              </span>
              <span className="text-black dark:text-yellow-400">:</span>
              <span> </span>
              <span className="text-red-500 dark:text-purple-400">
                &quot;Emily Xiong 📇&quot;
              </span>
              <span className="text-black dark:text-yellow-400">,</span>
            </div>
            <div>
              <span className="text-blue-800 dark:text-cyan-400">
                &quot;location&quot;
              </span>
              <span className="text-black dark:text-yellow-400">:</span>
              <span> </span>
              <span className="text-red-500 dark:text-purple-400">
                &quot;Toronto, Canada 📍&quot;
              </span>
              <span className="text-black dark:text-yellow-400">,</span>
            </div>
            <div className=" flex flex-wrap min-w-0">
              <span className="text-blue-800 dark:text-cyan-400">
                &quot;title&quot;
              </span>
              <span className="text-black dark:text-yellow-400">:</span>
              <span> </span>
              <span className="text-red-500 dark:text-purple-400">
                &quot;Software Engineer 👩‍💻&quot;
              </span>
              <span className="text-black dark:text-yellow-400">,</span>
            </div>
            <div>
              <span className="text-blue-800 dark:text-cyan-400">
                &quot;email&quot;
              </span>
              <span className="text-black dark:text-yellow-400">:</span>
              <span> </span>
              <span className="text-red-500 dark:text-purple-400">
                <a href="mailto:xiongemi@gmail.com">
                  &quot;xiongemi@gmail.com 📧&quot;
                </a>
              </span>
              <span className="text-black dark:text-yellow-400">,</span>
            </div>
            <div>
              <span className="text-blue-800 dark:text-cyan-400">
                &quot;linkedin&quot;
              </span>
              <span className="text-black dark:text-yellow-400">:</span>
              <span> </span>
              <span className="text-red-500 dark:text-purple-400">
                <a
                  href="https://www.linkedin.com/in/xiongemi/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &quot;https://www.linkedin.com/in/xiongemi/ 👩🏻‍💼&quot;
                </a>
              </span>
              <span className="text-black dark:text-yellow-400">,</span>
            </div>
            <div>
              <span className="text-blue-800 dark:text-cyan-400">
                &quot;blog&quot;
              </span>
              <span className="text-black dark:text-yellow-400">:</span>
              <span> </span>
              <span className="text-red-500 dark:text-purple-400">
                <a
                  href="https://emilyxiong.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &quot;https://emilyxiong.medium.com/ ✍🏻&quot;
                </a>
              </span>
              <span className="text-black dark:text-yellow-400">,</span>
            </div>
            <div>
              <span className="text-blue-800 dark:text-cyan-400">
                &quot;github&quot;
              </span>
              <span className="text-black dark:text-yellow-400">:</span>
              <span> </span>
              <span className="text-red-500 dark:text-purple-400">
                <a
                  href="https://github.com/xiongemi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &quot;https://github.com/xiongemi 🗃️&quot;
                </a>
              </span>
            </div>
          </div>
          <div className="text-blue-500 dark:text-yellow-400">{'}'}</div>
        </div>
      </div>
    </div>
  );
}
