import RegisterHeader from '@/commons/layout/new/header';
import UploadImageComponent from '@/components/solplace-logs/new/UploadImage';
import WriteForm from '@/components/solplace-logs/new/WriteForm';

export default function NewPage() {
  return (
    <main className="flex flex-col p-4">
      <RegisterHeader />
      <section className="mt-6 flex flex-col gap-5">
        <UploadImageComponent />
        <WriteForm />
      </section>
    </main>
  );
}
