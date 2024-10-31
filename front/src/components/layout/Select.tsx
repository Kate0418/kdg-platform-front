import dynamic from 'next/dynamic';
const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

export interface Props {
    className?: string
    options: Array<{value: number, label: string}>
    value: Array<{value: number | null, label: string | null}>
        | {value: number | null, label: string | null}
        | null
    onChange?: React.MouseEventHandler<HTMLButtonElement>
    multi?: boolean
}

export function Select({className, options, value ,onChange, multi = false}: Props) {
    return (
            <ReactSelect
                className={`relative ${className}`}
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
                    }),
                    menu: (provided) => ({
                        ...provided,
                        zIndex: 1000, // z-indexを設定
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                    }),
                    dropdownIndicator: (provided) => ({
                        ...provided,
                        display: 'none', // これで下矢印を非表示にします
                    }),
                    indicatorSeparator: (provided) => ({
                        display: 'none', // 区切り線を非表示に
                    }),
                }}
                value={value}
                onChange={onChange}
            />
    )
}
