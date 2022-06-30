import Label from "./Label"

export const AppInput = ({ title, registerProps, children, className, inputType = 'text' }) => {
    return (
        <div className={`${className}`}>
            <Label title={title} />
            <div className="mt-1">
                <input
                    type={inputType}
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    {...registerProps}
                    className="border-2 p-2 block w-full sm:text-sm border-gray-200 rounded-md outline-none"
                />
                {<span>{children}</span>}
            </div>
        </div>
    )
}
