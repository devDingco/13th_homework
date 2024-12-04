import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ReactNativeTagsPage() {

    const onPressButton = () => {
        alert("버튼을 누르셨군요!")
    }

    const onChangePassword = (text: string) => {
        console.log("입력된 비밀번호는? ", text)
    }

    const onScrollData = () => {
        console.log("스크롤을 내렸습니다.")
    }

    return (
        <View>
            {/* 1. 버튼 */}
            <Button title="이것은 버튼입니다" onPress={onPressButton} />

            {/* 2. 투명한버튼 */}
            <TouchableOpacity onPress={onPressButton}>
                <Text>이것도 버튼입니다</Text>
            </TouchableOpacity>

            {/* 3. 인풋 */}
            <TextInput 
                onChangeText={onChangePassword} 
                secureTextEntry={true}
                style={styles.input}
            />

            {/* 4. 무한스크롤 */}
            <FlatList 
                data={[
                    {number: 1, title: "게시글제목1"},
                    {number: 2, title: "게시글제목2"},
                    {number: 3, title: "게시글제목3"},
                    {number: 4, title: "게시글제목4"},
                    {number: 5, title: "게시글제목5"},
                    {number: 6, title: "게시글제목6"},
                    {number: 7, title: "게시글제목7"},
                    {number: 8, title: "게시글제목8"},
                    {number: 9, title: "게시글제목9"},
                    {number: 10, title: "게시글제목10"}
                ]}
                renderItem={({ item }) => <Text>글번호: {item.number}, 제목: {item.title}</Text>}
                onScroll={onScrollData}
                style={styles.boardList}
            />

            {/* 5. 안드로이드 노치 */}
            <StatusBar 
                translucent={false} // 노치에 태그들 겹치기(true, false)
                barStyle="dark-content" // 노치 글자색(dark-content, light-content)
                backgroundColor="white" // 노치 배경색(transparent, yellow, ...)
            />

            {/* 6. IOS 노치 */}
            <SafeAreaView style={{ backgroundColor: "black" }} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: "red"
    },
    boardList: {
        height: 100,
        backgroundColor: "yellow",
        overflow: "scroll"
    }
})