interface Props {
    title: string;
}

export default function (props: Props) {
    const { title } = props;

    return (
        <div className="border-b border-[var(--text-color)] w-full">
                <div className="text-xl lg:text-3xl pl-2 pb-2">{title}</div>
        </div>
    )
}