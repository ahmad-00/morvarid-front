<template>
	<div
		class="material-label block relative border-transparent duration-300"
		:class="{
			'border-2': outline,
			'border-primary': focus,
			'focus-within:border-primary': true,
		}"
	>
		<slot></slot>
		<div
			class="material-label-ctr absolute left-0 right-0 duration-300 origin-start top-0 bottom-0 w-full h-full pointer-events-none flex items-center justify-start font-bold text-slate-700"
			:class="{
				'material-label-ctr-focus': value || focus,
			}"
		>
			<span
				:style="{ height: '24px' }"
				class="material-label-label origin-start ms-4 bg-white bg-opacity-0 px-1 py-0 transition-all duration-300 rounded"
				:class="{
					'material-label-label-focus': value || focus,
				}"
			>
				<slot name="label">
					<label class="mb-0">
						{{ label }}
					</label>
				</slot>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({
	components: {},
})
export default class MaterialLabel extends Vue {
	@Prop({}) value!: string | number
	@Prop({ default: true }) outline!: boolean
	@Prop({ default: '' }) label!: string
	@Prop({ default: false }) focus!: boolean
}
</script>

<style>
.material-label:focus-within .material-label-ctr,
.material-label-ctr-focus {
	transform: translateY(calc(-50% - 6px * 0.75)) scale(0.75) !important;
}

.material-label:focus-within .material-label-label,
.material-label-label-focus {
	@apply z-0 font-normal bg-opacity-100;
}
</style>
