import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:local_auth/local_auth.dart';
import 'src/rust/api.dart';
import 'src/rust/frb_generated.dart';

export 'src/rust/api.dart';

class NavojitAuth {
  final String secret;
  NavojitMobileAuth? _engine;
  final _storage = const FlutterSecureStorage();
  final _localAuth = LocalAuthentication();

  NavojitAuth({required this.secret});

  ///  Rust Library Initialization
  static Future<void> init() async {
    await RustLib.init();
  }

  ///  Internal Engine Loader
  Future<NavojitMobileAuth> _getEngine() async {
    _engine ??= await NavojitMobileAuth.newInstance(secret: secret);
    return _engine!;
  }

  /// 1. Issue Identity
  Future<OmniTokens> issueNewIdentity({
    required String userId,
    required String email,
    required String role,
  }) async {
    final engine = await _getEngine();
    final tokens = await engine.generateTokens(
      userId: userId,
      email: email,
      role: role,
    );

    await _saveTokens(tokens);
    return tokens;
  }

  ///  Silent Refresh
  Future<bool> silentRefresh() async {
    try {
      final refreshToken = await _storage.read(key: 'navojit_refresh_token');
      if (refreshToken == null) return false;

      final engine = await _getEngine();
      final newTokens = await engine.refreshTokens(refreshToken: refreshToken);

      await _saveTokens(newTokens);
      return true;
    } catch (e) {
      print("❌ Refresh Failed: $e");
      await logout();
      return false;
    }
  }

  /// 2. Direct Token Verification
  Future<NavojitClaims?> verifyToken({required String token}) async {
    final engine = await _getEngine();
    return await engine.verifyToken(token: token);
  }

  /// 3. Smart Verify Session
  Future<NavojitClaims?> verifySession() async {
    final token = await _storage.read(key: 'navojit_access_token');
    if (token == null) return null;

    final claims = await verifyToken(token: token);

    if (claims == null) {
      final success = await silentRefresh();
      if (success) {
        final newToken = await _storage.read(key: 'navojit_access_token');
        if (newToken != null) return await verifyToken(token: newToken);
      }
      return null;
    }

    return claims;
  }

  /// 4. Biometrics
  Future<bool> canUseBiometrics() async {
    final bool canCheck = await _localAuth.canCheckBiometrics;
    final bool isSupported = await _localAuth.isDeviceSupported();
    return canCheck || isSupported;
  }

  Future<bool> authenticateBiometric({required String reason}) async {
    try {
      return await _localAuth.authenticate(
        localizedReason: reason,
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: false,
          useErrorDialogs: true,
        ),
      );
    } catch (e) {
      print(" Biometric Error: $e");
      return false;
    }
  }

  /// 5. Logout
  Future<void> logout() async {
    await _storage.deleteAll();
  }

  /// Internal Helper
  Future<void> _saveTokens(OmniTokens tokens) async {
    await _storage.write(
      key: 'navojit_access_token',
      value: tokens.accessToken,
    );
    await _storage.write(
      key: 'navojit_refresh_token',
      value: tokens.refreshToken,
    );
    await _storage.write(key: 'navojit_sid', value: tokens.sid);
  }
}
