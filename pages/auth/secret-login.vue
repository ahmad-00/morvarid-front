<template>
	<LoginContainer :loading="loading" :fetched="fetched">
		<AuthFormCard
			v-if="fetched && step === 1"
			v-model="formData"
			:title="$strings.account_verification()"
			:subtitle="$strings.please_enter_your_mobile()"
			:btnTitle="$strings.send_code()"
			:show-mobile="true"
			:show-password-login-button="true"
			:form-errors="formErrors"
			@submit="sendOPT"
		/>
		<AuthFormCard
			v-else-if="fetched && step === 2"
			v-model="formData"
			:title="$strings.confirmation_code()"
			:subtitle="$strings.confirmation_code_subtitle_message()"
			:btnTitle="$strings.login()"
			:show-code="true"
			:show-edit-mobile="true"
			:show-back="!mobile"
			:form-errors="formErrors"
			@back="back"
			@submit="submitOPT"
		/>
	</LoginContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthFormCard from '~/components/auth/AuthFormCard.vue'
import LoginBackground from '~/components/auth/LoginBackground.vue'
import TextInput from '~/components/utils/TextInput.vue'
import { Component } from 'nuxt-property-decorator'
import LoginContainer from '~/components/auth/LoginContainer.vue'

@Component({
	middleware: ['fetch', 'noauth'],
	components: { LoginContainer, LoginBackground, TextInput, AuthFormCard },
})
export default class LoginPage extends Vue {
	loading = true
	fetched = false
	step = 1
	formData = {
		username: '',
		mobile: '',
		code: '',
	}
	formErrors = null as any

	get mobile() {
		return String(this.$route.query.mobile || '')
	}

	async sendOPT() {
		const errors = [
			...this.$validator.validate(
				this.formData.mobile,
				this.$strings.phone_number(),
				'valid|mobile'
			),
		]

		if (errors.length) {
			this.$toast.error(errors[0], '', {} as any)
			return
		}

		this.loading = true
		try {
			await this.$axios.post(this.$apiUrl.SendOptUrl(), {
				phone: this.formData.mobile,
			})
			this.$toast.info(
				this.$strings.confirmation_code_sent(),
				'',
				{} as any
			)
			this.step = 2
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.fetched = true
		this.loading = false
	}

	async submitOPT() {
		const errors = [
			...this.$validator.validate(
				this.formData.code,
				this.$strings.code(),
				'valid'
			),
		]

		if (errors.length) {
			this.$toast.error(errors[0], '', {} as any)
			return
		}

		this.loading = true
		try {
			await this.$axios.post(this.$apiUrl.SubmitOptUrl(), {
				phone: this.formData.mobile,
				otp: this.formData.code,
			})
			this.$toast.success(this.$strings.account_verified(), '', {} as any)
			await this.$router.push(this.$routeUrl.LoginUrl())
		} catch (e: any) {
			this.formErrors = this.$toastErrors(this, e, false)
			this.loading = false
		}
	}

	async back() {
		if (this.mobile) {
			this.loading = true
			await this.$router.push(this.$routeUrl.LoginUrl())
		} else {
			this.step = 1
		}
	}

	mounted() {
		if (this.mobile) {
			this.fetched = false
			this.loading = true
			this.formData.mobile = this.mobile
			this.step = 2
			this.sendOPT()
		} else {
			this.fetched = true
			this.loading = false
		}
	}

	head() {
		if (this.step === 1) {
			return {
				title:
					this.$strings.account_verification() +
					' | ' +
					this.$strings.app_title(),
			}
		} else if (this.step === 2) {
			return {
				title:
					this.$strings.confirmation_code() +
					' | ' +
					this.$strings.app_title(),
			}
		} else {
			return {
				title:
					this.$strings.app_title() +
					' | ' +
					this.$strings.app_subtitle(),
			}
		}
	}
}
</script>

<style scoped></style>
