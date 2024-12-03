import { HeaderGlobal, HeaderLocal } from './header';

// 그로벌헤더 + 로컬헤더
// export default function LayoutGlobalAndLocal({ children }) {
//     return (
//         <div>
//             <HeaderGlobal />
//             <>{children}</>
//         </div>
//     );
// }

// 글로벌헤더 + 로컬헤더 + 투명포함
export default function LayoutTransparent({ children }) {
    return (
        <>
            <HeaderGlobal />
            <div>{children}</div>
        </>
    );
}
