import { FormikForm } from './pages/Formik'
import { JoiForm } from './pages/Joi'
import { YupForm } from './pages/Yup'
import { ZodForm } from './pages/Zod'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      {/* <ZodForm /> */}
      {/* <YupForm /> */}
      {/* <JoiForm /> */}
      <FormikForm />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{ duration: 300 }}
      />
    </>
  )
}

export default App
