import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  Button,
  FlatList,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../../../env/url";
import Header from "../../../../../components/Header/Header";
import GlobalStyle from "../../../../../GlobalStyle";
import SubjectViewer from "../../../../../components/Viewer/SubjectViewer";
import Loader from "../../../../../components/Loader/Loader";
import CustomPicker from "../../../../../components/Picker/CustomPicker";
import * as SecureStore from "expo-secure-store";
import { useRoute } from "@react-navigation/native";

let windowWidth = Dimensions.get("window").width;

const ScoreReportCard = () => {
  const route = useRoute();
  const dataTerm = route.params.data;
  const [loading, setLoading] = useState(true);
  const [loadingLoader, setLoadingLoader] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [courseID, setCourseID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, []);

  const load = useCallback(async () => {
    try {
      const studentID = await SecureStore.getItemAsync("studentId");
      console.log(studentID);
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const authorization = `Bearer ${accessToken}`;
      await axios
        .get(
          `${BASE_URL}/grade_by_student_and_term/${dataTerm.termID}/${studentID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authorization,
            },
          }
        )
        .then(function (response) {
          setDataset(response.data.studentTermGrade);
          setRefreshing(false);
          setLoadingLoader(false);
        });
    } catch (error) {
      console.log(error);
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
      console.log("Response headers:", error.response.headers);

      Alert.alert("Error", "Failed to load data. Please try again.");
    } finally {
      setLoading(false);
      setLoadingLoader(false);
    }
  }, [dataTerm.termID]);

  useEffect(() => {
    load();
  }, [loadingLoader]);

  let closeModal = () => {
    setShowModal(false);
  };

  const filteredDataset = dataset.filter(
    (data) =>
      data.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header hasBackButton={true} title={"Phiếu báo điểm"} />
      <Loader loading={loadingLoader} />
      <View style={{ marginLeft: "15%" }}>
        <Text allowFontScaling={false} style={styles.header2}>
          {dataTerm.termName}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={[styles.tableRow, { backgroundColor: "#f9fafb" }]}>
          <View style={{ width: "8%" }}>
            <Text
              allowFontScaling={false}
              style={[styles.headerText, { alignSelf: "center" }]}
            >
              STT
            </Text>
          </View>
          <View style={{ width: "37%" }}>
            <Text allowFontScaling={false} style={[styles.headerText]}>
              Tên môn
            </Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text
              allowFontScaling={false}
              style={[styles.headerText, { alignSelf: "center" }]}
            >
              Quá trình
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text
              allowFontScaling={false}
              style={[styles.headerText, { alignSelf: "center" }]}
            >
              KN1
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text
              allowFontScaling={false}
              style={[styles.headerText, { alignSelf: "center" }]}
            >
              KN2
            </Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text
              allowFontScaling={false}
              style={[styles.headerText, { alignSelf: "center" }]}
            >
              Kết quả
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <ActivityIndicator
              animating={loading}
              color="gray"
              size="large"
              style={styles.activityIndicator}
            />
          ) : (
            <View>
              <View style={styles.tableContainer}>
                {filteredDataset.length === 0 ? (
                  <Text style={{ ...styles.text, textAlign: "center" }}>
                    No results found
                  </Text>
                ) : (
                  filteredDataset?.map((data, index) => {
                    return (
                      <View
                        key={data.id}
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "white" : "#f6f6f6",
                            borderColor: "#EAECF0",
                          },
                        ]}
                      >
                        <View style={{ width: "8%", alignSelf: "center" }}>
                          <Text
                            allowFontScaling={false}
                            style={[styles.text, { textAlign: "center" }]}
                          >
                            {index + 1}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "35%",
                            alignSelf: "center",
                            marginRight: "2%",
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={styles.headerText}
                          >
                            {data.subjectName}
                          </Text>
                        </View>
                        <View style={{ width: "20%", alignSelf: "center" }}>
                          <Text
                            allowFontScaling={false}
                            style={{ ...styles.text, textAlign: "center" }}
                          >
                            {parseFloat(data.progressGrade).toFixed(1)}
                          </Text>
                        </View>
                        <View style={{ width: "10%", alignSelf: "center" }}>
                          <Text
                            allowFontScaling={false}
                            style={{ ...styles.text, textAlign: "center" }}
                          >
                            {parseFloat(data.examGrade1).toFixed(1)}{" "}
                          </Text>
                        </View>
                        <View style={{ width: "10%", alignSelf: "center" }}>
                          <Text
                            allowFontScaling={false}
                            style={{ ...styles.text, textAlign: "center" }}
                          >
                            {data.examGrade2}
                          </Text>
                        </View>
                        <View style={{ width: "15%", alignSelf: "center" }}>
                          <Text
                            allowFontScaling={false}
                            style={{ ...styles.text, textAlign: "center" }}
                          >
                            {parseFloat(data.finalGrade).toFixed(1)}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default ScoreReportCard;

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
  },
  searchInput: {
    height: 40,
    width: "90%",
    marginLeft: "5%",
    margin: 10,
    paddingHorizontal: 10,
    borderColor: GlobalStyle.textColor.color,
    borderWidth: 1,
    borderRadius: 8,
  },
  picker: {
    width: "90%",
    marginLeft: "5%",
    marginBottom: 10,
    borderColor: GlobalStyle.textColor.color,
    borderWidth: 1,
    borderRadius: 8,
  },
  headerText: {
    color: GlobalStyle.textColor.color,
    fontSize: 12,
    paddingVertical: 6,
    fontWeight: "600",
    marginLeft: "10%",
  },
  tableRow: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    flexDirection: "row",
    width: "90%",
    marginLeft: "5%",
  },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    marginHorizontal: 0,
  },
  text: {
    color: GlobalStyle.textColor.color,
    fontSize:
      Platform.OS === "ios" && windowWidth > 200 && windowWidth < 380 ? 10 : 12,
    marginLeft: "10%",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  header2: {
    fontSize:
      Platform.OS === "ios" && windowWidth > 400
        ? 20
        : 20 * (windowWidth / 428),
    fontWeight: "600",
    color: GlobalStyle.themeColor.color,
  },
});
