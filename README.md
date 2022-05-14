### Pomodoro App

https://maxjonas2.github.io/pomodoro-app/

- A simple pomodoro timer web app built based on the Frontend Mentor's challenge at https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G

- This is my _personal_ (currently in progress and still incomplete) implementation of the proposed app. 

- This is not a copy of any repositories or external source code. ALL of the app's logic, layout elements/components and styling have been implemented by me, from start to finish, with NO outside reference, other than the suggestion for the timer's optimization (see the _getTimer()_ function), which uses the _requestAnimationFrame_ and the Performance API's _performance.now()_ methods to prevent the counter from drifting due to the inherit nature of Javascript's event queue, performing poorly or visually glitching as a consequence of the way browsers handle _setInterval_ in the background to reduce workload and processor/memory usage (for eaxmple, when the user switches tabs or minimizes the browser window). These problems are solved by the implementation of the timer as suggested by @jakearchibald in the YouTube video linked down below:

https://youtu.be/MCi6AZMkxcU
(JavaScript counters the hard way)
