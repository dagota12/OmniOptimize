/**
 * Page View Tracking Plugin
 * Automatically tracks initial page load and SPA navigation
 * Intercepts history.pushState and history.replaceState
 */

import type { IPlugin, PluginContext } from "../../types";

export class PageViewPlugin implements IPlugin {
  name = "PageViewPlugin";
  version = "1.0.0";
  private context: PluginContext | null = null;
  private isInitialLoad = true;
  private originalPushState: any = null;
  private originalReplaceState: any = null;
  private popstateListener: EventListener | null = null;
  private visibilitychangeListener: EventListener | null = null;

  async init(context: PluginContext): Promise<void> {
    this.context = context;

    // Track initial page load
    this.trackPageView(true);

    // Setup SPA navigation tracking
    this.setupHistoryInterception();

    // Track when page becomes visible again
    this.setupVisibilityTracking();
  }

  /**
   * Track a page view event
   */
  private trackPageView(isInitialLoad: boolean): void {
    if (!this.context) return;

    this.context.tracker.trackPageView({
      isInitialLoad,
      title: document.title,
      route: window.location.pathname,
    });
  }

  /**
   * Intercept history.pushState and history.replaceState
   * to track SPA navigation
   */
  private setupHistoryInterception(): void {
    this.originalPushState = history.pushState;
    this.originalReplaceState = history.replaceState;
    const self = this;

    // Override pushState
    history.pushState = function (...args) {
      const result = self.originalPushState.apply(this, args);

      // Use setTimeout to allow DOM to update
      setTimeout(() => {
        self.trackPageView(false);
      }, 0);

      return result;
    };

    // Override replaceState
    history.replaceState = function (...args) {
      const result = self.originalReplaceState.apply(this, args);

      // Use setTimeout to allow DOM to update
      setTimeout(() => {
        self.trackPageView(false);
      }, 0);

      return result;
    };

    // Track back/forward navigation
    this.popstateListener = () => {
      setTimeout(() => {
        self.trackPageView(false);
      }, 0);
    };
    window.addEventListener("popstate", this.popstateListener);
  }

  /**
   * Track when page becomes visible again (tab switch)
   * Useful for tracking re-engagement
   */
  private setupVisibilityTracking(): void {
    let lastVisibleTime = Date.now();

    this.visibilitychangeListener = () => {
      if (!document.hidden) {
        const timeSinceLastVisible = Date.now() - lastVisibleTime;

        // Only track if more than 5 minutes have passed
        if (timeSinceLastVisible > 5 * 60 * 1000) {
          this.trackPageView(false);
        }
      } else {
        lastVisibleTime = Date.now();
      }
    };
    document.addEventListener(
      "visibilitychange",
      this.visibilitychangeListener,
    );
  }

  /**
   * Remove all listeners (pause tracking)
   */
  private removeListeners(): void {
    // Restore original history methods
    if (this.originalPushState) {
      history.pushState = this.originalPushState;
    }
    if (this.originalReplaceState) {
      history.replaceState = this.originalReplaceState;
    }

    // Remove event listeners
    if (this.popstateListener) {
      window.removeEventListener("popstate", this.popstateListener);
    }
    if (this.visibilitychangeListener) {
      document.removeEventListener(
        "visibilitychange",
        this.visibilitychangeListener,
      );
    }
  }

  /**
   * Re-register all listeners (resume tracking)
   */
  private reregisterListeners(): void {
    // Re-intercept history methods
    this.setupHistoryInterception();
    // Re-setup visibility tracking
    this.setupVisibilityTracking();
  }

  /**
   * Pause page view tracking
   */
  public async pause(): Promise<void> {
    this.removeListeners();
  }

  /**
   * Resume page view tracking
   */
  public async resume(): Promise<void> {
    this.reregisterListeners();
  }

  async destroy(): Promise<void> {
    this.removeListeners();
    this.context = null;
  }
}
