/**
 * Simple Test App for Omni Analytics SDK
 * Tests basic import and initialization
 */

import { initializeSDK, destroySDK } from "@omni-analytics/sdk";

console.log("🚀 Starting SDK Import Test...\n");

try {
  // Initialize SDK
  console.log("📝 Initializing SDK...");
  const { tracker, container } = initializeSDK({
    projectId: "test-project-123",
    endpoint: "http://localhost:3000/api/events",
    debug: true,
    batchSize: 5,
    batchTimeout: 3000,
  });

  console.log("✅ SDK initialized successfully!\n");

  // Test trackPageView
  console.log("📄 Testing trackPageView()...");
  tracker.trackPageView({
    title: "Test Page",
    route: "/test",
    isInitialLoad: true,
  });
  console.log("✅ Page view tracked\n");

  // Test trackCustom
  console.log("📊 Testing trackCustom()...");
  tracker.trackCustom("user_signup", {
    source: "test-app",
    timestamp: new Date().toISOString(),
  });
  console.log("✅ Custom event tracked\n");

  // Get session info
  console.log("🔐 Session Information:");
  const sessionId = tracker.getSessionId();
  console.log(`  Session ID: ${sessionId}\n`);

  // Test setUserId
  console.log("👤 Testing setUserId()...");
  tracker.setUserId("user-456");
  console.log("✅ User ID set\n");

  // Flush events
  console.log("🔄 Flushing events...");
  await tracker.flush();
  console.log("✅ Events flushed\n");

  console.log("✨ All tests passed! SDK is working correctly.");

  // Cleanup
  destroySDK();
  console.log("🧹 SDK destroyed");
} catch (error) {
  console.error("❌ Error during testing:", error);
  process.exit(1);
}
