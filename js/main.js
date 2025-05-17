document.addEventListener('DOMContentLoaded', () => {
	// Mobile navigation toggle
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');

	if (navToggle && navLinks) {
		navToggle.addEventListener('click', () => {
			navLinks.classList.toggle('active');
			navToggle.classList.toggle('active');
		});
	}

	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const href = this.getAttribute('href');
			if (!href) return;
			
			const target = document.querySelector(href);
			if (!target) return;
			
			// Close mobile menu if open
			if (navLinks && window.innerWidth <= 768) {
				navLinks.classList.remove('active');
				navToggle.classList.remove('active');
			}

			// Scroll to target
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	});

	// Handle window resize
	let resizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			if (window.innerWidth > 768 && navLinks) {
				navLinks.classList.remove('active');
				if (navToggle) navToggle.classList.remove('active');
			}
		}, 250);
	});

	// Intersection Observer for fade-in animations
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	// Observe all sections
	document.querySelectorAll('.section').forEach(section => {
		section.style.opacity = '0';
		section.style.transform = 'translateY(20px)';
		section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
		observer.observe(section);
	});
});