import { LocalHeader } from '@/commons/layout/header';
import DetailFormComponent from '@/components/solplace-logs/detail/DetailForm';
import DetailImageComponent from '@/components/solplace-logs/detail/DetailImage';

// 이 화면부터는 material UI를 사용해보겠습니다.
export default function DetailPage() {
  return (
    <article className="overflow-scroll">
      <LocalHeader />
      <DetailImageComponent />
      <DetailFormComponent />
    </article>
  );
}
