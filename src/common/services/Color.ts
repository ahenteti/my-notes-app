import { ThemeEnum } from './ThemeEnum';

export class Color {
  public constructor(private light: string, private dark: string) {}

  public get(theme: ThemeEnum): string {
    return theme == ThemeEnum.Dark ? this.dark : this.light;
  }
}
