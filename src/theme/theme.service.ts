import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemePreference {
  theme: Theme;
  userId?: string;
  updatedAt: Date;
}

@Injectable()
export class ThemeService {
  private readonly defaultTheme: Theme = 'system';
  private readonly storageKey = 'truthbounty-theme';

  constructor(private configService: ConfigService) {}

  /**
   * Get user's theme preference
   * Priority: User preference > System preference > Default
   */
  getTheme(userId?: string): Theme {
    // If user ID provided, get from database (future enhancement)
    if (userId) {
      return this.getUserThemeFromStorage(userId);
    }

    // Get from localStorage (client-side)
    const stored = this.getStoredTheme();
    if (stored && stored !== 'system') {
      return stored;
    }

    // Fallback to system preference
    return this.getSystemTheme();
  }

  /**
   * Set user's theme preference
   */
  setTheme(theme: Theme, userId?: string): ThemePreference {
    const preference: ThemePreference = {
      theme,
      userId,
      updatedAt: new Date(),
    };

    if (userId) {
      // Store in database for authenticated users
      this.saveUserThemeToStorage(userId, preference);
    } else {
      // Store in localStorage for anonymous users
      this.saveThemeToStorage(theme);
    }

    return preference;
  }

  /**
   * Get resolved theme (light/dark) based on preference
   * Resolves 'system' to actual light/dark based on system preference
   */
  getResolvedTheme(userId?: string): 'light' | 'dark' {
    const theme = this.getTheme(userId);

    if (theme === 'system') {
      return this.getSystemTheme();
    }

    return theme;
  }

  /**
   * Toggle between light and dark themes
   * If current is 'system', defaults to 'light'
   */
  toggleTheme(userId?: string): ThemePreference {
    const currentTheme = this.getTheme(userId);
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';

    return this.setTheme(newTheme, userId);
  }

  /**
   * Reset theme to system preference
   */
  resetToSystem(userId?: string): ThemePreference {
    return this.setTheme('system', userId);
  }

  /**
   * Get system theme preference
   * In a real implementation, this would detect from user agent or client hints
   */
  private getSystemTheme(): 'light' | 'dark' {
    // For server-side, we can't detect system preference
    // This would be handled client-side in a real implementation
    // Default to light for server context
    return 'light';
  }

  /**
   * Get stored theme from localStorage
   * Note: This is a server-side simulation - actual localStorage access happens client-side
   */
  private getStoredTheme(): Theme | null {
    try {
      // In a real implementation, this would be passed from client
      // For now, return null to simulate no stored preference
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Save theme to localStorage
   * Note: This is a server-side simulation - actual localStorage happens client-side
   */
  private saveThemeToStorage(theme: Theme): void {
    try {
      // In a real implementation, this would send to client
      // For now, just log the operation
      console.log(`Theme saved to localStorage: ${theme}`);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  /**
   * Get user theme from persistent storage (database simulation)
   */
  private getUserThemeFromStorage(userId: string): Theme {
    try {
      // In a real implementation, this would query the database
      // For now, return default
      return this.defaultTheme;
    } catch {
      return this.defaultTheme;
    }
  }

  /**
   * Save user theme to persistent storage (database simulation)
   */
  private saveUserThemeToStorage(userId: string, preference: ThemePreference): void {
    try {
      // In a real implementation, this would save to database
      console.log(`Theme saved for user ${userId}: ${preference.theme}`);
    } catch (error) {
      console.warn(`Failed to save theme for user ${userId}:`, error);
    }
  }

  /**
   * Get theme statistics (for analytics)
   */
  getThemeStats(): { light: number; dark: number; system: number } {
    // In a real implementation, this would aggregate from database
    return {
      light: 0,
      dark: 0,
      system: 0,
    };
  }
}