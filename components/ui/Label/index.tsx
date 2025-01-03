import { UserProjectsStates } from "@/lib/interfaces/IUser";
import { FC } from "react";

interface LabelProps {
    type: UserProjectsStates;
    text: string;
}

const Label: FC<LabelProps> = ({ type, text }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";

    const typeClasses: { [K in UserProjectsStates]: string; } = {
        forWork: "bg-blue-100 text-blue-800",
        ownProject: "bg-green-100 text-green-800",
        forAClient: "bg-yellow-100 text-yellow-800",
    };

    return (
        <span className={`${baseClasses} ${typeClasses[type]}`}>
            {text}
        </span>
    );
};

export default Label;

