<template>
	<client-only>
		<component :is="'my-' + name" @click="(e) => $emit('click', e)" />
	</client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

const icons = [
	'grid',
	'instagram',
	'linkedin',
	'twitter',
	'arrow-left-square',
	'arrow-left',
	'toman',
	'plus-square',
	'login',
	'buy',
	'close',
	'eye',
	'document',
	'tick',
	'ticket',
	'plus',
	'minus',
	'trash',
	'person',
	'edit',
	'mobile',
	'arrow-down',
	'person-circle',
	'logout',
	'dashboard',
	'bag',
	'bag-fill',
	'location',
	'invoice',
	'recent-time'
] as const

export type IconType = typeof icons[number]

const iconComponents = {} as any
icons.forEach((name) => {
	const cName = name.replace(/-/g, '_')
	iconComponents[`my-${name}`] = () =>
		import(`~/assets/img/icons/ic_${cName}.svg` as any)
})

@Component({
	components: {
		...iconComponents,
	},
})
export default class MyIcon extends Vue {
	@Prop({ default: 'close' }) name!: IconType
}
</script>

<style></style>
