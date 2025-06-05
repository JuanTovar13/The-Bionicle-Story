class HexCarousel extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          overflow: hidden;
          width: 100%;
          
        }

        .carousel-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          transition: transform 0.5s ease;
          will-change: transform;
          
        }

        .carousel-viewport {
          overflow: hidden;
          width: 100%;
          
        }

        .carousel-wrapper {
          display: flex;
          flex-wrap: nowrap;
          transition: transform 0.6s ease;
          
        }

        .hex-card {
          position: relative;
          width: 1000px;
          height: 1000px;
          clip-path: polygon(
            50% 0%,       /* top center */
            100% 25%,     /* top right */
            100% 75%,     /* bottom right */
            50% 100%,     /* bottom center */
            0% 75%,       /* bottom left */
            0% 25%        /* top left */
            );
          background: #1e1e1e;
          color: white;
          text-align: center;
          
          box-sizing: border-box;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          transform: scale(0.8);
          opacity: 0.6;
          transition: transform 0.4s, opacity 0.4s;
           z-index: 1; /* Asegura que sobresalga */
        overflow: visible;
           box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 30px -125px 80px rgba(0, 0, 0, 0.25);
        }

        .hex-card.active {
          transform: scale(1);
          opacity: 1;
          z-index: 10;
        }

        .hex-card img {
          width: 1000px;
          max-height: 600px;
          object-fit: cover;
          margin-bottom: 20px;
        }

        .hex-card h3 {
          
          font-size: 64px;
          font-family: 'Goudy Trajan', serif;
            font-weight: normal;
            margin-top: 0px;
            margin-bottom: 0px;
        }

        .hex-card p {
            font-family: 'TradeMaker', sans-serif;
        font-weight: light;
          font-size: 24px;
          opacity: 0.8;
        }

        .nav-btns {
          text-align: center;
          margin-top: 20px;
        }

        button {
          padding: 10px 20px;
          border: none;
          color: #021822;
          font-weight: bold;
          cursor: pointer;
          margin: 0 10px;
          border-radius: 8px;
        }
        .text-container {
            padding:20px
            margin-top: 0;
            margin-bottom: 0;
            width: 100%;
  }
            .carousel-frame {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.carousel-viewport {
  overflow: hidden;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.6s ease;
}




  .nav-btn {
  width: 100px; /* ajusta según tu imagen */
    height: 100px; /* ajusta según tu imagen */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0;
  background: #394B55;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), inset 17px -16px 12px rgba(0, 0, 0, 0.25);
  
}

.nav-btn img {
  width: 48px; /* ajusta según tu imagen */
  height: auto;
  margin:20px;
  
  transition: transform 0.2s ease;
  
  
}

.nav-btn:hover img {
  transform: scale(1.1);
}
  .nav-btn:hover {
  
  background-color: #021822;
}

.nav-btn.left {
  left: 10px;
  transform: rotate(180deg); /* Voltea la flecha */
  filter: drop-shadow(-2px -2px 2px rgba(0,0,0,0.5));
}

.nav-btn.right {
  right: 10px;
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.5));
}
 


      </style>

      <div class="carousel-frame">
  <button class="nav-btn left" id="prev">
  <img src="./media/arrow 2_Mesa de trabajo 1.png" alt="Anterior">
</button>

  <div class="carousel-viewport">
    <div class="carousel-wrapper"></div>
  </div>
  <button class="nav-btn right" id="next">
  <img src="./media/arrow 2_Mesa de trabajo 1.png" alt="Siguiente">
</button>

</div>
    `;

    this.wrapper = shadow.querySelector('.carousel-wrapper');
    this.cards = [];
    this.current = 0;

    // Example data (you can replace this with dynamic loading)
    this.data = [
      { img: './media/Tahu-Wallpaper.jpg', title: 'TALE OF THE TOA', subtitle: 'Chronicles #1', author: 'C.A. Hapka',bgColor: '#5D110E', textColor: '#FFFFFF' },
      { img: './media/Nuparu-01-Wallpaper.jpg', title: 'POWER PLAY', subtitle: 'Legends #3',author: 'Greg Farshtey', bgColor: '#323435', textColor: '#FFFFFF' },
      { img: './media/timetrap.png', title: 'TIME TRAP', subtitle: 'Adventures #10',author: 'Greg Farshtey', bgColor: '#5D110E', textColor: '#FFFFFF' },
      { img: './media/Zaktan.png', title: 'LEGACY OF EVIL', subtitle: 'Legends #4',author: 'Greg Farshtey', bgColor: '#00381A', textColor: '#FFFFFF' },
      { img: './media/swampofsecrets.jpg', title: 'SWAMP OF SECRETS', subtitle: 'Legends #10',author: 'Greg Farshtey', bgColor: '#D0D9E4', textColor: '#000000'},
    ];

    this.renderCards();
    this.updateActive();

    shadow.getElementById('prev').addEventListener('click', () => this.prev());
    shadow.getElementById('next').addEventListener('click', () => this.next());
  }

renderCards() {
  this.wrapper.innerHTML = '';
  this.cards = this.data.map(item => {
    const card = document.createElement('div');
    card.classList.add('hex-card');

    // ✅ Aquí aplicamos el fondo personalizado
    card.style.backgroundColor = item.bgColor;

    card.innerHTML = `
    
      <img src="${item.img}" alt="${item.title}" />
      <div style="color: ${item.textColor};" class="text-container">
        <p>${item.subtitle}</p>
        <h3>${item.title}</h3>
        <p>By ${item.author}</p>
      </div>
      
    </div>
      
    `;
    this.wrapper.appendChild(card);
    return card;
  });
  this.centerCurrent();
}


  centerCurrent() {
    const offset = (this.cards[0].offsetWidth + 40) * this.current;
    const containerWidth = this.shadowRoot.querySelector('.carousel-viewport').offsetWidth;
    const translateX = (offset - containerWidth / 2 + this.cards[0].offsetWidth / 2) * -1;

    this.wrapper.style.transform = `translateX(${translateX}px)`;
  }

  updateActive() {
    this.cards.forEach((card, i) => {
      card.classList.toggle('active', i === this.current);
    });
    this.centerCurrent();
  }

  prev() {
    this.current = (this.current - 1 + this.cards.length) % this.cards.length;
    this.updateActive();
  }

  next() {
    this.current = (this.current + 1) % this.cards.length;
    this.updateActive();
  }
}

customElements.define('hex-carousel', HexCarousel);
