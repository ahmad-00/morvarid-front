<template>
	<PanelContainer
		:fetched="fetched"
		:loading.sync="loading"
		selected="dashboard"
	>
		<span class="text-xl font-bold text-natural-dark mb-10">
			{{ $strings.dashboard() }}
		</span>
		<ProductStatusBar :items="[0, 0, 0, 0, 0]" />
	</PanelContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import UserMenu from '~/components/home/UserMenu.vue'
import MyIcon from '~/components/utils/MyIcon.vue'
import PanelContainer from '~/components/panel/PanelContainer.vue'
import ProductStatusBar from '~/components/panel/ProductStatusBar.vue'

@Component({
	middleware: ['fetch', 'auth'],
	components: { ProductStatusBar, PanelContainer, UserMenu, MyIcon },
})
export default class PanelDashboardPage extends Vue {
	fetched = true
	loading = false
}
</script>

<style scoped></style>
