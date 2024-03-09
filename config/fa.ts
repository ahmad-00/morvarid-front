const app_title = () => 'مروارید سپید'

export default {
	// app
	app_title_part_1: () => 'مروارید',
	app_title_part_2: () => 'سپید فرشتگان',
	app_title,
	app_subtitle: () => 'خرید زعفران و هل',
	app_description: () => 'خرید زعفران و هل',
	app_blog: () => `بلاگ ${app_title()}`,
	n_category: (s: string) => `دسته ${s}`,
	copyright_text: () =>
		`اﺳﺘﻔﺎده از ﻣﻄﺎﻟﺐ ﻓﺮوﺷﮕﺎه اﯾﻨﺘﺮﻧﺘﯽ ${app_title()} ﻓﻘﻂ ﺑﺮای ﻣﻘﺎﺻﺪ ﻏﯿﺮﺗﺠﺎری و ﺑﺎ ذﮐﺮ ﻣﻨﺒﻊ ﺑﻠﺎﻣﺎﻧﻊ اﺳﺖ. ﮐﻠﯿﻪ ﺣﻘﻮق اﯾﻦ ﺳﺎﯾﺖ ﻣﺘﻌﻠﻖ ﺑﻪ ﺳﺎﯾﺖ ${app_title()} ﻣﯽ‌ﺑﺎﺷﺪ.`,
	// home
	something_went_wrong: () => 'خطایی رخ داده است',
	login_error: () => 'وارد شوید',
	home: () => 'خانه',
	contact_us: () => 'ارﺗﺒﺎط ﺑﺎ ﻣﺎ',
	blog: () => 'بلاگ',
	shop: () => 'فروشگاه',
	basket: () => 'سبد خرید',
	phone_number: () => 'شماره تماس',
	email_address: () => 'آدرس ایمیل',
	follow_us: () => 'ما را دنبال کنید',
	website_developer: () => 'برنامه‌نویس وب‌سایت',
	main_hero_text: () =>
		'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای',
	saffron_history: () => 'تاریخچه زعفران',
	saffron_history_message: () =>
		'تاریخچه زعفران و بهره گرفتن از ان به دست انسان قدمتی بیش از ۳۵۰۰ سال دارد زعفران ادویه‌ای است که از کلاله خشک شده گل زعفران به دست می‌اید و در طول تاریخ در میان گرانترین مواد جهان بوده‌است و به عنوان ادویه، رنگ، عطر و دارو مورد استفاده قرار می‌گیرد. ریشه و تبار زعفران بومی آسیای جنوب غربی است و بعد از آن برای نخستین بار در یونان کشت شد. در حال حاضر ایران بزرگترین تولیدکننده زعفران در جهان به‌شمار می‌آید و نزدیک به نه دهم زعفران دنیا در ایران تولید می‌شود.',
	saffron: () => 'زعفران',
	saffron_benefits: () => 'فواید زعفران',
	types_of_saffron_available_for_sale: () => 'انواع زعفران موجود برای فروش',
	view_all_products: () => 'مشاهده همه کالا ها',
	saffron_footer_message: () => 'کل اقلام صد در صد خالص و از باغ قائنات',
	cardamon_history: () => 'تاریخچه هل',
	cardamon_history_message: () =>
		'هِل میوه‌ای کوچک به اندازه بند انگشت با پوست تیره و دانه‌های خوشبو است. هل، میوه گیاهی از تیره زنجبیل‌ هاست و انواع مختلفی شامل هل سیاه، هل سفید و هل سبز دارد که نوع سبز آن عطر تندتری دارد. هل یکی از چاشنی‌های معطر مورد استفاده در بعضی از غذاها، نان‌ها، شیرینی‌ها و به‌خصوص مرباها و طعم دهنده بعضی نوشیدنی ها مثل چای است. هندی‌ها و پاکستانی‌ها و جنوب بلوچستان ایران بیشترین مصرف‌کننده‌های هل در جهان هستند.',
	cardamon: () => 'هل',
	cardamon_benefits: () => 'فواید هل',
	types_of_cardamon_available_for_sale: () => 'انواع هل موجود برای فروش',
	cardamon_footer_message: () => 'هل هندوستان',
	view_all_articles: () => 'ﻣﺸﺎﻫﺪه ﻫﻤﻪ مقالات',
	latest_articles: () => 'آخرین مقالات',
	most_visited: () => 'پربازدیدترین‌ها',
	login_or_register: () => 'ورود | ثبت‌نام',
	login: () => 'ورود',
	send_code: () => 'ارسال کد',
	register: () => 'ثبت‌نام',
	order_tracking: () => 'پیگیری سفارش',
	order_code: () => 'کد سفارش',
	amount: () => 'مبلغ',
	all: () => 'همه',
	quantity: () => 'تعداد',
	transferee: () => 'تحویل گیرنده',
	buy_n: (s: string) => `خرید ${s}`,
	gram: () => 'گرم',
	mesqal: () => 'مثقال',
	grade: () => 'گرید',
	weight: () => 'وزن',
	add_to_basket: () => 'افزودن به سبد خرید',
	remove_from_basket: () => 'حذف از سبد خرید',
	related_goods: () => 'کالا های مرتبط',
	shopping_cart: () => 'سبد خرید',
	additional_information: () => 'اطلاعات تکمیلی',
	payment: () => 'پرداخت',
	order_payment_message_1: () =>
		'مبلغ سفارش را به یکی از کارت های زیر واریز کنید.',
	order_payment_message_2: () => ' سپس عکس رسید پرداخت را در زیر آپلود کنید.',
	end_of_purchase: () => 'پایان خرید',
	total: () => 'مجموع',
	toman: () => 'ﺗﻮﻣﺎن',
	payment_amount: () => 'مبلغ پرداختی',
	apply: () => 'اعمال',
	discount_code: () => 'کد تخفیف',
	code: () => 'کد',
	order_registration: () => 'ثبت سفارش',
	back: () => 'بازگشت',
	your_details: () => 'مشخصات شما',
	your_phone_number: () => 'شماره موبایل شما',
	your_full_name: () => 'نام کامل شما',
	your_email_address: () => 'آدرس ایمیل شما',
	order_receipt_information: () => 'اطلاعات دریافت سفارش',
	province: () => 'استان',
	city: () => 'شهر',
	ten_digit_postal_code: () => 'کد پستی ۱۰ رقمی',
	full_postal_address: () => 'آدرس پستی کامل',
	order_summary: () => 'خلاصه سفارش',
	discount: () => 'تخفیف',
	wholesale_discount: () => 'تخفیف خرید عمده',
	without_name: () => 'بدون نام',
	payment_was_successful: () => 'پرداخت با موفقیت انجام شد.',
	thank_you_for_your_purchase_and_trust: () => 'سپاس از خرید و اعتماد شما.',
	your_purchase_tracking_code: () => 'کد پیگیری خرید شما',
	continue_the_buying_process: () => 'ادامه فرایند خرید',
	registration_of_information_and_payment: () => 'ثبت اطلاعات و پرداخت',
	registration_of_information: () => 'ثبت اطلاعات',
	confirmation_code_sent: () => 'کد تایید به موبایل شما ارسال شد.',
	confirmation_code: () => 'کد تایید',
	confirmation_code_subtitle_message: () =>
		'یک کد به شماره موبایل شما ارسال شد. کد را وارد کنید',
	logged_in: () => 'شما وارد شدید',
	password_changed: () => 'رمز عبور تغییر کرد',
	logged_out: () => 'شما خارج شدید',
	account_created: () => 'حساب کاربری ساخته شد',
	email: () => 'ایمیل',
	username: () => 'نام کاربری',
	password: () => 'رمز عبور',
	repeat_password: () => 'تکرار رمز عبور',
	login_with_password: () => 'ورود با رمز عبور',
	please_enter_your_username_and_password: () =>
		'لطفا نام کاربری و رمز عبور خود را وارد کنید',
	please_enter_your_mobile: () => 'لطفا شماره موبایل خود را وارد کنید',
	i_forgot_my_password: () => 'رمز عبور خود را فراموش کرده ام',
	login_with_one_time_password: () => 'ورود با رمز یکبار مصرف',
	account_verification: () => 'تایید حساب کاربری',
	change_password: () => 'تغییر رمز عبور',
	register_subtitle_message: () => 'برای ثبت‌نام اطلاعات زیر را پر کنید',
	firstname_and_lastname: () => 'نام و نام خانوادگی',
	firstname: () => 'نام',
	lastname: () => 'نام خانوادگی',
	area_code: () => 'پیش شماره',
	try_again: () => 'تلاش دوباره',
	dashboard: () => 'داشبورد',
	profile: () => 'پروفایل',
	page_not_found: () => 'صفحه پیدا نشد',
	nothing_found: () => 'چیزی پیدا نشد',
	account_not_verified: () => 'این حساب کاربری هنوز فعال نشده است',
	account_verified: () => 'حساب کاربری فعال شد',
	submitted: () => 'پرداخت نشده',
	cancelled: () => 'منقضی شده',
	payed: () => 'پرداخت شده',
	processing: () => 'درحال پردازش',
	delivered: () => 'ارسال شده',
	account_information: () => 'اطلاعات حساب کاربری',
	addresses: () => 'آدرس ها',
	address: () => 'آدرس',
	orders: () => 'سفارش ها',
	order: () => 'سفارش',
	add: () => 'افزودن',
	save: () => 'ذخیره',
	information_saved: () => 'اطلاعات ذخیره شدند',
	you_must_confirm_this_number_to_register: () =>
		'برای ثبت این شماره باید آن را تایید کنید',
	postal_code: () => 'کد پستی',
	country: () => 'کشور',
	n_added: (s: any) => `${s} افزوده شد`,
	n_created: (s: any) => `${s} ساخته شد`,
	n_edited: (s: any) => `${s} ویرایش شد`,
	n_deleted: (s: any) => `${s} حذف شد`,
	add_n: (s: any) => `افزودن ${s}`,
	delete_n: (s: any) => `حذف ${s}`,
	edit_n: (s: any) => `ویرایش ${s}`,
	iran: () => 'ایران',
	cancel: () => 'بیخیال',
	cancel_order: () => 'لغو سفارش',
	pay: () => 'پرداخت',
	delete: () => 'حذف',
	error_empty_basket: () => 'سبد خرید خالی است',
	error_product_number_is_wrong: () => 'تعداد محصول اشتباه است',
	error_empty_user_info: () => 'مشخصات خود را کامل کنید',
	error_empty_payment_receipt: () => 'رسید پرداخت را آپلود کنید',
	error_empty_address: () =>
		'اطلاعات دریافت سفارش را کامل کنید و یک آدرس را انتخاب کنید.',
	status: () => 'وضعیت',
	comments: () => 'نظرات',
	comment: () => 'نظر',
	write_a_comment: () => 'یک نظر بنویسید',
	violation_report: () => 'گزارش تخلف',
	submit_comment: () => 'ثبت نظر',
	send: () => 'ارسال',
	rate: () => 'امتیاز',
	your_comment: () => 'نظر شما',
	your_name: () => 'نام شما',
	description: () => 'مشخصات',
	please_login: () => 'لطفا وارد شوید',
	for_comment_login_first: () =>
		'برای ثبت نظر ابتدا وارد حساب کاربری خود شوید',
	comment_sent: () => 'نظر ارسال شد',
	no_comment_has_been_registered_yet: () => 'هنوز نظری ثبت نشده است',
	products: () => 'محصولات',
	about_us: () => 'درباره ما',
	privacy_policy: () => 'حریم خصوصی',
	terms_of_use: () => 'شرایط استفاده',
	pages: () => 'صفحات',
	your_order_will_be_sent_after_verification: () =>
		'سفارش شما بعد از بررسی ارسال می‌شود.',
	payment_failed: () => 'پرداخت ناموفق',
	payment_operation_was_unsuccessful: () => 'عملیات پرداخت ناموفق بود',
	order_payment_error_tip_message: () =>
		'در صفحه پیگیری سفارش می توانید عملیات پرداخت را دوباره تکرار کنید',
	bank_tracking_code: () => 'کد پیگیری بانک',
	cancel_order_message: () => 'برای لغو سفارش اطلاعات زیر را پر کنید',
	order_canceled_message: () => 'درخواست لغو سفارش شما برای بررسی ارسال شد.',
	order_canceled: () => 'سفارش لغو شد',
	recipient_phone_number: () => 'شماره شبای دریافت کننده',
	full_name_of_account_holder: () => 'نام کامل صاحب حساب',
	faq: () => 'سوالات متداول',
	bank_name: () => 'نام بانک',
	shaba: () => 'شبا',
	card_number: () => 'شماره کارت',
	account_number: () => 'شماره حساب',
	payment_receipt: () => 'رسید پرداخت',
	account_holder_name: (): string => 'صاحب حساب',
	upload_n: (n: string) => `آپلود ${n}`,
	download_n: (n: string) => `دانلود ${n}`,
	card_to_card: () => 'کارت به کارت',
	bank_gateway: () => 'درگاه بانکی',
}
