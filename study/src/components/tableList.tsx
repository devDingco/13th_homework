// import { typeMappings } from "../types/components/tableList";

// interface DynamicProps {
//   typeName: keyof typeof typeMappings;
//   listData: any[];
// }

// export default function TableList({ typeName, listData }: DynamicProps) {
//   // const typeSet = typeMappings[typeName];

//   return (
//     <div className="shadow-md rounded-2xl px-12 py-6">
//       <div className="overflow-x-auto">
//         {listData.length > 0 ? (
//           <table className="table text-center border-separate border-spacing-x-0 border-spacing-y-3 font-medium overflow-hidden">
//             {/* head */}
//             <thead className="text-neutral text-base font-medium">
//               <tr className="border-none">
//                 <th>번호</th>
//                 <th className="w-4/6 text-left">제목</th>
//                 <th>작성자</th>
//                 <th>날짜</th>
//               </tr>
//             </thead>
//             <tbody>
//               {listData.map((listData: typeof typeSet, idx: number) => {
//                 return (
//                   <tr key={idx} className="cursor-pointer hover:bg-gray-100">
//                     <td className="border-solid border-y border-l rounded-s-xl border-gray-100 font-medium text-neutral-400">
//                       {listData.id}
//                     </td>
//                     <td className="border-solid border-y border-gray-100 text-left text-neutral">
//                       {listData.title}
//                     </td>
//                     <td className="border-solid border-y border-gray-100 text-neutral-600 font-normal truncate">
//                       {listData.author}
//                     </td>
//                     <td className="border-solid border-y border-gray-100 font-light text-neutral-400">
//                       {listData.date_published.split("T")[0].replace(/-/g, ".")}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         ) : (
//           "loading..."
//         )}
//       </div>
//     </div>
//   );
// }
