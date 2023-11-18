// import { Input } from '@chakra-ui/input'
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate =  useNavigate()
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [file, setFile] = useState(null);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHander = (event) => {
    // console.log(event, "target");
    
    const { name, type, value, checked, files } = event.target;
    // console.log(files, "files");
    setState((prevFormData) => {
        // console.log(files[0].name, "file");
      return {
        ...prevFormData,
        // [name]: type === "checkbox" ? checked : value
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(state.name , state.password,state.email , file , "all data")
    // let formData = new FormData();
    // formData.append("file", file);
    // formData.append("name", state.name);
    // formData.append("password", state.password);
    // formData.append("email", state.email);
    // console.log(formData , "formdata")   
    // for (var key of formData.entries()) {
        // console.log( key[1] , "ashish");
    // }

    const data = await fetch("http://localhost:4000/api/v1/auth/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(state),
    });
    // console.log(data ,  "adfaf")
    const res = await data.json();
    // console.log(res, "res");
    if(res.success) {
        
        toast.success(res.message)

    } else {
        toast.error(res.message) 
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl >
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={onChangeHander}
          isRequired
        />
      </FormControl>
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
      <FormControl>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={confirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Enter your password again"
            onChange={onChangeHander}
            isRequired
          />
          <InputRightElement>
            <Button
              mr="5px"
              h="1.75rem"
              size="sm"
              onClick={() => setConfirm(!confirm)}
            >
              {confirm ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="file">Upload your picture</FormLabel>
        <Input
          name="file"
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            // console.log(e.target.files[0] , "zero")
            setFile(e.target.files[0])
          }}
          
        />
      </FormControl>
      <Button colorScheme="blue" width="100%" mt={15} onClick={handleSubmit}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
