### Welcome to Unbeatable Tic-Tac-Toe

I built this app as a challenge to myself to recreate tic-tac-toe quickly and efficiently without using the React tutorial as a guide. After I got the basic game working (just a user playing vs themselves) I decided to increase the challenge by implementing an AI using the minimax algorithm.

I certainly did not try to recreate the algorithm from scratch. The difficulty came from applying what I learned in my research to the specific layout my game used. As can happen with recursive functions, I kept running into stack overflows, which I finally worked out after extensive rubber-ducking of my classmates.

Over the course of heavily commenting the code and bugfixing, I learned a lot both about working with someone else's code and about how the minimax algorithm works.

After creating the unbeatable AI, I built a super easy mode, where it is impossible to lose. This was as simple as reversing the returns of the minimax function when easy mode was selected. From there, I moved on to make medium mode, which proved more difficult.

I tried several versions that used a combination of random moves and hard mode AI moves. In the end, the iteration that felt the most balanced was using hard mode for the first 3 moves then switching to easy mode for the remaining 6. 

In future iterations I hope to implement these features:

* PvP capability
* Mobile friendliness
