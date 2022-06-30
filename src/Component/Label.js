import React from 'react'

const Label = ({ title, className }) => {
    return (
        <div>
            <label htmlFor={title} className={`block text-sm font-medium text-gray-700 ${className}`}>
                {title}
            </label>
        </div>
    )
}

export default Label
