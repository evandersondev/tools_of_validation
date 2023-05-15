# Ferramentas de validação

> Para essa análise foi criado um POC onde atualmente está hospedada em [https://github.com/evandersondev/tools_of_validation](https://github.com/evandersondev/tools_of_validation), a POC contém uma análise inicial de algumas ferramentas de validações como (ZOD, YUP e JOI) em conjunto de duas ferramentas de formulários (REACT HOOK FORM e o FORMKI), foi criada uma página para cada ferramenta com um simples formulário para uma breve descrição de como utilizar tal ferramenta.

<br/>

### Schemas

- Para cada lib de validação existe uma forma de criar o objeto responsável para validar os campos do formulário, no exmeplo a seguir podemos ver como fazer isso para cada lib de validação.

- Zod

```js
const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .refine(
      (email) => email.endsWith("@ngi.com.br"),
      "O email precisa ser da NGI (@ngi.com.br)"
    ),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha precisa de no minimo 6 caracteres"),
});
```

- Yup

```js
const createUserFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word: string) => {
          return word[0].toUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Insira um email inválido")
    .test("email", "O email precisa ser da NGI (@ngi.com.br)", (email) =>
      email.endsWith("@ngi.com.br")
    ),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha precisa de no minimo 6 caracteres"),
});
```

- Joi

```js
const createUserFormSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
```

- Para o exemplo de formulário criado na POC esse é o modo do objeto responsável por validar, convencionalmente chamamos o objeto de **Schema**.

- Podemos varificar que algumas libs possuem um modo de customizar a mensagem de erro, como também existem métodos de transformar os valores a serem validados, para isso indico pesquisar mais a fundo a lib `zod` e seus metodos de entrada e saida, como também transformar e tipar o que entrar e sai do formulário.

### Validação + Typescrip

- Para nos prorpocionar um desenvolvimento mais ágil um boa prática é utilizar as libs de validações junto com o typescript, onde as libs são altamente compativéis com o typescript e nos fornecendo métodos para criar tipagem de forma facilitada.

- ZOD

```js
type CreateFormUserData = z.infer<typeof createUserFormSchema>;
```

- YUP

```js
type CreateUserFormData = yup.InferType<typeof createUserFormSchema>;
```

- JOI

```js
interface CreateUserFormData {
  name: string
  email: string
  password: string
}
```

### React Hook Form

- Para utilizar o **React Hook Form** em conjunto com as libs de validação é bem simples, dentre elas utiliamos mais um lib chamada [@hookform/resolver](https://www.npmjs.com/package/@hookform/resolvers) ela nos permite uma intereção maior do schema de validação ao react hook form.

- A utilização do **React Hook Form** é parecida para cada lib de validação, mudando apenas o modo de criar os Schemas como mostrado anteriormente e em como tipar o objeto de validação, desse modo aqui vai um exmplo de como utiliza-la com o `ZOD`.

```js
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .refine(
      (email) => email.endsWith("@ngi.com.br"),
      "O email precisa ser da NGI (@ngi.com.br)"
    ),
});

type CreateFormUserData = z.infer<typeof createUserFormSchema>;

export function HookFormZod() {
  const createUserForm =
    useForm <
    CreateFormUserData >
    {
      resolver: zodResolver(createUserFormSchema),
    };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = createUserForm;

  function handleCreateUser({ email }: CreateFormUserData) {
    console.log(email);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <input type="email" {...register("email")} />

      <button type="submit" disabled={isSubmitting}>
        Salvar
      </button>
    </form>
  );
}
```

- Essa é a forma mais simples de utilização do **React Hook Form**, na POC foi utilizado **composition patterns** onde consiste em separar a aplicação em pedaços menores, e podemos ver que o **React Hook Form** é perfeito para esse tipo de abordagem.

### Formik

- Para utilização do **Formik** é relativamente simples, onde basicamente só é preciso mudar a forma do schema e tipagem dos objetos de validação de acordo com a lib escolhida e para a dita comparação aqui vai um exemplo simples utilização com o `ZOD`.

```js
import { useFormik, FormikHelpers } from "formik";
import { z } from "zod";

const createUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .refine(
      (email) => email.endsWith("@ngi.com.br"),
      "O email precisa ser da NGI (@ngi.com.br)"
    ),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function FormikZod() {
  const { values, handleSubmit, handleChange, isSubmitting } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: createUserFormSchema,
    onSubmit: handleCreateUser,
  });

  function handleCreateUser(
    { email }: CreateUserFormData,
    actions: FormikHelpers<CreateUserFormData>
  ) {
    console.log(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="email"
        value={values.email}
        onChange={handleChange}
        placeholder="email"
      />

      <button type="submit" disabled={isSubmitting}>
        Salvar
      </button>
    </form>
  );
}
```

### POCs

- Para um melhor entendimento de como funcionam cada lib de validação e as libs de formulários, foram criados as POCs como dito anteriormente, sua utilização é simples, no arquivo de inicialização do React **App.tsx** essa sendo importadas todas as páginas de cada formulário onde você pode descomentar todas as páginas como também comentar e descomentar uma por uma e verificando individualmente cada.

> Essa é uma análise inicial, bem simples, podemos ser estudada mais a fundo as libs (ZOD, YUP, JOI) sendo delas a `Zod` a mais explorável de métodos e funcionalidades a mais.
