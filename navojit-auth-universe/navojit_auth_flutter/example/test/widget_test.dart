import 'package:flutter_test/flutter_test.dart';
import 'package:example/main.dart';

void main() {
  testWidgets('Navojit Auth Smoke Test', (WidgetTester tester) async {
    // Hamari nayi app ko build karo
    await tester.pumpWidget(const NavojitExampleApp());

    // Verify karo ki app khul gayi hai aur title dikh raha hai
    expect(find.text('Navojit Auth Demo'), findsOneWidget);

    // Verify karo ki Login button screen par hai
    expect(find.text('1. Login (Generate Tokens)'), findsOneWidget);
  });
}
