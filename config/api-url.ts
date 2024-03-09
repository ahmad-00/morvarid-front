import Vue from 'vue'
import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'

export default {
	BaseUrl: (config: NuxtRuntimeConfig) => config.env.BASE_URL,
	MediaBaseUrl: (config: NuxtRuntimeConfig) => config.env.MEDIA_URL,
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
	GetShopProduct: (id: any) => `product/${id}`,
	// media
	GetMediaUrl: (url: string) => `media/${url}`,
	// order
	SubmitOrderUrl: () => `order`,
	SubmitPaymentReceiptUrl: (orderId: string) => `order/${orderId}/receipt`,
	PayOrderUrl: () => `buy`,
	ConfirmPaymentUrl: () => `buy/confirm`,
	GetOrdersUrl: () => `order`,
	GetOrderCountUrl: () => `order/count`,
	CancelOrderUrl: (id: any) => `order/${id}/cancel`,
	// weight
	GetWeightsUrl: () => `weights`,
	// review
	SubmitReviewUrl: () => `review`,
	DeleteReviewUrl: (id: string) => `review/${id}`,
}
