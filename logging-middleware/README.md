# Logging Middleware

A simple, reusable Node.js package built to funnel application logs directly to the evaluation server.

### What it does
Instead of littering `console.log` everywhere, we built this single generic `Log` function. Any part of the application (frontend React components or backend Node scripts) can import it to securely push custom logs.

### Usage
```javascript
import { Log } from 'logging-middleware';

// Example: Tracking a network error
await Log("frontend", "error", "api", "fetchNotifications failed");
```
