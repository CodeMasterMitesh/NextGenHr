# JWT Token Cookie Implementation - Quick Guide

## What Changed?

Your JWT token is now being sent and stored as an **httpOnly cookie** (in addition to the response body).

## Where to Find It

### After Login:

1. **Open Browser DevTools** → Press `F12`
2. **Go to** → `Application` tab
3. **Look in** → `Cookies` section
4. **Find** → `authToken` (the JWT cookie)

### Screenshot Path:
```
DevTools → Application → Cookies → localhost:5000 → authToken
```

## Why httpOnly Cookie?

| Method | Security | Auto-sent | XSS Safe |
|--------|----------|-----------|----------|
| localStorage | ❌ Low | ❌ No | ❌ No (XSS can access) |
| sessionStorage | ❌ Low | ❌ No | ❌ No (XSS can access) |
| **httpOnly Cookie** | ✅ High | ✅ Yes | ✅ Yes (JS cannot access) |

## How It Works Now

### Login Flow:
```
1. POST /api/login
2. ↓
3. Server verifies credentials
4. ↓
5. Server generates JWT token
6. ↓
7. Server sets response headers:
   - Set-Cookie: authToken=<token>; httpOnly; secure; sameSite=strict
   - Response body: { token: <token>, user: {...} }
8. ↓
9. Browser automatically stores authToken cookie
10. ↓
11. Cookie appears in DevTools → Application → Cookies
```

### Protected Request Flow:
```
1. Browser makes request to /api/protected-route
2. ↓
3. Browser AUTOMATICALLY includes authToken cookie
4. ↓
5. Server middleware checks:
   a) Authorization Bearer header? → Check it
   b) authToken cookie? → Check it
   c) Session? → Check it
6. ↓
7. Request proceeds if valid
```

## Cookie Properties

```javascript
res.cookie('authToken', token, {
    httpOnly: true,                      // JavaScript cannot access (prevents XSS)
    secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
    sameSite: 'strict',                  // CSRF protection - cookie only sent to same site
    maxAge: 7 * 24 * 60 * 60 * 1000     // 7 days expiration
});
```

## What You'll See in DevTools

### Before Update:
```
Application → Cookies
├── localhost:5000
│   └── connect.sid (session cookie only)
```

### After Update:
```
Application → Cookies
├── localhost:5000
│   ├── authToken (✓ NEW JWT TOKEN)
│   └── connect.sid (session cookie)
```

## Testing with Postman/cURL

### cURL - Automatic Cookie Handling:
```bash
# Login - gets cookie
curl -c cookies.txt -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Protected request - uses stored cookie
curl -b cookies.txt http://localhost:5000/api/users
```

### Postman:
1. Make login request → Cookie automatically saved
2. Make protected request → Cookie automatically included
3. Check DevTools on browser to see authToken cookie

## Testing in Browser

### Before:
```javascript
// Manual token handling needed
const response = await fetch('/api/login', { method: 'POST', ... });
const { token } = await response.json();

// Must manually set header for each request
fetch('/api/users', {
    headers: { 'Authorization': `Bearer ${token}` }
});
```

### After:
```javascript
// Login still returns token in response (for reference)
const response = await fetch('/api/login', { method: 'POST', ... });
const { token } = await response.json(); // optional - token also in cookie

// Cookie automatically sent with all requests!
// No need for manual Authorization header
fetch('/api/users', { credentials: 'include' });
```

## Logout Flow

```
1. POST /api/logout (with valid token/cookie)
2. ↓
3. Server clears authToken cookie:
   res.clearCookie('authToken', {...});
4. ↓
5. Server destroys session
6. ↓
7. Browser deletes authToken cookie
8. ↓
9. Cookie no longer appears in DevTools
```

## Authentication Priority (Checked in Order)

1. **Bearer token** in Authorization header (for API clients)
   ```
   Authorization: Bearer <token>
   ```

2. **authToken** in cookies (for browsers)
   ```
   Cookie: authToken=<token>
   ```

3. **Session** (backward compatibility)
   ```
   connect.sid=<session_id>
   ```

If any is valid, request proceeds. If none valid, request rejected.

## Security Features

✅ **HttpOnly** - JavaScript cannot access (protects against XSS attacks)
✅ **Secure Flag** - Only sent over HTTPS in production
✅ **SameSite=Strict** - Only sent to same-site requests (protects against CSRF)
✅ **Expiration** - Cookie expires after 7 days
✅ **Automatic** - Browser automatically includes in all requests

## Common Issues & Solutions

### Issue: Token not showing in Cookies tab

**Solution:** 
- Clear browser cache: DevTools → Application → Clear storage
- Make sure you're using `credentials: 'include'` in fetch calls
- Check browser console for errors

### Issue: Cookie shows but requests fail

**Solution:**
- Restart the server (might need to reload code changes)
- Check browser console for CORS errors
- Ensure `secure` flag is `false` for localhost development

### Issue: Token works but keeps getting rejected

**Solution:**
- Token might have expired (7 days)
- Login again to get new token
- Check server console for errors

## Files Modified

1. **controller/Auth.js**
   - Added `res.cookie()` in `AuthLogin`
   - Added `res.clearCookie()` in `AuthLogout`

2. **middleware/auth.js**
   - Added cookie checking: `req.cookies.authToken`

3. **HTTP Only Cookie** - Automatically handled by browser

## Next Steps

1. Restart your server: `npm start`
2. Login through your app
3. Open DevTools → Application → Cookies
4. Look for `authToken` cookie
5. Make protected requests and see cookie being sent automatically

---

**Version:** 1.1 (Updated with httpOnly Cookie support)
**Date:** January 6, 2026
