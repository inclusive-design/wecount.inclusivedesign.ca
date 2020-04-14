<template>
	<div class="funders">
		<p>Supported by Innovation, Science and Economic Development Canada’s Accessible Technology Program.</p>
		<div>
			<a href="https://www.ic.gc.ca/eic/site/118.nsf/eng/home">
				<CanadaLogo />
				<span class="screen-reader-only">Accessible Technology Program</span>
			</a>
		</div>
	</div>
</template>

<script>
import Config from "~/assets/config";
import CanadaLogo from "~/assets/images/logo_canada.svg?inline";

export default {
	components: {
		CanadaLogo
	},
	data () {
		return {
			funders: Config.funders
		};
	}
};
</script>
