"use client";
import UseProductRegister from "./hook";
import { withLoginCheck } from "../../component/_commons/hocs/withLoginCheck";
import styles from "./style.module.css";
import { IPropsProduct } from "./types";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";

export default withLoginCheck(function ProductRegister(props: IPropsProduct) {
  const {
    register,
    handleSubmit,
    onClickSubmit,
    onClickUpdate,
    data,
    handleCpmplete,
    isModalOpen,
    onToggleModal,
    zipcode,
  } = UseProductRegister(props);

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
          <div>
            상품명:{" "}
            <input
              type="text"
              {...register("name")}
              placeholder="상품명을 입력해 주세요."
              className={styles.css_productname}
              defaultValue={props.isEdit ? data?.fetchTravelproduct?.name : ""}
            />
            <div style={{ color: "red" }}>
              {/* {formState.errors.name?.message ?? ""}{" "} */}
            </div>
          </div>
          <div>
            한줄 요약:{" "}
            <input
              type="text"
              {...register("remarks")}
              placeholder="상품을 한줄로 요약해 주세요."
              className={styles.css_productexplain}
              defaultValue={
                props.isEdit ? data?.fetchTravelproduct?.remarks : ""
              }
            />
          </div>
          <div>
            상품 설명:{" "}
            <input
              type="text"
              {...register("contents")}
              placeholder="내용을 입력해 주세요."
              className={styles.css_productexplain}
              defaultValue={
                props.isEdit ? data?.fetchTravelproduct?.contents : ""
              }
            />
          </div>
          <div>
            판매 가격:{" "}
            <input
              type="text"
              {...register("price")}
              placeholder="판매가격을 입력해 주세요.(원 단위)"
              className={styles.css_productexplain}
              defaultValue={props.isEdit ? data?.fetchTravelproduct?.price : ""}
            />
          </div>
          <div>
            태그 입력:{" "}
            <input
              type="text"
              {...register("tag")}
              placeholder="태그를 입력해 주세요."
              className={styles.css_productexplain}
              defaultValue={
                props.isEdit ? data?.fetchTravelproduct?.remarks : ""
              }
            />
          </div>
          <div className={styles.css_address}>
            <label htmlFor="addressnum_id" className={styles.css_addressnumtag}>
              주소
            </label>
            <div className={styles.css_addressnum}>
              <input
                type="text"
                placeholder="01234"
                className={styles.css_addressnuminput}
                readOnly
                value={zipcode}
                defaultValue={
                  props.isEdit
                    ? data?.fetchTravelproduct.travelproductAddress.zipcode
                    : ""
                } //input tag에서 계속 보여줄 값, input 박스에 값을 입력하면 값이 입력되지 않고 지정해준 value만 계속해서 보여줌
              />

              <button
                type="button"
                onClick={onToggleModal}
                className={styles.css_search}
              >
                우편번호 검색
              </button>
              {isModalOpen && (
                <Modal
                  open={true}
                  onOk={onToggleModal}
                  onCancel={onToggleModal}
                >
                  <DaumPostcodeEmbed onComplete={handleCpmplete} />
                </Modal>
              )}
            </div>

            <input
              type="text"
              placeholder="상세주소를 입력해 주세요."
              {...register("addressdetail")}
              className={styles.css_addressinput}
              defaultValue={
                props.isEdit
                  ? data?.fetchTravelproduct.travelproductAddress.addressDetail
                  : ""
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
