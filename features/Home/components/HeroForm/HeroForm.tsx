import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type HeroFormType = {
  name: string;
  email: string;
  phone: string;
  gdpr: string;
};

const HeroForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeroFormType>();

  const onSubmit = (data: HeroFormType) => console.log(data);

  return (
    <>
      <Box
        width="100%"
        padding="2rem"
        borderRadius="sm"
        backgroundColor="white"
        color="gray.700"
      >
        <Text fontSize="xl" fontWeight="bold">
          Guía de Compra Gratuita
        </Text>
        <Text fontSize="lg">Rellene el formulario y pulse Enviar</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <VStack spacing={1} align="flex-start">
              <Input
                marginTop="1.3rem"
                id="name"
                type="text"
                placeholder="Nombre"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Text fontSize="xs" color="red.400">
                  {errors.name.type}
                </Text>
              )}
            </VStack>
            <Flex
              gap={{ base: "0", sm: "1rem" }}
              flexDirection={{ base: "column-reverse", sm: "row" }}
            >
              <VStack spacing={1} align="flex-start">
                <Input
                  marginTop="1.3rem"
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <Text fontSize="xs" color="red.400">
                    {errors.email.type}
                  </Text>
                )}
              </VStack>
              <VStack spacing={1} align="flex-start">
                <Input
                  marginTop="1.3rem"
                  id="phone"
                  type="text"
                  placeholder="Teléfono"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <Text fontSize="xs" color="red.400">
                    {errors.phone.type}
                  </Text>
                )}
              </VStack>
            </Flex>
            <Checkbox
              marginTop="1.3rem"
              id="gdpr"
              type="checkbox"
              placeholder="GDPR"
              {...register("gdpr", { required: true })}
            >
              Acepto que usen mis datos para enviarme la guía
            </Checkbox>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            fontSize="xl"
            padding="2rem"
            marginTop="2rem"
          >
            Enviar
          </Button>
        </form>
      </Box>
    </>
  );
};

export default HeroForm;
