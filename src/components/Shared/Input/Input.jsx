import React, { useId } from 'react'

const Input = React.forwardRef(
    function Input({
        label,
        type = 'text',
        className = '',
        ...props
    }, ref){
        const id = useId()
        return (
            <div className={`mb-4`}>
                {label && <label className='block font-semibold text-gray-700 mb-2'
                htmlFor={id}
                >{label}
                </label>}
                <input 
                type={type} 
                className={`${className} 
                w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#d27511] transition`}
                ref={ref}
                {...props}
                id={id}
                />
            </div>
        )
    }
)

export default Input
