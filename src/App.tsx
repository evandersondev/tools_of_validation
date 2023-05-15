import { FormikJoi } from './pages/FormikJoi'
import { FormikYup } from './pages/FormikYup'
import { FormikZod } from './pages/FormkiZod'
import { HookFormJoi } from './pages/HookFormJoi'
import { HookFormYup } from './pages/HookFormYup'
import { HookFormZod } from './pages/HookFormZod'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      {/* <ZodForm /> */}
      {/* <YupForm /> */}
      {/* <JoiForm /> */}
      {/* <FormikYup /> */}
      {/* <FormikZod /> */}
      <FormikJoi />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{ duration: 300 }}
      />
    </>
  )
}

export default App
