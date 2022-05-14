<template>
	<div class="flex flex-col">
		<div v-if="title" class="flex items-center justify-between">
			<h1 class="text-2xl font-bold text-natural-dark mb-0">
				{{ title }}
			</h1>
			<MyIcon
				v-if="showBack"
				name="arrow-left"
				class="w-8 h-8 p-1 text-natural-dark flex-shrink-0 ripple-bg-white rounded-full cursor-pointer"
				@click="$emit('back')"
			/>
		</div>
		<span v-if="subtitle" class="mt-3 text-sm">
			<span class="text-natural-mute">{{ subtitle }}</span>
			<nuxt-link
				v-if="subtitleLinkTo"
				:to="subtitleLinkTo"
				class="font-bold text-primary"
			>
				{{ subtitleLinkText }}
			</nuxt-link>
		</span>
		<div
			v-if="showEditEmail"
			class="flex items-center self-center bg-primary bg-opacity-25 text-natural-semidark rounded-full text-xs mt-8"
		>
			<MyIcon
				name="edit"
				class="w-5 h-5 hover:text-primary duration-300 rounded-full cursor-pointer mx-3 my-2"
				@click="$emit('editEmail')"
			/>
			<span class="py-2 pe-4">{{ data.email }}</span>
		</div>
		<div
			v-if="showEditMobile"
			class="flex items-center self-center bg-primary bg-opacity-25 text-natural-semidark rounded-full text-xs mt-8 pe-4"
		>
			<MyIcon
				name="mobile"
				class="w-5 h-5 duration-300 rounded-full mx-3 my-2"
			/>
			<span class="py-2" dir="ltr">{{ data.mobile }}</span>
		</div>
		<div
			v-if="
				title ||
				showBack ||
				subtitle ||
				subtitleLinkText ||
				showEditEmail
			"
			class="pt-16"
		/>
		<TextInput
			v-if="showUsername"
			type="text"
			:label="$strings.username()"
			:value="data.username"
			class="mb-8"
			name="username"
			@change="(v) => changeData({ username: v })"
		/>
		<TextInput
			v-if="showEmail"
			type="text"
			:label="$strings.email()"
			:value="data.email"
			class="mb-8"
			name="email"
			@change="(v) => changeData({ email: v })"
		/>
		<div v-if="showMobile" class="grid gap-4 grid-cols-3 mb-8 relative">
			<span
				class="col-span-2"
				:class="{
					'opacity-0': isAreaCodeFocused,
				}"
			>
				<TextInput
					type="number"
					:label="$strings.phone_number()"
					name="mobile"
					:value="mobileWithoutAreaCode"
					@change="(v) => changeData({ mobile: areaCode + v })"
				/>
			</span>
			<div
				class="w-full"
				:class="{
					'absolute left-0 top-0 right-0 bottom-0': isAreaCodeFocused,
					'col-span-1': !isAreaCodeFocused,
				}"
			>
				<TextInput
					ref="areaCodeComp"
					type="text"
					:label="$strings.area_code()"
					name="area-code"
					:value="isAreaCodeFocused ? areaCodeSearchText : areaCode"
					@change="
						(v) =>
							isAreaCodeFocused ? (areaCodeSearchText = v) : null
					"
					@focus="isAreaCodeFocused = true"
					@blur="isAreaCodeFocused = false"
				/>
				<div
					v-if="isAreaCodeFocused && countryDialInfo.length"
					class="flex flex-col bg-white rounded-lg shadow-lg border border-gray-300 absolute left-0 right-0 mt-1 z-1 overflow-x-hidden overflow-y-auto"
					dir="ltr"
					:style="{ maxHeight: '250px' }"
				>
					<span
						v-for="(item, i) in countryDialInfo"
						:key="i"
						class="flex items-center px-3 py-2 text-natural-semidark ripple-bg-white cursor-pointer text-sm"
						@click="
							(e) => {
								changeData({
									mobile:
										item.dial_code + mobileWithoutAreaCode,
								})
								$refs.areaCodeComp.$el.querySelector('input').blur()
							}
						"
						@mousedown.prevent
					>
						<span class="me-1">{{ item.flag }}</span>
						<span class="me-1">{{ item.name }}</span>
						<span>{{ `(${item.dial_code})` }}</span>
					</span>
				</div>
			</div>
		</div>

		<TextInput
			v-if="showFirstname"
			type="text"
			:label="$strings.firstname()"
			:value="data.firstname"
			name="firstname"
			class="mb-8"
			@change="(v) => changeData({ firstname: v })"
		/>
		<TextInput
			v-if="showLastname"
			type="text"
			:label="$strings.lastname()"
			:value="data.lastname"
			name="lastname"
			class="mb-8"
			@change="(v) => changeData({ lastname: v })"
		/>
		<TextInput
			v-if="showPassword"
			type="password"
			:label="$strings.password()"
			:value="data.password"
			class="mb-8"
			@change="(v) => changeData({ password: v })"
		/>
		<TextInput
			v-if="showRePassword"
			type="password"
			:label="$strings.repeat_password()"
			:value="data.rePassword"
			class="mb-8"
			name="password"
			@change="(v) => changeData({ rePassword: v })"
		/>
		<TextInput
			v-if="showCode"
			type="text"
			:label="$strings.confirmation_code()"
			:value="data.code"
			class="mb-8"
			name="repeat-password"
			@change="(v) => changeData({ code: v })"
		/>
		<nuxt-link
			v-if="showForgetButton"
			:to="$routeUrl.ForgetPasswordUrl()"
			class="text-sm text-primary-dark flex items-center mb-8 self-start"
		>
			<span>{{ $strings.i_forgot_my_password() }}</span>
			<MyIcon name="arrow-left" class="w-4 h-4 ms-2" />
		</nuxt-link>
		<nuxt-link
			v-if="showSecretLoginButton"
			:to="$routeUrl.SecretLoginUrl()"
			class="text-sm text-primary-dark flex items-center mb-8 self-start"
		>
			<span>{{ $strings.login_with_one_time_password() }}</span>
			<MyIcon name="arrow-left" class="w-4 h-4 ms-2" />
		</nuxt-link>
		<nuxt-link
			v-if="showPasswordLoginButton"
			:to="$routeUrl.LoginUrl()"
			class="text-sm text-primary-dark flex items-center mb-8 self-start"
		>
			<span>{{ $strings.login_with_password() }}</span>
			<MyIcon name="arrow-left" class="w-4 h-4 ms-2" />
		</nuxt-link>
		<button
			v-if="btnTitle"
			class="ripple-bg-primary text-white font-bold py-5 px-6 rounded-xl w-full mt-8"
			@click="$emit('submit')"
		>
			{{ btnTitle }}
		</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextInput from '~/components/utils/TextInput.vue'
import MaterialLabel from '~/components/utils/MaterialLabel.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Component, Prop } from 'nuxt-property-decorator'
import CountryDialInfo from '~/plugins/country-dial-info'

type DataType = {
	username?: string
	email?: string
	mobile?: string
	firstname?: string
	lastname?: string
	password?: string
	rePassword?: string
	code?: string
}

@Component({
	components: { TextInput, MaterialLabel, MyIcon },
	model: {
		prop: 'data',
		event: 'change',
	},
})
export default class AuthFormCard extends Vue {
	@Prop({}) data?: any
	@Prop({}) title?: string
	@Prop({}) subtitle?: string
	@Prop({}) subtitleLinkTo?: string
	@Prop({}) subtitleLinkText?: string
	@Prop({}) btnTitle?: string
	@Prop({}) showEditEmail?: boolean
	@Prop({}) showEditMobile?: boolean
	@Prop({}) showUsername?: boolean
	@Prop({}) showEmail?: boolean
	@Prop({}) showMobile?: boolean
	@Prop({}) showFirstname?: boolean
	@Prop({}) showLastname?: boolean
	@Prop({}) showPassword?: boolean
	@Prop({}) showRePassword?: boolean
	@Prop({}) showCode?: boolean
	@Prop({}) showBack?: boolean
	@Prop({}) showForgetButton?: boolean
	@Prop({}) showSecretLoginButton?: boolean
	@Prop({}) showPasswordLoginButton?: boolean

	isAreaCodeFocused = false
	areaCodeSearchText = ''

	get areaCode(): string {
		let m = String(this.data?.mobile || '')
		return (
			CountryDialInfo.find((v) => m.includes(v.dial_code))?.dial_code ||
			''
		)
	}

	get mobileWithoutAreaCode(): string {
		let m = String(this.data?.mobile || '')
		if (!this.areaCode) return m
		return m.replace(this.areaCode, '')
	}

	get countryDialInfo() {
		return CountryDialInfo.filter(
			(v) =>
				v.name
					.toLowerCase()
					.includes(this.areaCodeSearchText.toLowerCase()) ||
				v.dial_code.includes(this.areaCodeSearchText)
		)
	}

	changeData(d: DataType) {
		this.$emit('change', {
			...this.data,
			...d,
		})
	}
}
</script>

<style lang="scss" scoped></style>
