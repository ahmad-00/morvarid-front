export default {
	BaseUrl: () =>
		process.env.ENABLE_PROXY
			? process.env.BROWSER_BASE_URL || ''
			: process.env.BASE_URL || '',
	// auth
	LoginUrl: () => 'user/login',
	RegisterUrl: () => 'user/register',
	SendOptUrl: () => 'otp/send',
	SubmitOptUrl: () => 'otp/submit',
	SendResetPasswordUrl: () => 'reset_password/send_code',
	SubmitResetPasswordUrl: () => 'reset_password/submit_code',
	RefreshTokenUrl: () => 'user/refresh_token',
	UpdateUserInfoUrl: () => 'user/info',
	GetUserInfoUrl: () => 'user/info',
	// address
	GetAddressesUrl: () => `address`,
	DeleteAddressUrl: (id: any) => `address/${id}`,
	EditAddressUrl: (id: any) => `address/${id}`,
	AddAddressUrl: () => `address`,
	// category
	GetShopCategories: () => `category`,
	// product
	GetShopProducts: () => `product`,
	GetShopProduct: () => `product`,
	// media
	GetMediaUrl: (url: string) => `media/${url}`,
	// order
	SubmitOrderUrl: () => `order`,
	GetOrdersUrl: () => `order`,
}
