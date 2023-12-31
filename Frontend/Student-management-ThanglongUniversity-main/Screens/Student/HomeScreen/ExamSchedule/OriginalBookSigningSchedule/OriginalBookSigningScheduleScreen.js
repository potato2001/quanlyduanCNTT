import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  Button,
  FlatList,
} from "react-native";
import Header from "../../../../../components/Header/Header";

const OriginalBookSigningScheduleScreen = () => {
  return (
    <>
      <Header hasBackButton={true} title={"Lịch ký sổ gốc"}></Header>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text allowFontScaling={false}>
            Original Book Signing Schedule Screenn is coming soon!
          </Text>
        </View>
      </ScrollView>
    </>
  );
};
export default OriginalBookSigningScheduleScreen;
