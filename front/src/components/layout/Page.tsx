interface Props {
    title: string;
    children?: React.ReactNode;
}

export default function (props: Props) {
    const { title, children } = props;

    return (
        <div className="py-5">
            <div className="border border-[var(--text-color)] rounded-xl bg-white h-[520px]">
                <div className="bg-[var(--text-color)] text-[var(--base-color)] p-1 rounded-t-lg">{title}</div>
                <div className="px-2 pt-2 lg:px-8 lg:pt-8 overflow-y-auto h-[460px]">
                    {children}
                </div>
            </div>
        </div>
    )
}