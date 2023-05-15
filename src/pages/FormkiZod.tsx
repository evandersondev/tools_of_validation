import { useFormik, FormikHelpers } from 'formik'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Toast } from '../components/Toast'

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .transform((name) => {
      return name
        .trim()
        .toLowerCase()
        .split(' ')
        .map((word) => {
          return word[0].toUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .refine(
      (email) => email.endsWith('@ngi.com.br'),
      'O email precisa ser da NGI (@ngi.com.br)',
    ),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha precisa de no minimo 6 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function FormikZod() {
  const { values, handleSubmit, handleChange, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
      },
      validationSchema: createUserFormSchema,
      onSubmit: handleCreateUser,
    })

  function handleCreateUser(
    { name, email, password }: CreateUserFormData,
    actions: FormikHelpers<CreateUserFormData>,
  ) {
    actions.resetForm()
    toast.custom((t) => Toast({ name, email, password, isOpen: t.visible }))
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <h2 className="font-bold text-4xl text-zinc-50 text-center">
        Formik + Zod
      </h2>

      <form
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold flex items-center justify-between"
            htmlFor="name"
          >
            Fullname
          </label>

          <input
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="name"
            className="h-8 rounded bg-zinc-900 px-4 text-zinc-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
          {errors.name && touched.name ? (
            <span className="text-red-600 text-sm">{errors.name}</span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold flex items-center justify-between"
            htmlFor="email"
          >
            E-mail
          </label>

          <input
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="email"
            className="h-8 rounded bg-zinc-900 px-4 text-zinc-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
          {errors.email && touched.email ? (
            <span className="text-red-600 text-sm">{errors.email}</span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-semibold flex items-center justify-between"
            htmlFor="password"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="password"
            className="h-8 rounded bg-zinc-900 px-4 text-zinc-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />
          {errors.password && touched.password ? (
            <span className="text-red-600 text-sm">{errors.password}</span>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-emerald-600 text-zinc-50 h-8 font-semibold border-0 rounded hover:bg-emerald-500"
        >
          Salvar
        </button>
      </form>
    </main>
  )
}
