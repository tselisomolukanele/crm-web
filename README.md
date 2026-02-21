# CRM application UI Application

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Install OAuth2 dependencies

   ```bash
   npm install expo-auth-session expo-secure-store
   ```

3. Configure OAuth2

   Copy `.env.example` to `.env` and fill in your OAuth2 server details:
   
   ```bash
   cp .env.example .env
   ```
   
   Update the following environment variables in `.env`:
   - `EXPO_PUBLIC_OAUTH_AUTHORIZATION_ENDPOINT` - Your OAuth2 authorization endpoint
   - `EXPO_PUBLIC_OAUTH_TOKEN_ENDPOINT` - Your OAuth2 token endpoint
   - `EXPO_PUBLIC_OAUTH_CLIENT_ID` - Your OAuth2 client ID
   - `EXPO_PUBLIC_OAUTH_CLIENT_SECRET` - Your OAuth2 client secret (optional, depends on your server)

   Alternatively, you can directly edit `app/config/oauth.ts` with your OAuth2 server configuration.

4. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Authentication

This app uses OAuth2 authentication. All routes are protected behind an authentication boundary. Users must authenticate with your OAuth2 server before accessing any pages.

- Login screen: `/login`
- Protected routes: All routes under `/(tabs)` require authentication
- Token storage: Access tokens are securely stored using `expo-secure-store`
