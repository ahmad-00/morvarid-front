<template>
	<PanelContainer
		:fetched="fetched"
		:loading.sync="loading"
		selected="dashboard"
		@tryAgain="fetchData"
	>
		<span class="text-xl font-bold text-natural-dark mb-10">
			{{ $strings.dashboard() }}
		</span>
		<ProductStatusBar :items="orderCounts" />
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
	fetched = false
	loading = false
	orderCounts = [0, 0, 0, 0, 0]

	get orderStatuses(): any[] {
		return this.$store.state.type.orderStatuses || []
	}

	async fetchData() {
		this.fetched = false
		this.loading = true
		try {
			const r = await this.$axios.get(this.$apiUrl.GetOrderCountUrl(), {
				params: {},
			})

			const newOrderCounts = Array(5)
				.fill('')
				.map((v) => 0)

			r.data.result?.forEach((v: any) => {
				const i = this.orderStatuses.findIndex(
					(t) => t.value === v.status
				)
				if (i >= 0) {
					newOrderCounts[i] = v.total || 0
				}
			})

			this.orderCounts = newOrderCounts

			this.fetched = true
		} catch (e: any) {
			this.$toastErrors(this, e)
		}
		this.loading = false
	}

	mounted() {
		this.fetchData()
	}

	head() {
		return {
			title:
				this.$strings.dashboard() + ' | ' + this.$strings.app_title(),
		}
	}
}
</script>

<style scoped></style>
