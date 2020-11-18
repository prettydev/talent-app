import React from "react";
import { StyleSheet, Text, View, Slider } from "react-native";
import TrackPlayer, { useTrackPlayerProgress } from "react-native-track-player";

const TrackStatus = () => {
  const progress = useTrackPlayerProgress();

  const formatTime = (seconds: number) => {
    return (seconds / 60).toFixed(2);
  };
  return (
    <>
      <Slider
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor="#FFFFFF"
        minimumTrackTintColor="#3AA8A5"
        maximumTrackTintColor="#2F2F2F"
        step={1}
        onValueChange={() => TrackPlayer.pause()}
        onSlidingComplete={(val) => {
          TrackPlayer.play();
          TrackPlayer.seekTo(val);
        }}
        value={progress.position}
      />
      <View style={styles.containerTime}>
        <Text style={styles.time}>{formatTime(progress.position)}</Text>
        <Text style={styles.time}>{formatTime(progress.duration)}</Text>
      </View>
    </>
  );
};
export default TrackStatus;

const styles = StyleSheet.create({
  containerTime: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 10,
    color: "#b3b3b3",
  },
  containerControls: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
