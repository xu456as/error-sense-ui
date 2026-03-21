# ErrSense UI

React + TypeScript + MUI frontend for the Error Sense dashboard.

## Pages

- Login page
- Developer Report page with search conditions: App Id, Commit Id, Task Id
- Reviewer Report page with editable reviewer fields

## Local development

If `npm` is not on your shell path, run `nvm use 20` first.

1. Start WireMock on port `9090`:

```bash
npm run start:mock
```

2. Start the React app on port `3000`:

```bash
npm start
```

The app uses `REACT_APP_API_BASE_URL=http://localhost:9090/api` in local development.

## Mock APIs

WireMock mappings live in [`wiremock/mappings`](/data/Git/error-sense-ui/wiremock/mappings).

- `GET /api/developer-reports`
- `GET /api/reviewer-reports`
- `PUT /api/reviewer-reports/:id`
- Generic `OPTIONS /api/*` preflight handler for local CORS

## Build

```bash
npm run build
```
