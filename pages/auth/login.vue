<template>
	<LoginContainer :loading="loading">
		<AuthFormCard
			v-model="formData"
			:title="$strings.login_with_password()"
			:subtitle="$strings.please_enter_your_username_and_password()"
			:btnTitle="$strings.login()"
			:show-username="true"
			:show-password="true"
			:show-forget-button="true"
			@submit="submit"
		/>
		<nuxt-link
			:to="$routeUrl.RegisterUrl()"
			class="text-sm text-primary-dark mt-8 self-center"
		>
			{{ $strings.register() }}
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
import { User } from '~/config/types'

@Component({
	middleware: ['fetch', 'noauth'],
	components: { LoginContainer, LoginBackground, TextInput, AuthFormCard },
})
export default class LoginPage extends Vue {
	loading = false
	formData = {
		username: '',
		password: '',
	}

	get user(): User | null {
		return this.$store.state.user.user
	}

	async submit() {
		const errors = [
			...this.$validator.validate(
				this.formData.username,
				this.$strings.username(),
				'valid'
			),
			...this.$validator.validate(
				this.formData.password,
				this.$strings.password(),
				'valid'
			),
		]

		if (errors.length) {
			this.$toast.error(errors[0], '', {} as any)
			return
		}

		this.loading = true
		try {
			await this.$store.dispatch('user/passwordLogin', {
				username: this.formData.username,
				password: this.formData.password,
			})
			this.$toast.success(this.$strings.logged_in(), '', {} as any)
			await this.$router.push(this.$routeUrl.HomeUrl())
		} catch (e: any) {
			if (e?.response?.data?.status === 'not_verified_user') {
				this.$toast.error(
					this.$strings.account_not_verified(),
					'',
					{} as any
				)
				await this.$router.push(this.$routeUrl.SecretLoginUrl())
			} else {
				this.$toastErrors(this, e)
				this.loading = false
			}
		}
	}
}
</script>

<style scoped></style>
