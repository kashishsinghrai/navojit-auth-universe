
# Navojit Sovereign Core 🛡️

![Version](https://img.shields.io/badge/version-4.0.4-blue.svg)
![Flutter](https://img.shields.io/badge/Flutter-%3E%3D3.10.0-02569B?logo=flutter)
![Rust](https://img.shields.io/badge/Rust-Powered-black?logo=rust)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A high-performance, universal authentication engine for the Navojit Ecosystem. Built with a **Rust core** and bridged to Flutter, it delivers enterprise-grade security, anti-reverse engineering protection, and zero-jank execution.

## ✨ Why Sovereign Core?

* **🛡️ Unhackable Logic:** Cryptography and JWT generation run entirely in compiled C-level native binaries via Rust (`.so`), making reverse engineering nearly impossible.
* **⚡ Zero UI Jank:** Heavy cryptographic operations are offloaded to isolated Rust threads.
* **🔐 Hardware-Level Security:** Integrated with Android/iOS biometric systems (Face ID / Fingerprint) for true hardware-backed session locks.
* **📦 Universal Architecture:** Pre-compiled for `arm64-v8a`, `armeabi-v7a`, `x86_64`, and `x86`.

---

## 📦 Installation

Add this to your package's `pubspec.yaml` file:

```yaml
dependencies:
  navojit_auth_flutter: ^4.0.3
````

*(Or run `flutter pub add navojit_auth_flutter` in your terminal)*

-----

## ⚙️ Setup Requirements

### 🤖 Android

Ensure your `android/app/build.gradle.kts` (or `.gradle`) meets these minimum requirements for the Rust engine and modern local auth plugins:

```kotlin
android {
    compileSdk = 36 // Required by local_auth
    
    defaultConfig {
        minSdk = 21   // Required by Rust NDK bridge
        targetSdk = 36
    }
}
```

**Important:** Your `MainActivity` must extend `FlutterFragmentActivity` instead of `FlutterActivity` to support biometric prompts.

### 🍎 iOS

To use FaceID/Biometrics on iOS, add the following key to your `ios/Runner/Info.plist` file:

```xml
<key>NSFaceIDUsageDescription</key>
<string>We need your Face ID to securely authenticate your session.</string>
```

-----

## 🚀 Quick Start

### 1\. Initialize the Engine

Always initialize the Rust bridge before running your app:

```dart
import 'package:navojit_auth_flutter/navojit_auth_flutter.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await NavojitAuth.init(); // Boot up the Rust Engine
  runApp(const MyApp());
}
```

### 2\. Authenticate & Verify

Generate secure tokens and verify them instantly:

```dart
// Initialize with your secure secret
final auth = NavojitAuth(secret: "your-secure-secret");

// 1. Issue Identity (Rust-powered token generation)
final tokens = await auth.issueNewIdentity(
  userId: "dev_user_007",
  email: "kashish@navojit.com",
  role: "admin",
);

// 2. Hardware Biometric Check
bool isVerified = await auth.authenticateBiometric(
  reason: 'Scan fingerprint to access the dashboard',
);

// 3. Smart Session Verification
final claims = await auth.verifySession();
if (claims != null) {
  print("Welcome back, ${claims.sub}! Role: ${claims.role}");
}
```

-----

## 👨‍💻 About the Author

Built with ❤️ by **Kashish Singh** (aka **Kashish Singh Rai**)
  * 🌐 **Website:** [navojit.com](https://navojit.com)
  * 🐙 **GitHub:** [@kashishsinghrai](https://www.google.com/search?q=https://github.com/kashishsinghrai)
  * 🎯 **Mission:** Bringing uncompromised, sovereign security to the Flutter ecosystem.

<!-- end list -->
