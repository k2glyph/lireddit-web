import React from 'react'
import { Formik, Form } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Button } from '@chakra-ui/react'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

interface registerProps {}

const Register: React.FC<registerProps> = () => {
    const router=useRouter()
    const [, register]=useRegisterMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const response=await register({options: values})
                    setSubmitting(false)
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
                            name="email"
                            placeholder="email"
                            label="Email"
                            type="email"
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
export default withUrqlClient(createUrqlClient)(Register)
