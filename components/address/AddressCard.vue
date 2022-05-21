<template>
	<div
		class="flex flex-col p-5 rounded-xl border relative"
		:class="{
			'border-gray-100 bg-white shadow-sm': !selected,
			'border-primary bg-primary bg-opacity-5 shadow-md': selected,
		}"
		@click="$emit('click')"
	>
		<div class="flex items-start">
			<span
				class="flex-grow line-clamp-2 text-natural-dark font-medium me-6 text-sm"
			>
				{{ data.details }}
			</span>
			<MyIcon
				name="trash"
				class="w-5 h-5 text-natural-dark hover:text-red-500 duration-300 cursor-pointer me-5"
				@click="
					(e) => {
						e.stopPropagation()
						$emit('delete')
					}
				"
			/>
			<MyIcon
				name="edit"
				class="w-5 h-5 text-natural-dark hover:text-primary duration-300 cursor-pointer"
				@click="
					(e) => {
						e.stopPropagation()
						$emit('edit')
					}
				"
			/>
		</div>
		<div class="grid gird-cols-1 sm:grid-cols-2 gap-5 mt-6">
			<div class="flex items-center text-natural-mute text-sm">
				<span class="text-natural-mute font-bold">
					{{ $strings.province() }}
				</span>
				<span class="mx-2 font-bold">:</span>
				<span class="line-clamp-">
					{{ data.province || '~' }}
				</span>
			</div>
			<div class="flex items-center text-natural-mute text-sm">
				<span class="text-natural-mute font-bold">
					{{ $strings.city() }}
				</span>
				<span class="mx-2 font-bold">:</span>
				<span class="line-clamp-1">
					{{ data.city || '~' }}
				</span>
			</div>
			<div class="flex items-center text-natural-mute text-sm">
				<span class="text-natural-mute font-bold">
					{{ $strings.postal_code() }}
				</span>
				<span class="mx-2 font-bold">:</span>
				<span class="line-clamp-1">
					{{ data.postal_code || '~' }}
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MyIcon from '~/components/utils/MyIcon.vue'
import { Address } from '~/config/types'

@Component({
	middleware: ['fetch', 'auth'],
	components: { MyIcon },
})
export default class AddressCard extends Vue {
	@Prop({}) data?: Address
	@Prop({}) selected?: boolean
}
</script>

<style scoped></style>
