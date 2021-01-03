import { AnchorHTMLAttributes, DetailedHTMLProps, forwardRef, LegacyRef } from "react";

interface AnchorProps
	extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
	newTab?: boolean;
}

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(({ newTab, ...props }: AnchorProps, ref) => {
	const Rel = newTab ? "noopener noreferrer" : props.rel;
	const Target = newTab ? "_blank" : null;
	return <a ref={ref} {...props} rel={Rel} target={Target}></a>;
});

export default Anchor;
