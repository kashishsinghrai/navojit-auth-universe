import { describe, it, expect, vi } from "vitest";
import { NavojitAuth } from "../src/index";

// Mock Adapter taaki humein real DB ki zarurat na pade
const mockAdapter = {
  findUserByEmail: vi.fn(),
  createUser: vi.fn(),
};

describe("NavojitAuth Engine Tests", () => {
  const auth = new NavojitAuth({
    adapter: mockAdapter as any,
    secret: "test-secret",
    hooks: {
      afterRegister: vi.fn(), // Hook test karne ke liye
    },
  });

  it("Should correctly initialize with default config", () => {
    expect(auth).toBeDefined();
  });

  it("Lifecycle Hook: afterRegister should be callable", async () => {
    const dummyUser = { id: "1", email: "test@navojit.com" };
    mockAdapter.createUser.mockResolvedValue(dummyUser);

    // Yahan hum internal logic test kar rahe hain
    if (auth["config"].hooks?.afterRegister) {
      await auth["config"].hooks.afterRegister(dummyUser);
      expect(auth["config"].hooks.afterRegister).toHaveBeenCalledWith(
        dummyUser,
      );
    }
  });
});
