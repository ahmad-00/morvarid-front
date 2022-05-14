<template>
	<LoginContainer :loading="loading" :fetched="fetched">
		<AuthFormCard
			v-if="fetched && step === 1"
			v-model="formData"
			:title="$strings.change_password()"
			:subtitle="$strings.please_enter_your_mobile()"
			:btnTitle="$strings.send_code()"
			:show-mobile="true"
			:show-back="!mobile"
			@back="back"
			@submit="sendOPT"
		/>
		<AuthFormCard
			v-else-if="fetched && step === 2"
			v-model="formData"
			:title="$strings.confirmation_code()"
			:subtitle="$strings.confirmation_code_subtitle_message()"
			:btnTitle="$strings.login()"
			:show-code="true"
			:show-password="true"
			:show-edit-mobile="true"
			:show-back="!mobile"
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
	loading = false
	fetched = true
	step = 1
	formData = {
		mobile: '',
		code: '',
		password: '',
	}

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
			await this.$axios.post(this.$apiUrl.SendResetPasswordUrl(), {
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
			await this.$axios.post(this.$apiUrl.SubmitResetPasswordUrl(), {
				phone: this.formData.mobile,
				otp: this.formData.code,
				new_password: this.formData.password,
			})
			this.$toast.success(this.$strings.password_changed(), '', {} as any)
			await this.$router.push(this.$routeUrl.LoginUrl())
		} catch (e: any) {
			this.$toastErrors(this, e)
			this.loading = false
		}
	}

	async back() {
		if (this.step == 1) {
			this.loading = true
			await this.$router.push(this.$routeUrl.LoginUrl())
		} else {
			this.step = 1
		}
	}

	mounted() {}
}
</script>

<style scoped></style>
