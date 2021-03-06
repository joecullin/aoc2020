# Misc notes & thoughts.


---
## Final thoughts

Earned all 50 stars with only one hint needed (10.2). Not the prettiest code or the fastest, but I had fun and learned new things.

---
## Day 25

I thought the instructions were confusing. I wasn't sure if subject number 7 was just the example, or if I also needed to find a subject number.

Then I got to part two ... what!!??? At first I thought I had to figure out some trick to unlock the question. Then I got it: I have to go back and finish day 20 first.

---
## Day 24

Printing out a page of hexagonal graph paper really helped me visualize the steps between tiles.

---
## Day 23

Using Map and Set more and more. One thing I'm really liking about Map is that keys don't get turned into strings.

---
## Day 22

I should've stuck with calling them player 1 & 2 instead of 0 and 1. I wasted a ton of time optimizing my wrong solution because I had mixed up a zero and a one.

Had a version of my script that ran through nearly a billion rounds before running out of memory.

---
## Day 20

Hardest day, definitely.

Got the sample input working pretty easily for part 1, but my solution was too slow to finish part 1.

I'll keep working through optimization ideas; haven't broken down and looked for hints yet.

... coming back to this on 12/26. I spent a ton of time trying to optimize part 1 before I noticed that the 4 corners are eay to identify without solving the whole thing.

... part 2 took a while and I'm maddeningly close, but off by one monster. (Confirmed that by trying 15 less than my script's output.)

Spot checked several printed out sections and they seem ok. At this point I don't have it in me to hand-check the whole 96x96 grid. Calling it done and moving on.

---
## Day 19

Feeling very grateful for the couple of hints included in part two's instructions. I'm sure I would've burned a lot of cycles looking for a generic solution, rather than looking at those two specific rules.

---
## Day 15

Part 2: Part 1 plus a bonus 15 minutes of maxing out my cpu. But it gets the right answer! Now off to reddit to find out the trick ...

...

Two things I noticed from reddit:
- Everyone using Map instead of an object. Looks like it's faster. (I'm so spoiled by databases, I've never had to stop and think about that in javascript.) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Objects_and_maps_compared
- My solution tracks the last two values. Lots of people shared solutions that track just the last value.

---
## Day 13

I knew this would be something like 2019's Day 12 where a simple math insight would make it super quick, but I was too stubborn to google and read hints.

So I let it run while I went out for the day. Came home 10 hours later and it had just finished.

I came up with a couple of other small optimization ideas while I was out, but didn't bother pursuing them since I had my correct answer.

---
## Day 12

Another day where the straightforward approach worked fine. I thought I might have to figure out more elegant geometry (or do more ugly brute force) for part 2, but it wasn't too bad.

---
## Day 11

I blasted out a quick-and-dirty solution for part 1, fully expecting to need a totally different approach for part 2.

I don't know if I was relieved (easy win) or disappointed (wanted a challenge) when part 2 was unveiled. I kept the same O(something_big) approach and it finished quickly.

I'm sure I could come up with something faster or more elegant, but I'm going to take the easy win and call it a night.

---
## Day 10

First hard day.

I had what a working part 2 solution, using constant memory even after letting it run 6 hours, but it would've taken 1200 hours to complete.
Saved that as solutions/10.2.slow.js.

Broke down and peeked at some hints:

https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/gfcxuxf/

https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/gfbt72d/

It was hard to un-see the elegance of the second one. I forced myself to re-type it after glancing at it, but mine is basically an exact copy of it.


---
Added eslint and did some cleanup. To check all:

`npm run lint`

---
## Day 1

I like being able to run each puzzle independently for troubleshooting and for clarity, but the overhead got annoying last year.

Trying a little bit of a wrapper to make that less tedious.


---
## Setup


Getting started a little late, on Dec 2.

Last year I set a constraint of using no modules. I think I'll drop that this year.

