# Firebase Host for Angular Web Applications

1. Create a new firebase project
2. setup Firebase Hosting
   - use `yarn add firebase-tools --dev`
3. Initialize the project for Firebase
   - login with Google credentials `firebase login`
   - initialize Firebase `firebase init`
4. deploy application `firebase deploy`

```html
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/6.3.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#reserved-urls -->

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
```
