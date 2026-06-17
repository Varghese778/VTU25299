# Stage 1 - Priority Inbox Algorithm

This folder contains the logic for determining which notifications should be pushed to the top of the user's priority inbox.

### Files
- `stage1.js`: A standalone script that fetches the raw notifications, applies the scoring algorithm, and prints the top 10 most critical notifications to the console.
- `notification-system-design.md`: A brief explanation of the logic and data structures used behind the scenes to keep the inbox efficient.

### Running it
You can test the logic directly using Node:
```bash
node stage1.js
```
