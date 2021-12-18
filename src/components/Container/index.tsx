import React, { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { modalsAtom } from "src/atoms/modals";
import { Footer } from "../Footer";
import { useCreateStyles } from "../Theme";

type Props = {
  children: ReactNode;
};

export function Container({ children }: Props) {
  const styles = useCreateStyles(({ theme, dimensions: { width } }) => ({
    app: {
      flex: 1,
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundColor: theme.colors.light,
    },
    container: {
      maxWidth: 1440,
      flex: 1,
      width,
      // flexGrow: 1,
      marginHorizontal: "auto",
      alignItems: "center",
    },
    scrollContainer: {
      flex: 1,
      minHeight: "100vh",
      minWidth: "100vw",
    },
    innerScroll: {
      flex: 1,
    },
  }));

  const modal = useRecoilValue(modalsAtom);

  return (
    <SafeAreaView style={styles.app}>
      <ScrollView bounces={false} scrollEnabled={false} contentContainerStyle={styles.scrollContainer}>
        <ScrollView bounces scrollEnabled={modal === null} contentContainerStyle={styles.innerScroll}>
          <View style={styles.container}>{children}</View>
        </ScrollView>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
