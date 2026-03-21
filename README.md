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

## Gradle

The repo also includes a Gradle scaffold with `buildSrc` convention plugins for frontend tasks.

If you are using `nvm`, select Node 20 first:

```bash
nvm use 20
```

Available Gradle tasks:

```bash
./gradlew npmInstall
./gradlew npmBuild
./gradlew npmTest
./gradlew npmStart
```

The Node integration is configured to use the local Node runtime from `nvm` rather than downloading a separate Node distribution.

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

Or with Gradle:

```bash
./gradlew npmBuild
```

## Docker

This project uses a standard multi-stage Docker build for container images. Jib is not the recommended path for this frontend-only repo.

Build the image:

```bash
docker build -t ghcr.io/openprojectx/error-sense-ui:latest .
```

Run locally:

```bash
docker run --rm -p 8080:80 ghcr.io/openprojectx/error-sense-ui:latest
```

Local health check:

```bash
curl http://localhost:8080/__admin/health
```

Push to GHCR:

```bash
docker push ghcr.io/openprojectx/error-sense-ui:latest
```

Login example:

```bash
echo "$GITHUB_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```
