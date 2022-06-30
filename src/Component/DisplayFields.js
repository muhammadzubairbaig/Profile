import React from 'react'

export const DisplayFields = ({ options, title }) => {
    return (
        <div className='mb-3'>
            {options ?
                <>
                    <div className='text-lg font-bold text-black border-b-2'>{title}</div>
                    <div>
                        {options}
                    </div></>
                : ''}
        </div>
    )
}
