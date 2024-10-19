1.  공통
    - [x] 완성된 day33 폴더를 활용하여 day35를 완성해 주세요.(day34 없음)
2.  나만의컨텐츠목록[파이어베이스]

    - [x] 파이어베이스를 사용하여 나만의컨텐츠목록을 보여주세요.
          => 디자인 및 무한스크롤, 페이지내이션 등 어떠한 기능에도 제한을 두지 않으므로 자유롭게 만들어 주세요. (피그마 없음)
          => 등록, 수정, 삭제, 상세조회, 목록조회 등 어떠한 메뉴에도 제한을 두지 않습니다. - 단, 페이지별 경로는 기존에 배운대로 진행해 주세요.
          (1) 목록페이지 : src/app/myapis/page.tsx
          목록컴포넌트 : src/components/myapis-list/index.tsx
          (2) 등록페이지 : src/app/myapis/new/page.tsx
          등록컴포넌트 : src/components/myapis-write/index.tsx

              (3) 수정페이지  : src/app/myapis/[myapiId]/edit/page.tsx
              수정컴포넌트 : src/components/myapis-write/index.tsx

              (4) 상세페이지  : src/app/myapis/[myapiId]/page.tsx
              상세컴포넌트 : src/components/myapis-detail/index.tsx

3.  컴포넌트[리팩토링]
    - [x] 나만의컨텐츠[파이어베이스] 컴포넌트의 파일을 보완해 주세요.
          => 타입에러가 감지되어 빨간 밑줄이 그어지는 부분에 타입스크립트를 적용하여 문제를 해결해 주세요.
          => 유지보수가 쉽도록 파일을 hook.ts, index.tsx, queries.ts, styles.ts, types.ts 로 분리해 주세요.
