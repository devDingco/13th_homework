import styles from "./styles.module.css";
import { schema } from "./form.schema";
import PlaceFormButton from "../commons/place-form-button";
import InputSection from "../commons/input-section";
import { useInitialize } from "./form.initialize";
import Form from "../commons/form";

export default function SolplaceLogsNew() {
  return (
    <main className={styles.container}>
      <Form schema={schema} useInitialize={useInitialize}>
        <InputSection />
        {/* TODO: 푸터로 바꿔주기 */}
        <PlaceFormButton isEdit={false} />
      </Form>
    </main>
  );
}
