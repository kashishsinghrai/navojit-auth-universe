import 'package:flutter/material.dart';
import 'package:navojit_auth_flutter/navojit_auth_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await NavojitAuth.init();
  } catch (e) {
    debugPrint("Failed to init Rust: $e");
  }

  runApp(const NavojitExampleApp());
}

class NavojitExampleApp extends StatelessWidget {
  const NavojitExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Navojit Auth v4.0.0',
      theme: ThemeData.dark(useMaterial3: true).copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blueAccent,
          brightness: Brightness.dark,
        ),
      ),
      home: const AuthScreen(),
    );
  }
}

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final auth = NavojitAuth(secret: "navojit-secret-key-2026");

  String _consoleOutput =
      "Welcome to Navojit Sovereign Core \nWaiting for action...";

  void _log(String message) {
    setState(() {
      _consoleOutput =
          "${DateTime.now().toString().split(' ')[1].split('.')[0]} | $message\n\n$_consoleOutput";
    });
  }

  Future<void> _login() async {
    try {
      _log(" Generating secure tokens via Rust...");
      final tokens = await auth.issueNewIdentity(
        userId: "dev_user_007",
        email: "kashish@navojit.com",
        role: "admin",
      );
      _log(
        " Login Success!\nAccess Token: ${tokens.accessToken.substring(0, 20)}...",
      );
    } catch (e) {
      _log("❌ Login Error: $e");
    }
  }

  Future<void> _verifySession() async {
    try {
      _log(" Verifying Session (Smart Check)...");
      final claims = await auth.verifySession();
      if (claims != null) {
        _log(
          " Session Valid!\nUser: ${claims.sub}\nRole: ${claims.role}\nSID: ${claims.sid}",
        );
      } else {
        _log(" Session Expired or Not Found.");
      }
    } catch (e) {
      _log(" Verification Error: $e");
    }
  }

  Future<void> _manualRefresh() async {
    try {
      _log(" Manual Silent Refresh starting...");
      final success = await auth.silentRefresh();
      if (success) {
        _log(" Token Rotation Successful! (New keys saved)");
      } else {
        _log(" Refresh Failed: No refresh token found.");
      }
    } catch (e) {
      _log(" Error during refresh: $e");
    }
  }

  Future<void> _testBiometrics() async {
    try {
      _log(" Checking Biometric Support...");
      bool canUse = await auth.canUseBiometrics();
      if (canUse) {
        bool authSuccess = await auth.authenticateBiometric(
          reason: 'Scan your face or fingerprint to verify identity',
        );
        if (authSuccess) {
          _log(" Biometric Auth Passed!");
        } else {
          _log(" Auth Failed or Canceled.");
        }
      } else {
        _log(" Biometrics unavailable on this device.");
      }
    } catch (e) {
      _log(" Biometric Error: $e");
    }
  }

  Future<void> _logout() async {
    await auth.logout();
    _log(" Storage cleared. User logged out.");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Navojit Auth Demo v4'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _manualRefresh,
            tooltip: "Silent Refresh",
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            //  FIX: Replace Wrap with robust Rows & Expanded widgets
            Row(
              children: [
                Expanded(child: _actionButton("Login", _login, Colors.blue)),
                const SizedBox(width: 8),
                Expanded(
                  child: _actionButton(
                    "Verify Session",
                    _verifySession,
                    Colors.green,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: _actionButton(
                    "Biometrics",
                    _testBiometrics,
                    Colors.purple,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _actionButton("Clear Storage", _logout, Colors.red),
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Text(
              "Terminal Output:",
              style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.black87,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.blueAccent.withOpacity(0.3)),
                ),
                child: SingleChildScrollView(
                  child: Text(
                    _consoleOutput,
                    style: const TextStyle(
                      color: Colors.greenAccent,
                      fontFamily: 'monospace',
                      fontSize: 13,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  //  FIX: Removed fixed SizedBox width, now relying on Expanded parent
  Widget _actionButton(String label, VoidCallback onPressed, Color color) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: color.withOpacity(0.2),
        foregroundColor: color,
        side: BorderSide(color: color.withOpacity(0.5)),
      ),
      onPressed: onPressed,
      child: Text(label),
    );
  }
}
