import styles from "./styles.module.css";
import Form from "../../commons/form";
import { schema } from "./form.schema";
import { useInitialize } from "./form.initialize";
import Footer from "@/commons/layout/footer";
import InputSection from "./input-section";

export default function SolplaceLogsDetailEdit() {
  return (
    <main className={styles.container}>
      <Form schema={schema} useInitialize={useInitialize}>
        <InputSection />
        <Footer buttonText="수정" />
      </Form>
    </main>
  );
}
