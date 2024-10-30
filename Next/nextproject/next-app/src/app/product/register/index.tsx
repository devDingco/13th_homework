"use client";
import UseProductRegister from "./hook";
import { withLoginCheck } from "../../component/_commons/hocs/withLoginCheck";
import styles from "./style.module.css";
export default withLoginCheck(function ProductRegister() {
  const { register, handleSubmit, onClickSubmit } = UseProductRegister();

  return (
    <div className={styles.css_productlayout}>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        <div className={styles.css_explain}>
          <div className={styles.css_productname}>
            상품명:{" "}
            <input
              type="text"
              {...register("name")}
              style={{ border: "1px solid black" }}
            />
          </div>
          <div className={styles.css_productexplain}>
            상품 설명:{" "}
            <input
              type="text"
              {...register("contents")}
              style={{ border: "1px solid black" }}
            />
          </div>
          <div className={styles.css_productexplain}>
            상품 가격:{" "}
            <input
              type="text"
              {...register("price")}
              style={{ border: "1px solid black" }}
            />
          </div>
          <div className={styles.css_productexplain}>
            상품 remark:{" "}
            <input
              type="text"
              {...register("remarks")}
              style={{ border: "1px solid black" }}
            />
          </div>
          <button className={styles.css_submitbtn}>등록하기</button>
        </div>
      </form>
    </div>
  );
});
