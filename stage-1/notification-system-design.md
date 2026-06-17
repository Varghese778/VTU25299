# Stage 1

To build the priority inbox, I used a scoring system based on two things: category importance and how recent the notification is. Placements get the highest score, then Results, and finally Events. I converted the timestamps into milliseconds and added them to the category base score, so newer notifications act as a natural tiebreaker within the same category.

To keep the top 10 list fast as new notifications flood in, I'd use a Min-Heap of size 10. Instead of sorting the whole database every time, we just check if a new notification's score beats the lowest score in our heap. If it does, we swap it. This keeps everything incredibly fast and efficient!
