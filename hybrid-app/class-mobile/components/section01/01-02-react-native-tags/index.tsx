import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function ReactNativeTagsPage() {
  const onPressButton = () => {
    console.log("버튼이 눌렸습니다.");
  };

  const onChangePassword = (text: string) => {
    console.log("입력된 비밀번호는", text, "입니다.");
  };

  const onScrollData = () => {
    console.log("스크롤이 발생했습니다.");
  };

  return (
    <View>
      {/* 
          1. 버튼  
          onPress={onPressButton} : 버튼을 눌렀을때 실행
      */}
      <Button title="이것은 버튼입니다." onPress={onPressButton} />

      {/* 2. 투명한 버튼  */}
      <TouchableOpacity onPress={onPressButton}>
        <Text>이것은 투명한 버튼입니다.</Text>
      </TouchableOpacity>

      {/* 
          3. 인풋  
          secureTextEntry={true} : 비밀번호 입력시, 입력
          onChangeText={onChangePassword} : 입력값이 변경될때마다 실행
      */}
      <TextInput
        onChangeText={onChangePassword}
        secureTextEntry={true}
        style={styles.input}
      />

      {/* 
          4. 무한스크롤  
          data : 렌더링할 데이터
          renderItem : 각 아이템을 렌더링할때 사용
          onScroll : 스크롤시 이벤트 발생
      */}
      <FlatList
        data={[
          { number: 1, title: "제목1" },
          { number: 2, title: "제목2" },
          { number: 3, title: "제목3" },
          { number: 4, title: "제목4" },
          { number: 5, title: "제목5" },
          { number: 6, title: "제목6" },
          { number: 7, title: "제목7" },
          { number: 8, title: "제목8" },
          { number: 9, title: "제목9" },
          { number: 10, title: "제목10" },
        ]}
        renderItem={({ item }) => (
          <Text>
            글번호 : {item.number}, 제목 : {item.title}
          </Text>
        )}
        onScroll={onScrollData}
        style={styles.boardList}
      />

      {/* 
          5. 안드로이드 노치  
          translucent = false : 노치영역을 겹치지 않게 함
          barStyle = "dark-content" : 노치영역의 글자 색상을 바꿈
          backgroundColor = "black" : 노치영역의 배경색을 변경
      */}
      <StatusBar
        translucent={false}
        barStyle="dark-content"
        backgroundColor="white"
      />

      {/* 6. IOS 노치  */}
      <SafeAreaView style={{ backgroundColor: "black" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "red",
  },
  boardList: {
    height: 100,
    backgroundColor: "yellow",
    overflow: "scroll",
  },
});
