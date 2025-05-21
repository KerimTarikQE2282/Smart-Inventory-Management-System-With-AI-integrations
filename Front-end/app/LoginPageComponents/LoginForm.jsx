"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query'
import TextInput from '../../Components/FormInputs/TextInput';
import SubumitButton from '../../Components/FormInputs/SubumitButton';
import LoginButton from './LoginButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoginTextField from './LoginTextField';
import { useRouter } from 'next/navigation';
import {login} from '../../actions/auth'
import { connect } from 'react-redux'





 function LoginForm({login,isAuthenticated}) {
  const user=global?.window?.localStorage.getItem('INVENTORY_USER')
 
  const router=useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error,setError]=React.useState('')
  const [loading,setLoading]=React.useState(false)
  async function onSubmit(data){
    setLoading(true)
    login(data,setLoading,setError)
  } 
  if(isAuthenticated){
    router.replace('/home')  
  }
  React.useEffect(()=>{
    if(user != null){
      router.push('/home')
        }},[loading])
  return (
    <div className='lg:h-screen flex items-center justify-center lg:mt-0 mt-10 '>
      
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="lg:w-[50vw] h-auto rounded-lg mx-auto lg:my-6 p-10 flex flex-col   lg:items-center lg:mt-0 mt-[10vh]"
    >
      <div className='flex flex-col lg:gap-12 gap-6 '>
      <h1 className='text-4xl lg:text-center font-bold'>Welcome Back</h1>
      <LoginTextField label="Email" name="Email" type="text" width='full' register={register} errors={errors} />
      <LoginTextField label="Password" name="Password" type="password" width='full' register={register} errors={errors} />
      {error && <p className='text-red-500 text-center'>{error} please provide valid data</p>}
      <div className="flex justify-start lg:mb-4">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 lg:w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Remember Me</label>
        </div> 
        </div>  
      <div className='w-full flex justify-center flex-col'>
          <LoginButton title={`Login`} isLoading={loading} />
          {/* <LoginButton isGoogle={true} title={`Login with Google `} isLoading={loading} /> */}
        </div>   
         </form>
   
  </div>
  
  );

}

const mapStateToProps=(state)=>({

})

export default connect(mapStateToProps,{login})(LoginForm)