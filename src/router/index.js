import { createRouter, createWebHistory } from 'vue-router';
const AUTHOR_NAME=process.env.VUE_APP_AUTHOR_NAME||'Mostefa Boudjema';

// Function to generate meta title dynamically
function generateMetaTitle(routeName, projectType) {
	return `${AUTHOR_NAME} - ${projectType? projectType+' ':''}${routeName}`;
}
const routes=[
	{
		path: '/',
		name: 'Home', component: () =>
			import('../views/Home.vue'),
		meta: {
			title: generateMetaTitle('Home'),
		},
	},
	{
		path: '/about',
		name: 'About',
		component: () =>
			import('../views/About.vue'),
		meta: {
			title: generateMetaTitle('About'),
		},
	},
	{
		path: '/projects',
		name: 'Projects',
		component: () =>
			import('../views/Projects.vue'),
		meta: {
			title: generateMetaTitle('Projects'),
		},
	},
	{
		path: '/projects/LaravelVueEcommercePhone',
		name: 'LaravelVueEcommercePhone',
		id: '1',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Phones Store'),
		},
	},
	{
		path: '/projects/LaravelVotingSystem',
		name: 'LaravelVotingSystem',
		id: '2',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Phones Blog'),
		},
	},
	{
		path: '/projects/LaravelExpenseManager',
		name: 'LaravelExpenseManager',
		id: '3',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Business'),
		},
	},
	{
		path: '/projects/PhonesStore',
		name: 'PhonesStore',
		id: '1',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Phones Store'),
		},
	},
	{
		path: '/projects/Blog',
		name: 'Blog',
		id: '2',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Phones Blog'),
		},
	},
	{
		path: '/projects/Business',
		name: 'Business',
		id: '3',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Business'),
		},
	},
	{
		path: '/projects/Portfolio',
		name: 'Portfolio',
		id: '4',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Portfolio'),
		},
	},
	{
		path: '/projects/Elearn',
		name: 'Elearn',
		id: '5',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Elearn'),
		},
	},
	{
		path: '/projects/ClothesStore',
		name: 'ClothesStore',
		id: '6',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Clothes Store'),
		},
	},
	{
		path: '/projects/tamtamtools',
		name: 'tamtamtools', id: '7',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Tamtam Tools'),
		},
	},
	{
		path: '/projects/iauto',
		name: 'iauto', id: '8',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('iauto'),
		},
	},
	{
		path: '/projects/movie-db',
		name: 'movie-db', id: '10',
		component: () =>
			import(
				'../views/OneProjectTemplate.vue'
			),
		meta: {
			title: generateMetaTitle('Movie db'),
		},
	},
	{
		path: '/contact',
		name: 'Contact',
		component: () =>
			import('../views/Contact.vue'),
		meta: {
			title: generateMetaTitle('Contact'),
		},
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () =>
			import('../views/PathNotFound.vue'),
		meta: {
			title: generateMetaTitle('404 Page Not found'),
		},
	},
];

const router=createRouter({
	history: createWebHistory(process.env.VUE_APP_BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
});

export default router;


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
	// `/nested`'s will be chosen.
	const nearestWithTitle=to.matched
		.slice()
		.reverse()
		.find((r) => r.meta&&r.meta.title);// Find the nearest route element with meta tags.
	const nearestWithMeta=to.matched
		.slice()
		.reverse()
		.find((r) => r.meta&&r.meta.metaTags); const previousNearestWithMeta=from.matched
			.slice()
			.reverse()
			.find((r) => r.meta&&r.meta.metaTags);// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) {
		document.title=nearestWithTitle.meta.title;
	} else if (previousNearestWithMeta) {
		document.title=previousNearestWithMeta.meta.title;
	}// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(
		document.querySelectorAll('[data-vue-router-controlled]')
	).map((el) => el.parentNode.removeChild(el));// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag=document.createElement('meta'); Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});	// We use this to track which meta tags we create so we don't interfere with other ones.
			tag.setAttribute('data-vue-router-controlled', ''); return tag;
		})
		// Add the meta tags to the document head.
		.forEach((tag) => document.head.appendChild(tag)); next();
});
