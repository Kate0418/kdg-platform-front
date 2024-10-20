interface Props {
    title: string;
    contents_name: string;
    children?: React.ReactNode;
}

export default function (props: Props) {
    const { title, contents_name, children } = props;

    return (
        <div className="flex flex-col w-screen items-center">
            <div className="w-5/6 pt-5">
                <div className="border-b border-[var(--text-color)] w-full">
                    <div className="text-3xl pl-2 pb-2">{title}</div>
                </div>

                <div className="py-5">
                    <div className="border border-[var(--text-color)] rounded-lg bg-white h-[600px] overflow-auto">
                        <div className="bg-[var(--text-color)] text-[var(--base-color)] p-1">{contents_name}</div>
                        <div className="p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}