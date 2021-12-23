import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import * as R from "ramda";

import { useRange } from "src/hooks/useRange";
import { useChartDimensions } from "src/hooks/useChartDimensions";
import { PropSelector } from "src/components/PropSelector";
import { createStyles } from "../Theme";
import { getGraphData, getPropOrFirst } from "./data";

import { Graph } from "./Graph";
import { useRecoilValue } from "recoil";
import { visiblePedalsSelector } from "src/atoms/pedals";
import { selectedDataPoints } from "src/atoms/datapoints";

const styles = createStyles(({ theme, responsiveValue }) => ({
  container: {
    flexDirection: "column",
  },
  chartContainer: {
    marginLeft: -15,
    marginTop: responsiveValue({ desktop: theme.spacings.l, mobile: theme.spacings.s }),
    marginBottom: responsiveValue({ desktop: theme.spacings.l, mobile: theme.spacings.s }),
  },
}));

type Props = {
  pedal?: Pedal;
};

const withDatapoints = (datapoints, pedals) => {
  return pedals.map((pedal) => ({
    ...pedal,
    datapoints: datapoints?.[pedal.id] ?? [],
  }));
};

export function Chart({ pedal }: Props) {
  const [toneRange, setToneRange] = useRange("tone");
  const [gainRange, setGainRange] = useRange("gain");
  const visiblePedals = useRecoilValue(visiblePedalsSelector);
  const toneValue = `${toneRange}%`;
  const gainValue = `${gainRange}%`;

  const datapoints = useRecoilValue(selectedDataPoints);
  const pedalsToGraph = pedal ? [pedal] : withDatapoints(datapoints, visiblePedals);

  const datapointsLength = R.compose(
    R.reduce((length, pedalPoints) => length + pedalPoints.length, 0),
    R.values,
  )(datapoints);

  const select = useCallback(R.compose(getPropOrFirst(gainValue), getPropOrFirst(toneValue)), [gainValue, toneValue]);

  const graphData = useMemo(
    () => getGraphData(select, pedalsToGraph),
    [select, pedalsToGraph.length, datapointsLength],
  );

  const { width, height } = useChartDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Graph width={width} height={height} graphData={graphData} />
      </View>
      <PropSelector label="Tone" value={toneRange} setValue={setToneRange} />
      <PropSelector label="Gain" value={gainRange} setValue={setGainRange} />
    </View>
  );
}
