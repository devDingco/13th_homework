import React from 'react';
import BoardsNew from './boards/new/page';
import Link from 'next/link';

function App() {
  return (
    <>
      <Link href="/boards/new">포스트 생성페이지</Link>
    </>
  );
}

export default App;
