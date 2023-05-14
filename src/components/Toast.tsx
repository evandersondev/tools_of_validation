interface ToastProps {
  isOpen: boolean
  name: string
  email: string
  password: string
}

export function Toast({ isOpen, name, email, password }: ToastProps) {
  return (
    <div
      className={`${
        isOpen ? 'animate-enter' : 'animate-leave'
      } w-full shadow-lg flex justify-end`}
    >
      <div className="flex">
        <div className="flex flex-col w-auto pl-6 pr-14 py-4 bg-zinc-300  rounded ">
          <p className="text-sm font-medium text-gray-900">Name: {name}</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            Email: {email}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Password:{' '}
            {password
              .split('')
              .map((_) => '*')
              .join('')}
          </p>
        </div>
      </div>
    </div>
  )
}
