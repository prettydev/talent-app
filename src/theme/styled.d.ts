// import original module declaration
import "styled-components";

// and extend it
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    lightTextColor: string;
    fontFamily: string;
    headerFontFamily: string;
  }
}
