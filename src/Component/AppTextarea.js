import Label from "./Label"

export const AppTextarea = ({ title, registerProps, children, className}) => {
    return (
        <div className={`${className}`}>
            <Label title={title} />
            <div className="mt-1">
                <textarea
                    id={title}
                    name={title}
                    rows={5}
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
                    {...registerProps}
                />
                {<span>{children}</span>}
            </div>
        </div>
    )
}
