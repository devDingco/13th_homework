"use client";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidV4 } from "uuid";
import { FetchUserLoggedInDocument } from "../graphql/graphql";
import { useMutation } from "@apollo/client";
import { CREATE_POINT } from "../queries/queries";

export default function withPortOne(login) {
    //
    const [createPoint] = useMutation(CREATE_POINT);

    const onClickPay = async () => {
        const payment = await PortOne.requestPayment({
            storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
            channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",

            paymentId: uuidV4(),
            orderName: "테스트 상품",
            totalAmount: 1000,
            currency: "CURRENCY_KRW",
            payMethod: "EASY_PAY",

            customer: {
                customerId: login.fetchUserLoggedIn._id,
                fullName: login.fetchUserLoggedIn.name,
                phoneNumber: "010-7724-7289",
                email: login.fetchUserLoggedIn.email,
                // address: {
                //     country: "COUNTRY_KR",
                //     addressLine1: "seoul",
                //     addressLine2: "seongbuk",
                //     city: "seoul",
                //     province: "seongbuk",
                // },
                // zipcode: "00001",
            },
            redirectUrl: "http://localhost:3000/mypage",
        });
        PointTransaction(payment);
    };

    async function PointTransaction(payment) {
        const point = await createPoint({
            variables: { paymentId: payment?.paymentId },
            refetchQueries: [{ query: FetchUserLoggedInDocument }],
        });
        console.log(point);
    }
    // 포인트 등록까지는 되는데 이걸 어떻게 뽑아오지?????

    return {
        onClickPay,
    };
}
