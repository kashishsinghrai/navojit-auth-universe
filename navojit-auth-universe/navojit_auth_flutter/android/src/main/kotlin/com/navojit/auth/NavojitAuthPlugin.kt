package com.navojit.auth

import io.flutter.embedding.engine.plugins.FlutterPlugin

/** NavojitAuthPlugin: Boilerplate for Sovereign Core */
class NavojitAuthPlugin: FlutterPlugin {
    override fun onAttachedToEngine(binding: FlutterPlugin.FlutterPluginBinding) {
        // Rust handle karta hai saari logic, toh yahan kuch karne ki zarurat nahi hai.
    }

    override fun onDetachedFromEngine(binding: FlutterPlugin.FlutterPluginBinding) {
        // Cleanup logic yahan aati hai
    }
}