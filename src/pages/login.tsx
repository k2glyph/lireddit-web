import React from 'react'
import { Formik, Form } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Button } from '@chakra-ui/react'
import { useLoginMutation} from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'

interface loginProps {}

const Login: React.FC<loginProps> = () => {
    const router=useRouter()
    const [, login]=useLoginMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const response=await login({options: values})
                    setSubmitting(false)
                    if(response.data?.login.errors){
                        setErrors(toErrorMap(response.data.login.errors))
                    }else if(response.data?.login.user){
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
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}
export default Login