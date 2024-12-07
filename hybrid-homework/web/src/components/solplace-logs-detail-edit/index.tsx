import styles from "./styles.module.css";
import InputSection from "../commons/input-section";
import Form from "../commons/form";
import { schema } from "./form.schema";
import { useInitialize } from "./form.initialize";
import Footer from "@/commons/layout/footer";

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
