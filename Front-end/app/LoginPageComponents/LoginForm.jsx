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
    router.replace('/home/overview')  
  }
  React.useEffect(()=>{
    if(user != null){
      router.push('/home/overview')
        }},[loading])
  return (
    <div className='h-screen flex items-center justify-center'>
      
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="w-[50vw] h-auto rounded-lg mx-auto my-6 p-10 flex flex-col   items-center"
    >
      <div className='flex flex-col gap-12 '>
      <h1 className='text-4xl text-center font-bold'>Welcome Back</h1>
      <LoginTextField label="Email" name="Email" type="text" width='full' register={register} errors={errors} />
      <LoginTextField label="Password" name="Password" type="password" width='full' register={register} errors={errors} />
      {error && <p className='text-red-500 text-center'>{error} please provide valid data</p>}
      <div className="flex justify-start mb-4">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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