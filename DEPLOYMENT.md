# RizMern production deployment

This guide deploys the React/Vite frontend to Vercel, the Express API to Render, and uses MongoDB Atlas for persistent data. It assumes the custom domains will be `www.rizmern.com` and `api.rizmern.com`.

## 1. Prepare and push the project to GitHub

1. Create a private GitHub repository for RizMern.
2. From the project root, verify that `.env` files, `node_modules`, and build folders are ignored:

   ```powershell
   git status --short
   git check-ignore frontend/.env backend/.env
   ```

3. Keep `.env.example` files tracked, but never put real passwords, tokens, or database connection strings in those examples.
4. Add the project and push it to GitHub:

   ```powershell
   git add .
   git commit -m "Prepare RizMern for production deployment"
   git branch -M main
   git remote add origin https://github.com/<your-account>/<your-repository>.git
   git push -u origin main
   ```

   If Git is already configured, do not add a second remote; push to your configured repository.

## 2. Create a production MongoDB Atlas database

1. Create an Atlas project and production cluster.
2. Create a dedicated database user with a strong password. Use a URL-encoded password if it contains reserved URI characters.
3. In **Network Access**, allow the outbound IP addresses of your backend host. Render commonly uses dynamic outbound IPs; check its current outbound-IP guidance for your plan. Avoid `0.0.0.0/0` unless you understand and accept that broader exposure.
4. Copy the Atlas driver connection string and replace `<username>`, `<password>`, and `<database>`:

   ```text
   mongodb+srv://<username>:<password>@<cluster-host>/rizmern?retryWrites=true&w=majority
   ```

5. Keep the URI private and add it only to the backend host's environment variables.

## 3. Deploy the API on Render

1. In Render, create a **Web Service** from the GitHub repository.
2. Select **Node** as the runtime and set:
   - Root Directory: `backend`
   - Build Command: `npm ci`
   - Start Command: `npm start`
3. Set the Node version to 20 or newer if Render asks for one. (Node 18 is supported by the backend dependency set; Node 20 LTS is recommended.)
4. Add these environment variables in the Render dashboard:

   | Name | Value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | MongoDB Atlas connection string |
   | `JWT_SECRET` | Unique random secret, at least 32 characters |
   | `CLIENT_URL` | `https://www.rizmern.com,https://rizmern.com` |
   | `ADMIN_NAME` | Admin display name |
   | `ADMIN_EMAIL` | Admin login email |
   | `ADMIN_PASSWORD` | Unique strong password (at least 12 characters) |
   | `PORT` | Leave unset; Render supplies it |

5. Deploy and verify the service URL responds with `{"message":"RizMern API running"}` at `/` and `{"status":"ok"}` under `data` at `/api/health`.
6. Add the custom API domain `api.rizmern.com` in Render's custom-domain settings. Render will show the DNS target to configure with Hostinger.
7. Seed the first admin once, after deployment and database connection. Run `npm run seed:admin` from the backend service shell or a one-off job using the same environment variables. Do not run this on every deploy.

## 4. Deploy the frontend on Vercel

1. Import the same GitHub repository as a Vercel project.
2. Set:
   - Root Directory: `frontend`
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
3. Set the production environment variables:

   | Name | Value |
   | --- | --- |
   | `VITE_SITE_URL` | `https://www.rizmern.com` |
   | `VITE_API_URL` | `https://api.rizmern.com/api` |
   | `VITE_GA_ID` | Optional GA4 measurement ID |
   | `VITE_GSC_VERIFICATION` | Optional Search Console verification token |

4. The production build prerenders public routes with Puppeteer. `frontend/package.json` explicitly approves the install script for the locked Puppeteer version, so `npm ci` downloads its matching Chrome for Linux. Do **not** set `PUPPETEER_SKIP_DOWNLOAD=true` in Vercel. If you update Puppeteer, review and update its pinned `allowScripts` approval to match the new lockfile version.
5. Deploy and verify the Vercel preview before promoting it to production. `npm run build` also runs `npm run check:prod`'s underlying script to confirm the generated files and sitemap domain.
6. Add `www.rizmern.com` and `rizmern.com` in Vercel's domain settings. Choose one canonical primary domain and configure Vercel's redirect for the other.

## 5. Connect the Hostinger DNS records

Use the exact targets shown in the Vercel and Render domain dashboards; provider targets can change.

- For `www.rizmern.com`, add the CNAME record Vercel specifies (often `cname.vercel-dns.com`).
- For the root domain `rizmern.com`, add the A/AAAA or ALIAS records Vercel specifies. Do not assume a target from an old setup guide.
- For `api.rizmern.com`, add the CNAME Render specifies (commonly a `*.onrender.com` target).
- Remove conflicting old records for the same host, keep unrelated email/MX records, and allow time for DNS propagation and TLS certificate issuance.

Once verified, ensure `CLIENT_URL` contains both production website origins exactly (scheme included, no trailing slash). `VITE_API_URL` should point to the API HTTPS origin.

## 6. Post-deploy checklist

- [ ] Open `https://www.rizmern.com` and confirm TLS is valid.
- [ ] Refresh `/course`, `/blog`, `/admin/login`, and an article route; none should return a host-level 404.
- [ ] Fetch `/robots.txt`, `/sitemap.xml`, `/og-image.png`, and `/manifest.webmanifest`.
- [ ] Check sitemap canonical hosts are `https://www.rizmern.com`, with no localhost entries.
- [ ] Open `https://api.rizmern.com/` and `/api/health`.
- [ ] Submit a demo lead and an admission request; verify them in MongoDB Atlas.
- [ ] Log in at `/admin/login`, inspect the dashboard, update a record, then log out.
- [ ] Verify browser CORS allows `https://www.rizmern.com` and `https://rizmern.com`, and rejects other browser origins.
- [ ] Confirm Vercel serves the security headers and long-lived immutable cache headers for `/assets/*`.
- [ ] Configure a recurring Atlas backup/retention policy appropriate to your needs.

## 7. Troubleshooting

### Browser shows a CORS error

Set backend `CLIENT_URL` to the exact frontend origins, comma-separated:

```text
https://www.rizmern.com,https://rizmern.com
```

Do not add a trailing slash or the API domain unless it hosts a browser client. Save the variable and redeploy/restart the backend.

### Refreshing a route returns 404

Confirm Vercel's Root Directory is `frontend`, Output Directory is `dist`, and `frontend/vercel.json` is included. Its filesystem-aware rewrite leaves existing prerendered/static files in place and sends application routes without files to `index.html`.

### API is not reachable

Check the Render deploy logs, `https://api.rizmern.com/api/health`, TLS status, backend `MONGO_URI`, and frontend `VITE_API_URL`. Vite environment variables are embedded at build time; redeploy the frontend after changing them.

### First API request is slow

Render's free instances may spin down when idle. The first request after inactivity can take longer while the service starts. Use an always-on plan or an uptime monitor only if your hosting plan and provider terms support that use.

### Puppeteer or Chrome fails during the Vercel build

Check that the build used `npm ci`, that the Puppeteer version in `frontend/package-lock.json` matches the pinned `allowScripts` entry in `frontend/package.json`, and that the Puppeteer download was not skipped. Remove custom `PUPPETEER_EXECUTABLE_PATH` or `PUPPETEER_SKIP_DOWNLOAD` settings unless you have configured a compatible Linux browser yourself, then redeploy.

After Vite reports that its client build completed, the postbuild step starts a preview server, launches Chrome, and prerenders each public route. It prints `[postbuild]` progress for these stages and routes. If the Vercel log stops before the postbuild completion message, use the last `[postbuild]` line to identify whether the preview server, Chrome launch, or a specific route stalled.

### Startup reports a MongoDB error

Check the Atlas URI, database user's password encoding, Atlas Network Access allowlist, and that the backend environment variables are present. The API intentionally exits if MongoDB cannot be connected.
