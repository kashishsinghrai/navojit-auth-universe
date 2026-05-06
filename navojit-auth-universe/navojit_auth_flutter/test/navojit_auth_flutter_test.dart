import 'package:flutter_test/flutter_test.dart';
import 'package:navojit_auth_flutter/navojit_auth_flutter.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

void main() {
  //  Sabse pehle Rust Engine ko load karna zaruri hai
  setUpAll(() async {
    await NavojitAuth.init();
  });

  test('Omni-Vault v4.0.0: Universal Token Verification Test', () async {
    const secretKey = "navojit-secret-key-2026";
    final auth = NavojitAuth(secret: secretKey);

    // ---------------------------------------------------------
    // 1. SIMULATE BACKEND GENERATING A TOKEN
    // ---------------------------------------------------------
    final backendPayload = {
      "sub": "mobile_user_007",
      "email": "flutter@navojit.com",
      "role": "app_user",
      "sid": "simulated-session-123",
      "mfa_v": true,
      "am": ["face", "pwd"],
      "typ": "access",
      "iat": DateTime.now().millisecondsSinceEpoch ~/ 1000,
      "exp":
          DateTime.now()
              .add(const Duration(minutes: 15))
              .millisecondsSinceEpoch ~/
          1000,
    };

    final jwt = JWT(backendPayload);
    final simulatedToken = jwt.sign(SecretKey(secretKey));

    print("\n Simulated Token Received:\n$simulatedToken\n");

    // ---------------------------------------------------------
    // 2. FLUTTER APP VERIFIES (VIA RUST ENGINE)
    // ---------------------------------------------------------
    final verifiedData = await auth.verifyToken(token: simulatedToken);

    if (verifiedData != null) {
      print("✅ Flutter Omni-Vault Verification Success!");
      print("User ID (Sub): ${verifiedData.sub}");
      print("Role: ${verifiedData.role}");
    } else {
      print("❌ Verification Failed or Expired");
    }

    // ---------------------------------------------------------
    // 3. Assertions (The Ultimate Fix for Null Safety Warnings)
    // ---------------------------------------------------------

    // Step A: Runtime check (ki data null nahi hona chahiye)
    expect(verifiedData, isNotNull);

    // Step B: Shadowing (Ek naya variable 'data' jo pakka non-nullable hai)
    // Isse analyzer chup ho jayega aur '!' ki zarurat nahi padegi
    final data = verifiedData;

    if (data != null) {
      expect(data.sub, equals("mobile_user_007"));
      expect(data.role, equals("app_user"));
      expect(data.email, equals("flutter@navojit.com"));
    }
  });
}
