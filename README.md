# APK Builder

A mobile-first AI-style APK Builder interface inspired by the supplied screenshot. The app provides a dark chat-style prompt UI and a real GitHub Actions Android build pipeline.

## Live interface

After enabling **GitHub Pages** for this repository, the interface can be opened at:

`https://emzaro731-byte.github.io/apk/`

## Build a real APK

1. Open the repository's **Actions** tab.
2. Select **Build APK**.
3. Choose **Run workflow**.
4. Enter the app name, Android package name, and optional website URL.
5. Run the workflow.
6. When the workflow finishes, open the run and download the `apk-...` artifact.

The generated APK is a simple Android WebView application. If a website URL is supplied, the APK opens that URL. If no URL is supplied, it displays a success screen.

## Interface

The web UI includes:

- Black mobile-first AI chat layout
- Hamburger navigation
- Get Plus button
- Prompt composer
- Upload project control
- Build settings
- Build progress UI
- GitHub Actions build handoff
- Project/build-history placeholders ready for a backend

## Important

The browser UI itself does not pretend to compile an APK locally. The actual Android compilation is performed by GitHub Actions using the Android SDK and Gradle, then exposed as a downloadable workflow artifact.
