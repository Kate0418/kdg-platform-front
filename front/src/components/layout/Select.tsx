import dynamic from 'next/dynamic';
const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

export interface Props {
    className?: string
    options: Array<{value: number, label: string}>
    value: Array<{value: number, label: string}> | {value: number, label: string} | null
    onChange?: React.MouseEventHandler<HTMLButtonElement>
    multi?: boolean
}

export function Select({className, options, value ,onChange, multi = false}: Props) {
    return (
        <ReactSelect
            className={className}
            options={options}
            isMulti={multi}
            maxMenuHeight={120}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    borderColor: state.isFocused ? 'var(--accent-color)' : '#ccc',
                    boxShadow: state.isFocused ? '0 0 0 1px var(--accent-color)' : null,
                    '&:hover': {
                        borderColor: state.isFocused ? 'var(--accent-color)' : '#aaa',
                    },
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused
                        ? 'var(--accent-color)'
                        : null,
                })
                }}
            value={value}
            onChange={onChange}
        />
    )
}
