# frontend_day22__reference_code

1. 공통
    - [ ]  완성된 day20 폴더를 활용하여 day22을 완성해 주세요.(day21 없음)
    - [ ]  GRAPHQL 통신이 가능하도록 layout.tsx 파일에 과제자료(apollo-setting.tsx)를 설치해 주세요.
        - [ ]  설치경로: src/commons/settings/apollo-setting.tsx
        - [ ]  적용방법: src/app/layout.tsx 파일을 열어, 수업에서 배운대로 적용해 주세요.
2. 게시글등록
    - [ ]  src/app/boards/new/page.tsx 파일에 아래의 기능이 작동하도록 수정해 주세요.
        - [ ]  GRAPHQL-API(createBoard)를 사용하여 작성자, 비밀번호, 제목, 내용을 입력한 후, 등록하기 버튼을 클릭하면 게시글이 등록 되도록 기능을 완성해 주세요.
        - [ ]  네트워크 탭을 활용하여 게시글 전송이 에러 없이 잘 되었는지 확인해 주세요.
        - [ ]  전송이 잘 되었다면, 해당 게시글의 번호를 graphql playground에 접속하여 조회해 보세요.
