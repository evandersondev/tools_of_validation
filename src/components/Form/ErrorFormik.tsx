import { FormikErrors, useFormikContext } from 'formik'

interface ErrorProps {
  field: string
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      )

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

  return result
}

export function ErrorFormik<T>({ field }: ErrorProps) {
  const { errors } = useFormikContext<FormikErrors<T>>()

  const fieldError = errors?[field]

  // if (!!!fieldError) {
  //   return null
  // }

  return (
    <span className="text-red-600 text-sm">
      {fieldError.message?.toString()}
    </span>
  )
}
