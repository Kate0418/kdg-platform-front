interface Props {
    modalFlg: boolean
    children?: React.ReactNode;
}

export function Modal (props: Props) {
    const { modalFlg, children } = props;

    return (
        <div className={`fixed inset-0 z-40 flex items-center justify-center ${modalFlg || 'hidden'}`}>
            <div className="absolute inset-0 bg-[var(--text-color)] opacity-60"></div>
            <div className="relative z-50 bg-white p-8 rounded-lg w-full max-h-[600px] overflow-auto mx-20 flex flex-col items-center">
                {children}
            </div>
        </div>    
    )
}