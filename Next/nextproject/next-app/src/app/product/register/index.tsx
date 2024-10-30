"use client";
import UseProductRegister from "./hook";
import { withLoginCheck } from "../../component/_commons/hocs/withLoginCheck";
import styles from "./style.module.css";
import { IPropsProduct } from "./types";
import { useQuery } from "@apollo/client";
import { FETCHTRAVELPRODUCT } from "@/app/component/queires/queries";
import { useParams } from "next/navigation";

export default withLoginCheck(function ProductRegister(props: IPropsProduct) {
  const { register, handleSubmit, onClickSubmit, onClickUpdate } =
    UseProductRegister();
  const params = useParams();
  const { data } = useQuery(FETCHTRAVELPRODUCT, {
    variables: {
      travelproductId: params.travelproductId,
    },
  });
  return (
    <div className={styles.css_productlayout}>
      <form
        onSubmit={
          props.isEdit
            ? handleSubmit(onClickUpdate)
            : handleSubmit(onClickSubmit)
        }
      >
        <div className={styles.css_explain}>
          <div className={styles.css_productname}>
            상품명:{" "}
            <input
              type="text"
              {...register("name")}
              style={{ border: "1px solid black" }}
              defaultValue={props.isEdit ? data?.fetchTravelproduct?.name : ""}
            />
          </div>
          <div className={styles.css_productexplain}>
            상품 설명:{" "}
            <input
              type="text"
              {...register("contents")}
              style={{ border: "1px solid black" }}
              defaultValue={
                props.isEdit ? data?.fetchTravelproduct?.contents : ""
              }
            />
          </div>
          <div className={styles.css_productexplain}>
            상품 가격:{" "}
            <input
              type="text"
              {...register("price")}
              style={{ border: "1px solid black" }}
              defaultValue={props.isEdit ? data?.fetchTravelproduct?.price : ""}
            />
          </div>
          <div className={styles.css_productexplain}>
            상품 remark:{" "}
            <input
              type="text"
              {...register("remarks")}
              style={{ border: "1px solid black" }}
              defaultValue={
                props.isEdit ? data?.fetchTravelproduct?.remarks : ""
              }
            />
          </div>
          <button className={styles.css_submitbtn}>
            {props.isEdit ? "수정하기" : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
});
