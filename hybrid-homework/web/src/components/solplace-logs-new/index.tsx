import styles from "./styles.module.css";
import { schema } from "./form.schema";
import InputSection from "../commons/input-section";
import { useInitialize } from "./form.initialize";
import Form from "../commons/form";
import Footer from "@/commons/layout/footer";

export default function SolplaceLogsNew() {
  return (
    <main className={styles.container}>
      <Form schema={schema} useInitialize={useInitialize}>
        <InputSection />
        {/* TODO: 푸터로 바꿔주기 */}
        <Footer buttonText="로그등록" />
      </Form>
    </main>
  );
}
