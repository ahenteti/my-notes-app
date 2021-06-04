import { Theme } from './Theme';

export class Color {
  public constructor(private light: string, private dark: string) {}

  public get(theme: Theme): string {
    return theme.dark ? this.dark : this.light;
  }
}
