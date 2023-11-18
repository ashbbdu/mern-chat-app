import React, { useState } from 'react'
import {
    FormControl,
    FormLabel,
    VStack,
    Input,
    InputRightElement,
    Button,
    InputGroup,
  } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [state, setState] = useState({
      email: "",
      password: ""
    });

    const onChangeHander = (event) => {
        const { name, value } = event.target;   
        setState((prevFormData) => {
          return {
            ...prevFormData,
            [name]: value,
          };
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        const data = await fetch("http://localhost:4000/api/v1/auth/login", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(state),
        });
        const res = await data.json();
        if(res.success) {
            console.log(res , "Res")
            toast.success(res.message)
            navigate("/chat")
            localStorage.setItem("userDetails" , JSON.stringify(res))
            localStorage.setItem("token" , JSON.stringify(res.token))
        } else {
            toast.error(res.message) 
        }
      };

  return (
    <VStack spacing="5px">

    <FormControl>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        onChange={onChangeHander}
        isRequired
      />
    </FormControl>
    <FormControl>
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          name="password"
          placeholder="Enter Your password"
          onChange={onChangeHander}
          isRequired
        />
        <InputRightElement>
          <Button
            mr="5px"
            h="1.75rem"
            size="sm"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <Button colorScheme="blue" width="100%" mt={15} onClick={handleSubmit}>
        Login
    </Button>
    <Button colorScheme="red" width="100%" onClick={handleSubmit}>
        Get Guest User Credentials
    </Button>
  </VStack>
  )
}

export default Login