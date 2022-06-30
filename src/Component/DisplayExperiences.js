import React from 'react'

export const DisplayExperiences = ({ options, title }) => {
    return (
        <div className='sm:col-span-6 mb-6'>
            <div className='text-lg font-bold text-black border-b-2'>{title}</div>
            {options.map((opt, i) =>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-2' key={i}>
                    <div className='mt-2'>
                        {opt.from} - {opt.isPresent ? 'present' : opt.to}
                    </div>
                    <div className=''>
                        <div className='mt-2 text-blue-700 font-semibold'> {opt.name}</div>
                        <div className='mt-2'>
                            {opt.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
