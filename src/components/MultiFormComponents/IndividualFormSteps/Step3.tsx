/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";
import { IndividualUserContext } from "../../../contexts/individualOnboardingContext";
import Button from "../../Button";
import Loader from "../../Loader";
import { useRepresentiveData } from "../../../hooks/useRepresentativeData";
import ApiError from "../../ApiError";

interface Step3Props {
  currentStep: number;
  handleNextStep: (step: number) => void;
}
interface Values {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  placeOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  address: string;
  zipCode: string;
  homePhoneNumber: string;
  cellNumber: string;
  email: string;
}

const Step3 = ({ currentStep, handleNextStep }: Step3Props) => {
  const { individualAdmin, setIndividualAdmin } = useContext(
    IndividualUserContext
  );

  const initialValues: Values = {
    firstName: (individualAdmin as Values)?.firstName ?? "",
    middleName: (individualAdmin as Values)?.middleName ?? "",
    lastName: (individualAdmin as Values)?.lastName ?? "",
    dob: (individualAdmin as Values)?.dob ?? "",
    placeOfBirth: (individualAdmin as Values)?.placeOfBirth ?? "",
    nationality: (individualAdmin as Values)?.nationality ?? "",
    countryOfResidence: (individualAdmin as Values)?.countryOfResidence ?? "",
    address: (individualAdmin as Values)?.address ?? "",
    zipCode: (individualAdmin as Values)?.zipCode ?? "",
    homePhoneNumber: (individualAdmin as Values)?.homePhoneNumber ?? "",
    cellNumber: (individualAdmin as Values)?.cellNumber ?? "",
    email: (individualAdmin as Values)?.email ?? "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    dob: Yup.date().required("Date of Birth is required"),
    placeOfBirth: Yup.string().required("Place of Birth is required"),
    nationality: Yup.string().required("Nationality is required"),
    countryOfResidence: Yup.string().required(
      "Country of Residence is required"
    ),
    address: Yup.string().required("Address is required"),
    zipCode: Yup.string().max(5).min(5).required("Zip Code is required"),
    homePhoneNumber: Yup.string()
      .max(15, "Home Phone Number max 15")
      .min(7, "Home Phone Number min 7")
      .required("Home Phone Number is required"),
    cellNumber: Yup.string()
      .max(15, "Cell Number max 15")
      .min(7, "Cell Number min 7")
      .required("Cell Number is required"),
    email: Yup.string().email().required("Email is required"),
  });

  //TODO cell no validation and zip code

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setIndividualAdmin((prevState) => ({ ...prevState, ...values }));
        console.log(
          "🚀 ~ file: step3.tsx:74 ~ onSubmit: ~ individualAdmin:",
          individualAdmin
        );
        // await individualOndoarding(individualAdmin);
        if (!isError) {
          handleNextStep(4);
        }
      },
    });

  const { isLoading, data, error, isError }: any = useRepresentiveData();

  if (isLoading) {
    return <Loader />;
  }
  if (!isError && !isLoading) {
    var { firstName, email, lastName } = data?.data?.user;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto desktop:text-2xl laptop:text-xl tabletOnly:text-lg mobile:text-base w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Info</h1>

      <form onSubmit={handleSubmit}>
        {isError ? <ApiError error={error.response.data.msg} /> : null}
        <div className="mb-4 ">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="firstName"
          >
            First Name*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.firstName !== null &&
          touched.firstName !== null &&
          Object.prototype.hasOwnProperty.call(errors, "firstName") &&
          Object.prototype.hasOwnProperty.call(touched, "firstName") ? (
            <p className="text-[red]">{errors.firstName}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="middleName"
          >
            Middle Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="middleName"
            name="middleName"
            type="text"
            value={values.middleName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.lastName !== null &&
          touched.lastName !== null &&
          Object.prototype.hasOwnProperty.call(errors, "lastName") &&
          Object.prototype.hasOwnProperty.call(touched, "lastName") ? (
            <p className="text-[red]">{errors.lastName}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dob">
            Date of Birth*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dob"
            type="text"
            name="dob"
            value={values.dob}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.dob !== null &&
          touched.dob !== null &&
          Object.prototype.hasOwnProperty.call(errors, "dob") &&
          Object.prototype.hasOwnProperty.call(touched, "dob") ? (
            <p className="text-[red]">{errors.dob}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="placeOfBirth"
          >
            Place of Birth*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="placeOfBirth"
            type="text"
            name="placeOfBirth"
            value={values.placeOfBirth}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.placeOfBirth !== null &&
          touched.placeOfBirth !== null &&
          Object.prototype.hasOwnProperty.call(errors, "placeOfBirth") &&
          Object.prototype.hasOwnProperty.call(touched, "placeOfBirth") ? (
            <p className="text-[red]">{errors.placeOfBirth}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="nationality"
          >
            Nationality*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nationality"
            type="text"
            name="nationality"
            value={values.nationality}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.nationality !== null &&
          touched.nationality !== null &&
          Object.prototype.hasOwnProperty.call(errors, "nationality") &&
          Object.prototype.hasOwnProperty.call(touched, "nationality") ? (
            <p className="text-[red]">{errors.nationality}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="countryOfResidence"
          >
            Country of Residence*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="countryOfResidence"
            type="text"
            name="countryOfResidence"
            value={values.countryOfResidence}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.countryOfResidence !== null &&
          touched.countryOfResidence !== null &&
          Object.prototype.hasOwnProperty.call(errors, "countryOfResidence") &&
          Object.prototype.hasOwnProperty.call(
            touched,
            "countryOfResidence"
          ) ? (
            <p className="text-[red]">{errors.countryOfResidence}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="address"
          >
            Address*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            name="address"
            value={values.address}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.address !== null &&
          touched.address !== null &&
          Object.prototype.hasOwnProperty.call(errors, "address") &&
          Object.prototype.hasOwnProperty.call(touched, "address") ? (
            <p className="text-[red]">{errors.address}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="zipCode"
          >
            Zip Code*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zipCode"
            type="number"
            name="zipCode"
            value={values.zipCode}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.zipCode !== null &&
          touched.zipCode !== null &&
          Object.prototype.hasOwnProperty.call(errors, "zipCode") &&
          Object.prototype.hasOwnProperty.call(touched, "zipCode") ? (
            <p className="text-[red]">{errors.zipCode}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="homePhoneNumber"
          >
            Home Phone Number*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="homePhoneNumber"
            type="number"
            name="homePhoneNumber"
            value={values.homePhoneNumber}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.homePhoneNumber !== null &&
          touched.homePhoneNumber !== null &&
          Object.prototype.hasOwnProperty.call(errors, "homePhoneNumber") &&
          Object.prototype.hasOwnProperty.call(touched, "homePhoneNumber") ? (
            <p className="text-[red]">{errors.homePhoneNumber}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="cellNumber"
          >
            Cell Number*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cellNumber"
            type="number"
            name="cellNumber"
            value={values.cellNumber}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.cellNumber !== null &&
          touched.cellNumber !== null &&
          Object.prototype.hasOwnProperty.call(errors, "cellNumber") &&
          Object.prototype.hasOwnProperty.call(touched, "cellNumber") ? (
            <p className="text-[red]">{errors.cellNumber}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            value={email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email !== null &&
          touched.email !== null &&
          Object.prototype.hasOwnProperty.call(errors, "email") &&
          Object.prototype.hasOwnProperty.call(touched, "email") ? (
            <p className="text-[red]">{errors.email}</p>
          ) : null}
        </div>

        <Button text="Next" isForm />
        <Button
          text="Go Back"
          isForm
          onClick={() => {
            handleNextStep(2);
          }}
        />
      </form>
    </div>
  );
};

export default Step3;
