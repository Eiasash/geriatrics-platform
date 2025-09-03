# 🔒 Adding Password Protection to Your Geriatrics Site

## Option 1: Netlify Identity (Free for up to 1,000 users)

### Quick Setup:
1. Go to your Netlify dashboard: https://app.netlify.com/sites/geriatrics-study/settings/identity
2. Click "Enable Identity"
3. Set registration to "Invite only"
4. Add yourself and other users

### Add to your site:
```html
<!-- Add to index.html before </body> -->
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

## Option 2: Basic Password Protection (Netlify Pro - Paid)

1. Create a `_headers` file in your root directory:
```
/*
  Basic-Auth: username:password
```

2. Or use Netlify dashboard:
   - Go to: https://app.netlify.com/sites/geriatrics-study/settings/access
   - Set password protection

## Option 3: Simple JavaScript Protection (Free but Less Secure)

Create a new file `password-protect.html`:
```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geriatrics Platform - Login</title>
    <style>
        body {
            font-family: 'Heebo', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .login-box {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
        }
        input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            width: 100%;
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
            margin-top: 20px;
        }
        button:hover {
            background: #5a67d8;
        }
        .error {
            color: red;
            margin-top: 10px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="login-box">
        <h1>🏥 Geriatrics Platform</h1>
        <h2>Shaare Zedek Medical Center</h2>
        <input type="password" id="password" placeholder="Enter Password" onkeypress="if(event.key==='Enter') checkPassword()">
        <button onclick="checkPassword()">Login</button>
        <div class="error" id="error">Incorrect password</div>
    </div>

    <script>
        // Simple password check (change 'geriatrics2024' to your password)
        function checkPassword() {
            const password = document.getElementById('password').value;
            const correctPassword = 'geriatrics2024'; // CHANGE THIS!
            
            if (password === correctPassword) {
                // Store login state
                sessionStorage.setItem('authenticated', 'true');
                // Redirect to main site
                window.location.href = '/index.html';
            } else {
                document.getElementById('error').style.display = 'block';
                document.getElementById('password').value = '';
            }
        }

        // Add to your main index.html to check authentication:
        // if (!sessionStorage.getItem('authenticated')) {
        //     window.location.href = '/password-protect.html';
        // }
    </script>
</body>
</html>
```

## Option 4: GitHub Private Repository

Make your repository private and use Netlify's private repo deployment:
1. Go to: https://github.com/Eiasash/geriatrics-platform/settings
2. Scroll to "Danger Zone"
3. Change repository visibility to Private
4. Netlify will still deploy (already connected)

## Current Access Information:

- **Site URL**: https://geriatrics-study.netlify.app/
- **Admin Dashboard**: https://app.netlify.com/sites/geriatrics-study
- **Your Email**: eiasashhab@gmail.com
- **Team**: Geriatrics

## Reset Netlify Account Password:

If you need to reset your Netlify account password:
1. Go to: https://app.netlify.com/login
2. Click "Forgot password?"
3. Enter: eiasashhab@gmail.com
4. Check your email for reset link

## Quick Deploy Update:

To update your site immediately:
```bash
# Make any changes to index.html
git add .
git commit -m "Update site"
git push origin fellowship-ready

# Or deploy directly:
npx netlify deploy --prod --dir=.
```

## Support Contacts:

- **Netlify Support**: https://www.netlify.com/support/
- **GitHub Support**: https://support.github.com/
- **Your Repository**: https://github.com/Eiasash/geriatrics-platform