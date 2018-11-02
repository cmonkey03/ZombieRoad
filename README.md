![zombie-road](https://user-images.githubusercontent.com/39240428/47937694-26672a00-dea7-11e8-9eb2-2d9c9a715d35.png)

# ZombieRoad
This is a side-scrolling single player game. Guide the puppy down ZombieRoad and avoid getting infected!

## Tech used
- JavaScript
- P5

## Features
- Control over avatar via use of arrow keys
- Zombies increase in both quantity and speed
- Avatar contamination increments upon contact with a zombie
- Avatar's wounds start to display once contamination score reaches 50
- Contamination score of 100 causes avatar to show even more wounds
- Background music consistent with era that also influenced graphics styling

## Setup
- First, ensure that you've cloned down the [ZombieRoad backend](https://github.com/tristramjones/ZombieRoadBackend) and followed the setup instructions there.
- Clone down this repo and run `npm install http-server`.
- Run `http-server -p 8000` from the command line and open [http://localhost:8000/](http://localhost:8000/) in your browser.

## Contribute
Thanks for your interest in contributing to ZombieRoad!

The following is a set of guidelines for contributing to the ZombieRoad client.

### Getting started
Review the documentation for P5 [here](https://p5js.org/reference/).

### Issues
Before submitting a new issue ensure that one has not already been created by reviewing the [open issues](https://github.com/cmonkey03/ZombieRoad/issues). If your bug is unique to the currently open issues, submit a new one [here](https://github.com/cmonkey03/ZombieRoad/issues/new).

#### Write detailed information
Detailed information is very helpful to understand an issue.

For example:
- How to reproduce the issue, step-by-step.
- The expected behavior (or what is wrong).
- Screenshots displaying the buggy behavior.
- The operating system.

### Pull requests
Pull Requests are always welcome. Ensure the PR description clearly describes the problem and solution. It should include:
- The operating system on which you tested.
- The relevant issue number, if applicable.


Ideas

1. Have one square that passes from right to left
  a.) squares = images
2. Avoid the squares instead of colliding into them
  a.) Have the score set to a certain number
  b.) Score decreases when player collides into squares
  c.) Keep the cursor in the frame to avoid cheating
  d.) Score would equal the number you have left when the timer is up
3. As soon as the player touches a single square, the game is over
  a.) Score = time
4. Levels
  a.) Speed could increase with time
  b.) Speed could increase with score
  c.) Levels = independent of score reporting

5. Make squares and sprite into avatars
