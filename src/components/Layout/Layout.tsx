import React from "react";
import { View } from "react-native";
import { useCreateStyles } from "../Theme";

export function Layout({ children }: { children: React.ReactNode }) {
  const styles = useCreateStyles(({ responsiveValue }) => ({
    container: {
      flexDirection: responsiveValue({ mobile: "column", tablet: "column", desktop: "row-reverse" }),
      width: "100%",
      alignItems: responsiveValue({ mobile: "center", tablet: "center", desktop: "flex-start" }),
    },
  }));

  return <View style={styles.container}>{children}</View>;
}
