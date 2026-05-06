plugins {
    id("com.android.application")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.navojit.auth.example"
    // 🔥 Logs ke mutabiq SDK 36 aur NDK 28 zaruri hain
    compileSdk = 36 
    ndkVersion = "28.2.13676358"

    defaultConfig {
        applicationId = "com.navojit.auth.example"
        // Rust engine ke liye 21 se niche nahi ja sakte
        minSdk = flutter.minSdkVersion 
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

flutter {
    source = "../.."
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
}
