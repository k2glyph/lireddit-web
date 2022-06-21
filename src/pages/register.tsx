import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Button } from '@chakra-ui/react'
import { useMutation } from 'urql'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'

interface registerProps {}

const Register: React.FC<registerProps> = () => {
    const router=useRouter()
    const [, register]=useRegisterMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const response=await register({username: values.username, password: values.password})
                    if(response.data?.register.errors){
                        setErrors(toErrorMap(response.data.register.errors))
                    }else if(response.data?.register.user){
                        router.push("/")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <InputField
                            name="password"
                            placeholder="password"
                            label="Password"
                            type="password"
                        />
                        <Button
                            mt={4}
                            type="submit"
                            colorScheme={'teal'}
                            isLoading={isSubmitting}
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}
export default Register
