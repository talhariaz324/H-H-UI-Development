import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import type {
  //   OnApproveData,
  //   OnApproveActions,
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js";
import { useNavigate } from "react-router-dom";
import {
  createGroupApi,
  createPayment,
  createRepresentative,
  updateRepresentative,
} from "../apis/groupOnboading";
import { dataRepresentative } from "../utils/representativeData";
import { useState } from "react";
import ApiSuccess from "./ApiSuccess";
import ApiError from "./ApiError";
import { createKin, updateIndividualAdmin } from "../apis/individualOndoarding";
import PayPalSpinner from "./PayPalSpinner";

interface PayPalProps {
  className: string;
  am: string;
  contextData: any;
}

export default function PayPal({ am, className, contextData }: PayPalProps) {
  const navigate = useNavigate()
  const [apiSuccess, setApiSuccess] = useState<string>()
  console.log("🚀 ~ file: PayPal.tsx:26 ~ PayPal ~ apiSuccess:", apiSuccess)
  const [apiError, setApiError] = useState<string>()
  console.log("🚀 ~ file: PayPal.tsx:28 ~ PayPal ~ apiError:", apiError)

  const {
    createGroup,
    representativeOne,
    representativeThree,
    representativeTwo,
    kinInformation,
    individualAdmin
  } = contextData;

  const groupData = {
    associationName: createGroup?.groupName,
    websiteLink: createGroup?.website,
    phoneNumbers: [createGroup?.cellNumber],
    registeredMembers: createGroup?.registerdMembers,
    email: createGroup?.email,
    address: createGroup?.email,
    zipCode: createGroup?.zipCode,
    country: createGroup?.countryOfOperation,
  };
  const representativeOneData = {
    dateOfBirth: representativeOne?.dob,
    placeOfBirth: representativeOne?.placeOfBirth,
    nationality: representativeOne?.nationality,
    address: representativeOne?.address,
    zipCode: representativeOne?.zipCode,
    phoneNumbers: {
      Home: representativeOne?.homePhoneNumber.toString(),
      Cell: representativeOne?.cellNumber.toString(),
    },
    countryOfResidence: representativeOne?.countryOfResidence,
    positionOccupied: representativeOne?.positionOccupied,
  };

  const representativeTwoData = dataRepresentative(representativeTwo);
  const representativeThreeData = dataRepresentative(representativeThree);

  async function addGroup(paymentData: any) {
    createGroupApi(groupData).then(async (res) => {
      await Promise.all([
        createPayment({
          ...paymentData,
          groupId: res.group._id,
        }),
        updateRepresentative({
          ...representativeOneData,
          groupId: res.group._id,
        }),
        createRepresentative({
          ...representativeTwoData,
          groupId: res.group._id,
          isGroupRespresentative: true,
        }),
        createRepresentative({
          ...representativeThreeData,
          groupId: res.group._id,
          isGroupRespresentative: true,
        }),
      ]);
      navigate('/thank-you')
    })
      .catch(err => setApiError(err.response.data.msg))
  }


  async function addInvdividualMember(paymentData: any) {
    updateIndividualAdmin(individualAdmin).then(async (res) =>{
      await Promise.all([
        createKin(kinInformation),
        createPayment({
          ...paymentData,
          userId: res.user._id
        })
      ])

    })
    createKin(kinInformation);
    navigate('/thank-you')
  }

  return (
    <>
      {apiError ? <ApiError error={apiError} /> : null}
      {apiSuccess ? <ApiSuccess success={apiSuccess} /> : null}
      <PayPalScriptProvider
        options={{
          "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID as string}`,
        }}
      >
        <PayPalSpinner />
        <PayPalButtons
          style={{
            layout: "horizontal",
            color: "white",
            height: 50,
            shape: "rect",
          }}
          className={`flex items-center w-[211px]  border border-gray-300 shadow-sm rounded ${className} cursor-pointer`}
          createOrder={async (
            _: CreateOrderData,
            actions: CreateOrderActions
          ) => {
            return await actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      value: am,
                    },
                  },
                ],
              })
              .then((orderId) => {
                console.log(orderId);
                return orderId;
              });
          }}
          onApprove={async (data: any, actions: any): Promise<void> => {
            return actions.order.capture().then((res: any) => {
              console.log("🚀 ~ file: PayPal.tsx:110 ~ returnactions.order.capture ~ res:", res)
              { res.status === "COMPLETED" ? setApiSuccess("Transaction Successful") : null }
              const {id, payer, purchase_units } = res

              const paymentData ={
                transactionId: id,
                amount: purchase_units[0].amount.value,
                email: payer.email_address,
                paymentReason: "Registration"
              }
              console.log("🚀 ~ file: PayPal.tsx:147 ~ returnactions.order.capture ~ paymentData:", paymentData)
              if (individualAdmin) {
                addInvdividualMember(paymentData)
              } else if (createGroup) {
                addGroup(paymentData);
              }
              return;
            });
          }}
          onError={(err) => {
            console.log("🚀 ~ file: PayPal.tsx:117 ~ PayPal ~ err:", err)

            // console.log(err);
            window.location.href = "our page";
          }}
        />
      </PayPalScriptProvider>
    </>

  );
}
