/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useTotalPayment } from "../../../hooks/useRepresentativeData";
import Loader from "../../Loader";
import { getUserFromLocalStorage } from "../../../utils/getUserFromLocalStorage";
// import cx from "classnames";

interface PaymentProps {
  total: number;
  value: number;
  paid: boolean;
}

function HeadPayment() {
  const [duePayment, setDuePayment] = useState("$1400");
  const [referalBalance, setReferalBalance] = useState("1200");

  const user = getUserFromLocalStorage();

  // let totalAmt;
  // if (user.isGroupAdmin) {
  //   var { isLoading: isLoading1, data: data1, isError: isError1, error: error1 }: any = useTotalPayment(user.groupId);
  //   totalAmt = data1?.data
  //   console.log("🚀 ~ file: HeadPayment.tsx:22 ~ HeadPayment ~ totalAmt:", totalAmt)
  // } else {
  //   var { isLoading, data, isError, error }: any = useTotalPayment(user._id);
  //   totalAmt = data?.data
  // }


  const userId = user.isGroupAdmin ? user.groupId : user._id;

  const { isLoading, data, isError, error }: any = useTotalPayment(userId);
  const totalAmt = data?.data
  console.log("🚀 ~ file: HeadPayment.tsx:35 ~ HeadPayment ~ totalAmt:", data)

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="flex justify-between pl-48 mobile:pl-4 mobile:flex-col tabletOnly:pl-4  py-4 border-b border-gray-300 bg-slate-300 rounded-2xl mb-4">
        <div className="flex-1">
          <p className="font-bold text-orange">Total Amount</p>
          {/* {isLoading ? <Loader /> : <p className="text-xl mt-2 mb-2">${totalAmt}</p>} */}
          <p className="text-xl mt-2 mb-2">${totalAmt}</p>

          <p className="">PAID</p>
        </div>
        <div className="flex-1">
          <p className="font-bold text-orange">Due Payment</p>
          <p className="text-xl  mt-2 mb-2">{duePayment}</p>
          <p className="">Due Date</p>
        </div>
        <div className="flex-1">
          <p className="font-bold text-orange">Referal Balance</p>
          <p className="text-xl  mt-2 mb-2">{referalBalance}</p>
          <button className="bg-orange text-white px-4 py-2  rounded-2xl   mobile:text-sm mobile:px-1 mobile:py-1 mobile:mr-2 tabletOnly:mr-2  ">
            Withdraw Balance
          </button>{" "}
        </div>
      </div>

      <div className="ml-4 mb-2 font-bold">
        <h1>Payment History</h1>
      </div>
    </>
  );
}
export default HeadPayment;
