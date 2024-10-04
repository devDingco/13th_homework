# frontend_day24__reference_code--
1. 공통
    - [ ]  완성된 day23 폴더를 활용하여 day24를 완성해 주세요.
2. 게시글등록
    - [ ]  src/app/boards/page.tsx 경로에 파일을 생성하고 게시글목록 페이지를 완성합니다.
        - [ ]  피그마 첫번째 화면과 같이 결과물이 나오도록 만들어 주세요.
        - [ ]  해당 페이지에 접속하였을 때 GRAPHQL-API(fetchBoards)를 사용하여 목록데이터를 조회해 보세요.
        - [ ]  게시글 번호는 index값을 활용하여 완성해 보세요.
        - [ ]  게시글 내용을 클릭하면, 해당 게시글의 상세페이지로 이동하도록 완성해 보세요.
3. 게시글삭제
    - [ ]  src/app/boards/page.tsx 파일에 삭제 기능을 추가해 주세요.
        - [ ]  GRAPHQL-API(deleteBoard)에 id값을 variables로 포함시켜 삭제를 요청해 주세요.
        - [ ]  서버에서 삭제된 게시글이 내 브라우저에서도 삭제되어야 합니다. 따라서, GRAPHQL-API(fetchBoards)를 다시 요청하여 게시물 목록을 갱신해 주세요.
