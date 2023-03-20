<template>
  <aside class="badges">
    <div class="container">
        <div class="row">
			<div v-for="badge in scrumbadges" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
				<img v-bind:data-original="badge.img" v-bind:title="badge.title" :src="'http://www.jonaso.de/portfolio/static/img/clear.gif'" class="lazy img-responsive img-centered" alt="">
			</div>
			<div v-for="badge in badges" class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
				<img v-bind:data-original="badge.img" v-bind:title="badge.title" :src="'http://www.jonaso.de/portfolio/static/img/clear.gif'" class="lazy img-responsive img-centered" alt="">
			</div>
        </div>
    </div>
  </aside>
</template>

<script>
var badges = [
	{
		title: 'SAP-certified Associate in Project Management',
		img: './static/img/badges/sap-capm.jpg'
	},
	{
		title: 'DAkkS-certified Quality Management Representative',
		img: './static/img/badges/dakks.jpg'
	},
	{
		title: 'ITIL V3 Foundation',
		img: './static/img/badges/itil-v3-foundation.gif'
	},
	{
		title: 'Zend-certified Engineer',
		img: './static/img/badges/zend.jpg'
	}
];

var scrumbadges = [
	{
		title: 'Certified Scrum Product Owner',
		img: './static/img/badges/scrum_cspo.png'
	},
	{
		title: 'Certified Scrum Master',
		img: './static/img/badges/scrum_csm.png'
	}
];

export default {
  data () {
    return {
      badges: badges,
      scrumbadges: scrumbadges
    }
  }
}
</script>

<style>
aside.badges{
	padding:4em 0;
    background-color: #EEEEEE;
}
aside.badges img{
	opacity:0.4;
}
aside.badges img:hover{
	opacity:1;
}
</style>

