document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  
    // Form submission handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
      });
    }
  
    // PDF link tracking (optional)
    document.querySelectorAll('.pdf-link').forEach(link => {
      link.addEventListener('click', function() {
        // You could add analytics tracking here
        console.log('PDF viewed:', this.href);
      });
    });
  
    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-link');
    
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.navLink === current) {
          link.classList.add('active');
        }
      });
    });
  
    // UFO Game (if you want to include it)
    const ufoGameCanvas = document.getElementById('ufoGame');
    if (ufoGameCanvas) {
      const ctx = ufoGameCanvas.getContext('2d');
      let gameRunning = false;
      
      // Game objects
      const ufo = {
        x: 150,
        y: 50,
        width: 80,
        height: 40,
        speed: 2,
        draw() {
          ctx.fillStyle = '#8e44ad';
          ctx.beginPath();
          ctx.ellipse(this.x + this.width/2, this.y + this.height/2, 
                     this.width/2, this.height/2, 0, 0, Math.PI * 2);
          ctx.fill();
        },
        update() {
          this.x += this.speed;
          if (this.x > ufoGameCanvas.width - this.width || this.x < 0) {
            this.speed = -this.speed;
            this.y += 40;
          }
        }
      };
      
      const player = {
        x: ufoGameCanvas.width/2 - 25,
        y: ufoGameCanvas.height - 60,
        width: 50,
        height: 50,
        draw() {
          ctx.fillStyle = '#3498db';
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      };
      
      // Game loop
      function gameLoop() {
        if (!gameRunning) return;
        
        ctx.clearRect(0, 0, ufoGameCanvas.width, ufoGameCanvas.height);
        
        ufo.update();
        ufo.draw();
        player.draw();
        
        requestAnimationFrame(gameLoop);
      }
      
      // Start game button
      document.getElementById('startGame')?.addEventListener('click', () => {
        gameRunning = true;
        gameLoop();
      });
    }
  });