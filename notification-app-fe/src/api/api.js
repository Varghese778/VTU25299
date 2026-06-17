import { Log } from 'logging-middleware';

export const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFyaW5ndW0xMUBnbWFpbC5jb20iLCJleHAiOjE3ODE2NzcwOTAsImlhdCI6MTc4MTY3NjE5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImMxOTc2OGI2LTdiOTUtNDdhNS04ZjlmLTBkYzkzMDNkNDBlMyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYXJvbiB2YXJnaGVzZSIsInN1YiI6IjEzYzFiZDg2LWFmZjEtNDg1NS1hY2I3LWEwZDhlZGFjODkzYiJ9LCJlbWFpbCI6InNoYXJpbmd1bTExQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFyb24gdmFyZ2hlc2UiLCJyb2xsTm8iOiIyNTI5OSIsImFjY2Vzc0NvZGUiOiJqdUZwaHYiLCJjbGllbnRJRCI6IjEzYzFiZDg2LWFmZjEtNDg1NS1hY2I3LWEwZDhlZGFjODkzYiIsImNsaWVudFNlY3JldCI6ImRFc0d4akZHeUhzUVlHY3IifQ.SozkmMkHKEKsrMfDCHLmwQ-icTpZQYMBkdNwCvZxPkk";

globalThis.AFFORDMED_TOKEN = TOKEN;

export const fetchNotifications = async (page = 1, limit = 20, type = "") => {
  try {
    let url = `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;
    if (type) {
      url += `&notification_type=${type}`;
    }
    const res = await fetch(url, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    const data = await res.json();
    await Log("frontend", "info", "api", "fetchNotifications success");
    return data.notifications || [];
  } catch (e) {
    await Log("frontend", "error", "api", "fetchNotifications failed");
    return [];
  }
};
