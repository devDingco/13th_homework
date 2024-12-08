import styles from "./styles.module.css";
import { schema, ISchema } from "./form.schema";
import { useInitialize } from "./form.initialize";
import Form from "../../commons/form";
import Footer from "@/commons/layout/footer";
import InputSection from "./input-section";

export default function SolplaceLogsNew() {
  return (
    <main className={styles.container}>
      <Form<ISchema> schema={schema} useInitialize={useInitialize}>
        <InputSection />
        <Footer buttonText="로그등록" />
      </Form>
    </main>
  );
}
