import styles from "./styles.module.css";
import PlaceFormButton from "../commons/place-form-button";
import InputSection from "../commons/input-section";
import Form from "../commons/form";
import { schema } from "./form.schema";
import { useInitialize } from "./form.initialize";

export default function SolplaceLogsDetailEdit() {
  return (
    <main className={styles.container}>
      <Form schema={schema} useInitialize={useInitialize}>
        <InputSection />
        <PlaceFormButton isEdit={true} />
      </Form>
    </main>
  );
}
