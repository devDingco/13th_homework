'use strict';

// Obligatory isNumber()
function isNumber(input) {
    if (typeof input === 'number') return input - input === 0;
    if (typeof input === 'string' && input.trim() !== '') return Number.isFinite ? Number.isFinite(+input) : isFinite(+input);
    return false;
}

// Scroll throttling suggested in the lecture note(timeout=2) : 
//                                    1, 2, 3, 4, 5        8    <----- scroll event at each timestamps: 1s, 2s, 3s, 4s, 5s, 8s
//                                    v  x  x  x  x  x  x  v  <----- x means handler was not executed. v means it was executed                                    
//
// another example :                  1, 2, 3, 4, 5        8 9  <----- scroll event at each timestamps: 1s, 2s, 3s, 4s, 5s, 8s, 9s
//                                    v  x  x  x  x  x  x  v x
//
// another example :                  1, 2, 3, 4, 5, 6, 7, 8, 9
//                                    v  x  x  x  x  x  x  x  x
//
// With scroll event, one of the most common user story is when user scrolls down continuously.
// In such case, it is likely that the {function that pads more images to the view} is only invoked once.
//
// <LECTURE NOTE>
//
// let scrollTimer = null;
// window.addEventListener("scroll", () => {
//     let d;
//     let scrollPerCent = (d=document.documentElement).scrollTop / (d.scrollHeight - d.clientHeight);
//     if (scrollPerCent < 0.7 || scrollTimer) return;
//     add10Pics();
//     scrollTimer = setTimeout(() => {
//         scrollTimer = null;
//         if ((scrollPerCent=(d=document.documentElement).scrollTop / (d.scrollHeight - d.clientHeight)) > 0.9) add10Pics();
//     }, 1000);
// });
//
// <ETON ERUTCEL>

// My version of throttling should behave like this(timeout=2)
// 1,  2,  3,  4,  5,  6,  7,  8,  9,  10
// v   x   x   v   x   x   v   x   x   v
// Set On  On  Off
//             Set On On  Off
//                        Set On  On  Off
//                                    Set
// INVARIANT:
//             1) Handler is executed on "Set Timer" phase
//             2) Timer must last full duration (timeout=2s for example)
//             3) Event is ignored during the "Timer on" phase
//             4) At most 1 timer is on

// {   // empty nested block creating a scope for timer variable.
//     console.time("----------->ADD10PICS");
//     console.time("SCROLLEVENT");
//     let timer = null;
//     const TIMEOUT = 1000;
//     const CALLBACK = add10Pics;
//     window.addEventListener("scroll", () => {
//         console.timeLog("SCROLLEVENT");
//         if (!!timer) return; // Invariant 3) is satisfied because (!!timer) => exit
//         timer = setTimeout(()=>{timer = null}, TIMEOUT); // Invariant 2) is satisfied because timer is nullified on expiration of timer.
//         console.timeLog("----------->ADD10PICS");
//         CALLBACK(); // Invariant 1) is satisfied because Handler was called as soon as Set timer is done.
//     }); // Invariant 2) is satisfied because timer is not-null if and only if (!timer) 
// } // Empirically TESTED to be working as intended; Using console.time & console.timeEnd

// Satisfying all 5 SOLID principles seemed like a road to overengineering.
// Single Responsibility & Open-Closed
// This function should be extensible without changing internals. Extension: such as adding "logging" feature
// This function should do one job: It throttles some asynchronous event stream.
// EventTarget.addEventListener("scroll", throttle(eventListener, timeout, debug)); 

function throttle(eventListener, {timeout=1000, debug=false, debugLabel="Throttled Event"}) {
    if (!!debug) console.time(debugLabel);
    let timer = null;
    return (event) => {
        if (!!timer) {
            if (!!debug) {
                console.log("<Ignored Event>");
                console.dir(event);
                console.log("</Ignored Event>");
            }    
            return;
        }
        timer = setTimeout(()=>{timer=null}, timeout);
        eventListener(event);
        if (debug) {
            console.timeLog(debugLabel);
            console.dir(event);
            console.log("</Throttled Event>");
        }
    };
}

// Similarly, Lecture note implementation would delay key input far too long if user input is rapidly back to back given for a long period.
// Input debouncing suggested in the lecture note(timeout=2) : 
//                                    1, 2, 3, 4, 5        8    <----- input event at each timestamps: 1s, 2s, 3s, 4s, 5s, 8s
//                                    x  x  x  x  x  x  v  x  x  v  <----- x means handler was not executed. v means it was executed                                    
//
// another example :                  1, 2, 3, 4, 5     7  8  <----- input event at each timestamps: 1s, 2s, 3s, 4s, 5s, 7s, 8s
//                                    x  x  x  x  x  x  x  x  x  v
//
// another example :                  1, 2, 3, 4, 5, 6, 7, 8, 9
//                                    x  x  x  x  x  x  x  x  x  x  v
// <LECTURE NOTE>
// let debounceTimer = null;
// document.querySelector("input.search-input").addEventListener("input", (e) => {
//    setTimeout(getQuery, 1000);
// });
// <ETON ERUTCEL>
// My debounce(timeout=2) :
// 1,  2,  3,  4,  5,  6,  7,  8,  9
// x   x   v   x   x   v   x   x   v
// Set On  Off
//             Set On Off
//                        Set  On  Off
// 1,  2,  3,  4,  5,      7,  8,
// x   x   v   x   x   v   x   x   v
// Set On  Off Set On  Off Set On  Off
// 1,  2,  3,  4,  5,          8,
// x   x   v   x   x   v   x   x   x   v
// Set On Off  Set On Off      Set On  Off

// Invariant
// 1. Handler is executed on "Timer expired" phase
// 2. Timer must last full duration
// 3. Event is ignored during "Timer on" phase
// 4. At most 1 timer is on, and Timer on/Timer off do not coincide at exact same timestamp

function debounce(eventListener, {timeout=1000, debug=false, debugLabel="Debounced Event"}) {
    if (!!debug) console.time(debugLabel);
    let timer = null;
    return (event) => {
        if (!!timer) {
            if (!!debug) {
                console.log("<Ignored Event>");
                console.dir(event);
                console.log("</Ignored Event>");
            }
            return; // Invariant 3
        }
        setTimeout(event => {
            if (debug) {
                console.timeLog(debugLabel);
                console.dir(event);
                console.log("</Throttled Event>");
            }
            return eventListener(event);
        }, timeout);
    };
}

export { isNumber, throttle}; 