<template>
	<ModalContainer
		:title="
			data.id
				? $strings.edit_n($strings.address())
				: $strings.add_n($strings.address())
		"
		size="xl"
		:buttonName="data.id ? $strings.save() : $strings.add()"
		@close="$emit('close')"
		@button-click="submit"
		:loading="loading"
		:visible="visible"
	>
		<div class="grid gap-6 px-6 py-8 items-start">
			<TextInput
				type="select"
				class=""
				:label="$strings.province()"
				:value="data.province"
				:options="provinces"
				:option-name="null"
				:option-value="null"
				@change="(v) => $emit('update:data', { ...data, province: v })"
			/>
			<TextInput
				type="select"
				class=""
				:label="$strings.city()"
				:value="data.city"
				:options="cities"
				:option-name="null"
				:option-value="null"
				@change="(v) => $emit('update:data', { ...data, city: v })"
			/>
			<TextInput
				type="number"
				class=""
				:label="$strings.postal_code()"
				:value="data.postal_code"
				@change="
					(v) => $emit('update:data', { ...data, postal_code: v })
				"
			/>
			<TextInput
				type="text"
				class=""
				:label="$strings.address()"
				:value="data.details"
				@change="(v) => $emit('update:data', { ...data, details: v })"
			/>
		</div>
	</ModalContainer>
</template>

<script lang="ts">
import MyIcon from '../utils/MyIcon.vue'
import Vue from 'vue'
import ModalContainer from '~/components/utils/ModalContainer.vue'
import TextInput from '~/components/utils/TextInput.vue'
import { Address } from '~/config/types'
import { Component, Prop } from 'nuxt-property-decorator'
import CityInfo from '~/plugins/city-info'

@Component({
	components: {
		ModalContainer,
		TextInput,
		MyIcon,
	},
})
export default class CreateAddressDialog extends Vue {
	@Prop({}) visible?: boolean
	@Prop({}) data?: Address

	loading = false

	get provinces(): string[] {
		return [...new Set(CityInfo.map((v) => v.province_name))].sort()
	}

	get cities(): string[] {
		return [
			...new Set(
				CityInfo.filter(
					(v) => v.province_name == this.data?.province
				).map((v) => v.county_name)
			),
		].sort()
	}

	async submit() {
		const errors = [
			...this.$validator.validate(
				this.data?.province,
				this.$strings.province(),
				'valid'
			),
			...this.$validator.validate(
				this.data?.city,
				this.$strings.city(),
				'valid'
			),
			...this.$validator.validate(
				this.data?.postal_code,
				this.$strings.postal_code(),
				'valid'
			),
			...this.$validator.validate(
				this.data?.details,
				this.$strings.address(),
				'valid'
			),
		]

		if (errors.length) {
			this.$toast.error(errors[0], '', {} as any)
			return
		}

		this.loading = true
		try {
			if (this.data?.id) {
				await this.$axios.patch(
					this.$apiUrl.EditAddressUrl(this.data?.id),
					{
						country: 'IR',
						province: this.data?.province || '',
						city: this.data?.city || '',
						postal_code: this.data?.postal_code || '',
						details: this.data?.details || '',
					}
				)
			} else {
				await this.$axios.post(this.$apiUrl.AddAddressUrl(), {
					country: 'IR',
					province: this.data?.province || '',
					city: this.data?.city || '',
					postal_code: this.data?.postal_code || '',
					details: this.data?.details || '',
				})
			}
			this.$emit('done')
			this.$emit('close')
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.loading = false
	}
}
</script>

<style scoped></style>
