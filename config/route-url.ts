export default {
	HomeUrl: () => `/`,
	// auth
	LoginUrl: () => '/auth/login',
	RegisterUrl: () => '/auth/register',
	SecretLoginUrl: () => '/auth/secret-login',
	ForgetPasswordUrl: () => '/auth/forget-password',
	// blog
	BlogUrl: () => `/blog`,
	BlogPageUrl: (page: number) => `/blog/page/${page}`,
	BlogCategoryUrl: (categoryId: string) => `/blog/category/${categoryId}`,
	BlogCategoryPageUrl: (categoryId: string, page: number) =>
		`/blog/category/${categoryId}/page/${page}`,
	BlogArticleUrl: (articleId: string) => `/blog/single/${articleId}`,
	// shop
	ShopUrl: () => `/shop`,
	ShopCategoryUrl: (categoryId: string) => `/shop/category/${categoryId}`,
	ShopProductUrl: (productId: string) => `/shop/product/${productId}`,
	ShopBasketUrl: () => `/shop/basket`,
	// panel
	PanelDashboardUrl: () => '/panel/dashboard',
	PanelProfileUrl: () => '/panel/profile',
	PanelAddressesUrl: () => '/panel/addresses',
	PanelOrdersUrl: (page?: number) =>
		page ? `/panel/orders/page/${page}` : `/panel/orders`,
}
