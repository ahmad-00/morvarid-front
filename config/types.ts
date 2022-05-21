export type User = {
	id: string
	first_name: string
	last_name: string
	username: string
	phone: string
	email: string | null
	verified: boolean
	token: {
		access: string
		refresh: string
	} | null
}

export type ProductImage = {
	id: string
	image: string
	product: string
}

export type Product = {
	id: string
	images: ProductImage[]
	main_image: string | null
	title: string
	description: string
	price: number
	payable_price: number
	weight: number
	max_order_quantity: number
	is_deleted: boolean
	category: string
	quantity?: number
}

export type Address = {
	id: string
	country: string
	province: string
	city: string
	details: string
	postal_code: string
	user?: string
}

export type Order = {
	id: string
	address: Address
	items: {
		id: string
		product_detail: Product
		quantity: number
	}[]
	payable_fee: string
	total_fee: string
	status: 'submitted'
	tracking_number: string
	created_at: string
}

export type Article = {
	id: string
	title: string
	content: string
	category: string
	image: string
	date: string
}

export type ArticleCategory = {
	id: string | null
	title: string
}

export type ShopCategoryWeight = {
	value: number
	label: string
}

export type ShopCategory = {
	id: string
	image: string
	name: string
}

export type BlogCategory = {
	id: string
	image: string
	title: string
}

export type Image = {
	id: string | null
	path: string
	path_thumb1: string
	path_thumb2: string
}
