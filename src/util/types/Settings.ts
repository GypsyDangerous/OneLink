export interface Link {
	path: string;
	embed?: boolean;
	image: string;
	name: string;
	order?: number;
	color?: string;
	active: boolean;
	id?: string;
}

export interface ModalMeta {
	showUsername?: boolean;
	name?: string;
}
