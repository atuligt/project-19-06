"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { TcreateUser } from "@/types/user";
import Header from "../components/Header";


const page = () => {

  const [error_password, seterrot_password] = useState("");
  const [loader, setloader] = useState(false);
  const [success_message, setsuccess_message] = useState(false);

  const router = useRouter();
  const handleregister = async(values:  TcreateUser )=>{
    try {
     
        const reponse = await axios.post("http://localhost:1000/register", {
            method: 'POST',
            values,
            headers: {
                'Content-Type': 'application/json'
              }
          })
          setloader(false);
          if(reponse.data == "registered"){
            setsuccess_message(true);
            setTimeout(() => {
                setsuccess_message(false);
                router.push(`/login`) 
            }, 2000);
            
          }
         
    } catch (error) {
        console.log(error);
    }
}

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  function validatename(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }

  function validatephone(value: number) {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }

  function validatepassword(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    } 
    return error;
  }

  function validatecpassword(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    } 
    return error;
  }

  return (
    <>
    <Header/>
    <section className="bg-[#9f9a9a] dark:bg-gray-900 py-5">
        {
            success_message == true
            ?
            <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 fixed top-0 right-0 left-0" role="alert">
     
            <div>
              registered successfully plase go and login
            </div>
            </div>:""
        }
       

      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create an account
            </h1>
            <Formik
       initialValues={{
        name: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
       }}
       onSubmit={values => {
         if(values.password !== values.cpassword){
            seterrot_password("password and conform password are not matching")
          
         }else{
            setloader(true);
            
            handleregister(values as TcreateUser)
         }
         
       }}
     >
        {({ errors, touched, isValidating }) => (
            <Form className="space-y-4 md:space-y-6" >
            <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Your name
                </label>
                {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                <Field
                  type="text"
                  validate={validatename}
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Your number
                </label>
                {errors.phone && touched.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                <Field
                  type="number"
                  validate={validatephone}
                  name="phone"
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="659569"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Your email
                </label>
                {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                <Field
                  type="email"
                  validate={validateEmail}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Password
                </label>
                {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                <Field
                  type="password"
                  validate={validatepassword}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Confirm password
                </label>
                {errors.cpassword && touched.cpassword && <div className="text-red-500 text-sm">{errors.cpassword}</div>}
                <Field
                  type="password"
                  validate={validatecpassword}
                  name="cpassword"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="text-red-500 text-sm m-0">{error_password}</div>
              {
                       loader == false?
                       <button
                       type="submit"
                       className="w-full text-white bg-[#9f9a9a] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                     >
                       Create an account
                     </button>
                     :
                     <div role="status" className="flex justify-center">
                     <svg
                       aria-hidden="true"
                       className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                       viewBox="0 0 100 101"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path
                         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                         fill="currentColor"
                       />
                       <path
                         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                         fill="currentFill"
                       />
                     </svg>
                   </div>
              }
            
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link href="/login" className=" text-[#9f9a9a] hover:underline ">
                  Login Here
                </Link>
              </p>
            </Form>
                   )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default page;
