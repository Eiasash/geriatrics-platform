import { auditLogger } from './auditLog';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  data?: any;
}

interface NotificationHandlers {
  onNotification?: (notification: Notification) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

class NotificationService {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000;
  private handlers: NotificationHandlers = {};
  private notifications: Notification[] = [];
  private wsUrl: string;

  constructor() {
    this.wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    this.loadStoredNotifications();
  }

  private loadStoredNotifications() {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        this.notifications = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    }
  }

  private saveNotifications() {
    try {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }

  connect(handlers: NotificationHandlers = {}) {
    this.handlers = handlers;
    
    if (!import.meta.env.VITE_ENABLE_REALTIME) {
      console.log('Real-time notifications disabled');
      return;
    }

    try {
      this.ws = new WebSocket(this.wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.handlers.onConnect?.();
        
        // Authenticate
        const token = localStorage.getItem('auth_token');
        if (token) {
          this.send({
            type: 'auth',
            token
          });
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'notification') {
            this.handleNotification(data.notification);
          } else if (data.type === 'ping') {
            this.send({ type: 'pong' });
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.handlers.onError?.(new Error('WebSocket connection error'));
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.handlers.onDisconnect?.();
        this.attemptReconnect();
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      this.handlers.onError?.(error as Error);
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);

    this.reconnectTimer = setTimeout(() => {
      this.connect(this.handlers);
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  private handleNotification(notification: Notification) {
    // Add to local store
    this.notifications.unshift(notification);
    
    // Keep only last 100 notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }
    
    this.saveNotifications();
    
    // Call handler
    this.handlers.onNotification?.(notification);
    
    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
      this.showBrowserNotification(notification);
    }
    
    // Log critical notifications
    if (notification.type === 'critical') {
      auditLogger.logSecurityEvent(
        'system',
        'System',
        'CRITICAL_NOTIFICATION',
        notification
      );
    }
  }

  private showBrowserNotification(notification: Notification) {
    const options: NotificationOptions = {
      body: notification.message,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: notification.id,
      requireInteraction: notification.type === 'critical',
      data: {
        timestamp: new Date(notification.timestamp).getTime()
      }
    };

    const browserNotification = new Notification(notification.title, options);
    
    browserNotification.onclick = () => {
      window.focus();
      if (notification.actionUrl) {
        window.location.href = notification.actionUrl;
      }
      browserNotification.close();
    };
  }

  // Public methods
  getNotifications(): Notification[] {
    return this.notifications;
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(id: string) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
  }

  clearNotifications() {
    this.notifications = [];
    this.saveNotifications();
  }

  // Request browser notification permission
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  // Send test notification
  sendTestNotification() {
    const testNotification: Notification = {
      id: `test-${Date.now()}`,
      type: 'info',
      title: 'Test Notification',
      message: 'This is a test notification from the Geriatrics Platform',
      timestamp: new Date().toISOString(),
      read: false
    };
    
    this.handleNotification(testNotification);
  }

  // Create local notification (for offline use)
  createLocalNotification(
    type: Notification['type'],
    title: string,
    message: string,
    data?: any
  ): Notification {
    const notification: Notification = {
      id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      data
    };
    
    this.handleNotification(notification);
    return notification;
  }
}

// Singleton instance
export const notificationService = new NotificationService();

// React hook for notifications
export function useNotifications() {
  return notificationService;
}