<template>
	<LoginContainer :loading="loading">
		<AuthFormCard
			v-model="formData"
			:title="$strings.register()"
			:subtitle="$strings.register_subtitle_message()"
			:btnTitle="$strings.register()"
			:show-username="true"
			:show-mobile="true"
			:show-firstname="true"
			:show-lastname="true"
			:show-password="true"
			:show-re-password="true"
			:form-errors="formErrors"
			@submit="submit"
		/>
		<nuxt-link
			:to="$routeUrl.LoginUrl()"
			class="text-sm text-primary-dark mt-8 self-center"
		>
			{{ $strings.login() }}
		</nuxt-link>
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
export default class RegisterPage extends Vue {
	loading = false
	formData = {
		username: '',
		mobile: '',
		firstname: '',
		lastname: '',
		password: '',
		rePassword: '',
	}
	formErrors = null as any

	async submit() {
		const errors = [
			...this.$validator.validate(
				this.formData.username,
				this.$strings.username(),
				'valid'
			),
			...this.$validator.validate(
				this.formData.mobile,
				this.$strings.phone_number(),
				'valid|phone'
			),
			...this.$validator.validate(
				this.formData.firstname,
				this.$strings.firstname(),
				'valid'
			),
			...this.$validator.validate(
				this.formData.lastname,
				this.$strings.lastname(),
				'valid'
			),
			...this.$validator.validate(
				this.formData.password,
				this.$strings.password(),
				'valid'
			),
			...(this.formData.password !== this.formData.rePassword
				? this.$validator.validate(
						this.formData.rePassword,
						this.$strings.repeat_password(),
						'valid|equel[]'
				  )
				: []),
		]

		if (errors.length) {
			this.$toast.error(errors[0], '', {} as any)
			return
		}

		this.loading = true
		try {
			await this.$axios.post(this.$apiUrl.RegisterUrl(), {
				username: this.formData.username,
				phone: this.formData.mobile,
				first_name: this.formData.firstname,
				last_name: this.formData.lastname,
				password: this.formData.password,
			})
			this.$toast.success(this.$strings.account_created(), '', {} as any)
			await this.$router.push({
				path: this.$routeUrl.SecretLoginUrl(),
				query: {
					mobile: this.formData.mobile,
				},
			})
		} catch (e: any) {
			this.formErrors = this.$toastErrors(this, e, false)
		}
		this.loading = false
	}

	head() {
		return {
			title: this.$strings.register() + ' | ' + this.$strings.app_title(),
		}
	}
}
</script>

<style scoped></style>
