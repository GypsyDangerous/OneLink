import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

interface AnchorProps
	extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
	newTab?: boolean;
}

const Anchor = ({ newTab, ...props }: AnchorProps) => {
    const Rel = newTab ? "noopener noreferrer" : props.rel
    const Target = newTab ? "_blank" : null
    return <a {...props} rel={Rel} target={Target} ></a>
};

export default Anchor;
