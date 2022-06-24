import React from 'react'
import { Formik, Form } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Button } from '@chakra-ui/react'
import { useLoginMutation} from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface loginProps {}

const Login: React.FC<loginProps> = () => {
    const router=useRouter()
    const [, login]=useLoginMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const response=await login(values)
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
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or Email"
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
export default withUrqlClient(createUrqlClient)(Login)
