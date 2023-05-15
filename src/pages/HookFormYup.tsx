import { useForm, FormProvider } from 'react-hook-form'
import { Form } from '../components/Form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Toast } from '../components/Toast'
import { toast } from 'react-hot-toast'

const createUserFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .transform((name) => {
      return name
        .trim()
        .toLowerCase()
        .split(' ')
        .map((word: string) => {
          return word[0].toUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('Insira um email inválido')
    .test('email', 'O email precisa ser da NGI (@ngi.com.br)', (email) =>
      email.endsWith('@ngi.com.br'),
    ),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha precisa de no minimo 6 caracteres'),
})

type CreateUserFormData = yup.InferType<typeof createUserFormSchema>

export function HookFormYup() {
  const createUserForm = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createUserForm

  function handleCreateUser({ name, email, password }: CreateUserFormData) {
    toast.custom((t) => Toast({ name, email, password, isOpen: t.visible }))
  }

  return (
    <>
      <main className="h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
        <h2 className="font-bold text-4xl text-zinc-50 text-center">
          HookForm + Yup
        </h2>

        <FormProvider {...createUserForm}>
          <form
            onSubmit={handleSubmit(handleCreateUser)}
            className="flex flex-col gap-4 w-full max-w-xs"
          >
            <Form.Field>
              <Form.Label htmlFor="name">Fullname</Form.Label>

              <Form.Input name="name" placeholder="Fullname" />
              <Form.Error field="name" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="email">E-mail</Form.Label>

              <Form.Input name="email" placeholder="E-mail" />
              <Form.Error field="email" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="password">Password</Form.Label>

              <Form.Input name="password" placeholder="Password" />
              <Form.Error field="password" />
            </Form.Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 text-zinc-50 h-8 font-semibold border-0 rounded hover:bg-emerald-500"
            >
              Salvar
            </button>
          </form>
        </FormProvider>
      </main>
    </>
  )
}
