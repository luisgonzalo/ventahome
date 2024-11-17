import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type ContactFormType = {
  name: string;
  email: string;
  phone: string;
  message: string;
  gdpr: boolean;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>();

  const onSubmit = (data: ContactFormType) => console.log(data);

  return (
    <Box
      width="100%"
      borderRadius="sm"
      backgroundColor="white"
      color="gray.700"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Input
            marginTop="1.3rem"
            id="name"
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
          <Input
            marginTop="1.3rem"
            id="phone"
            type="text"
            placeholder="Teléfono"
            {...register("phone", { required: true })}
          />
          <Input
            marginTop="1.3rem"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Textarea
            marginTop="1.3rem"
            id="message"
            placeholder="Mensaje"
            {...register("message", { required: true })}
          />
          <Checkbox
            marginTop="1.3rem"
            id="gdpr"
            type="checkbox"
            width="100%"
            placeholder="GDPR"
            {...register("gdpr", { required: true })}
          >
            <Text fontSize="0.8rem" color="gray.500">
              Acepto que este sitio web almacene mis datos para futuras
              comunicaciones
            </Text>
          </Checkbox>
          <Button
            type="submit"
            colorScheme="blue"
            display="flex"
            fontSize="base"
            padding="1.6rem"
            marginTop="4rem"
            marginLeft="auto"
          >
            Enviar Mensaje
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default ContactForm;
