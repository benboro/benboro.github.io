# External Integrations

**Analysis Date:** 2026-03-02

## APIs & External Services

**Google Services:**
- Google Fonts API - Font delivery service
  - Fonts: Roboto (weights 100, 300, 400, 500)
  - URL: `https://fonts.googleapis.com/css?family=Roboto:400,300,500,100`
  - Used in: `index.html`

**Social Media:**
- Twitter/X Platform Widget
  - For embedded tweets/timeline
  - Script: `https://platform.twitter.com/widgets.js`
  - References in: HTML files contain intent links to Twitter

**Content Platforms:**
- Medium Links - Multiple Medium article links embedded throughout content
  - Used for external content references
  - No API integration, direct links only

**Reference Services:**
- Baseball Reference (`baseball-reference.com`)
  - Used in SSB player for athlete links
  - Links to individual player/manager pages
  - Implementation: `https://www.baseball-reference.com/players/[slug].shtml`
  - Integration type: External hyperlinks (no API)

## Data Storage

**Databases:**
- None detected - Static website with no backend

**File Storage:**
- Local filesystem only
- All assets served from GitHub Pages repository
- Asset types:
  - Images: `assets/img/`
  - Fonts: `assets/styles/`
  - SVG graphics: `assets/svg/`
  - PDFs: `assets/pdf/`
  - Specialized data: `assets/bubble_map/`

**Caching:**
- Browser caching via GitHub Pages default headers
- No explicit cache configuration detected

**Data Approach:**
- Embedded JSON data in `ssb-player/player.js`:
  - `SSB_DATA` - Star Spangled Banner lyrics with timing
  - `BREF_DATA` - Baseball Reference player/manager names with links
  - Computed locally in browser, no API calls

## Authentication & Identity

**Auth Provider:** None - Static website with no authentication

**User Tracking:**
- Not detected in codebase
- GitHub Pages provides basic analytics optionally

## Monitoring & Observability

**Error Tracking:** Not detected

**Logs:**
- Browser console logging only (no structured logging system)
- No external logging service integration

**Analytics:**
- Not explicitly configured in codebase
- GitHub Pages provides basic analytics options (not configured here)

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (benboro.github.io)
- Custom domain: borovinsky.com
- HTTPS: Automatic via GitHub Pages

**CI Pipeline:**
- None detected - Static site deployment
- Push to GitHub automatically publishes via GitHub Pages

**Deployment Mechanism:**
- Git push to `master` branch automatically deploys
- CNAME file: `borovinsky.com` - Enables custom domain

## Environment Configuration

**Required Environment Variables:**
- None - Static site requires no configuration

**Secrets Location:**
- None required - No authentication or API keys needed

**Configuration Files:**
- `CNAME` - Custom domain configuration
- `.gitignore` - Repository configuration

## Webhooks & Callbacks

**Incoming Webhooks:**
- None - Static site has no server to receive webhooks

**Outgoing Webhooks:**
- None - No backend service to trigger webhooks

## External Content & References

**Content Links:**
- LinkedIn: `https://www.linkedin.com/in/benborovin`
- Twitter: `https://twitter.com/ben_borovin`
- Facebook: `https://www.facebook.com/ben.borovin`
- GitHub: `https://github.com/benboro`

**Article References:**
- Medium articles (multiple links via `link.medium.com` redirects)
- Bloomberg, CNN, TMZ, Ringer articles (external references)
- Hymnary.org - Music reference
- Various technology and entertainment news sites

**Media References:**
- YouTube, LEGO.com, Brickfanatics, Nintendo Switch Store
- Various sports and entertainment websites

## CDN & Asset Delivery

**Content Delivery:**
- Google APIs CDN (fonts)
- GitHub Pages CDN (all assets and HTML)
- No additional CDN configuration detected

**Asset URLs:**
- All local assets served from GitHub Pages domain
- Remote font delivery via Google Fonts CDN

## Data Synchronization

**Data Sources:**
- Static data embedded in files:
  - SSB lyrics timing data in `ssb-player/player.js`
  - BREF athlete data in `ssb-player/player.js`
  - Resume PDF in `assets/pdf/`
  - Portfolio content in HTML files

**Update Mechanism:**
- Manual git commit and push to update any content
- No automated data sync or real-time updates

## Third-Party Services Not Detected

- **Email service** - None configured
- **Database** - None (static site)
- **CMS** - None (plain HTML)
- **Payment processing** - None
- **Form submission** - None
- **Chat/messaging** - None
- **Search service** - None
- **Image optimization service** - None (images served directly)
- **API gateway** - None

---

*Integration audit: 2026-03-02*
