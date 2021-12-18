import React from "react";
import { View, Image, Text, ImageStyle, TouchableOpacity } from "react-native";
import { useSetPedalState } from "src/atoms/pedals";
import { useCreateStyles } from "../Theme";

export function PedalCard({ pedal }: { pedal: Pedal }) {
  const styles = useCreateStyles(({ theme, responsiveValue }) => ({
    container: {
      width: responsiveValue({ desktop: 200, mobile: 138 }),
      height: responsiveValue({ desktop: 200, mobile: 138 }),
      borderRadius: 10,
      borderColor: theme.colors.lighterDark,
      borderWidth: 2,
      margin: theme.spacings.m,
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.6,
      overflow: "hidden",
    },
    selected: {
      borderColor: theme.colors.primary,
      opacity: 1,
    },
    image: {
      width: responsiveValue({ desktop: 80, tablet: 70, mobile: 50 }),
      height: responsiveValue({ desktop: 80, tablet: 70, mobile: 50 }),
      margin: responsiveValue({
        desktop: theme.spacings.l,
        tablet: theme.spacings.m,
        mobile: theme.spacings.s,
      }),
    },
    title: theme.typography.h2.extend({
      fontWeight: "800",
      textAlign: "center",
      paddingHorizontal: responsiveValue({
        desktop: theme.spacings.m,
        tablet: theme.spacings.s,
        mobile: theme.spacings.s,
      }),
    }),
    brand: theme.typography.p.extend({ fontWeight: "600" }),
  }));

  const { setPedalSelected } = useSetPedalState();

  return (
    <TouchableOpacity onPress={() => setPedalSelected(pedal, !pedal.selected)}>
      <View style={[styles.container, pedal.selected ? styles.selected : {}]}>
        <Image source={{ uri: pedal.image }} style={styles.image as ImageStyle} resizeMode="contain" />
        <Text style={styles.title}>{pedal.name}</Text>
        <Text style={styles.brand}>{pedal.brand}</Text>
      </View>
    </TouchableOpacity>
  );
}
